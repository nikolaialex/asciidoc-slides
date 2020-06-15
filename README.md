# Asciidoc-Slides
Create HTML slides with Asciidoc.

## Example
https://nikolaialex.github.io/asciidoc-slides-site


## Prerequisites
```bash
gem install asciidoctor rouge
```

## Slide Generation
```bash
$ asciidoctor -r ./dist/lib/asciidoc_slides_converter.rb getting_started.adoc
```

## Shortcuts
Hit the **h** key to show the shortcuts.

## Important files
* docinfo.html
* docinfo-footer.html
* asciidoc_slides_converter

## Layer
* 2: Footer
* 1: Current slide
* 0: Default level for slides

## Architecture decision
* Minimal JS
* Core functionality with HTML and CSS.