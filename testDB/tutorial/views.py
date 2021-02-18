from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from tutorial.models import Tutorial
from tutorial.serializers import TutorialSerializers
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def tutorial_list(request):
    if (request.method == 'GET'):
        tutorial = Tutorial.objects.all()

        title = request.GET.get('title', None)
        if title is not None:
            tutorial = tutorial.filter(title__icontains=title)

        tutorials_serializer = TutorialSerializers(tutorial, many=True)
        return JsonResponse(tutorials_serializer.data, safe=False)

    elif (request.method == 'POST'):
        tutorial_data = JSONParser().parse(request)
        tutorial_serializer = TutorialSerializers(data=tutorial_data)
        if tutorial_serializer.is_valid():
            tutorial_serializer.save()
            return JsonResponse(tutorial_serializer.data,
                                status=status.HTTP_201_CREATED)
        return JsonResponse(tutorial_serializer.erros,
                            status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        count = Tutorial.objects.all().delete()
        return JsonResponse(
            {
                'message':
                '{} Tutorials were deleted succesfully!'.format(count[0])
            },
            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def tutorial_detail(request, pk):
    #find tutorial by pk (id)
    try:
        tutorial = Tutorial.objects.get(pk=pk)
    except Tutorial.DoesNotExist:
        return JsonResponse({'message': 'The tutorial does not exist'},
                            status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        tutorial_serializer = TutorialSerializers(tutorial)
        return JsonResponse(tutorial_serializer.data)

    elif request.method == 'PUT':
        tutorial_data = JSONParser().parse(request)
        tutorial_serializer = TutorialSerializers(tutorial, data=tutorial_data)
        if tutorial_serializer.is_valid():
            tutorial_serializer.save()
            return JsonResponse(tutorial_serializer.data)
        return JsonResponse(tutorial_serializer.erros,
                            status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        tutorial.delete()
        return JsonResponse({'message': 'Tutorial was deleted successfully!!'},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def tutorial_list_published(request):
    tutorials = Tutorial.objects.filter(published=True)

    if request.method == 'GET':
        tutorials_serializer = TutorialSerializers(tutorials, many=True)
        return JsonResponse(tutorials_serializer.data, safe=False)