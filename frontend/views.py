from django.shortcuts import render

def index(request,*args,**kwargs):
    try:
        return render(request,'build\index.html')
    except FileNotFoundError:
        return "production build of react app not found(Index file missing)"