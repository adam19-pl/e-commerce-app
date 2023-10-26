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
    permission_classes = [AllowAny]

    def get(self, request):
        import pdb;pdb.set_trace()
        queryset = Product.objects.all()
        results = self.paginate_queryset(queryset, request, view=self)
        serializer = ProductSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)
        # return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            product = serializer.save()
            if product:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        queryset = Product.objects.filter(id=pk)
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        try:
            book_object = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({"Error": "Book not exist"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ProductSerializer(book_object, data=request.data)
        if request.data['borrowed_by']:
            try:
                user = CustomUser.objects.get(email=request.data['borrowed_by'])
            except CustomUser.DoesNotExist:
                return Response({"Error": "User not exist"}, status=status.HTTP_400_BAD_REQUEST)
            request.data['borrowed_by'] = user.email
        if serializer.is_valid():
            if request.data['status'] in (0, 1):
                book = serializer.save()
                if book:
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)