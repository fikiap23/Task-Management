/*! For license information please see service-worker.js.LICENSE.txt */
!(function () {
  'use strict'
  var e = {
      923: function () {
        try {
          self['workbox:core:6.5.3'] && _()
        } catch (e) {}
      },
      437: function () {
        try {
          self['workbox:precaching:6.5.3'] && _()
        } catch (e) {}
      },
      185: function () {
        try {
          self['workbox:routing:6.5.3'] && _()
        } catch (e) {}
      },
      833: function () {
        try {
          self['workbox:strategies:6.5.3'] && _()
        } catch (e) {}
      },
    },
    t = {}
  function r(n) {
    var a = t[n]
    if (void 0 !== a) return a.exports
    var i = (t[n] = { exports: {} })
    return e[n](i, i.exports, r), i.exports
  }
  !(function () {
    function e(t) {
      return (
        (e =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              }),
        e(t)
      )
    }
    function t() {
      t = function () {
        return r
      }
      var r = {},
        n = Object.prototype,
        a = n.hasOwnProperty,
        i =
          Object.defineProperty ||
          function (e, t, r) {
            e[t] = r.value
          },
        s = 'function' == typeof Symbol ? Symbol : {},
        c = s.iterator || '@@iterator',
        o = s.asyncIterator || '@@asyncIterator',
        u = s.toStringTag || '@@toStringTag'
      function l(e, t, r) {
        return (
          Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          e[t]
        )
      }
      try {
        l({}, '')
      } catch (q) {
        l = function (e, t, r) {
          return (e[t] = r)
        }
      }
      function h(e, t, r, n) {
        var a = t && t.prototype instanceof v ? t : v,
          s = Object.create(a.prototype),
          c = new O(n || [])
        return i(s, '_invoke', { value: _(e, r, c) }), s
      }
      function f(e, t, r) {
        try {
          return { type: 'normal', arg: e.call(t, r) }
        } catch (q) {
          return { type: 'throw', arg: q }
        }
      }
      r.wrap = h
      var p = {}
      function v() {}
      function d() {}
      function y() {}
      var g = {}
      l(g, c, function () {
        return this
      })
      var b = Object.getPrototypeOf,
        x = b && b(b(E([])))
      x && x !== n && a.call(x, c) && (g = x)
      var m = (y.prototype = v.prototype = Object.create(g))
      function w(e) {
        ;['next', 'throw', 'return'].forEach(function (t) {
          l(e, t, function (e) {
            return this._invoke(t, e)
          })
        })
      }
      function k(t, r) {
        function n(i, s, c, o) {
          var u = f(t[i], t, s)
          if ('throw' !== u.type) {
            var l = u.arg,
              h = l.value
            return h && 'object' == e(h) && a.call(h, '__await')
              ? r.resolve(h.__await).then(
                  function (e) {
                    n('next', e, c, o)
                  },
                  function (e) {
                    n('throw', e, c, o)
                  }
                )
              : r.resolve(h).then(
                  function (e) {
                    ;(l.value = e), c(l)
                  },
                  function (e) {
                    return n('throw', e, c, o)
                  }
                )
          }
          o(u.arg)
        }
        var s
        i(this, '_invoke', {
          value: function (e, t) {
            function a() {
              return new r(function (r, a) {
                n(e, t, r, a)
              })
            }
            return (s = s ? s.then(a, a) : a())
          },
        })
      }
      function _(e, t, r) {
        var n = 'suspendedStart'
        return function (a, i) {
          if ('executing' === n) throw new Error('Generator is already running')
          if ('completed' === n) {
            if ('throw' === a) throw i
            return P()
          }
          for (r.method = a, r.arg = i; ; ) {
            var s = r.delegate
            if (s) {
              var c = R(s, r)
              if (c) {
                if (c === p) continue
                return c
              }
            }
            if ('next' === r.method) r.sent = r._sent = r.arg
            else if ('throw' === r.method) {
              if ('suspendedStart' === n) throw ((n = 'completed'), r.arg)
              r.dispatchException(r.arg)
            } else 'return' === r.method && r.abrupt('return', r.arg)
            n = 'executing'
            var o = f(e, t, r)
            if ('normal' === o.type) {
              if (((n = r.done ? 'completed' : 'suspendedYield'), o.arg === p))
                continue
              return { value: o.arg, done: r.done }
            }
            'throw' === o.type &&
              ((n = 'completed'), (r.method = 'throw'), (r.arg = o.arg))
          }
        }
      }
      function R(e, t) {
        var r = t.method,
          n = e.iterator[r]
        if (void 0 === n)
          return (
            (t.delegate = null),
            ('throw' === r &&
              e.iterator.return &&
              ((t.method = 'return'),
              (t.arg = void 0),
              R(e, t),
              'throw' === t.method)) ||
              ('return' !== r &&
                ((t.method = 'throw'),
                (t.arg = new TypeError(
                  "The iterator does not provide a '" + r + "' method"
                )))),
            p
          )
        var a = f(n, e.iterator, t.arg)
        if ('throw' === a.type)
          return (t.method = 'throw'), (t.arg = a.arg), (t.delegate = null), p
        var i = a.arg
        return i
          ? i.done
            ? ((t[e.resultName] = i.value),
              (t.next = e.nextLoc),
              'return' !== t.method && ((t.method = 'next'), (t.arg = void 0)),
              (t.delegate = null),
              p)
            : i
          : ((t.method = 'throw'),
            (t.arg = new TypeError('iterator result is not an object')),
            (t.delegate = null),
            p)
      }
      function L(e) {
        var t = { tryLoc: e[0] }
        1 in e && (t.catchLoc = e[1]),
          2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
          this.tryEntries.push(t)
      }
      function C(e) {
        var t = e.completion || {}
        ;(t.type = 'normal'), delete t.arg, (e.completion = t)
      }
      function O(e) {
        ;(this.tryEntries = [{ tryLoc: 'root' }]),
          e.forEach(L, this),
          this.reset(!0)
      }
      function E(e) {
        if (e) {
          var t = e[c]
          if (t) return t.call(e)
          if ('function' == typeof e.next) return e
          if (!isNaN(e.length)) {
            var r = -1,
              n = function t() {
                for (; ++r < e.length; )
                  if (a.call(e, r)) return (t.value = e[r]), (t.done = !1), t
                return (t.value = void 0), (t.done = !0), t
              }
            return (n.next = n)
          }
        }
        return { next: P }
      }
      function P() {
        return { value: void 0, done: !0 }
      }
      return (
        (d.prototype = y),
        i(m, 'constructor', { value: y, configurable: !0 }),
        i(y, 'constructor', { value: d, configurable: !0 }),
        (d.displayName = l(y, u, 'GeneratorFunction')),
        (r.isGeneratorFunction = function (e) {
          var t = 'function' == typeof e && e.constructor
          return (
            !!t &&
            (t === d || 'GeneratorFunction' === (t.displayName || t.name))
          )
        }),
        (r.mark = function (e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, y)
              : ((e.__proto__ = y), l(e, u, 'GeneratorFunction')),
            (e.prototype = Object.create(m)),
            e
          )
        }),
        (r.awrap = function (e) {
          return { __await: e }
        }),
        w(k.prototype),
        l(k.prototype, o, function () {
          return this
        }),
        (r.AsyncIterator = k),
        (r.async = function (e, t, n, a, i) {
          void 0 === i && (i = Promise)
          var s = new k(h(e, t, n, a), i)
          return r.isGeneratorFunction(t)
            ? s
            : s.next().then(function (e) {
                return e.done ? e.value : s.next()
              })
        }),
        w(m),
        l(m, u, 'Generator'),
        l(m, c, function () {
          return this
        }),
        l(m, 'toString', function () {
          return '[object Generator]'
        }),
        (r.keys = function (e) {
          var t = Object(e),
            r = []
          for (var n in t) r.push(n)
          return (
            r.reverse(),
            function e() {
              for (; r.length; ) {
                var n = r.pop()
                if (n in t) return (e.value = n), (e.done = !1), e
              }
              return (e.done = !0), e
            }
          )
        }),
        (r.values = E),
        (O.prototype = {
          constructor: O,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = void 0),
              (this.done = !1),
              (this.delegate = null),
              (this.method = 'next'),
              (this.arg = void 0),
              this.tryEntries.forEach(C),
              !e)
            )
              for (var t in this)
                't' === t.charAt(0) &&
                  a.call(this, t) &&
                  !isNaN(+t.slice(1)) &&
                  (this[t] = void 0)
          },
          stop: function () {
            this.done = !0
            var e = this.tryEntries[0].completion
            if ('throw' === e.type) throw e.arg
            return this.rval
          },
          dispatchException: function (e) {
            if (this.done) throw e
            var t = this
            function r(r, n) {
              return (
                (s.type = 'throw'),
                (s.arg = e),
                (t.next = r),
                n && ((t.method = 'next'), (t.arg = void 0)),
                !!n
              )
            }
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var i = this.tryEntries[n],
                s = i.completion
              if ('root' === i.tryLoc) return r('end')
              if (i.tryLoc <= this.prev) {
                var c = a.call(i, 'catchLoc'),
                  o = a.call(i, 'finallyLoc')
                if (c && o) {
                  if (this.prev < i.catchLoc) return r(i.catchLoc, !0)
                  if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                } else if (c) {
                  if (this.prev < i.catchLoc) return r(i.catchLoc, !0)
                } else {
                  if (!o)
                    throw new Error('try statement without catch or finally')
                  if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                }
              }
            }
          },
          abrupt: function (e, t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var n = this.tryEntries[r]
              if (
                n.tryLoc <= this.prev &&
                a.call(n, 'finallyLoc') &&
                this.prev < n.finallyLoc
              ) {
                var i = n
                break
              }
            }
            i &&
              ('break' === e || 'continue' === e) &&
              i.tryLoc <= t &&
              t <= i.finallyLoc &&
              (i = null)
            var s = i ? i.completion : {}
            return (
              (s.type = e),
              (s.arg = t),
              i
                ? ((this.method = 'next'), (this.next = i.finallyLoc), p)
                : this.complete(s)
            )
          },
          complete: function (e, t) {
            if ('throw' === e.type) throw e.arg
            return (
              'break' === e.type || 'continue' === e.type
                ? (this.next = e.arg)
                : 'return' === e.type
                ? ((this.rval = this.arg = e.arg),
                  (this.method = 'return'),
                  (this.next = 'end'))
                : 'normal' === e.type && t && (this.next = t),
              p
            )
          },
          finish: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t]
              if (r.finallyLoc === e)
                return this.complete(r.completion, r.afterLoc), C(r), p
            }
          },
          catch: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t]
              if (r.tryLoc === e) {
                var n = r.completion
                if ('throw' === n.type) {
                  var a = n.arg
                  C(r)
                }
                return a
              }
            }
            throw new Error('illegal catch attempt')
          },
          delegateYield: function (e, t, r) {
            return (
              (this.delegate = { iterator: E(e), resultName: t, nextLoc: r }),
              'next' === this.method && (this.arg = void 0),
              p
            )
          },
        }),
        r
      )
    }
    function n(e, t) {
      ;(null == t || t > e.length) && (t = e.length)
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
      return n
    }
    function a(e, t) {
      if (e) {
        if ('string' === typeof e) return n(e, t)
        var r = Object.prototype.toString.call(e).slice(8, -1)
        return (
          'Object' === r && e.constructor && (r = e.constructor.name),
          'Map' === r || 'Set' === r
            ? Array.from(e)
            : 'Arguments' === r ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            ? n(e, t)
            : void 0
        )
      }
    }
    function i(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e
        })(e) ||
        (function (e, t) {
          var r =
            null == e
              ? null
              : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                e['@@iterator']
          if (null != r) {
            var n,
              a,
              i,
              s,
              c = [],
              o = !0,
              u = !1
            try {
              if (((i = (r = r.call(e)).next), 0 === t)) {
                if (Object(r) !== r) return
                o = !1
              } else
                for (
                  ;
                  !(o = (n = i.call(r)).done) &&
                  (c.push(n.value), c.length !== t);
                  o = !0
                );
            } catch (l) {
              ;(u = !0), (a = l)
            } finally {
              try {
                if (
                  !o &&
                  null != r.return &&
                  ((s = r.return()), Object(s) !== s)
                )
                  return
              } finally {
                if (u) throw a
              }
            }
            return c
          }
        })(e, t) ||
        a(e, t) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        })()
      )
    }
    function s(e, t, r, n, a, i, s) {
      try {
        var c = e[i](s),
          o = c.value
      } catch (u) {
        return void r(u)
      }
      c.done ? t(o) : Promise.resolve(o).then(n, a)
    }
    function c(e) {
      return function () {
        var t = this,
          r = arguments
        return new Promise(function (n, a) {
          var i = e.apply(t, r)
          function c(e) {
            s(i, n, a, c, o, 'next', e)
          }
          function o(e) {
            s(i, n, a, c, o, 'throw', e)
          }
          c(void 0)
        })
      }
    }
    function o(e, t) {
      var r =
        ('undefined' !== typeof Symbol && e[Symbol.iterator]) || e['@@iterator']
      if (!r) {
        if (
          Array.isArray(e) ||
          (r = a(e)) ||
          (t && e && 'number' === typeof e.length)
        ) {
          r && (e = r)
          var n = 0,
            i = function () {}
          return {
            s: i,
            n: function () {
              return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] }
            },
            e: function (e) {
              throw e
            },
            f: i,
          }
        }
        throw new TypeError(
          'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        )
      }
      var s,
        c = !0,
        o = !1
      return {
        s: function () {
          r = r.call(e)
        },
        n: function () {
          var e = r.next()
          return (c = e.done), e
        },
        e: function (e) {
          ;(o = !0), (s = e)
        },
        f: function () {
          try {
            c || null == r.return || r.return()
          } finally {
            if (o) throw s
          }
        },
      }
    }
    function u(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return n(e)
        })(e) ||
        (function (e) {
          if (
            ('undefined' !== typeof Symbol && null != e[Symbol.iterator]) ||
            null != e['@@iterator']
          )
            return Array.from(e)
        })(e) ||
        a(e) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        })()
      )
    }
    function l(e, t) {
      if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function')
    }
    function h(t) {
      var r = (function (t, r) {
        if ('object' !== e(t) || null === t) return t
        var n = t[Symbol.toPrimitive]
        if (void 0 !== n) {
          var a = n.call(t, r || 'default')
          if ('object' !== e(a)) return a
          throw new TypeError('@@toPrimitive must return a primitive value.')
        }
        return ('string' === r ? String : Number)(t)
      })(t, 'string')
      return 'symbol' === e(r) ? r : String(r)
    }
    function f(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r]
        ;(n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          'value' in n && (n.writable = !0),
          Object.defineProperty(e, h(n.key), n)
      }
    }
    function p(e, t, r) {
      return (
        t && f(e.prototype, t),
        r && f(e, r),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        e
      )
    }
    function v(e, t) {
      return (
        (v = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (e, t) {
              return (e.__proto__ = t), e
            }),
        v(e, t)
      )
    }
    function d(e, t) {
      if ('function' !== typeof t && null !== t)
        throw new TypeError(
          'Super expression must either be null or a function'
        )
      ;(e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && v(e, t)
    }
    function y(e) {
      return (
        (y = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e)
            }),
        y(e)
      )
    }
    function g() {
      if ('undefined' === typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' === typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (e) {
        return !1
      }
    }
    function b(t, r) {
      if (r && ('object' === e(r) || 'function' === typeof r)) return r
      if (void 0 !== r)
        throw new TypeError(
          'Derived constructors may only return object or undefined'
        )
      return (function (e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          )
        return e
      })(t)
    }
    function x(e) {
      var t = g()
      return function () {
        var r,
          n = y(e)
        if (t) {
          var a = y(this).constructor
          r = Reflect.construct(n, arguments, a)
        } else r = n.apply(this, arguments)
        return b(this, r)
      }
    }
    function m(e, t, r) {
      return (
        (m = g()
          ? Reflect.construct.bind()
          : function (e, t, r) {
              var n = [null]
              n.push.apply(n, t)
              var a = new (Function.bind.apply(e, n))()
              return r && v(a, r.prototype), a
            }),
        m.apply(null, arguments)
      )
    }
    function w(e) {
      var t = 'function' === typeof Map ? new Map() : void 0
      return (
        (w = function (e) {
          if (
            null === e ||
            ((r = e), -1 === Function.toString.call(r).indexOf('[native code]'))
          )
            return e
          var r
          if ('function' !== typeof e)
            throw new TypeError(
              'Super expression must either be null or a function'
            )
          if ('undefined' !== typeof t) {
            if (t.has(e)) return t.get(e)
            t.set(e, n)
          }
          function n() {
            return m(e, arguments, y(this).constructor)
          }
          return (
            (n.prototype = Object.create(e.prototype, {
              constructor: {
                value: n,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
            v(n, e)
          )
        }),
        w(e)
      )
    }
    r(923)
    var k = function (e) {
        for (
          var t = e,
            r = arguments.length,
            n = new Array(r > 1 ? r - 1 : 0),
            a = 1;
          a < r;
          a++
        )
          n[a - 1] = arguments[a]
        return n.length > 0 && (t += ' :: '.concat(JSON.stringify(n))), t
      },
      _ = (function (e) {
        d(r, e)
        var t = x(r)
        function r(e, n) {
          var a
          l(this, r)
          var i = k(e, n)
          return ((a = t.call(this, i)).name = e), (a.details = n), a
        }
        return p(r)
      })(w(Error)),
      R = {
        googleAnalytics: 'googleAnalytics',
        precache: 'precache-v2',
        prefix: 'workbox',
        runtime: 'runtime',
        suffix: 'undefined' !== typeof registration ? registration.scope : '',
      },
      L = function (e) {
        return [R.prefix, e, R.suffix]
          .filter(function (e) {
            return e && e.length > 0
          })
          .join('-')
      },
      C = {
        updateDetails: function (e) {
          !(function (e) {
            for (var t = 0, r = Object.keys(R); t < r.length; t++) e(r[t])
          })(function (t) {
            'string' === typeof e[t] && (R[t] = e[t])
          })
        },
        getGoogleAnalyticsName: function (e) {
          return e || L(R.googleAnalytics)
        },
        getPrecacheName: function (e) {
          return e || L(R.precache)
        },
        getPrefix: function () {
          return R.prefix
        },
        getRuntimeName: function (e) {
          return e || L(R.runtime)
        },
        getSuffix: function () {
          return R.suffix
        },
      },
      O = null
    function E(e, t) {
      var r = t()
      return e.waitUntil(r), r
    }
    r(437)
    var P = '__WB_REVISION__'
    function q(e) {
      if (!e) throw new _('add-to-cache-list-unexpected-type', { entry: e })
      if ('string' === typeof e) {
        var t = new URL(e, location.href)
        return { cacheKey: t.href, url: t.href }
      }
      var r = e.revision,
        n = e.url
      if (!n) throw new _('add-to-cache-list-unexpected-type', { entry: e })
      if (!r) {
        var a = new URL(n, location.href)
        return { cacheKey: a.href, url: a.href }
      }
      var i = new URL(n, location.href),
        s = new URL(n, location.href)
      return i.searchParams.set(P, r), { cacheKey: i.href, url: s.href }
    }
    var U,
      T = p(function e() {
        var r = this
        l(this, e),
          (this.updatedURLs = []),
          (this.notUpdatedURLs = []),
          (this.handlerWillStart = (function () {
            var e = c(
              t().mark(function e(r) {
                var n, a
                return t().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        ;(n = r.request),
                          (a = r.state) && (a.originalRequest = n)
                      case 2:
                      case 'end':
                        return e.stop()
                    }
                }, e)
              })
            )
            return function (t) {
              return e.apply(this, arguments)
            }
          })()),
          (this.cachedResponseWillBeUsed = (function () {
            var e = c(
              t().mark(function e(n) {
                var a, i, s, c
                return t().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (a = n.event),
                          (i = n.state),
                          (s = n.cachedResponse),
                          'install' === a.type &&
                            i &&
                            i.originalRequest &&
                            i.originalRequest instanceof Request &&
                            ((c = i.originalRequest.url),
                            s
                              ? r.notUpdatedURLs.push(c)
                              : r.updatedURLs.push(c)),
                          e.abrupt('return', s)
                        )
                      case 3:
                      case 'end':
                        return e.stop()
                    }
                }, e)
              })
            )
            return function (t) {
              return e.apply(this, arguments)
            }
          })())
      }),
      j = p(function e(r) {
        var n = this,
          a = r.precacheController
        l(this, e),
          (this.cacheKeyWillBeUsed = (function () {
            var e = c(
              t().mark(function e(r) {
                var a, i, s
                return t().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (a = r.request),
                          (i = r.params),
                          (s =
                            (null === i || void 0 === i
                              ? void 0
                              : i.cacheKey) ||
                            n._precacheController.getCacheKeyForURL(a.url)),
                          e.abrupt(
                            'return',
                            s ? new Request(s, { headers: a.headers }) : a
                          )
                        )
                      case 3:
                      case 'end':
                        return e.stop()
                    }
                }, e)
              })
            )
            return function (t) {
              return e.apply(this, arguments)
            }
          })()),
          (this._precacheController = a)
      })
    function S() {
      if (void 0 === U) {
        var e = new Response('')
        if ('body' in e)
          try {
            new Response(e.body), (U = !0)
          } catch (t) {
            U = !1
          }
        U = !1
      }
      return U
    }
    function N(e, t) {
      return K.apply(this, arguments)
    }
    function K() {
      return (K = c(
        t().mark(function e(r, n) {
          var a, i, s, c, o, u
          return t().wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if (
                    ((a = null),
                    r.url && ((i = new URL(r.url)), (a = i.origin)),
                    a === self.location.origin)
                  ) {
                    e.next = 4
                    break
                  }
                  throw new _('cross-origin-copy-response', { origin: a })
                case 4:
                  if (
                    ((s = r.clone()),
                    (c = {
                      headers: new Headers(s.headers),
                      status: s.status,
                      statusText: s.statusText,
                    }),
                    (o = n ? n(c) : c),
                    !S())
                  ) {
                    e.next = 11
                    break
                  }
                  ;(e.t0 = s.body), (e.next = 14)
                  break
                case 11:
                  return (e.next = 13), s.blob()
                case 13:
                  e.t0 = e.sent
                case 14:
                  return (u = e.t0), e.abrupt('return', new Response(u, o))
                case 16:
                case 'end':
                  return e.stop()
              }
          }, e)
        })
      )).apply(this, arguments)
    }
    var A = function (e) {
      return new URL(String(e), location.href).href.replace(
        new RegExp('^'.concat(location.origin)),
        ''
      )
    }
    function I(e, t) {
      var r,
        n = new URL(e),
        a = o(t)
      try {
        for (a.s(); !(r = a.n()).done; ) {
          var i = r.value
          n.searchParams.delete(i)
        }
      } catch (s) {
        a.e(s)
      } finally {
        a.f()
      }
      return n.href
    }
    function M(e, t, r, n) {
      return F.apply(this, arguments)
    }
    function F() {
      return (F = c(
        t().mark(function e(r, n, a, i) {
          var s, c, u, l, h, f, p
          return t().wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (((s = I(n.url, a)), n.url !== s)) {
                      e.next = 3
                      break
                    }
                    return e.abrupt('return', r.match(n, i))
                  case 3:
                    return (
                      (c = Object.assign(Object.assign({}, i), {
                        ignoreSearch: !0,
                      })),
                      (e.next = 6),
                      r.keys(n, c)
                    )
                  case 6:
                    ;(u = e.sent), (l = o(u)), (e.prev = 8), l.s()
                  case 10:
                    if ((h = l.n()).done) {
                      e.next = 17
                      break
                    }
                    if (((f = h.value), (p = I(f.url, a)), s !== p)) {
                      e.next = 15
                      break
                    }
                    return e.abrupt('return', r.match(f, i))
                  case 15:
                    e.next = 10
                    break
                  case 17:
                    e.next = 22
                    break
                  case 19:
                    ;(e.prev = 19), (e.t0 = e.catch(8)), l.e(e.t0)
                  case 22:
                    return (e.prev = 22), l.f(), e.finish(22)
                  case 25:
                    return e.abrupt('return')
                  case 26:
                  case 'end':
                    return e.stop()
                }
            },
            e,
            null,
            [[8, 19, 22, 25]]
          )
        })
      )).apply(this, arguments)
    }
    var W = p(function e() {
        var t = this
        l(this, e),
          (this.promise = new Promise(function (e, r) {
            ;(t.resolve = e), (t.reject = r)
          }))
      }),
      D = new Set()
    function H() {
      return B.apply(this, arguments)
    }
    function B() {
      return (B = c(
        t().mark(function e() {
          var r, n, a
          return t().wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    0, (r = o(D)), (e.prev = 2), r.s()
                  case 4:
                    if ((n = r.n()).done) {
                      e.next = 11
                      break
                    }
                    return (a = n.value), (e.next = 8), a()
                  case 8:
                    0
                  case 9:
                    e.next = 4
                    break
                  case 11:
                    e.next = 16
                    break
                  case 13:
                    ;(e.prev = 13), (e.t0 = e.catch(2)), r.e(e.t0)
                  case 16:
                    return (e.prev = 16), r.f(), e.finish(16)
                  case 19:
                    0
                  case 20:
                  case 'end':
                    return e.stop()
                }
            },
            e,
            null,
            [[2, 13, 16, 19]]
          )
        })
      )).apply(this, arguments)
    }
    function G(e) {
      return new Promise(function (t) {
        return setTimeout(t, e)
      })
    }
    r(833)
    function V(e) {
      return 'string' === typeof e ? new Request(e) : e
    }
    var Y = (function () {
        function e(t, r) {
          l(this, e),
            (this._cacheKeys = {}),
            Object.assign(this, r),
            (this.event = r.event),
            (this._strategy = t),
            (this._handlerDeferred = new W()),
            (this._extendLifetimePromises = []),
            (this._plugins = u(t.plugins)),
            (this._pluginStateMap = new Map())
          var n,
            a = o(this._plugins)
          try {
            for (a.s(); !(n = a.n()).done; ) {
              var i = n.value
              this._pluginStateMap.set(i, {})
            }
          } catch (s) {
            a.e(s)
          } finally {
            a.f()
          }
          this.event.waitUntil(this._handlerDeferred.promise)
        }
        return (
          p(e, [
            {
              key: 'fetch',
              value: (function (e) {
                function t(t) {
                  return e.apply(this, arguments)
                }
                return (
                  (t.toString = function () {
                    return e.toString()
                  }),
                  t
                )
              })(
                (function () {
                  var e = c(
                    t().mark(function e(r) {
                      var n, a, i, s, c, u, l, h, f, p, v, d
                      return t().wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((n = this.event),
                                  !(
                                    'navigate' === (a = V(r)).mode &&
                                    n instanceof FetchEvent &&
                                    n.preloadResponse
                                  ))
                                ) {
                                  e.next = 9
                                  break
                                }
                                return (e.next = 5), n.preloadResponse
                              case 5:
                                if (!(i = e.sent)) {
                                  e.next = 9
                                  break
                                }
                                return e.abrupt('return', i)
                              case 9:
                                ;(s = this.hasCallback('fetchDidFail')
                                  ? a.clone()
                                  : null),
                                  (e.prev = 10),
                                  (c = o(
                                    this.iterateCallbacks('requestWillFetch')
                                  )),
                                  (e.prev = 12),
                                  c.s()
                              case 14:
                                if ((u = c.n()).done) {
                                  e.next = 21
                                  break
                                }
                                return (
                                  (l = u.value),
                                  (e.next = 18),
                                  l({ request: a.clone(), event: n })
                                )
                              case 18:
                                a = e.sent
                              case 19:
                                e.next = 14
                                break
                              case 21:
                                e.next = 26
                                break
                              case 23:
                                ;(e.prev = 23), (e.t0 = e.catch(12)), c.e(e.t0)
                              case 26:
                                return (e.prev = 26), c.f(), e.finish(26)
                              case 29:
                                e.next = 35
                                break
                              case 31:
                                if (
                                  ((e.prev = 31),
                                  (e.t1 = e.catch(10)),
                                  !(e.t1 instanceof Error))
                                ) {
                                  e.next = 35
                                  break
                                }
                                throw new _('plugin-error-request-will-fetch', {
                                  thrownErrorMessage: e.t1.message,
                                })
                              case 35:
                                return (
                                  (h = a.clone()),
                                  (e.prev = 36),
                                  (e.next = 39),
                                  fetch(
                                    a,
                                    'navigate' === a.mode
                                      ? void 0
                                      : this._strategy.fetchOptions
                                  )
                                )
                              case 39:
                                ;(f = e.sent),
                                  (p = o(
                                    this.iterateCallbacks('fetchDidSucceed')
                                  )),
                                  (e.prev = 42),
                                  p.s()
                              case 44:
                                if ((v = p.n()).done) {
                                  e.next = 51
                                  break
                                }
                                return (
                                  (d = v.value),
                                  (e.next = 48),
                                  d({ event: n, request: h, response: f })
                                )
                              case 48:
                                f = e.sent
                              case 49:
                                e.next = 44
                                break
                              case 51:
                                e.next = 56
                                break
                              case 53:
                                ;(e.prev = 53), (e.t2 = e.catch(42)), p.e(e.t2)
                              case 56:
                                return (e.prev = 56), p.f(), e.finish(56)
                              case 59:
                                return e.abrupt('return', f)
                              case 62:
                                if (((e.prev = 62), (e.t3 = e.catch(36)), !s)) {
                                  e.next = 68
                                  break
                                }
                                return (
                                  (e.next = 68),
                                  this.runCallbacks('fetchDidFail', {
                                    error: e.t3,
                                    event: n,
                                    originalRequest: s.clone(),
                                    request: h.clone(),
                                  })
                                )
                              case 68:
                                throw e.t3
                              case 69:
                              case 'end':
                                return e.stop()
                            }
                        },
                        e,
                        this,
                        [
                          [10, 31],
                          [12, 23, 26, 29],
                          [36, 62],
                          [42, 53, 56, 59],
                        ]
                      )
                    })
                  )
                  return function (t) {
                    return e.apply(this, arguments)
                  }
                })()
              ),
            },
            {
              key: 'fetchAndCachePut',
              value: (function () {
                var e = c(
                  t().mark(function e(r) {
                    var n, a
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), this.fetch(r)
                            case 2:
                              return (
                                (n = e.sent),
                                (a = n.clone()),
                                this.waitUntil(this.cachePut(r, a)),
                                e.abrupt('return', n)
                              )
                            case 6:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'cacheMatch',
              value: (function () {
                var e = c(
                  t().mark(function e(r) {
                    var n, a, i, s, c, u, l, h, f, p
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (n = V(r)),
                                (i = this._strategy),
                                (s = i.cacheName),
                                (c = i.matchOptions),
                                (e.next = 4),
                                this.getCacheKey(n, 'read')
                              )
                            case 4:
                              return (
                                (u = e.sent),
                                (l = Object.assign(Object.assign({}, c), {
                                  cacheName: s,
                                })),
                                (e.next = 8),
                                caches.match(u, l)
                              )
                            case 8:
                              ;(a = e.sent),
                                (h = o(
                                  this.iterateCallbacks(
                                    'cachedResponseWillBeUsed'
                                  )
                                )),
                                (e.prev = 11),
                                h.s()
                            case 13:
                              if ((f = h.n()).done) {
                                e.next = 23
                                break
                              }
                              return (
                                (p = f.value),
                                (e.next = 17),
                                p({
                                  cacheName: s,
                                  matchOptions: c,
                                  cachedResponse: a,
                                  request: u,
                                  event: this.event,
                                })
                              )
                            case 17:
                              if (((e.t0 = e.sent), e.t0)) {
                                e.next = 20
                                break
                              }
                              e.t0 = void 0
                            case 20:
                              a = e.t0
                            case 21:
                              e.next = 13
                              break
                            case 23:
                              e.next = 28
                              break
                            case 25:
                              ;(e.prev = 25), (e.t1 = e.catch(11)), h.e(e.t1)
                            case 28:
                              return (e.prev = 28), h.f(), e.finish(28)
                            case 31:
                              return e.abrupt('return', a)
                            case 32:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [[11, 25, 28, 31]]
                    )
                  })
                )
                return function (t) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'cachePut',
              value: (function () {
                var e = c(
                  t().mark(function e(r, n) {
                    var a, i, s, c, u, l, h, f, p, v, d, y, g
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (a = V(r)), (e.next = 3), G(0)
                            case 3:
                              return (e.next = 5), this.getCacheKey(a, 'write')
                            case 5:
                              ;(i = e.sent), (e.next = 11)
                              break
                            case 9:
                              ;(s = n.headers.get('Vary')) &&
                                O.debug(
                                  'The response for '.concat(A(i.url), ' ') +
                                    "has a 'Vary: ".concat(s, "' header. ") +
                                    'Consider setting the {ignoreVary: true} option on your strategy to ensure cache matching and deletion works as expected.'
                                )
                            case 11:
                              if (n) {
                                e.next = 14
                                break
                              }
                              throw new _('cache-put-with-no-response', {
                                url: A(i.url),
                              })
                            case 14:
                              return (
                                (e.next = 16),
                                this._ensureResponseSafeToCache(n)
                              )
                            case 16:
                              if ((c = e.sent)) {
                                e.next = 20
                                break
                              }
                              return e.abrupt('return', !1)
                            case 20:
                              return (
                                (u = this._strategy),
                                (l = u.cacheName),
                                (h = u.matchOptions),
                                (e.next = 23),
                                self.caches.open(l)
                              )
                            case 23:
                              if (
                                ((f = e.sent),
                                !(p = this.hasCallback('cacheDidUpdate')))
                              ) {
                                e.next = 31
                                break
                              }
                              return (
                                (e.next = 28),
                                M(f, i.clone(), ['__WB_REVISION__'], h)
                              )
                            case 28:
                              ;(e.t0 = e.sent), (e.next = 32)
                              break
                            case 31:
                              e.t0 = null
                            case 32:
                              return (
                                (v = e.t0),
                                (e.prev = 34),
                                (e.next = 37),
                                f.put(i, p ? c.clone() : c)
                              )
                            case 37:
                              e.next = 46
                              break
                            case 39:
                              if (
                                ((e.prev = 39),
                                (e.t1 = e.catch(34)),
                                !(e.t1 instanceof Error))
                              ) {
                                e.next = 46
                                break
                              }
                              if ('QuotaExceededError' !== e.t1.name) {
                                e.next = 45
                                break
                              }
                              return (e.next = 45), H()
                            case 45:
                              throw e.t1
                            case 46:
                              ;(d = o(this.iterateCallbacks('cacheDidUpdate'))),
                                (e.prev = 47),
                                d.s()
                            case 49:
                              if ((y = d.n()).done) {
                                e.next = 55
                                break
                              }
                              return (
                                (g = y.value),
                                (e.next = 53),
                                g({
                                  cacheName: l,
                                  oldResponse: v,
                                  newResponse: c.clone(),
                                  request: i,
                                  event: this.event,
                                })
                              )
                            case 53:
                              e.next = 49
                              break
                            case 55:
                              e.next = 60
                              break
                            case 57:
                              ;(e.prev = 57), (e.t2 = e.catch(47)), d.e(e.t2)
                            case 60:
                              return (e.prev = 60), d.f(), e.finish(60)
                            case 63:
                              return e.abrupt('return', !0)
                            case 64:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [
                        [34, 39],
                        [47, 57, 60, 63],
                      ]
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'getCacheKey',
              value: (function () {
                var e = c(
                  t().mark(function e(r, n) {
                    var a, i, s, c, u
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((a = ''.concat(r.url, ' | ').concat(n)),
                                this._cacheKeys[a])
                              ) {
                                e.next = 24
                                break
                              }
                              ;(i = r),
                                (s = o(
                                  this.iterateCallbacks('cacheKeyWillBeUsed')
                                )),
                                (e.prev = 4),
                                s.s()
                            case 6:
                              if ((c = s.n()).done) {
                                e.next = 15
                                break
                              }
                              return (
                                (u = c.value),
                                (e.t0 = V),
                                (e.next = 11),
                                u({
                                  mode: n,
                                  request: i,
                                  event: this.event,
                                  params: this.params,
                                })
                              )
                            case 11:
                              ;(e.t1 = e.sent), (i = (0, e.t0)(e.t1))
                            case 13:
                              e.next = 6
                              break
                            case 15:
                              e.next = 20
                              break
                            case 17:
                              ;(e.prev = 17), (e.t2 = e.catch(4)), s.e(e.t2)
                            case 20:
                              return (e.prev = 20), s.f(), e.finish(20)
                            case 23:
                              this._cacheKeys[a] = i
                            case 24:
                              return e.abrupt('return', this._cacheKeys[a])
                            case 25:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [[4, 17, 20, 23]]
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'hasCallback',
              value: function (e) {
                var t,
                  r = o(this._strategy.plugins)
                try {
                  for (r.s(); !(t = r.n()).done; ) {
                    if (e in t.value) return !0
                  }
                } catch (n) {
                  r.e(n)
                } finally {
                  r.f()
                }
                return !1
              },
            },
            {
              key: 'runCallbacks',
              value: (function () {
                var e = c(
                  t().mark(function e(r, n) {
                    var a, i, s
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              ;(a = o(this.iterateCallbacks(r))),
                                (e.prev = 1),
                                a.s()
                            case 3:
                              if ((i = a.n()).done) {
                                e.next = 9
                                break
                              }
                              return (s = i.value), (e.next = 7), s(n)
                            case 7:
                              e.next = 3
                              break
                            case 9:
                              e.next = 14
                              break
                            case 11:
                              ;(e.prev = 11), (e.t0 = e.catch(1)), a.e(e.t0)
                            case 14:
                              return (e.prev = 14), a.f(), e.finish(14)
                            case 17:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [[1, 11, 14, 17]]
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'iterateCallbacks',
              value: t().mark(function e(r) {
                var n,
                  a,
                  i,
                  s = this
                return t().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          ;(n = o(this._strategy.plugins)),
                            (e.prev = 1),
                            (i = t().mark(function e() {
                              var n, i, c
                              return t().wrap(function (e) {
                                for (;;)
                                  switch ((e.prev = e.next)) {
                                    case 0:
                                      if (
                                        'function' !== typeof (n = a.value)[r]
                                      ) {
                                        e.next = 6
                                        break
                                      }
                                      return (
                                        (i = s._pluginStateMap.get(n)),
                                        (c = function (e) {
                                          var t = Object.assign(
                                            Object.assign({}, e),
                                            { state: i }
                                          )
                                          return n[r](t)
                                        }),
                                        (e.next = 6),
                                        c
                                      )
                                    case 6:
                                    case 'end':
                                      return e.stop()
                                  }
                              }, e)
                            })),
                            n.s()
                        case 4:
                          if ((a = n.n()).done) {
                            e.next = 8
                            break
                          }
                          return e.delegateYield(i(), 't0', 6)
                        case 6:
                          e.next = 4
                          break
                        case 8:
                          e.next = 13
                          break
                        case 10:
                          ;(e.prev = 10), (e.t1 = e.catch(1)), n.e(e.t1)
                        case 13:
                          return (e.prev = 13), n.f(), e.finish(13)
                        case 16:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this,
                  [[1, 10, 13, 16]]
                )
              }),
            },
            {
              key: 'waitUntil',
              value: function (e) {
                return this._extendLifetimePromises.push(e), e
              },
            },
            {
              key: 'doneWaiting',
              value: (function () {
                var e = c(
                  t().mark(function e() {
                    var r
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (!(r = this._extendLifetimePromises.shift())) {
                                e.next = 5
                                break
                              }
                              return (e.next = 3), r
                            case 3:
                              e.next = 0
                              break
                            case 5:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function () {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'destroy',
              value: function () {
                this._handlerDeferred.resolve(null)
              },
            },
            {
              key: '_ensureResponseSafeToCache',
              value: (function () {
                var e = c(
                  t().mark(function e(r) {
                    var n, a, i, s, c
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              ;(n = r),
                                (a = !1),
                                (i = o(
                                  this.iterateCallbacks('cacheWillUpdate')
                                )),
                                (e.prev = 3),
                                i.s()
                            case 5:
                              if ((s = i.n()).done) {
                                e.next = 18
                                break
                              }
                              return (
                                (c = s.value),
                                (e.next = 9),
                                c({
                                  request: this.request,
                                  response: n,
                                  event: this.event,
                                })
                              )
                            case 9:
                              if (((e.t0 = e.sent), e.t0)) {
                                e.next = 12
                                break
                              }
                              e.t0 = void 0
                            case 12:
                              if (((n = e.t0), (a = !0), n)) {
                                e.next = 16
                                break
                              }
                              return e.abrupt('break', 18)
                            case 16:
                              e.next = 5
                              break
                            case 18:
                              e.next = 23
                              break
                            case 20:
                              ;(e.prev = 20), (e.t1 = e.catch(3)), i.e(e.t1)
                            case 23:
                              return (e.prev = 23), i.f(), e.finish(23)
                            case 26:
                              return (
                                a || (n && 200 !== n.status && (n = void 0)),
                                e.abrupt('return', n)
                              )
                            case 28:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [[3, 20, 23, 26]]
                    )
                  })
                )
                return function (t) {
                  return e.apply(this, arguments)
                }
              })(),
            },
          ]),
          e
        )
      })(),
      $ = (function () {
        function e() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
          l(this, e),
            (this.cacheName = C.getRuntimeName(t.cacheName)),
            (this.plugins = t.plugins || []),
            (this.fetchOptions = t.fetchOptions),
            (this.matchOptions = t.matchOptions)
        }
        return (
          p(e, [
            {
              key: 'handle',
              value: function (e) {
                return i(this.handleAll(e), 1)[0]
              },
            },
            {
              key: 'handleAll',
              value: function (e) {
                e instanceof FetchEvent &&
                  (e = { event: e, request: e.request })
                var t = e.event,
                  r =
                    'string' === typeof e.request
                      ? new Request(e.request)
                      : e.request,
                  n = 'params' in e ? e.params : void 0,
                  a = new Y(this, { event: t, request: r, params: n }),
                  i = this._getResponse(a, r, t)
                return [i, this._awaitComplete(i, a, r, t)]
              },
            },
            {
              key: '_getResponse',
              value: (function () {
                var e = c(
                  t().mark(function e(r, n, a) {
                    var i, s, c, u, l, h, f
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 2),
                                r.runCallbacks('handlerWillStart', {
                                  event: a,
                                  request: n,
                                })
                              )
                            case 2:
                              return (
                                (i = void 0),
                                (e.prev = 3),
                                (e.next = 6),
                                this._handle(n, r)
                              )
                            case 6:
                              if ((i = e.sent) && 'error' !== i.type) {
                                e.next = 9
                                break
                              }
                              throw new _('no-response', { url: n.url })
                            case 9:
                              e.next = 39
                              break
                            case 11:
                              if (
                                ((e.prev = 11),
                                (e.t0 = e.catch(3)),
                                !(e.t0 instanceof Error))
                              ) {
                                e.next = 34
                                break
                              }
                              ;(s = o(r.iterateCallbacks('handlerDidError'))),
                                (e.prev = 15),
                                s.s()
                            case 17:
                              if ((c = s.n()).done) {
                                e.next = 26
                                break
                              }
                              return (
                                (u = c.value),
                                (e.next = 21),
                                u({ error: e.t0, event: a, request: n })
                              )
                            case 21:
                              if (!(i = e.sent)) {
                                e.next = 24
                                break
                              }
                              return e.abrupt('break', 26)
                            case 24:
                              e.next = 17
                              break
                            case 26:
                              e.next = 31
                              break
                            case 28:
                              ;(e.prev = 28), (e.t1 = e.catch(15)), s.e(e.t1)
                            case 31:
                              return (e.prev = 31), s.f(), e.finish(31)
                            case 34:
                              if (i) {
                                e.next = 38
                                break
                              }
                              throw e.t0
                            case 38:
                              0
                            case 39:
                              ;(l = o(
                                r.iterateCallbacks('handlerWillRespond')
                              )),
                                (e.prev = 40),
                                l.s()
                            case 42:
                              if ((h = l.n()).done) {
                                e.next = 49
                                break
                              }
                              return (
                                (f = h.value),
                                (e.next = 46),
                                f({ event: a, request: n, response: i })
                              )
                            case 46:
                              i = e.sent
                            case 47:
                              e.next = 42
                              break
                            case 49:
                              e.next = 54
                              break
                            case 51:
                              ;(e.prev = 51), (e.t2 = e.catch(40)), l.e(e.t2)
                            case 54:
                              return (e.prev = 54), l.f(), e.finish(54)
                            case 57:
                              return e.abrupt('return', i)
                            case 58:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [
                        [3, 11],
                        [15, 28, 31, 34],
                        [40, 51, 54, 57],
                      ]
                    )
                  })
                )
                return function (t, r, n) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: '_awaitComplete',
              value: (function () {
                var e = c(
                  t().mark(function e(r, n, a, i) {
                    var s, c
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.prev = 0), (e.next = 3), r
                            case 3:
                              ;(s = e.sent), (e.next = 8)
                              break
                            case 6:
                              ;(e.prev = 6), (e.t0 = e.catch(0))
                            case 8:
                              return (
                                (e.prev = 8),
                                (e.next = 11),
                                n.runCallbacks('handlerDidRespond', {
                                  event: i,
                                  request: a,
                                  response: s,
                                })
                              )
                            case 11:
                              return (e.next = 13), n.doneWaiting()
                            case 13:
                              e.next = 18
                              break
                            case 15:
                              ;(e.prev = 15),
                                (e.t1 = e.catch(8)),
                                e.t1 instanceof Error && (c = e.t1)
                            case 18:
                              return (
                                (e.next = 20),
                                n.runCallbacks('handlerDidComplete', {
                                  event: i,
                                  request: a,
                                  response: s,
                                  error: c,
                                })
                              )
                            case 20:
                              if ((n.destroy(), !c)) {
                                e.next = 23
                                break
                              }
                              throw c
                            case 23:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      null,
                      [
                        [0, 6],
                        [8, 15],
                      ]
                    )
                  })
                )
                return function (t, r, n, a) {
                  return e.apply(this, arguments)
                }
              })(),
            },
          ]),
          e
        )
      })(),
      J = (function (e) {
        d(n, e)
        var r = x(n)
        function n() {
          var e,
            t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {}
          return (
            l(this, n),
            (t.cacheName = C.getPrecacheName(t.cacheName)),
            ((e = r.call(this, t))._fallbackToNetwork =
              !1 !== t.fallbackToNetwork),
            e.plugins.push(n.copyRedirectedCacheableResponsesPlugin),
            e
          )
        }
        return (
          p(n, [
            {
              key: '_handle',
              value: (function () {
                var e = c(
                  t().mark(function e(r, n) {
                    var a
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), n.cacheMatch(r)
                            case 2:
                              if (!(a = e.sent)) {
                                e.next = 5
                                break
                              }
                              return e.abrupt('return', a)
                            case 5:
                              if (!n.event || 'install' !== n.event.type) {
                                e.next = 9
                                break
                              }
                              return (e.next = 8), this._handleInstall(r, n)
                            case 8:
                            case 11:
                              return e.abrupt('return', e.sent)
                            case 9:
                              return (e.next = 11), this._handleFetch(r, n)
                            case 12:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: '_handleFetch',
              value: (function () {
                var e = c(
                  t().mark(function e(r, n) {
                    var a, i, s, c, o, u
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((i = n.params || {}), !this._fallbackToNetwork)
                              ) {
                                e.next = 17
                                break
                              }
                              return (
                                (s = i.integrity),
                                (c = r.integrity),
                                (o = !c || c === s),
                                (e.next = 8),
                                n.fetch(
                                  new Request(r, {
                                    integrity:
                                      'no-cors' !== r.mode ? c || s : void 0,
                                  })
                                )
                              )
                            case 8:
                              if (
                                ((a = e.sent), !s || !o || 'no-cors' === r.mode)
                              ) {
                                e.next = 15
                                break
                              }
                              return (
                                this._useDefaultCacheabilityPluginIfNeeded(),
                                (e.next = 13),
                                n.cachePut(r, a.clone())
                              )
                            case 13:
                              e.sent
                            case 15:
                              e.next = 18
                              break
                            case 17:
                              throw new _('missing-precache-entry', {
                                cacheName: this.cacheName,
                                url: r.url,
                              })
                            case 18:
                              e.next = 34
                              break
                            case 23:
                              e.t0 = e.sent
                            case 24:
                              ;(u = e.t0),
                                O.groupCollapsed(
                                  'Precaching is responding to: ' + A(r.url)
                                ),
                                O.log(
                                  'Serving the precached url: '.concat(
                                    A(u instanceof Request ? u.url : u)
                                  )
                                ),
                                O.groupCollapsed('View request details here.'),
                                O.log(r),
                                O.groupEnd(),
                                O.groupCollapsed('View response details here.'),
                                O.log(a),
                                O.groupEnd(),
                                O.groupEnd()
                            case 34:
                              return e.abrupt('return', a)
                            case 35:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: '_handleInstall',
              value: (function () {
                var e = c(
                  t().mark(function e(r, n) {
                    var a
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                this._useDefaultCacheabilityPluginIfNeeded(),
                                (e.next = 3),
                                n.fetch(r)
                              )
                            case 3:
                              return (
                                (a = e.sent),
                                (e.next = 6),
                                n.cachePut(r, a.clone())
                              )
                            case 6:
                              if (e.sent) {
                                e.next = 9
                                break
                              }
                              throw new _('bad-precaching-response', {
                                url: r.url,
                                status: a.status,
                              })
                            case 9:
                              return e.abrupt('return', a)
                            case 10:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: '_useDefaultCacheabilityPluginIfNeeded',
              value: function () {
                var e,
                  t = null,
                  r = 0,
                  a = o(this.plugins.entries())
                try {
                  for (a.s(); !(e = a.n()).done; ) {
                    var s = i(e.value, 2),
                      c = s[0],
                      u = s[1]
                    u !== n.copyRedirectedCacheableResponsesPlugin &&
                      (u === n.defaultPrecacheCacheabilityPlugin && (t = c),
                      u.cacheWillUpdate && r++)
                  }
                } catch (l) {
                  a.e(l)
                } finally {
                  a.f()
                }
                0 === r
                  ? this.plugins.push(n.defaultPrecacheCacheabilityPlugin)
                  : r > 1 && null !== t && this.plugins.splice(t, 1)
              },
            },
          ]),
          n
        )
      })($)
    ;(J.defaultPrecacheCacheabilityPlugin = {
      cacheWillUpdate: function (e) {
        return c(
          t().mark(function r() {
            var n
            return t().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if ((n = e.response) && !(n.status >= 400)) {
                      t.next = 3
                      break
                    }
                    return t.abrupt('return', null)
                  case 3:
                    return t.abrupt('return', n)
                  case 4:
                  case 'end':
                    return t.stop()
                }
            }, r)
          })
        )()
      },
    }),
      (J.copyRedirectedCacheableResponsesPlugin = {
        cacheWillUpdate: function (e) {
          return c(
            t().mark(function r() {
              var n
              return t().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (!(n = e.response).redirected) {
                        t.next = 7
                        break
                      }
                      return (t.next = 4), N(n)
                    case 4:
                      ;(t.t0 = t.sent), (t.next = 8)
                      break
                    case 7:
                      t.t0 = n
                    case 8:
                      return t.abrupt('return', t.t0)
                    case 9:
                    case 'end':
                      return t.stop()
                  }
              }, r)
            })
          )()
        },
      })
    var Q,
      z = (function () {
        function e() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            r = t.cacheName,
            n = t.plugins,
            a = void 0 === n ? [] : n,
            i = t.fallbackToNetwork,
            s = void 0 === i || i
          l(this, e),
            (this._urlsToCacheKeys = new Map()),
            (this._urlsToCacheModes = new Map()),
            (this._cacheKeysToIntegrities = new Map()),
            (this._strategy = new J({
              cacheName: C.getPrecacheName(r),
              plugins: [].concat(u(a), [new j({ precacheController: this })]),
              fallbackToNetwork: s,
            })),
            (this.install = this.install.bind(this)),
            (this.activate = this.activate.bind(this))
        }
        return (
          p(e, [
            {
              key: 'strategy',
              get: function () {
                return this._strategy
              },
            },
            {
              key: 'precache',
              value: function (e) {
                this.addToCacheList(e),
                  this._installAndActiveListenersAdded ||
                    (self.addEventListener('install', this.install),
                    self.addEventListener('activate', this.activate),
                    (this._installAndActiveListenersAdded = !0))
              },
            },
            {
              key: 'addToCacheList',
              value: function (e) {
                var t,
                  r = [],
                  n = o(e)
                try {
                  for (n.s(); !(t = n.n()).done; ) {
                    var a = t.value
                    'string' === typeof a
                      ? r.push(a)
                      : a && void 0 === a.revision && r.push(a.url)
                    var i = q(a),
                      s = i.cacheKey,
                      c = i.url,
                      u =
                        'string' !== typeof a && a.revision
                          ? 'reload'
                          : 'default'
                    if (
                      this._urlsToCacheKeys.has(c) &&
                      this._urlsToCacheKeys.get(c) !== s
                    )
                      throw new _('add-to-cache-list-conflicting-entries', {
                        firstEntry: this._urlsToCacheKeys.get(c),
                        secondEntry: s,
                      })
                    if ('string' !== typeof a && a.integrity) {
                      if (
                        this._cacheKeysToIntegrities.has(s) &&
                        this._cacheKeysToIntegrities.get(s) !== a.integrity
                      )
                        throw new _(
                          'add-to-cache-list-conflicting-integrities',
                          { url: c }
                        )
                      this._cacheKeysToIntegrities.set(s, a.integrity)
                    }
                    if (
                      (this._urlsToCacheKeys.set(c, s),
                      this._urlsToCacheModes.set(c, u),
                      r.length > 0)
                    ) {
                      var l =
                        'Workbox is precaching URLs without revision ' +
                        'info: '.concat(
                          r.join(', '),
                          '\nThis is generally NOT safe. '
                        ) +
                        'Learn more at https://bit.ly/wb-precache'
                      console.warn(l)
                    }
                  }
                } catch (h) {
                  n.e(h)
                } finally {
                  n.f()
                }
              },
            },
            {
              key: 'install',
              value: function (e) {
                var r = this
                return E(
                  e,
                  c(
                    t().mark(function n() {
                      var a, s, c, u, l, h, f, p, v, d, y
                      return t().wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                ;(a = new T()),
                                  r.strategy.plugins.push(a),
                                  (s = o(r._urlsToCacheKeys)),
                                  (t.prev = 3),
                                  s.s()
                              case 5:
                                if ((c = s.n()).done) {
                                  t.next = 14
                                  break
                                }
                                return (
                                  (u = i(c.value, 2)),
                                  (l = u[0]),
                                  (h = u[1]),
                                  (f = r._cacheKeysToIntegrities.get(h)),
                                  (p = r._urlsToCacheModes.get(l)),
                                  (v = new Request(l, {
                                    integrity: f,
                                    cache: p,
                                    credentials: 'same-origin',
                                  })),
                                  (t.next = 12),
                                  Promise.all(
                                    r.strategy.handleAll({
                                      params: { cacheKey: h },
                                      request: v,
                                      event: e,
                                    })
                                  )
                                )
                              case 12:
                                t.next = 5
                                break
                              case 14:
                                t.next = 19
                                break
                              case 16:
                                ;(t.prev = 16), (t.t0 = t.catch(3)), s.e(t.t0)
                              case 19:
                                return (t.prev = 19), s.f(), t.finish(19)
                              case 22:
                                return (
                                  (d = a.updatedURLs),
                                  (y = a.notUpdatedURLs),
                                  t.abrupt('return', {
                                    updatedURLs: d,
                                    notUpdatedURLs: y,
                                  })
                                )
                              case 25:
                              case 'end':
                                return t.stop()
                            }
                        },
                        n,
                        null,
                        [[3, 16, 19, 22]]
                      )
                    })
                  )
                )
              },
            },
            {
              key: 'activate',
              value: function (e) {
                var r = this
                return E(
                  e,
                  c(
                    t().mark(function e() {
                      var n, a, i, s, c, u, l
                      return t().wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.next = 2),
                                  self.caches.open(r.strategy.cacheName)
                                )
                              case 2:
                                return (n = e.sent), (e.next = 5), n.keys()
                              case 5:
                                ;(a = e.sent),
                                  (i = new Set(r._urlsToCacheKeys.values())),
                                  (s = []),
                                  (c = o(a)),
                                  (e.prev = 9),
                                  c.s()
                              case 11:
                                if ((u = c.n()).done) {
                                  e.next = 19
                                  break
                                }
                                if (((l = u.value), i.has(l.url))) {
                                  e.next = 17
                                  break
                                }
                                return (e.next = 16), n.delete(l)
                              case 16:
                                s.push(l.url)
                              case 17:
                                e.next = 11
                                break
                              case 19:
                                e.next = 24
                                break
                              case 21:
                                ;(e.prev = 21), (e.t0 = e.catch(9)), c.e(e.t0)
                              case 24:
                                return (e.prev = 24), c.f(), e.finish(24)
                              case 27:
                                return e.abrupt('return', { deletedURLs: s })
                              case 29:
                              case 'end':
                                return e.stop()
                            }
                        },
                        e,
                        null,
                        [[9, 21, 24, 27]]
                      )
                    })
                  )
                )
              },
            },
            {
              key: 'getURLsToCacheKeys',
              value: function () {
                return this._urlsToCacheKeys
              },
            },
            {
              key: 'getCachedURLs',
              value: function () {
                return u(this._urlsToCacheKeys.keys())
              },
            },
            {
              key: 'getCacheKeyForURL',
              value: function (e) {
                var t = new URL(e, location.href)
                return this._urlsToCacheKeys.get(t.href)
              },
            },
            {
              key: 'getIntegrityForCacheKey',
              value: function (e) {
                return this._cacheKeysToIntegrities.get(e)
              },
            },
            {
              key: 'matchPrecache',
              value: (function () {
                var e = c(
                  t().mark(function e(r) {
                    var n, a, i
                    return t().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((n = r instanceof Request ? r.url : r),
                                !(a = this.getCacheKeyForURL(n)))
                              ) {
                                e.next = 7
                                break
                              }
                              return (
                                (e.next = 5),
                                self.caches.open(this.strategy.cacheName)
                              )
                            case 5:
                              return (
                                (i = e.sent), e.abrupt('return', i.match(a))
                              )
                            case 7:
                              return e.abrupt('return', void 0)
                            case 8:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'createHandlerBoundToURL',
              value: function (e) {
                var t = this,
                  r = this.getCacheKeyForURL(e)
                if (!r) throw new _('non-precached-url', { url: e })
                return function (n) {
                  return (
                    (n.request = new Request(e)),
                    (n.params = Object.assign({ cacheKey: r }, n.params)),
                    t.strategy.handle(n)
                  )
                }
              },
            },
          ]),
          e
        )
      })(),
      X = function () {
        return Q || (Q = new z()), Q
      }
    r(185)
    var Z,
      ee = 'GET',
      te = function (e) {
        return e && 'object' === typeof e ? e : { handle: e }
      },
      re = (function () {
        function e(t, r) {
          var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ee
          l(this, e),
            (this.handler = te(r)),
            (this.match = t),
            (this.method = n)
        }
        return (
          p(e, [
            {
              key: 'setCatchHandler',
              value: function (e) {
                this.catchHandler = te(e)
              },
            },
          ]),
          e
        )
      })(),
      ne = (function (e) {
        d(r, e)
        var t = x(r)
        function r(e, n, a) {
          l(this, r)
          return t.call(
            this,
            function (t) {
              var r = t.url,
                n = e.exec(r.href)
              if (n && (r.origin === location.origin || 0 === n.index))
                return n.slice(1)
            },
            n,
            a
          )
        }
        return p(r)
      })(re),
      ae = (function () {
        function e() {
          l(this, e),
            (this._routes = new Map()),
            (this._defaultHandlerMap = new Map())
        }
        return (
          p(e, [
            {
              key: 'routes',
              get: function () {
                return this._routes
              },
            },
            {
              key: 'addFetchListener',
              value: function () {
                var e = this
                self.addEventListener('fetch', function (t) {
                  var r = t.request,
                    n = e.handleRequest({ request: r, event: t })
                  n && t.respondWith(n)
                })
              },
            },
            {
              key: 'addCacheListener',
              value: function () {
                var e = this
                self.addEventListener('message', function (t) {
                  if (t.data && 'CACHE_URLS' === t.data.type) {
                    var r = t.data.payload
                    0
                    var n = Promise.all(
                      r.urlsToCache.map(function (r) {
                        'string' === typeof r && (r = [r])
                        var n = m(Request, u(r))
                        return e.handleRequest({ request: n, event: t })
                      })
                    )
                    t.waitUntil(n),
                      t.ports &&
                        t.ports[0] &&
                        n.then(function () {
                          return t.ports[0].postMessage(!0)
                        })
                  }
                })
              },
            },
            {
              key: 'handleRequest',
              value: function (e) {
                var r = this,
                  n = e.request,
                  a = e.event
                var i = new URL(n.url, location.href)
                if (i.protocol.startsWith('http')) {
                  var s = i.origin === location.origin,
                    o = this.findMatchingRoute({
                      event: a,
                      request: n,
                      sameOrigin: s,
                      url: i,
                    }),
                    u = o.params,
                    l = o.route,
                    h = l && l.handler
                  0
                  var f = n.method
                  if (
                    (!h &&
                      this._defaultHandlerMap.has(f) &&
                      (h = this._defaultHandlerMap.get(f)),
                    h)
                  ) {
                    var p
                    0
                    try {
                      p = h.handle({ url: i, request: n, event: a, params: u })
                    } catch (d) {
                      p = Promise.reject(d)
                    }
                    var v = l && l.catchHandler
                    return (
                      p instanceof Promise &&
                        (this._catchHandler || v) &&
                        (p = p.catch(
                          (function () {
                            var e = c(
                              t().mark(function e(s) {
                                return t().wrap(
                                  function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          if (!v) {
                                            e.next = 11
                                            break
                                          }
                                          return (
                                            (e.prev = 2),
                                            (e.next = 5),
                                            v.handle({
                                              url: i,
                                              request: n,
                                              event: a,
                                              params: u,
                                            })
                                          )
                                        case 5:
                                          return e.abrupt('return', e.sent)
                                        case 8:
                                          ;(e.prev = 8),
                                            (e.t0 = e.catch(2)),
                                            e.t0 instanceof Error && (s = e.t0)
                                        case 11:
                                          if (!r._catchHandler) {
                                            e.next = 14
                                            break
                                          }
                                          return e.abrupt(
                                            'return',
                                            r._catchHandler.handle({
                                              url: i,
                                              request: n,
                                              event: a,
                                            })
                                          )
                                        case 14:
                                          throw s
                                        case 15:
                                        case 'end':
                                          return e.stop()
                                      }
                                  },
                                  e,
                                  null,
                                  [[2, 8]]
                                )
                              })
                            )
                            return function (t) {
                              return e.apply(this, arguments)
                            }
                          })()
                        )),
                      p
                    )
                  }
                }
              },
            },
            {
              key: 'findMatchingRoute',
              value: function (e) {
                var t,
                  r = e.url,
                  n = e.sameOrigin,
                  a = e.request,
                  i = e.event,
                  s = o(this._routes.get(a.method) || [])
                try {
                  for (s.s(); !(t = s.n()).done; ) {
                    var c = t.value,
                      u = void 0,
                      l = c.match({
                        url: r,
                        sameOrigin: n,
                        request: a,
                        event: i,
                      })
                    if (l)
                      return (
                        (u = l),
                        ((Array.isArray(u) && 0 === u.length) ||
                          (l.constructor === Object &&
                            0 === Object.keys(l).length) ||
                          'boolean' === typeof l) &&
                          (u = void 0),
                        { route: c, params: u }
                      )
                  }
                } catch (h) {
                  s.e(h)
                } finally {
                  s.f()
                }
                return {}
              },
            },
            {
              key: 'setDefaultHandler',
              value: function (e) {
                var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : ee
                this._defaultHandlerMap.set(t, te(e))
              },
            },
            {
              key: 'setCatchHandler',
              value: function (e) {
                this._catchHandler = te(e)
              },
            },
            {
              key: 'registerRoute',
              value: function (e) {
                this._routes.has(e.method) || this._routes.set(e.method, []),
                  this._routes.get(e.method).push(e)
              },
            },
            {
              key: 'unregisterRoute',
              value: function (e) {
                if (!this._routes.has(e.method))
                  throw new _('unregister-route-but-not-found-with-method', {
                    method: e.method,
                  })
                var t = this._routes.get(e.method).indexOf(e)
                if (!(t > -1))
                  throw new _('unregister-route-route-not-registered')
                this._routes.get(e.method).splice(t, 1)
              },
            },
          ]),
          e
        )
      })(),
      ie = function () {
        return Z || ((Z = new ae()).addFetchListener(), Z.addCacheListener()), Z
      }
    function se(e) {
      for (
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          r = function () {
            var r = a[n]
            t.some(function (e) {
              return e.test(r)
            }) && e.searchParams.delete(r)
          },
          n = 0,
          a = u(e.searchParams.keys());
        n < a.length;
        n++
      )
        r()
      return e
    }
    var ce = (function (e) {
      d(n, e)
      var r = x(n)
      function n(e, a) {
        l(this, n)
        return r.call(
          this,
          function (r) {
            var n,
              i = r.request,
              s = e.getURLsToCacheKeys(),
              c = o(
                (function (e) {
                  var r =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    n = r.ignoreURLParametersMatching,
                    a = void 0 === n ? [/^utm_/, /^fbclid$/] : n,
                    i = r.directoryIndex,
                    s = void 0 === i ? 'index.html' : i,
                    c = r.cleanURLs,
                    u = void 0 === c || c,
                    l = r.urlManipulation
                  return t().mark(function r() {
                    var n, i, c, h, f, p, v, d
                    return t().wrap(
                      function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                ((n = new URL(e, location.href)).hash = ''),
                                (t.next = 4),
                                n.href
                              )
                            case 4:
                              return (i = se(n, a)), (t.next = 7), i.href
                            case 7:
                              if (!s || !i.pathname.endsWith('/')) {
                                t.next = 12
                                break
                              }
                              return (
                                ((c = new URL(i.href)).pathname += s),
                                (t.next = 12),
                                c.href
                              )
                            case 12:
                              if (!u) {
                                t.next = 17
                                break
                              }
                              return (
                                ((h = new URL(i.href)).pathname += '.html'),
                                (t.next = 17),
                                h.href
                              )
                            case 17:
                              if (!l) {
                                t.next = 36
                                break
                              }
                              ;(f = l({ url: n })),
                                (p = o(f)),
                                (t.prev = 20),
                                p.s()
                            case 22:
                              if ((v = p.n()).done) {
                                t.next = 28
                                break
                              }
                              return (d = v.value), (t.next = 26), d.href
                            case 26:
                              t.next = 22
                              break
                            case 28:
                              t.next = 33
                              break
                            case 30:
                              ;(t.prev = 30), (t.t0 = t.catch(20)), p.e(t.t0)
                            case 33:
                              return (t.prev = 33), p.f(), t.finish(33)
                            case 36:
                            case 'end':
                              return t.stop()
                          }
                      },
                      r,
                      null,
                      [[20, 30, 33, 36]]
                    )
                  })()
                })(i.url, a)
              )
            try {
              for (c.s(); !(n = c.n()).done; ) {
                var u = n.value,
                  l = s.get(u)
                if (l)
                  return {
                    cacheKey: l,
                    integrity: e.getIntegrityForCacheKey(l),
                  }
              }
            } catch (h) {
              c.e(h)
            } finally {
              c.f()
            }
          },
          e.strategy
        )
      }
      return p(n)
    })(re)
    function oe(e) {
      var t = X()
      !(function (e, t, r) {
        var n
        if ('string' === typeof e) {
          var a = new URL(e, location.href)
          n = new re(
            function (e) {
              return e.url.href === a.href
            },
            t,
            r
          )
        } else if (e instanceof RegExp) n = new ne(e, t, r)
        else if ('function' === typeof e) n = new re(e, t, r)
        else {
          if (!(e instanceof re))
            throw new _('unsupported-route-type', {
              moduleName: 'workbox-routing',
              funcName: 'registerRoute',
              paramName: 'capture',
            })
          n = e
        }
        ie().registerRoute(n)
      })(new ce(t, e))
    }
    var ue
    ;(function (e) {
      X().precache(e)
    })([
      { revision: 'a6c4e9e6c5e95b04dc7f3cada7089ab5', url: '/index.html' },
      { revision: null, url: '/static/css/main.9b3ba926.css' },
      { revision: null, url: '/static/js/main.1461cfeb.js' },
      { revision: null, url: '/static/media/about1.2078347829271ea145a7.png' },
      { revision: null, url: '/static/media/about3.144336bae0a3f7068458.png' },
      { revision: null, url: '/static/media/landing.31d5118ac58a2e2ce5fb.png' },
      { revision: null, url: '/static/media/loader.db6161c28461a9183aec.gif' },
      { revision: null, url: '/static/media/reg.9b21abb98521fd9b055e.jpg' },
    ]),
      oe(ue),
      self.addEventListener('push', function (e) {
        var t = e.data.json()
        self.registration.showNotification(t.title, { body: t.body })
      })
  })()
})()
//# sourceMappingURL=service-worker.js.mapa
