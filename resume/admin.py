from django.contrib import admin
from resume.models import ProfileInfo, MenuList, BasicInfo, SkillInfo, ExperienceInfo, EducationInfo, RefrenceInfo, SocialSiteInfo


@admin.register(ProfileInfo)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'Name', 'Title', 'Goals')
    list_display_links = ('id', 'Name')
    search_fields = ('Name', 'Title')
    list_per_page = 25


@admin.register(MenuList)
class MenuAdmin(admin.ModelAdmin):
    list_display = ('id', 'MenuText', 'MenuName', 'IsActive')
    list_display_links = ('id', 'MenuText')
    search_fields = ('MenuText', 'IsActive')
    list_per_page = 25

    """def is_active(self, obj):
        return obj.IsActive == 1

    is_active.boolean = True"""


class BasciInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'Email', 'Sex', 'Age', 'Phone', 'SkypeId', 'Address', 'Language')
    list_display_links = ('id', 'Email')
    search_fields = ('Sex', 'Email', 'Phone', 'SkypeId')
    list_per_page = 25


admin.site.register(BasicInfo, BasciInfoAdmin)


class SkillAdmin(admin.ModelAdmin):
    list_display = ('id', 'SkillName', 'SkillPercentage', 'ProfileInfo')
    list_display_links = ('id', 'SkillName', 'SkillPercentage', 'ProfileInfo')
    search_fields = ('SkillName', 'SkillPercentage')
    list_per_page = 25


admin.site.register(SkillInfo, SkillAdmin)


class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('id', 'CompanyName', 'ProfileInfo', 'Position', 'Period')
    list_display_links = ('id', 'CompanyName', 'ProfileInfo', 'Position', 'Period')
    search_fields = ('CompanyName', 'Position', 'Period')
    list_per_page = 25


admin.site.register(ExperienceInfo, ExperienceAdmin)


class EducationAdmin(admin.ModelAdmin):
    list_display = ('id', 'DegreeLevel', 'DegreeName', 'UniversityName', 'ProfileInfo', 'Period')
    list_display_links = ('id', 'DegreeLevel', 'ProfileInfo', 'DegreeName', 'Period', 'UniversityName')
    search_fields = ('DegreeLevel', 'DegreeName', 'Period', 'UniversityName')
    list_per_page = 25


admin.site.register(EducationInfo, EducationAdmin)


class RefAdmin(admin.ModelAdmin):
    list_display = ('id', 'RefreeName', 'RefreePost', 'RefreeCompany', 'ProfileInfo')
    list_display_links = ('id', 'RefreeName', 'RefreePost', 'RefreeCompany', 'ProfileInfo')
    search_fields = ('RefreeName', 'RefreePost', 'RefreeCompany')
    list_per_page = 25


admin.site.register(RefrenceInfo, RefAdmin)


@admin.register(SocialSiteInfo)
class SocialAdmin(admin.ModelAdmin):
    list_display = ('id', 'Name', 'Link', 'ProfileInfo')
    list_display_links = ('id', 'Name', 'Link', 'ProfileInfo')
    search_fields = ('Name', )
    list_per_page = 25
