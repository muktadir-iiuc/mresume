from django.shortcuts import render
from django.conf import settings
from .models import ProfileInfo, MenuList, BasicInfo, SkillInfo, ExperienceInfo, EducationInfo, RefrenceInfo, SocialSiteInfo
from django.core.mail import send_mail
from resume.forms import ContactForm


def index(request):
    profile = ProfileInfo.objects.get(id=1)
    menulist = MenuList.objects.all()
    basicinfo = BasicInfo.objects.get(ProfileInfo_id=1)
    skillset = SkillInfo.objects.filter(ProfileInfo_id=1).only("SkillName", "SkillPercentage")
    expset = ExperienceInfo.objects.filter(ProfileInfo_id=1)
    eduset = EducationInfo.objects.filter(ProfileInfo_id=1)
    refset = RefrenceInfo.objects.filter(ProfileInfo_id=1)
    sociallinkset = SocialSiteInfo.objects.filter(ProfileInfo_id=1)

    if request.method == 'POST':
        form = ContactForm(request.POST)

        if form.is_valid():
            subject = form.cleaned_data['Subject']
            message = form.cleaned_data['Message']
            sender = form.cleaned_data['Sender']
            name = form.cleaned_data['Name']
            recipients = ['muktadir.iiuc@gmail.com']

            send_mail(name + ' [' + sender + ']', message, sender, recipients, fail_silently=False)
    else:
        form = ContactForm()

    context = {
        'profile': profile,
        'menulist': menulist,
        'basicinfo': basicinfo,
        'skillset': skillset,
        'expset': expset,
        'eduset': eduset,
        'refset': refset,
        'form': form,
        'sociallinkset': sociallinkset,
    }

    return render(request, 'resume/index.html', context)
