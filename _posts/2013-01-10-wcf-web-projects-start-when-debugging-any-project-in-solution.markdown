---
title: "WCF/Web projects start when debugging any project in solution"
author: rory woods
date: 2013-01-10 15:00:00
layout: post
categories: 
- entity framework
- sql
---

Sometimes it's the simple things. A common scenario is a Visual Studio solution with two Web Application projects, or a Web Application project and WCF project. While I often need to debug the primary web project, the other is rarely used. By default Visual Studio will start up both when debugging. I finally dug into this and found the easy (always is) solution.  


 1. Select the project in Visual Studio
 2. Press F4 to open the Project Properties
 3. Set "Always Start When Debugging" to False
 4. Rejoice


![enter image description here][1]


  [1]: /img/blog/start-debug.png