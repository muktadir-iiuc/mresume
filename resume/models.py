from django.db import models


class MenuList(models.Model):
    MenuName = models.CharField(max_length=200)
    MenuText = models.CharField(max_length=200)
    IsActive = models.IntegerField(default=1)

    def __str__(self):
        return self.MenuName


class ProfileInfo(models.Model):
    Name = models.CharField(max_length=200)
    Title = models.CharField(max_length=2000)
    ImgLoc = models.CharField(max_length=500)
    CVLink = models.CharField(max_length=500)
    Goals = models.CharField(max_length=5000)

    def __str__(self):
        return self.Name


class SocialSiteInfo(models.Model):
    ProfileInfo = models.ForeignKey(ProfileInfo, on_delete=models.CASCADE)
    Name = models.CharField(max_length=200)
    Link = models.CharField(max_length=500)

    def __str__(self):
        return self.Name


class BasicInfo(models.Model):
    ProfileInfo = models.ForeignKey(ProfileInfo, on_delete=models.CASCADE)
    Age = models.CharField(max_length=200)
    Sex = models.CharField(max_length=20)
    DOB = models.DateTimeField('Date of Birth')
    Email = models.EmailField(max_length=200)
    Phone = models.CharField(max_length=200)
    Address = models.CharField(max_length=2500)
    Language = models.CharField(max_length=1500)
    SkypeId = models.CharField(max_length=50)

    def __str__(self):
        return self.Email


class SkillInfo(models.Model):
    ProfileInfo = models.ForeignKey(ProfileInfo, on_delete=models.CASCADE)
    SkillName = models.CharField(max_length=500)
    SkillPercentage = models.CharField(max_length=100)

    def __str__(self):
        return self.SkillName


class PortfolioCategory(models.Model):
    Name = models.CharField(max_length=200)

    def __str__(self):
        return self.Name


class PortfolioInfo(models.Model):
    ProfileInfo = models.ForeignKey(ProfileInfo, on_delete=models.CASCADE)
    PortfolioCategory = models.ForeignKey(PortfolioCategory, on_delete=models.CASCADE)
    Name = models.CharField(max_length=200)
    ImgLoc = models.CharField(max_length=500)

    def __str__(self):
        return self.Name


class ExperienceInfo(models.Model):
    ProfileInfo = models.ForeignKey(ProfileInfo, on_delete=models.CASCADE)
    Period = models.CharField(max_length=200)
    CompanyName = models.CharField(max_length=200)
    Position = models.CharField(max_length=200)
    Details = models.CharField(max_length=2000)

    def __str__(self):
        return self.CompanyName


class EducationInfo(models.Model):
    ProfileInfo = models.ForeignKey(ProfileInfo, on_delete=models.CASCADE)
    Period = models.CharField(max_length=200)
    DegreeLevel = models.CharField(max_length=200)
    DegreeName = models.CharField(max_length=200)
    UniversityName = models.CharField(max_length=200)
    Details = models.CharField(max_length=2000)

    def __str__(self):
        return self.DegreeLevel


class RefrenceInfo(models.Model):
    ProfileInfo = models.ForeignKey(ProfileInfo, on_delete=models.CASCADE)
    RefreeName = models.CharField(max_length=200)
    RefreePost = models.CharField(max_length=200)
    RefreeCompany = models.CharField(max_length=500)
    Details = models.CharField(max_length=2000)

    def __str__(self):
        return self.RefreeName


class ContactInfo(models.Model):
    Name = models.CharField(max_length=200)
    Subject = models.CharField(max_length=500)
    Sender = models.EmailField(max_length=150)
    Message = models.CharField(max_length=5000)

    def __str__(self):
        return self.Name
