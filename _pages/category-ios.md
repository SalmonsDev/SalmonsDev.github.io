---
title: "iOS"
layout: archive
permalink: /ios/
author_profile: true
---
{% include group-by-array collection=site.posts field="categories" %}
{% for category in group_names %}
  {% if category == 'iOS' %}
  {% assign posts = group_items[forloop.index0] %}  
   {% for post in posts %}
     {% include archive-single.html %}
   {% endfor %}
  {% endif %}
{% endfor %}
