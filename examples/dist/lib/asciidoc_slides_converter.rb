class SlidezzzConverter < (Asciidoctor::Converter.for 'html5')
  register_for 'html5'

  def convert_section node
    doc_attrs = node.document.attributes
    level = node.level
    if node.caption
      title = node.captioned_title
    elsif node.numbered && level <= (doc_attrs['sectnumlevels'] || 3).to_i
      if level < 2 && node.document.doctype == 'book'
        if node.sectname == 'chapter'
          title = %(#{(signifier = doc_attrs['chapter-signifier']) ? "#{signifier} " : ''}#{node.sectnum} #{node.title})
        elsif node.sectname == 'part'
          title = %(#{(signifier = doc_attrs['part-signifier']) ? "#{signifier} " : ''}#{node.sectnum nil, ':'} #{node.title})
        else
          title = %(#{node.sectnum} #{node.title})
        end
      else
        title = %(#{node.sectnum} #{node.title})
      end
    else
      title = node.title
    end

		data_attributes = ""
		 node.attributes.each do |k,v|
			if k.to_s.start_with? "data-"
				data_attributes += "#{k}=\"#{v}\" "
			end
		end

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
      %(<section#{id_attr} class="sect#{level}#{(role = node.role) ? " #{role}" : ''}" #{data_attributes}>
<h#{level + 1}>#{title}</h#{level + 1}>
      #{level == 1 ? %[<section class="sectionbody">
      #{node.content}
</section>] : node.content}
</section>)
      end
  end
end
