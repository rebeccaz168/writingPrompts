import re

# helper function to extract actual prompt sections 
def extract_prompt_sections(text):
    print("hello i'm in the extract prompts section", text)
    prompt_sections = {}
    
    # Match all bold headings
    matches = re.finditer(r'\*\*(.*?)\*\*', text)
    headings = [match.group(1) for match in matches]
    
    # Extract text under each heading
    for i, heading in enumerate(headings):
        start = text.find(f"**{heading}**") + len(heading) + 4
        end = text.find(f"**{headings[i + 1]}**") if i + 1 < len(headings) else len(text)
        content = text[start:end].strip()
        prompt_sections[heading] = content
    print("here after processing", prompt_sections)
    return prompt_sections
