---
title: Windows Authentication on subfolder of WIF Site
author: rory woods
layout: post
---

As part of a large Identity and Access Management project I moved an existing ASP.NET WebForms application to WIF and claims. All went well until we realized the site also hosted WCF web services that depended on Windows authentication. After hours of web.config and IIS experimentation I discovered a way to make this work.

f