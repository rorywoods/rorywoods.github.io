---
title: "EF5 Exception: Properties in a referential constraint must be of the same type"
author: rory woods
date: 2012-12-27 15:00:00
layout: post
categories: 
- entity framework
- sql
---

Working with a reverse-engineered code first model threw this EdmAssociationConstraint exception

> The types of all properties in the Dependent Role of a referential
> constraint must be the same as the corresponding property types in the
> Principal Role.

The usual Google/StackOverflow dance netted no results that addressed my issue. Finally, this [MSDN article][1] clued me in. I had composite foreign keys. The EF power tool I used to reverse engineer the model created an entity with a composite primary key that looked like this:
  
    modelBuilder.Entity<Order>().HasKey(o => new { o.OrderType, o.OrderId });

but the dependent entity established the relationship like this:

    modelBuilder.Entity<OrderLine>()
    .HasRequired(ol => ol.Order)
    .WithMany(o => o.OrderLines)
    .HasForeignKey(ol => new { ol.OrderId, ol.OrderType });

Note the different ordering of properties in defining the primary key vs. the foreign key. This is probably because they are defined as such in SQL. But the change in ordering will result in the exception above. The simple fix is to change the ordering of the foreign key to match the primary key order.

  [1]: http://msdn.microsoft.com/en-us/data/jj591620
