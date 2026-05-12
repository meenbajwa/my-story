from PIL import Image, ImageDraw, ImageFont

# Create a blank white image
img = Image.new('RGB', (1200, 300), color=(255, 255, 255))
draw = ImageDraw.Draw(img)

# Try to use a standard font
try:
    font_bold = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 28, index=1)
    font_regular = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
    font_title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 32, index=1)
except IOError:
    font_bold = ImageFont.load_default()
    font_regular = ImageFont.load_default()
    font_title = ImageFont.load_default()

# Draw a table-like structure
draw.rectangle([0, 0, 1200, 60], fill="#e87c24") # Orange header like the website
draw.text((20, 15), "ICAISI 2025", fill="white", font=font_title)

# Draw row
draw.rectangle([0, 60, 1200, 300], fill="#f9f9f9")
draw.line([0, 60, 1200, 60], fill="#dddddd", width=2)
draw.line([0, 298, 1200, 298], fill="#dddddd", width=2)

# Columns
draw.line([100, 60, 100, 300], fill="#dddddd", width=2)
draw.line([200, 60, 200, 300], fill="#dddddd", width=2)

draw.text((30, 150), "269", fill="black", font=font_regular)
draw.text((120, 150), "1698", fill="black", font=font_bold)

title_text = "Machine Learning Based Method for Leaf-Based Disease\nDetection in Potato – ResNet50"
draw.text((220, 130), title_text, fill="black", font=font_bold)

authors_text = "Dr. Kamaljit Kaur, Jasmeen Kaur, Karanbir Singh"
draw.text((220, 210), authors_text, fill="#444444", font=font_regular)

# Save
img.save('paper.png')
print("paper.png created successfully!")
