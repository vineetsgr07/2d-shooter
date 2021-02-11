import App from './app';

const app = new App();
test('simple test', () => {
    expect(app.sum(2,3)).toBe(5);
})