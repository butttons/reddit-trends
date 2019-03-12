declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
    export interface ComputedClass {
        [key: string]: boolean;
    }
}
