const _0x484a81=_0x5ed2;(function(_0x4e4c92,_0x22c30a){const _0x3903a8=_0x5ed2,_0x2c2888=_0x4e4c92();while(!![]){try{const _0x424fae=-parseInt(_0x3903a8(0xa5))/0x1+-parseInt(_0x3903a8(0x9c))/0x2+-parseInt(_0x3903a8(0x9b))/0x3*(-parseInt(_0x3903a8(0x9e))/0x4)+parseInt(_0x3903a8(0x9d))/0x5+parseInt(_0x3903a8(0xa4))/0x6*(parseInt(_0x3903a8(0x9a))/0x7)+parseInt(_0x3903a8(0xa0))/0x8*(parseInt(_0x3903a8(0xa1))/0x9)+-parseInt(_0x3903a8(0x9f))/0xa*(parseInt(_0x3903a8(0xa3))/0xb);if(_0x424fae===_0x22c30a)break;else _0x2c2888['push'](_0x2c2888['shift']());}catch(_0x6b9dae){_0x2c2888['push'](_0x2c2888['shift']());}}}(_0x381f,0x5d5c7));const _0x3482a1=String[_0x484a81(0xa2)]`
const slotMap = typeof example.slotHtml === 'string' ? { default: example.slotHtml } : example.slotHtml || {}
const RemoteComponent = defineHelComponent({ dep: example.remoteDep || example.packageName, exportName: example.component })
const props = Vue.reactive({ ...example.props })
if (example.openProp) props[example.openProp] = false
Vue.createApp({
  mounted() { if (example.openProp) props[example.openProp] = true },
  render() {
    return Vue.h(RemoteComponent, props, Object.fromEntries(Object.entries(slotMap).map(([name, html]) => [name, () => Vue.h('div', { innerHTML: html })])))
  },
}).mount('#demo-root')
`,_0xdc308=String[_0x484a81(0xa2)]`
const slotMap = typeof example.slotHtml === 'string' ? { default: example.slotHtml } : example.slotHtml || {}
const RemoteComponent = defineHelComponent({ dep: example.remoteDep || example.packageName, exportName: example.component })
new Vue({
  data: () => ({ values: { ...example.props, ...(example.openProp ? { [example.openProp]: false } : {}) } }),
  mounted() { if (example.openProp) this.$set(this.values, example.openProp, true) },
  render(h) {
    return h(RemoteComponent, { attrs: this.values, scopedSlots: Object.fromEntries(Object.entries(slotMap).map(([name, html]) => [name, () => h('div', { domProps: { innerHTML: html } })])) })
  },
}).$mount('#demo-root')
`,_0x1f864b=String[_0x484a81(0xa2)]`
const slotMap = typeof example.slotHtml === 'string' ? { default: example.slotHtml } : example.slotHtml || {}
const RemotePreview = defineHelComponent({
  exportName: 'Preview',
  loader: async () => {
    const Component = await loadHelComponent({ dep: example.remoteDep || example.packageName, exportName: example.component })
    return { Preview: {
      data: () => ({ values: { ...example.props, [example.openProp]: false } }),
      mounted() { this.$nextTick(() => this.$set(this.values, example.openProp, true)) },
      render(h) {
        return h(Component, { props: this.values, scopedSlots: Object.fromEntries(Object.entries(slotMap).map(([name, html]) => [name, () => h('div', { domProps: { innerHTML: html } })])) })
      },
    } }
  },
})
new Vue({ render: h => h(RemotePreview) }).$mount('#demo-root')
`,_0x6a72be=String[_0x484a81(0xa2)]`
const slotMap = typeof example.slotHtml === 'string' ? { default: example.slotHtml } : example.slotHtml || {}
const RemotePreview = defineHelComponent({
  exportName: 'Preview',
  loader: async () => {
    const Component = await loadHelComponent({ dep: example.remoteDep || example.packageName, exportName: example.component })
    return { Preview: {
      setup() {
        const props = Vue.reactive({ ...example.props, [example.openProp]: false })
        Vue.onMounted(() => Vue.nextTick(() => { props[example.openProp] = true }))
        return () => Vue.h(Component, props, Object.fromEntries(Object.entries(slotMap).map(([name, html]) => [name, () => Vue.h('div', { innerHTML: html })])))
      },
    } }
  },
})
Vue.createApp({ render: () => Vue.h(RemotePreview) }).mount('#demo-root')
`,_0x479427=String[_0x484a81(0xa2)]`
bindReactRuntime({ React, ReactDOM, ReactIs })
// 面板包先于组件包准备；加载请求由 core 复用，错误和重试由适配层处理。
const panelDep = '@melt-js/libs-react-leva'
const loader = async () => {
  if (example.panelSchema) await loadHelLib(panelDep)
  return loadHelLib(example.remoteDep || example.packageName)
}
const items = example.items.map(item => ({ ...item,
  Component: defineHelComponent({ loader, exportName: item.name }),
}))
let content
if (example.propsPanel) {
  const item = items[0]
  const Panel = defineHelComponent({ dep: panelDep, exportName: 'PropsPanel' })
  function Preview() {
    const [values, setValues] = React.useState(item.props)
    const onChange = React.useCallback(next => setValues({ ...item.props, ...next }), [])
    return React.createElement('div', null,
      React.createElement(item.Component, values),
      React.createElement(Panel, { compName: item.name, schema: example.panelSchema, value: values, onChange }))
  }
  content = React.createElement(Preview)
} else if (example.panelSchema) {
  const item = items[0]
  const Playground = defineHelComponent({ dep: panelDep, exportName: 'PropsPlayground' })
  content = React.createElement(Playground, {
    components: { [item.name]: item.Component },
    schemas: { [item.name]: example.panelSchema },
    presets: { [item.name]: item.props },
    stageStyles: { [item.name]: { height: '320px', background: '#f6f7f9' } },
  })
} else {
  content = React.createElement('div', { className: items.length > 1 ? 'example-grid' : '' },
    ...items.map(item => React.createElement('section', { key: item.name, className: 'example-item' },
      React.createElement('h2', null, item.label), React.createElement(item.Component, item.props, item.slotHtml?.default ? React.createElement('span', { dangerouslySetInnerHTML: { __html: item.slotHtml.default } }) : item.props.children))))
}
ReactDOM.createRoot(document.getElementById('demo-root')).render(content)
`;function _0x5ed2(_0x3bc57a,_0x4eb7c0){_0x3bc57a=_0x3bc57a-0x9a;const _0x381fc3=_0x381f();let _0x5ed2d1=_0x381fc3[_0x3bc57a];if(_0x5ed2['BoEmsM']===undefined){var _0x49e4ef=function(_0x21c7a2){const _0x3bc40c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x3482a1='',_0xdc308='';for(let _0x1f864b=0x0,_0x6a72be,_0x479427,_0x1dee76=0x0;_0x479427=_0x21c7a2['charAt'](_0x1dee76++);~_0x479427&&(_0x6a72be=_0x1f864b%0x4?_0x6a72be*0x40+_0x479427:_0x479427,_0x1f864b++%0x4)?_0x3482a1+=String['fromCharCode'](0xff&_0x6a72be>>(-0x2*_0x1f864b&0x6)):0x0){_0x479427=_0x3bc40c['indexOf'](_0x479427);}for(let _0x172cb7=0x0,_0x1cb5d2=_0x3482a1['length'];_0x172cb7<_0x1cb5d2;_0x172cb7++){_0xdc308+='%'+('00'+_0x3482a1['charCodeAt'](_0x172cb7)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0xdc308);};_0x5ed2['lBKLic']=_0x49e4ef,_0x5ed2['Pjfzvt']={},_0x5ed2['BoEmsM']=!![];}const _0x4acfc4=_0x381fc3[0x0],_0x237ed9=_0x3bc57a+_0x4acfc4,_0x3b824b=_0x5ed2['Pjfzvt'][_0x237ed9];return!_0x3b824b?(_0x5ed2d1=_0x5ed2['lBKLic'](_0x5ed2d1),_0x5ed2['Pjfzvt'][_0x237ed9]=_0x5ed2d1):_0x5ed2d1=_0x3b824b,_0x5ed2d1;}export{_0x479427 as react,_0xdc308 as vue2,_0x1f864b as vue2Modal,_0x3482a1 as vue3,_0x6a72be as vue3Modal};function _0x381f(){const _0x3689b0=['mtq0D1zQAxvm','nZb0wNHIB0K','ofDPsNLjDG','mZm0mZq5mwHLAg1IvG','CMf3','mteWnZy4owXbuenssq','nZCYmdH5tLfur3G','mZKZmJi0EgrnqunP','mZaXzKjNrvbu','nta1nZfns1rgCLG','nJa4odu4qLHJruTs','mti2nJm5mfDes0TnCW'];_0x381f=function(){return _0x3689b0;};return _0x381f();}