( () => { [].forEach( v => { const script = document.createElement( "script" ); script.type = "text/javascript"; script.src = v; document.body.appendChild( script ); } ); } )();