from rest_framework import serializers
from tutorial.models import Tutorial


class TutorialSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tutorial
        fields = (
            'id',
            'title',
            'description',
            'published',
        )