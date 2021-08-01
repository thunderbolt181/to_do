from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie

@csrf_protect
@ensure_csrf_cookie
def index(request,*args,**kwargs):
    try:
        return render(request,'build\index.html')
    except FileNotFoundError:
        return "production build of react app not found(Index file missing)"

@csrf_protect
@ensure_csrf_cookie
def fakeloginview(request,*args,**kwargs):
    try:
        return render(request,'build\index.html')
    except FileNotFoundError:
        return "production build of react app not found(Index file missing)"