class AsciidocSlidesConverter < (Asciidoctor::Converter.for 'html5')
  register_for 'html5'

  def convert_section node
    doc_attrs = node.document.attributes
    level = node.level
    title = node.title

    if node.id
      id_attr = %( id="#{id = node.id}")
      if doc_attrs['sectlinks']
        title = %(<a class="link" href="##{id}">#{title}</a>)
      end
      if doc_attrs['sectanchors']
        # QUESTION should we add a font-based icon in anchor if icons=font?
        if doc_attrs['sectanchors'] == 'after'
          title = %(#{title}<a class="anchor" href="##{id}"></a>)
        else
          title = %(<a class="anchor" href="##{id}"></a>#{title})
        end
      end
    else
      id_attr = ''
    end
    if level == 0
      %(<h1 class="sect0#{(role = node.role) ? " #{role}" : ''}">#{title}</h1>
      #{node.content})
    else
      %(<section#{id_attr} class="sect#{level}#{(role = node.role) ? " #{role}" : ''}">
<h#{level + 1}>#{title}</h#{level + 1}>
      #{level == 1 ? %[<section class="sectionbody">
      #{node.content}
</section>] : node.content}<span class="page-number">#{node.sectnum nil}<span>
</section>)
      end
  end
end
