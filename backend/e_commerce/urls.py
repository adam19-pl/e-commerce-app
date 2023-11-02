from django.urls import path
from e_commerce import views

urlpatterns = [
    path('products/', views.ProductsList.as_view(), name='products'),
    path('products/(?P<filter>.+?P<value>.+?)/$', views.ProductsList.as_view(), name='SearchProducts'),
    path('categories/', views.CategoriesList.as_view()),
    path('products/<int:pk>/', views.ProductDetails.as_view()),
    path('order/', views.ProductDetails.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('logout/blacklist/', views.BlackListTokenView.as_view(), name='blacklist')
]