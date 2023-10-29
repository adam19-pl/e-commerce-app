from rest_framework import pagination
from rest_framework.response import Response


class CustomPageNumberPagination(pagination.PageNumberPagination):
    page_size=20
    page_size_query_param = 'count'
    max_page_size = 5
    page_query_param = 'p'

    def get_paginated_response(self, data=None, user_role=None):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'page_size' : 15,
            'role': user_role,
            'results': data
        })