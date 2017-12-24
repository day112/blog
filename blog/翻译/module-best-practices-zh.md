# [译] 模块化最佳实践

[原文地址](https://github.com/mattdesl/module-best-practices)

这是我为编写新的JavaScript模块而总结的一套“最佳实践”。本指南特别介绍npm上托管的前端和后端Node/CommonJS模块，这些概念也许也能应用于其他的地方。

## 目录

<!-- TOC depthFrom:2 -->

- [目录](#目录)
- [模块化基础](#模块化基础)

<!-- /TOC -->

## 模块化基础

一个“模块”只是一个可重用的代码块，抽象成一个对用户更加友好的API。

每个模块必须拥有一个非常明确的目的。
