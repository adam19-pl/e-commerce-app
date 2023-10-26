from rest_framework import serializers

from e_commerce.models import Product, ProductCategory, CustomUser


class ChoicesField(serializers.Field):
    def __init__(self, choices, **kwargs):
        self._choices = choices
        super(ChoicesField, self).__init__(**kwargs)

    def to_representation(self, obj):
        return self._choices[obj]

    def to_internal_value(self, data):
        return getattr(self._choices, data)


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(max_length=64, min_length=6, write_only=True)
    firstname = serializers.CharField(max_length=256, min_length=2)
    email = serializers.EmailField(max_length=256, min_length=4)
    # role = ChoicesField(choices=NewUser.ROLES, default=NewUser.ROLES)
    role = serializers.ChoiceField(choices=CustomUser.ROLES, default=CustomUser.ROLES)

    class Meta:
        model = CustomUser
        fields = ['password', 'firstname', 'email', 'role']

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['_id', 'name', 'description', 'added_by','price', 'category', 'quantity', 'image', 'add_date']
        added_by = serializers.ReadOnlyField()


class ProductDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['description',]


class ProductCategoriesSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductCategory
        fields = ['_id', 'name']
        added_by = serializers.ReadOnlyField()