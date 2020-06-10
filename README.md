# Asciidoc-Slides
Create HTML slides with Asciidoc. You can write your sl

## Important files
* docinfo.html
* docinfo-footer.html
* asciidoc_slides_converter

## Shortcuts 

## Prerequisits

## HTML Generation
```bash
$ asciidoctor -r .lib/asciidoc_slides_converter.rb slides.adoc
```
## Presentation Mode

## Asciidoc Configuration

```Asciidoc
= Your Title
:toc:
:docinfodir: docinfo
:docinfo: shared
:imagesdir: images
:stylesheet!:
:linkcss:
:nofooter:
```

## Features
