---
title: "Trailing spaces in key value results in null Entity Framework relationship"
author: rory woods
date: 2013-01-10 15:00:00
layout: post
categories: 
- entity framework
- sql
---

One related entity in my beautiful Entity Framework 5 code first domain model wouldn't hydrate. The relationship was correctly set:

    this.HasOptional(t => t.DistributorBrand)
    .WithMany(t => t.BrandQuotes)
    .HasForeignKey(d => d.DistributorBrandKey);

The foreign key had a value that existed in the database. SQL Profiler showed the eager loaded values were being returned for the relationship. But the related entity was consistently null. 

The culprit was trailing spaces in the primary key value. SQL Server pads strings to equal length when comparing for queries or joins. However, EF must double-check the key before creating the related entity and decided these values SQL Server returned were not a match. A quick RTRIM later all was well.
