# The Complete 2021 Web Development Bootcamp by Angela Yu

## Section 2: Intro HTML

## Section 3: Intermediate HTML

- Use `<em>` over `<i>` for "emphasis" (italics)
- Use `<strong>` over `<b>` for bold text
- Ordered list can have a "type" attribute -- like "i" for Roman Numeral
  - They can also have a "start" attribute -- like `start="7"` so the list starts number from 7
- Tables in HTML: `<table><tr><td>Item 1</td><td>Item 2</td></tr></table>`
  - Inside the table, we have Table Row(s) and Table Data(s)
- Table header: `<thead>` Define an item inside of a row by defining it within a table row <tr> and <t>
- Table footer: `<tfoot>`
- Table body: `<tbody>`
- In a Form element, you can specify the "action" attribute to send an email (instead of redirecting back to your homage page, for example):
  - `<form action="mailto:rubywep@hotmail.com" method="post">`
- To have a "Contact Me" form actually work using the mailto action, you also specify an encoding type on the form:
  - `<form enctype="type/plain">`
  - Furthemore, your `<input>` tags (for Email, Message, Name, etc) must have their name attributes set up properly:
  - `<input type="email" name="yourEmail">` etc
  - Then when the form is submitted, you'll get this in teh body of the email:
    - `yourName=Matth yourEmail=rubywep@hotmail.com yourMessage=Hello`
  - For real Forms, you'll want to use Javascript to manipulate teh values associated with each name property, and do something more complex with them than write them in the email body like above

## Section 4: Intro to CSS

-Can incorporate Styling 3 different ways: 1) Inline styling. 2) Internal styling. 3) External styling (css files)

- 1. Inline: `<body style="background-color: blue;">`
- 2. Internal: `<style> body { background-color: blue; } </style>`
- 3. External: Inside the `<head>` tag: `<link rel="stylesheet" href="/css/styles.css">` The rel attribute stands for "relationship"! Can also add an optional type="text/css" -- but this is not required. **If an href starts out with a forward-slash, it means start out in the root of your website. When you have a static web file that isn't hosted anywhere, you cannot tap into the root!**
- Precedence: Inline styling gets highest precedence, then internal, then external.
- Best Practice for CSS: Have all your properties in alphabetical order if you have a lot?!
- Try to change CSS elements via their ID sparingly.

## Section 5: Intermediate CSS

