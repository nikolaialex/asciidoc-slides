# Asciidoc-Slides
Create HTML slides with Asciidoc.

## Important files
* docinfo.html
* docinfo-footer.html
* asciidoc_slides_converter

## Shortcuts
Hit the h key to show the shortcuts.

## Prerequisits

## HTML Generation
```bash
$ asciidoctor -r ./dist/lib/asciidoc_slides_converter.rb getting_started.adoc
```
## Presentation Mode

## Features


## Layer

* 2: Footer
* 1: Current slide
* 0: Default level for slides

## Architecture decision
* Minimal JS
* Core functionality with HTML and CSS.