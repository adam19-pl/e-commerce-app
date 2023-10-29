from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from e_commerce.models import Product, ProductCategory, CustomUser
from e_commerce.serializers import ProductSerializer, ProductDetailsSerializer, ProductCategoriesSerializer, UserSerializer
from e_commerce.pagination import CustomPageNumberPagination
import re


class RegisterView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            if CustomUser.objects.filter(email=request.data['email']).exists():
                return Response({"Error": "This email is already in use"}, status=status.HTTP_400_BAD_REQUEST)
            if not re.match("^[a-zA-Z]*$", request.data['firstname']):
                return Response({"Error": "Firstname and lastname field cannot contain special characters or numbers"},
                                status=status.HTTP_400_BAD_REQUEST)
            newuser = serializer.save()
            if newuser:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlackListTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ProductsList(APIView, CustomPageNumberPagination):
    serializer_class = ProductSerializer
    pagination_class = CustomPageNumberPagination
    permission_classes = [AllowAny,]

    def get(self, request):
        print(request.user.is_authenticated)
        print(request.user.id)
        queryset = Product.objects.all()
        results = self.paginate_queryset(queryset, request, view=self)
        serializer = ProductSerializer(results, many=True)
        if request.user.is_authenticated:
            if serializer.data:
                for product in serializer.data:
                    if product.get('added_by') == request.user.id:
                        product['is_owner'] = True
            return self.get_paginated_response(data=serializer.data, user_role=request.user.role)
        return self.get_paginated_response(data=serializer.data)

    def post(self, request):
        if request.user.is_authenticated and request.user.role == 'Seller':
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                product = serializer.save()
                if product:
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Error": "Nie możesz dodawać produktu nie będąc zalogowanym jako Sprzedawca"}, status=status.HTTP_400_BAD_REQUEST)


class CategoriesList(APIView):
    serializer_class = ProductCategoriesSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = ProductCategory.objects.all()
        serializer = ProductCategoriesSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductCategoriesSerializer(data=request.data)
        if serializer.is_valid():
            category = serializer.save()
            if category:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetails(APIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get(self, request, pk):
        queryset = Product.objects.filter(_id=pk)
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({"Error": "Produkt nie istnieje"}, status=status.HTTP_400_BAD_REQUEST)
        if not request.user.is_authenticated and request.user.id != product.added_by:
            return Response({"Error": "Nie możesz edytować produktu nie będąc zalogowanym jako Sprzedawca oraz nie będąc jego właścicielem"},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            product = serializer.save()
            if product:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({"Error": "Produkt nie istnieje"}, status=status.HTTP_400_BAD_REQUEST)
        if not request.user.is_authenticated and request.user.id != product.added_by:
            return Response({"Error": "Nie możesz usunąć produktu nie będąc zalogowanym jako Sprzedawca oraz nie będąc jego właścicielem"},
                            status=status.HTTP_400_BAD_REQUEST)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)