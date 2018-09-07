from django.contrib import admin
from django.urls import include, path

admin.site.site_header = 'Website Admin Panel'
admin.site.site_title = 'Muktadir CV Admin Panel'
admin.site.index_title = 'Muktadir CV'
urlpatterns = [
    path('resume/', include('resume.urls')),
    path('admin/', admin.site.urls),
]
