import Plugin from 'src/plugin-system/plugin.class';

export default class ExamplePlugin extends Plugin {
    init() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    onScroll() {

    }
}
