
const WElement = "WElement";
const _WebGUIPro_VERSION = "2.5.0";
const _WebGUIPro_CONTROL_CORE = function () {

    const {
        $,
        includeJsFile,
        includeCssFile
    } = WebUtilPro();

    const Controls = new Array;

    function importControl(path, name) {
        const jsPath = path + `/${name}/${name}.js`;
        const cssPath = path + `/${name}/${name}.css`;
        includeJsFile(jsPath, () => { }, true);
        includeCssFile(cssPath, (is, e) => { if (!is) { e.removePro() } });
    }

    function importStyleControl(path, name) {
        const cssPath = path + `/${name}/${name}.css`;
        includeCssFile(cssPath, (is, e) => { if (!is) { e.removePro() } });
    }

    function add(control = Function) {
        const init_control = control();
        Controls.push(control);

        window.customElements.define(init_control.ControlName, init_control.Contro);
    }

    function del(controlName = "") {
        Controls.forEach(E => {
            const e = E();
            if (e.ControlName === controlName) {
                Controls.splice(E, 1);
                return true;
            }
        });
        return false;
    }

    console.info(`WebGUIPro -- ${_WebGUIPro_VERSION} -- [ wang jia ming ] `);

    return {
        Controls,
        importControl,
        importStyleControl,
        add,
        del
    }
};
const _WebGUIPro_control_core = _WebGUIPro_CONTROL_CORE();
const WImportControl = _WebGUIPro_control_core.importControl;
const WImportStyleControl = _WebGUIPro_control_core.importStyleControl;
