# Minimaly

## Features
Minimaly is an eleventy starter with :  
- Design tokens so you can brand it as you wish (color, sizes ...)
- Eleventy data for all metas, cover and post display (grid, list, cover background ...)
- Custom navigation
- Blog ready with markdown post
- RSS feed
- Service workers for offline reading
- Accessibility (Any advise will help ! Still learning)

It is inspired by [Hylia starter](https://github.com/hankchizljaw/hylia) by [Andy Bell](https://hankchizljaw.com/) except that i didn't plug any CMS. Andy Bell starter helped me a lot, especially to discover design tokens. Also i highly recommand to read and buy [Every layout](https://absolutely.every-layout.dev/) wrote by him and [Heydon Pickering](http://www.heydonworks.com/). It helped me a lot to implement a better css structure and understand some basics stuff.  

I wrote [a post](https://lea-tortay.com/journal/eleventy-starter-guide/) about how i have done this starter.

It is for simple markdown blog use only. Event if, once installed, you can do what you want with it !
Look at [Eleventy doc](https://www.11ty.io/) cause it is super powerfull. 

### 1 . Get the starter
`git clone` the repo

### 2 . Install it
Once cloned, `cd minimaly` then `npm install` to install all the dependencies. 

### 3 . UI settings
You can then modify `token.json` in `src/_data` folder to change the color, font family, breakpoints ... It will automatically generate a `_tokens.scss` in `scss/settings` folder, do not change directly this file since it's automated, always modify `token.json`.

### 4. Theme options
You can also change any data in `src/_data/site.json` 
Display posts as list `showAsGrid: false`
If you don't want your post to have thumbnail change `postWithImage: false`
If there is a cover title it will display the cover hero. You can choose cover text alignement just change `coverTextAlignement: "center"` (left, center, right);
How many posts are render on homepage `maxPostsPerPage: 6`
Customize your navigation `navItems`

### 4 . Run in the browser
You can run `npm run serve` and go to `localhost:8080` adress in your browser to check the result.


