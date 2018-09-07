from django import forms
from .models import ContactInfo


class ContactForm(forms.Form):
    Name = forms.CharField(max_length=200, required=True, widget=forms.TextInput(attrs={'class': "form-control", 'placeholder': 'Name'}))
    Subject = forms.CharField(max_length=500, required=True, widget=forms.TextInput(attrs={'class': "form-control", 'placeholder': 'Subject'}))
    Sender = forms.EmailField(max_length=500, required=True, widget=forms.TextInput(attrs={'class': "form-control", 'placeholder': 'E-mail'}))
    Message = forms.CharField(required=True, widget=forms.Textarea(attrs={'class': "form-control", 'placeholder': 'Your Message', 'rows': 3}))


class ContactFrm(forms.Form):
    class Meta:
        model = ContactInfo
        fields = ('Name', 'Subject', 'Sender', 'Message')
        label = {'Name': 'Name', }
