/**
 * @name ThisBlog Function File
 * @description 定义功能
 * @author Wang Jia Ming
 * @createDate 2024-10-18
 */
'use strict';

var ThisBlog_Data = {}, ThisBlog_ArticleListMetaData = null, ThisBlog_ArticleListMetaDataInfo = null, ThisBlog_CurrentPageIndex = 1;

const TB = (function () {
	const getClassName = str => {
		const result = document.getElementsByClassName( str );
		if ( result.length === 0 ) return null;
		const item = result.item( 0 );
		item.getClassName = function ( str ) {
			return item.getElementsByClassName( str ).item( 0 );
		};
		return item;
	};

	const BasicElement = { // "": getClassName(""),
		"tb-app-navigation-bar": getClassName( "tb-app-navigation-bar" ),
		"tb-app-main-view": getClassName( "tb-app-main-view" ),
		"tb-app-content-view": getClassName( "tb-app-content-view" ),
		"tb-app-content-article-list-view": getClassName( "tb-app-content-article-list-view" ),
		"tb-app-content-classify-view": getClassName( "tb-app-content-classify-view" ),
		"tb-app-content-tag-view": getClassName( "tb-app-content-tag-view" ),
		"tb-app-content-friend-link-view": getClassName( "tb-app-content-friend-link-view" ),
		"tb-app-content-about-view": getClassName( "tb-app-content-about-view" ),
		"tb-app-footer-view": getClassName( "tb-app-footer-view" ),
		"tb-app-content-article-list-paging": getClassName( "tb-app-content-article-list-paging" ),
		"tb-app-content-article-list-paging-numbers": getClassName( "tb-app-content-article-list-paging-numbers" ),
		"tb-app-content-article-list-content": getClassName( "tb-app-content-article-list-content" ),
		"tb-app-content-article-view": getClassName( "tb-app-content-article-view" ),
		"tb-app-content-article-iframe": getClassName( "tb-app-content-article-iframe" ),
		"tb-app-main-top-scroll-element": getClassName( "tb-app-main-top-scroll-element" )
	};

	// 页面
	class Page {
		// 滚动到顶部
		static scrollTop() {
			BasicElement["tb-app-main-top-scroll-element"].scrollIntoView( { behavior: "smooth" } );
		}

		// 显示选择的页面
		static select( pageName ) {
			const DrawerMenus = getClassName( "tb-app-drawer-menus" );
			if ( DrawerMenus ) document.body.removeChild( DrawerMenus );
			BasicElement["tb-app-main-view"].querySelectorAll( "[view]" ).forEach( element => element.classList.remove( "select" ) );
			BasicElement[`tb-app-content-${ pageName }-view`].classList.add( "select" );
			Page.scrollTop();
		}

		// 显示抽屉菜单
		static showDrawerMenus() {
			const DrawerMenus = document.createElement( "div" );
			DrawerMenus.classList.add( "tb-app-drawer-menus" );
			const Content = document.createElement( "div" );
			Content.classList.add( "tb-app-drawer-menus-content" );
			DrawerMenus.appendChild( Content );
			DrawerMenus.onmousedown = ( event ) => {
				if ( event.target === DrawerMenus ) document.body.removeChild( DrawerMenus );
			}
			const menus = BasicElement["tb-app-navigation-bar"].getClassName( "menus" ).cloneNode( true );
			Content.appendChild( menus );
			document.body.appendChild( DrawerMenus );
		}

		// 自适应页面
		static adaptive() {
		}

		// 显示指定文章
		static showArticle( id = "" ) {
			Page.select( "article" );
			BasicElement["tb-app-content-article-view"].style.height = "0px";
			const iframe = BasicElement["tb-app-content-article-iframe"];
			iframe.src = `./articles/${ id }/content.html`;
			//iframe.src = "about:blank";
		}

		// 刷新文章列表
		static refreshArticleList() {
			if ( ThisBlog_ArticleListMetaData && Array.isArray( ThisBlog_ArticleListMetaData ) ) {
				const list = BasicElement["tb-app-content-article-list-content"];
				list.innerHTML = null;
				ThisBlog_ArticleListMetaData.forEach( articleMeta => {
					const item = document.createElement( "div" );
					item.setAttribute( "article-id", articleMeta["_id"] );
					item.onclick = () => { Page.showArticle( articleMeta["_id"] ); }
					item.classList.add( "item" );
					item.innerHTML = `<span class="title">${ articleMeta["title"] }</span><p class="section"><span class="createDate">${ articleMeta["createDate"] }</span><span class="classify">${ articleMeta["classify"] }</span></p><div class="abstract">${ articleMeta["abstract"] }</div>`;
					list.appendChild( item );
				} );
			}
		}
	}

	// 文章列表
	class ArticleListPaging {
		static load( n = ThisBlog_CurrentPageIndex ) {
			document.getElementById( "includeArticleListMetaData" ).remove();
			const script = document.createElement( "script" );
			script.id = "includeArticleListMetaData";
			script.src = `./script/ArticleListMetaData_${ n }.js`;
			script.onload = () => {
				Page.refreshArticleList();
				Page.scrollTop();
				ArticleListPaging.renderBar();
			};
			document.body.appendChild( script );
		}

		// 上一页
		static up() {
			ThisBlog_CurrentPageIndex--;
			if ( ThisBlog_CurrentPageIndex < 1 ) {
				ThisBlog_CurrentPageIndex = 1;
			}
			ArticleListPaging.first();
		}

		// 下一页
		static down() {
			ThisBlog_CurrentPageIndex++;
			if ( ThisBlog_CurrentPageIndex > ThisBlog_ArticleListMetaDataInfo["size"] ) {
				ThisBlog_CurrentPageIndex = ThisBlog_ArticleListMetaDataInfo["size"];
			}
			ArticleListPaging.load();
		}

		// 首页
		static first() {
			ArticleListPaging.load( 1 );
		}

		// 渲染分页显示条
		static renderBar() {
			const bar = BasicElement["tb-app-content-article-list-paging-numbers"];
			bar.innerHTML = null;
			let i = ThisBlog_CurrentPageIndex;
			const getPaginationList = ( currentPage, totalPages, pageSize = 5 ) => {
				currentPage = Math.max( 1, Math.min( Math.floor( currentPage ), totalPages ) );
				let start = Math.max( 1, currentPage - Math.floor( (pageSize - 1) / 2 ) );
				let end = start + pageSize - 1;
				if ( end > totalPages ) {
					start = Math.max( 1, totalPages - pageSize + 1 );
					end = totalPages;
				}
				while ( start < 1 ) {
					start++;
					end++;
				}
				let paginationList = [];
				for ( let i = start; i <= end; i++ ) {
					paginationList.push( i );
				}
				return paginationList;
			}
			getPaginationList( i, ThisBlog_ArticleListMetaDataInfo["size"] ).forEach( i => {
				const item = document.createElement( "li" );
				if ( i === ThisBlog_CurrentPageIndex ) item.classList.add( "select" );
				item.textContent = i.toString();
				bar.appendChild( item );
			} );
		}
	}

	// 处理窗口信息
	class WindowMessage {
		static ARTICLE( data ) {
			BasicElement["tb-app-content-article-view"].style.height = `${ data["height"] + 50 }px`;
		}

		// 处理文章页面消息
		static articleMessage( event ) {
			const json = JSON.parse( event.data );
			json["ARTICLE"] && WindowMessage.ARTICLE( json["ARTICLE"] );
		}
	}

	// 筛选
	class filtrate {
		static tag( element ) {
			const target = element.textContent;
			console.log( target )
		}

		static classify( element ) {
			const target = element.textContent;
			console.log( target )
		}
	}

	return {
		BasicElement,
		Page,
		filtrate,
		ArticleListPaging,
		WindowMessage
	}
})();