- The icon in the tab beside your website name is called a favicon, or favorite icon. To display one, do so via a link tag in the head of the HTML file: `<link rel="icon" href="favicon.ico">`
- Div: content division element
- Display property: Can be 1) Block 2) Inline 3) Inline-Block 4) None
- By default, elements such as Paragraphs, Headers, Divisions, Lists and List Items, and Forms are Block elements -- they take up the entire line of a screen.
- A span element does not take up its own block -- it is an inline display element. It only takes up as much space as it needs to. Common Inline display elements are: Spans, Images, and Anchors.
- **Cannot change the width property of Inline elements!**
- What to do if you want elements that can occupy the same line AND also set the width of? Use inline-block for the display property! This is KIND OF what Image elements are like (they are inline but we can set their width and height)
- Display of "none" removes it from the document -- as if it never existed in the first place! Or you can set the "visibility" attribute on an element to "hidden" to simply make the content hidden, but the space it consumes on the document will be preserved.
- Three rules for default positioning in HTML: 1) Content is everything - inline elements take up as much space as their content dictates, block elements take up the full line but their height is determined by their content. 2) Order comes from code -- e.g, the order you write elements in the HTML will determine their order on the page. 3) Children sit on parents -- e.g, elements inside of other elements get drawn on top of their parent.
- To make changes to these default positioning rules, we can use the position property, which can take the following values: 1) Static 2) Relative 3) Absolute 4) Fixed (and others)
- 1. Static: Go along with the the HTML rules and keep to the default HTML flow.
- 2. Relative: Position the element relative to how it would have been positioned had it been Static. Example. position: relative; left: 30px; will push the element 30px more to the right than where it would normally be. This will not push other elements out of their default positioning -- it's as if the old (Static) position of this now Relative positioned element was kept, and everything else just flows around it as if it was never moved. (It's like the element left a ghost of itself where it used to be in order for the other elements to retain their positions!) Can be confusing, but saying left: 100px means give its LEFT MARGIN 100px extra from what it used to be, so this pushes the element RIGHT. right: 100px means give its old position a margin-right of 100px, which will push this element 100px LEFT.
- 3. Absolute: Position the element relative to its parent element. So now right: 30px means adding a margin-right from the parent and our Absolute positioned element. Name can be confusing (since it's RELATIVE positioning) but in most cases the parent is probably the entire body of the webpage , so the positioning LOOKS like you're giving it a margin relative to the entire page, which looks like you're changing the absolute position of it. Note: Doesn't always have to be the body; if not, it is the closest parent with a relative display! So basically: It's like Relative positioning, but instead of relative to itself, it's relative to its parent! **Key difference: You're taking the element out of the flow of the document, so elements around it will be affected!**
- 4. Fixed: Element will stay in that position, even when scrolling.
- Text-align: center can center everything in a parent div as long as it doesn't have a width. If it has a width, you can use margin: auto to center.
- Specifying 100% for font-size is the same as 16px; This is the same as specifying 1em.
- Float property -- lets you have an image (or other div?) "float" beside another element instead of being on their own block. Can do float: left to have the image wrap to the left side of neighboring elements (those in the same div, or if or block), or float: right to have it wrap on the right side. If you don't want one of the elements that is currently wrapping around the floated element, you can specify its "clear" property along with the side you wish to "clear" from floating, such as "left" or "right" in the above case. Use of Float and Clear seem to be outdated. Only use Float for wrapping text around elements, not for positioning!
- **TODO: Go back to video 60 for styling the personal site solution**

## Section 8: Design School

- Three Pillars of Web Design: 1) Color Theory. 2) Typography. 3) User Interface Design. 4) User Experience Design
- 1st Pillar: Color Theory: Moods established by colors: Red: Love, Energy, Intensity. Yellow: Joy, Intellect, Attention. Green: Freshness, Safety, Growth. Blue: Stability, Trust, Serenity. Purple: Royalty, Wealth, Femininity.
- Combining Colors: Analogous colors -- colors beside each other on the color wheel. Create palettes that are harmonious and work well together. Good for navigation bar and the body of your website, or a logo and its background. Not good for standing out, though!
- Combining Colors: Complementary colors -- colors on opposite ends from one another on the color wheel. This helps elements really stand out! It creates a pop and brings out each of the colors. DO NOT try to style text and text background with complementary colors -- very jarring.
- Combining Colors: Triadic color palette -- found by creating an equatorial triangle that points to 3 colors. Drawing a perfect square is yet another type of color palette.
- 2nd Pillar: Typography: Sans-serif and Serifs are the main two font families. With serif, you're conveying a more serious, more authoritative, and also a bit older appearance. However, sub-categories of Serif can give it a more modern touch, especially those classified in the "Modern" sub-category, such as Didot.
- The Emotion Behind Fonts: 1) Serif: Traditional, Stable, Respectable. 2) Sans-serif: Sensible, Simple, Straightforward. 3) Script: Personal, Creative, Elegant. 4) Display: Friendly, Loud, Amusing. 5) Modern: Stylish, Chic, and Smart.
- For Readability: You want open shapes, ample inter-character spacing, unambiguous forms, and varying proportion (for eg to tell difference between O and 0).
- Stick to just 2 fonts for one design!
- Find fonts with similar mood and time era. If you want to contrast finds, you can have one font by a serif and one by a sans-serif -- this can create more interest in your design. You can also create interest by changing up the weights between the heading and the body.
- 3rd Pillar: User Interface Design: 1) Create Hierarchy (where the eyes should go first -- preferably the most important information). We can do this through the use of Color. Also can do this through Size. 2) Layout. The sweet spot for characters per line is 30-40 and ~6 words per line. Good layout is interesting and chops the content into smaller pieces so that you actually get through more of the website and you take more of it in. 3) Alignment. This is the position of elements on the screen relative to each other. Try to REDUCE the number of alignment points! 4) White Space. This is the empty space that's around text or around elements. Adding ample whitespace can make a more minimalist, elevated design. 5) Audience. Design for your audience! What would appeal to them? What should you convey to them?
- 4th Pillar: User Experience. Think about five things: 1) Simplicity: Always aim for a less complex design. 2) Consistency: Keep the design consistent, but also the functionality. 3) Reading Patterns: One of the most common reading patterns is called the F-pattern, where the eye starts at the top left corner and then tracks right and then it flips back again browsing down the left gutter. Have the most important part of your layout on the left gutter, have the logo at the top and have everything follow this F pattern. Another common pattern for reading is the Z-pattern: Eyes go from left to right and then zigzagging down all the way of the site. 4) All Platform Design: Think about mobile, tablets, etc! 5) Don't Use your Powers For Evil: "Dark Patterns" -- getting the user to perform an action or behavior that is beneficial to the company or designer but not necessarily what the user wants. Example: Getting them to pay for faster (more expensive) shipping by making that option the more prominent one.

## Section 9: Intro to JS (ES6)

## Section 10: Intermediate JS

- Math.random() returns a decimal with 16 decimal places.
