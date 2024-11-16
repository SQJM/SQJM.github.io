/**
 * @name ThisBlog Article Js File
 * @description 文章引入文件
 * @author Wang Jia Ming
 * @createDate 2024-11-01
 */
'use strict';

function send( data = {} ) {
	const json = `{"ARTICLE":${ JSON.stringify( data ) }}`;
	window.parent.postMessage( JSON.stringify( JSON.parse( json ) ), '*' );
}

(() => {
	const style = document.createElement( "style" );
	style.id = "article-style";
	style.setAttribute( "type", "text/css" );
	style.textContent = `\
html {

}

body {
   opacity: 0;
   animation: start 0.5s forwards;
   overflow-x: hidden;
}

img {
   width: 100%;
}

@keyframes start {
    to {
        opacity: 1;
    }
}

@keyframes loading {
    0% {
        background-color: #fff;
    }
    50% {
        background-color: #b3b3b3;
    }
    100% {
        background-color: #fff;
    }
}

.article-info {
    display: flex;
    align-items: center;
    gap: 20px;
}

.article-content {
    margin-top: 20px;
    margin-bottom: 35px;
    border-radius: 6px;
    background-color: #ebebeb;
    padding: 10px;
}

.article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.article-tags > .item {
    text-wrap: nowrap;
    border-radius: 6px;
    background-color: #ebebeb;
    padding: 3px 6px 3px 6px;
}\
`;
	document.body.appendChild( style );

	document.body.style.animation = "loading 2s infinite linear";
})();

window.addEventListener( "load", () => {
	send( {
		height: document.body.getClientRects().item( 0 ).height
	} );
	document.body.style.animation = null;
} );

document.addEventListener( "load", () => {
	console.log( document.body.getClientRects().item( 0 ).height )
	send( {
		height: document.body.getClientRects().item( 0 ).height
	} );
	document.body.style.animation = null;
} );

window.addEventListener( "message", ( event ) => {
	const data = event.data;
	console.log( data )
} );