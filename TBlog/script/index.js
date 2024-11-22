/**
 * @name ThisBlog Function File
 * @description 定义功能
 * @author Wang Jia Ming
 * @createDate 2024-10-18
 */
'use strict';

var ThisBlog_Data = {}, ThisBlog_ArticleSize = 0, ThisBlog_ArticleListMetaData = null, ThisBlog_ArticleListMetaDataInfo = null, ThisBlog_CurrentPageIndex = 1;


const TB = ( function () {
	const getClassName = str => {
		const result = document.getElementsByClassName( str );
		if ( result.length === 0 ) return null;
		const item = result.item( 0 );
		item.getClassName = function ( str ) {
			return item.getElementsByClassName( str ).item( 0 );
		};
		return item;
	};

	const BasicElement = {
		"tb-app-content-about-more" : getClassName( "tb-app-content-about-more" ),
		"tb-app-content-about-social-contact" : getClassName( "tb-app-content-about-social-contact" ),
		"tb-app-content-about-view" : getClassName( "tb-app-content-about-view" ),

		"tb-app-content-article-list-content" : getClassName( "tb-app-content-article-list-content" ),
		"tb-app-content-article-list-paging" : getClassName( "tb-app-content-article-list-paging" ),
		"tb-app-content-article-list-paging-numbers" : getClassName( "tb-app-content-article-list-paging-numbers" ),
		"tb-app-content-article-list-view" : getClassName( "tb-app-content-article-list-view" ),
		"tb-app-content-article-view" : getClassName( "tb-app-content-article-view" ),
		"tb-app-content-article-iframe" : getClassName( "tb-app-content-article-iframe" ),

		"tb-app-content-classify-view" : getClassName( "tb-app-content-classify-view" ),
		"tb-app-content-friend-link-view" : getClassName( "tb-app-content-friend-link-view" ),
		"tb-app-content-tag-view" : getClassName( "tb-app-content-tag-view" ),
		"tb-app-content-view" : getClassName( "tb-app-content-view" ),

		"tb-app-footer-copyright" : getClassName( "tb-app-footer-copyright" ),
		"tb-app-footer-embeddable-html" : getClassName( "tb-app-footer-embeddable-html" ),
		"tb-app-footer-view" : getClassName( "tb-app-footer-view" ),

		"tb-app-main-top-scroll-element" : getClassName( "tb-app-main-top-scroll-element" ),
		"tb-app-main-view" : getClassName( "tb-app-main-view" ),

		"tb-app-navigation-bar" : getClassName( "tb-app-navigation-bar" ),

		"tb-app-sidebar-announcement" : getClassName( "tb-app-sidebar-announcement" ),
		"tb-app-sidebar-introduction-constellation" : getClassName( "tb-app-sidebar-introduction-constellation" ),
		"tb-app-sidebar-introduction-name" : getClassName( "tb-app-sidebar-introduction-name" ),
		"tb-app-sidebar-introduction-personalized" : getClassName( "tb-app-sidebar-introduction-personalized" ),
		"tb-app-sidebar-introduction-profile" : getClassName( "tb-app-sidebar-introduction-profile" ),
		"tb-app-sidebar-website-info" : getClassName( "tb-app-sidebar-website-info" )
	};

	// 页面
	class Page {
		// 滚动到顶部
		static scrollTop() {
			BasicElement[ "tb-app-main-top-scroll-element" ].scrollIntoView( { behavior : "smooth" } );
		}

		// 显示选择的页面
		static select( pageName ) {
			const DrawerMenus = getClassName( "tb-app-drawer-menus" );
			if ( DrawerMenus ) document.body.removeChild( DrawerMenus );
			if ( BasicElement[ "tb-app-content-view" ].style.animationName === "loading" ) BasicElement[ "tb-app-content-view" ].style.animation = null;
			if ( pageName !== "article" && BasicElement[ "tb-app-content-article-iframe" ].src !== "about:blank" ) BasicElement[ "tb-app-content-article-iframe" ].src = "about:blank";
			BasicElement[ "tb-app-main-view" ].querySelectorAll( "[view]" ).forEach( element => element.classList.remove( "select" ) );
			BasicElement[ `tb-app-content-${ pageName }-view` ].classList.add( "select" );
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
			const menus = BasicElement[ "tb-app-navigation-bar" ].getClassName( "menus" ).cloneNode( true );
			Content.appendChild( menus );
			document.body.appendChild( DrawerMenus );
		}

		// 自适应页面
		static adaptive() {
		}

		// 显示指定文章
		static showArticle( id = "" ) {
			Page.select( "article" );
			BasicElement[ "tb-app-content-article-view" ].style.height = "0px";
			const iframe = BasicElement[ "tb-app-content-article-iframe" ];
			iframe.src = `./articles/${ id }/content.html`;
			BasicElement[ "tb-app-content-article-view" ].classList.add( "loading" );
			BasicElement[ "tb-app-content-view" ].style.animation = "loading 2s infinite linear";
			//iframe.src = "about:blank";
		}

		// 刷新文章列表
		static refreshArticleList() {
			if ( ThisBlog_ArticleListMetaData && Array.isArray( ThisBlog_ArticleListMetaData ) ) {
				const list = BasicElement[ "tb-app-content-article-list-content" ];
				list.innerHTML = null;
				ThisBlog_ArticleListMetaData.forEach( articleMeta => {
					const item = document.createElement( "div" );
					item.setAttribute( "article-id", articleMeta[ "_id" ] );
					item.onclick = () => { Page.showArticle( articleMeta[ "_id" ] ); }
					item.classList.add( "item" );
					item.innerHTML = `<span class="title">${ articleMeta[ "title" ] }</span><p class="section"><span class="createDate">${ articleMeta[ "createDate" ] }</span><span class="classify">${ articleMeta[ "classify" ] }</span></p><div class="abstract">${ articleMeta[ "abstract" ] }</div>`;
					list.appendChild( item );
				} );
			}
		}

		// 渲染
		static render() {
			{ // 分类
				BasicElement[ "tb-app-content-classify-view" ].innerHTML = null;
				ThisBlog_Data[ "classify-tag" ][ "classify" ].forEach( value => {
					BasicElement[ "tb-app-content-classify-view" ].innerHTML += `<a class="item" onclick="TB.filtrate.classify(this)">${ value }</a>`;
				} );
			}
			{ // 分类
				BasicElement[ "tb-app-content-tag-view" ].innerHTML = null;
				ThisBlog_Data[ "classify-tag" ][ "tag" ].forEach( value => {
					BasicElement[ "tb-app-content-tag-view" ].innerHTML += `<a class="item" onclick="TB.filtrate.tag(this)">${ value }</a>`;
				} );
			}
			{ // 友链
				BasicElement[ "tb-app-content-friend-link-view" ].innerHTML = null;
				ThisBlog_Data[ "friend-link" ][ "links" ].forEach( value => {
					BasicElement[ "tb-app-content-friend-link-view" ].innerHTML +=
						`<div class="item"><span class="name">${ value[ "name" ] }</span><a class="link" href="${ value[ "link" ] }">${ value[ "name" ] }</a><span class="introduce">${ value[ "introduce" ] }</span></div>`;
				} );
			}
			{ // 关于
				BasicElement[ "tb-app-content-about-social-contact" ].innerHTML = `<legend>联系方式</legend>`;
				for ( const key in ThisBlog_Data[ "user-data" ][ "社交" ] ) {
					BasicElement[ "tb-app-content-about-social-contact" ].innerHTML += `<a class="item" href="${ ThisBlog_Data[ "user-data" ][ "社交" ][ key ] }">${ key }</a>`;
				}

				BasicElement[ "tb-app-content-about-more" ].innerHTML = `<fieldset class="box"><legend>个人介绍</legend><div class="content">${ ThisBlog_Data[ "user-data" ][ "个人介绍" ] }</div></fieldset>`;
			}
			{ // 页脚
				BasicElement[ "tb-app-footer-copyright" ].textContent = ThisBlog_Data[ "config" ][ "blog-copyright" ];
				BasicElement[ "tb-app-footer-embeddable-html" ].innerHTML = ThisBlog_Data[ "config" ][ "blog-footer-embeddableHTML" ];
			}
			{ // 介绍
				BasicElement[ "tb-app-sidebar-introduction-profile" ].src = `./assets/${ ThisBlog_Data[ "user-data" ][ "hi" ][ "头像" ] }`;
				BasicElement[ "tb-app-sidebar-introduction-name" ].textContent = ThisBlog_Data[ "user-data" ][ "hi" ][ "名字" ];
				const getConstellationByDate = ( date = "" ) => {
					const arr = date.split( "-" );
					const obj = {
						year : parseInt( arr[ 0 ] ),
						month : parseInt( arr[ 1 ] ),
						day : parseInt( arr[ 2 ] )
					};
					let constellations = [];
					const constellationsSimple = [
						{
							name : "星纪",
							mS : 1,
							dS : 6,
							mE : 2,
							dE : 3
						},
						{
							name : "玄枵",
							mS : 2,
							dS : 4,
							mE : 3,
							dE : 5
						},
						{
							name : "娵訾",
							mS : 3,
							dS : 6,
							mE : 4,
							dE : 4
						},
						{
							name : "降娄",
							mS : 4,
							dS : 5,
							mE : 5,
							dE : 5
						},
						{
							name : "大梁",
							mS : 5,
							dS : 6,
							mE : 6,
							dE : 5
						},
						{
							name : "实沉",
							mS : 6,
							dS : 6,
							mE : 7,
							dE : 6
						},
						{
							name : "鹑首",
							mS : 7,
							dS : 7,
							mE : 8,
							dE : 6
						},
						{
							name : "鹑火",
							mS : 8,
							dS : 7,
							mE : 9,
							dE : 7
						},
						{
							name : "鹑尾",
							mS : 9,
							dS : 8,
							mE : 10,
							dE : 7
						},
						{
							name : "寿星",
							mS : 10,
							dS : 8,
							mE : 11,
							dE : 6
						},
						{
							name : "大火",
							mS : 11,
							dS : 7,
							mE : 12,
							dE : 5
						},
						{
							name : "析木",
							mS : 12,
							dS : 6,
							mE : 1,
							dE : 5
						}
					];
					constellationsSimple.forEach( item => {
						constellations.push( {
							name : item.name,
							range : [
								{
									year : obj.year,
									month : item.mS,
									day : item.dS
								},
								{
									year : obj.year,
									month : item.mE,
									day : item.dE
								}
							]
						} );
					} );
					let result = "未知星座";
					const isDateInRange = ( {
						                        year : givenYear = 1970,
						                        month : givenMonth = 1,
						                        day : givenDay = 1
					                        }, {
						                        year : startYear = 1970,
						                        month : startMonth = 1,
						                        day : startDay = 1
					                        }, {
						                        year : endYear = 1970,
						                        month : endMonth = 12,
						                        day : endDay = 31
					                        } ) => {
						const givenDateObj = new Date( givenYear, givenMonth, givenDay );
						const startDateObj = new Date( startYear, startMonth, startDay );
						const endDateObj = new Date( endYear, endMonth, endDay );
						return givenDateObj >= startDateObj && givenDateObj <= endDateObj;
					}
					for ( const key in constellations ) {
						const [ start, end ] = constellations[ key ].range;
						if ( obj.year === start.year && obj.month <= start.month ) obj.year += 1;
						if ( isDateInRange( obj, start, end ) ) result = constellations[ key ].name;
					}
					return result;
				};
				BasicElement[ "tb-app-sidebar-introduction-constellation" ].textContent = getConstellationByDate( ThisBlog_Data[ "user-data" ][ "hi" ][ "生辰" ] );
				BasicElement[ "tb-app-sidebar-introduction-personalized" ].textContent = ThisBlog_Data[ "user-data" ][ "个性签名" ];
			}
			{ // 公告
				BasicElement[ "tb-app-sidebar-announcement" ].innerHTML = `<legend>公告</legend>${ ThisBlog_Data[ "config" ][ "blog-announcement" ] }`;
			}
			{ // 网站基本信息
				BasicElement[ "tb-app-sidebar-website-info" ].innerHTML = `<legend>网站资讯</legend>`;
				BasicElement[ "tb-app-sidebar-website-info" ].innerHTML += `<p class="item" value="${ ThisBlog_ArticleSize }">文章数目</p>`;
				BasicElement[ "tb-app-sidebar-website-info" ].innerHTML += `<p class="item" value="${ ThisBlog_Data[ "classify-tag" ][ "classify" ].length }">分类</p>`;
				BasicElement[ "tb-app-sidebar-website-info" ].innerHTML += `<p class="item" value="${ ThisBlog_Data[ "classify-tag" ][ "tag" ].length }">标签</p>`;
				BasicElement[ "tb-app-sidebar-website-info" ].innerHTML += `<p class="item" value="${ ThisBlog_Data[ "config" ][ "blog-create-date" ] }">博客创建时间</p>`;
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
			if ( ThisBlog_CurrentPageIndex > ThisBlog_ArticleListMetaDataInfo[ "size" ] ) {
				ThisBlog_CurrentPageIndex = ThisBlog_ArticleListMetaDataInfo[ "size" ];
			}
			ArticleListPaging.load();
		}

		// 首页
		static first() {
			ArticleListPaging.load( 1 );
		}

		// 渲染分页显示条
		static renderBar() {
			const bar = BasicElement[ "tb-app-content-article-list-paging-numbers" ];
			bar.innerHTML = null;
			let i = ThisBlog_CurrentPageIndex;
			const getPaginationList = ( currentPage, totalPages, pageSize = 5 ) => {
				currentPage = Math.max( 1, Math.min( Math.floor( currentPage ), totalPages ) );
				let start = Math.max( 1, currentPage - Math.floor( ( pageSize - 1 ) / 2 ) );
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
			getPaginationList( i, ThisBlog_ArticleListMetaDataInfo[ "size" ] ).forEach( i => {
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
			BasicElement[ "tb-app-content-article-view" ].style.height = `${ data[ "height" ] + 50 }px`;
			BasicElement[ "tb-app-content-article-view" ].classList.remove( "loading" );
			BasicElement[ "tb-app-content-view" ].style.animation = null;
		}

		// 处理文章页面消息
		static articleMessage( event ) {
			const json = JSON.parse( event.data );
			json[ "ARTICLE" ] && WindowMessage.ARTICLE( json[ "ARTICLE" ] );
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
} )();ThisBlog_ArticleListMetaDataInfo = {size:1};ThisBlog_ArticleSize = 5