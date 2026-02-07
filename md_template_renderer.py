import pypandoc

# Convert Markdown to HTML

# output = pypandoc.convert_file('somefile.md', 'rst')
# output = pypandoc.convert_file('somefile.txt', 'rst', format='md')
# latex_intermediate = pypandoc.convert_text(output, 'latex', format='markdown')

final_html_output = pypandoc.convert_file('./testing.md', 'html', format='md') 

with open('./testing.html', 'w') as file:
    file.write(final_html_output)