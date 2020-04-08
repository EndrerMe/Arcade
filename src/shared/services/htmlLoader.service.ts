export class HtmlLoader {
    public static toggleLoader(state: boolean): void {
        const loader = document.getElementById('loader');
        if (state) {
            loader.style.display = 'block';
            return
        }

        loader.style.display = 'none';
    }
}