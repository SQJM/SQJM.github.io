/**
 * @name ThisBlog Init File
 * @description 初始化
 * @author Wang Jia Ming
 * @createDate 2024-10-18
 */
'use strict';
( () => {
	console.log( "%cThis Blog (◕ᴗ◕)", "color:#85b7ff;font-weight:bold;font-size:6em;padding:10px 30px;"
	.concat( "background: linear-gradient(to right top,oklab(58.2% -0.04 -0.21),oklab(58.2% -0.376 -0.21));" ) );

	document.querySelectorAll( "[data-src]" ).forEach( element => {
		element.setAttribute( "src", element.getAttribute( "data-src" ) );
		element.removeAttribute( "data-src" );
	} );
	document.querySelectorAll( "[data-href]" ).forEach( element => {
		element.setAttribute( "href", element.getAttribute( "data-href" ) );
		element.removeAttribute( "data-href" );
	} );

	window.addEventListener( "resize", TB.Page.adaptive );
	window.addEventListener( "message", TB.WindowMessage.articleMessage );

	{
		TB.BasicElement[ "tb-app-content-article-list-paging-numbers" ].addEventListener( "click", event => {
			const target = event.target;
			if ( target.parentNode !== TB.BasicElement[ "tb-app-content-article-list-paging-numbers" ] ) return;
			const n = parseInt( target.textContent );
			TB.ArticleListPaging.load( n );
		} );
	}

	{
		TB.Page.render();
		TB.Page.adaptive();
		TB.Page.refreshArticleList();
		TB.ArticleListPaging.renderBar();
	}
} )();
