!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.Tessen = t())
    : (e.Tessen = t());
})(this, function () {
  return (function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var i = (n[r] = { exports: {}, id: r, loaded: !1 });
      return e[r].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
    }
    var n = {};
    return (t.m = e), (t.c = n), (t.p = '/'), t(0);
  })([
    function (e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var i = n(1),
        o = r(i);
      (window.Tessen = window.Tessen || o.default),
        'undefined' != typeof e && e.exports && (e.exports = o.default);
    },
    function (e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var o,
        a = n(2),
        u = r(a),
        s = n(3),
        c = r(s),
        l =
          ((o = {}),
          i(o, s.NewRelic.pluginName, s.NewRelic),
          i(o, s.NewRelicInsights.pluginName, s.NewRelicInsights),
          i(o, s.Segment.pluginName, s.Segment),
          o),
        f = new s.Logger(),
        d = new c.default(f),
        p = !1;
      t.default = {
        locations: s.locations,
        version: s.version,
        disableNewRelicInsightsPlugin: function () {
          p = !0;
        },
        load: function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [],
            t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          if (Array.isArray(e) && (0, u.default)(t)) {
            var n = e
              .map(function (e) {
                return l[e] ? l[e] : null;
              })
              .filter(Boolean);
            return (
              n.indexOf(s.NewRelicInsights) === -1 &&
                p === !1 &&
                n.push(s.NewRelicInsights),
              d.usePlugins(n, t),
              d.load(n)
            );
          }
        },
        get lastPageContext() {
          return d.lastPageContext;
        },
        debugLevel: function (e) {
          return (
            f.level(e),
            f.log(
              'Set debug level to ' +
                e +
                ' (' +
                ['disabled', 'errors and logs', 'verbose'][e] +
                ')'
            ),
            f.level()
          );
        },
        identify: function () {
          return d.identify.apply(d, arguments);
        },
        page: function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
          return d.page(e, t, n);
        },
        track: function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
          return d.track(e, t, n);
        },
      };
    },
    function (e, t) {
      'use strict';
      function n(e) {
        if (
          'object' === ('undefined' == typeof e ? 'undefined' : r(e)) &&
          null !== e
        ) {
          if ('function' == typeof Object.getPrototypeOf) {
            var t = Object.getPrototypeOf(e);
            return t === Object.prototype || null === t;
          }
          return '[object Object]' == Object.prototype.toString.call(e);
        }
        return !1;
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            };
      t.default = n;
    },
    function (e, t, n) {
      'use strict';
      function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      }
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function o(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.Segment = t.NewRelicInsights = t.NewRelic = t.getGuid = t.Logger = t.version = t.locations = void 0);
      var a =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              },
        u = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        s = n(4);
      Object.defineProperty(t, 'version', {
        enumerable: !0,
        get: function () {
          return i(s).default;
        },
      });
      var c = n(5);
      Object.defineProperty(t, 'Logger', {
        enumerable: !0,
        get: function () {
          return i(c).default;
        },
      });
      var l = n(6);
      Object.defineProperty(t, 'getGuid', {
        enumerable: !0,
        get: function () {
          return i(l).default;
        },
      });
      var f = n(9);
      Object.defineProperty(t, 'NewRelic', {
        enumerable: !0,
        get: function () {
          return i(f).default;
        },
      });
      var d = n(14);
      Object.defineProperty(t, 'NewRelicInsights', {
        enumerable: !0,
        get: function () {
          return i(d).default;
        },
      });
      var p = n(15);
      Object.defineProperty(t, 'Segment', {
        enumerable: !0,
        get: function () {
          return i(p).default;
        },
      }),
        n(18);
      var _ = n(2),
        g = i(_),
        v = n(19),
        h = i(v),
        y = i(s),
        m = n(17),
        b = r(m),
        w = n(20),
        E = i(w),
        T =
          ((t.locations = b.LOCATIONS),
          (function () {
            function e(t) {
              o(this, e),
                (this._lastPageContext = {}),
                (this._plugins = []),
                (this._sessionHandler = new E.default()),
                (this._logger = t);
            }
            return (
              u(e, [
                {
                  key: 'enableSessionHandler',
                  value: function () {
                    return this._sessionHandler.enable(), this;
                  },
                },
                {
                  key: 'disableSessionHandler',
                  value: function () {
                    return this._sessionHandler.disable(), this;
                  },
                },
                {
                  key: 'usePlugins',
                  value: function (e, t) {
                    var n = this;
                    if (!Array.isArray(e))
                      throw new Error('Plugins should be an Array');
                    if (!(0, g.default)(t))
                      throw new Error(
                        'Configuration should be an Object literal'
                      );
                    this._plugins = e.map(function (e) {
                      return new e(
                        t[e.pluginName],
                        n._logger,
                        n._sessionHandler
                      );
                    });
                  },
                },
                {
                  key: 'load',
                  value: function () {
                    var e = this,
                      t =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : [];
                    if (
                      (this._logger.trace('Loading Tessen'), !Array.isArray(t))
                    )
                      throw new Error('Plugins should be an Array');
                    return Promise.all(
                      t.map(function (t) {
                        var n = e._plugins.find(function (e) {
                          return e instanceof t;
                        });
                        return n && n.validateConfiguration()
                          ? n.initializePlugin()
                          : Promise.resolve();
                      })
                    );
                  },
                },
                {
                  key: 'identify',
                  value: function () {
                    for (
                      var e, t = arguments.length, n = Array(t), r = 0;
                      r < t;
                      r++
                    )
                      n[r] = arguments[r];
                    var i = {};
                    return (
                      n[0] &&
                      'number' == typeof n[0] &&
                      n[1] &&
                      'object' === a(n[1])
                        ? (i = n[1])
                        : 'object' === a(n[0]) && (i = n[0]),
                      (i.tessenVersionNumber = y.default),
                      (e = this._logger).trace.apply(
                        e,
                        ['Tessen.identify()'].concat(n)
                      ),
                      this._sessionHandler.updateLastEventTime(),
                      Promise.all(
                        this._plugins.map(function (e) {
                          if (
                            (e.setIdentity.apply(e, n), e.options.identifiable)
                          )
                            return e.queueIdentify();
                        })
                      )
                    );
                  },
                },
                {
                  key: 'page',
                  value: function (e) {
                    var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : {},
                      n =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : {};
                    (t.trackOrPage = b.TRACK_EVENT_TYPES.page),
                      this._logger.trace('Tessen.page()', e, t, n);
                    var r = new h.default(e, this._logger, t, n);
                    return (
                      !!r.valid() &&
                      ((this._lastPageContext = {
                        name: e,
                        properties: t,
                        config: n,
                      }),
                      this._sessionHandler.updateLastEventTime(),
                      Promise.all(
                        this._plugins.map(function (e) {
                          return e.queuePage(r);
                        })
                      ).then(function () {
                        return !0;
                      }))
                    );
                  },
                },
                {
                  key: 'track',
                  value: function (e) {
                    var t = this,
                      n =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : {},
                      r =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : {};
                    (n.trackOrPage = b.TRACK_EVENT_TYPES.track),
                      this._logger.trace('Tessen.track()', e, n, r);
                    var i = new h.default(e, this._logger, n, r);
                    return (
                      !!i.valid() &&
                      (this._sessionHandler.updateLastEventTime(),
                      Promise.all(
                        this._plugins.map(function (i) {
                          return i.queueTrack(
                            new h.default(e, t._logger, n, r)
                          );
                        })
                      ).then(function () {
                        return !0;
                      }))
                    );
                  },
                },
                {
                  key: 'lastPageContext',
                  get: function () {
                    return this._lastPageContext;
                  },
                },
              ]),
              e
            );
          })());
      t.default = T;
    },
    function (e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = '1.14.0');
    },
    function (e, t) {
      'use strict';
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        i = (function () {
          function e() {
            n(this, e), (this._debugMode = 0);
          }
          return (
            r(e, [
              {
                key: 'level',
                value: function (e) {
                  return (
                    'number' == typeof e && (this._debugMode = parseInt(e, 10)),
                    this._debugMode
                  );
                },
              },
              {
                key: 'error',
                value: function () {
                  if (this.level() > 0) {
                    var e;
                    (e = console).error.apply(e, arguments);
                  }
                },
              },
              {
                key: 'warn',
                value: function () {
                  if (this.level() > 0) {
                    var e;
                    (e = console).error.apply(e, arguments);
                  }
                },
              },
              {
                key: 'log',
                value: function () {
                  if (this.level() > 0) {
                    var e;
                    (e = console).log.apply(e, arguments);
                  }
                },
              },
              {
                key: 'trace',
                value: function () {
                  if (this.level() > 1) {
                    var e;
                    (e = console).log.apply(e, arguments);
                  }
                },
              },
            ]),
            e
          );
        })();
      t.default = i;
    },
    function (e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e) {
        return e
          ? (e ^ ((16 * Math.random()) >> (e / 4))).toString(16)
          : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, i);
      }
      function o(e) {
        var t = c.get('TSNGUID') || e || i();
        return c.set('TSNGUID', t, { path: '/', expiresIn: s }), t;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = o);
      var a = n(7),
        u = r(a),
        s = 31536e3,
        c = new u.default();
    },
    function (e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function o(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var a = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        u = n(8),
        s = r(u),
        c = (function () {
          function e() {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : (0, s.default)(window.location.hostname);
            o(this, e), (this.domain = t);
          }
          return (
            a(e, [
              {
                key: 'destroy',
                value: function (e) {
                  this.set(e, null, { expiresIn: -3600 });
                },
              },
              {
                key: 'get',
                value: function (e) {
                  var t = document.cookie
                    .split(';')
                    .map(function (e) {
                      return e.trim().split('=');
                    })
                    .reduce(function (e, t) {
                      return (e[t[0]] = t[1]), e;
                    }, {});
                  return t[e];
                },
              },
              {
                key: 'set',
                value: function (e, t) {
                  var n,
                    r =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : {},
                    o = new Date(),
                    a = r.path,
                    u = r.expiresIn,
                    s = ((n = {}), i(n, e, t), i(n, 'domain', this.domain), n);
                  a && (s.path = a),
                    u &&
                      (s.expires = new Date(
                        o.getTime() + 1e3 * u
                      ).toUTCString()),
                    (document.cookie = Object.keys(s)
                      .map(function (e) {
                        return e + '=' + s[e];
                      })
                      .join(';'));
                },
              },
            ]),
            e
          );
        })();
      t.default = c;
    },
    function (e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = function (e) {
          return e.split('.').splice(-2, 2).join('.');
        });
    },
    function (e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
      }
      function a(e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var u = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        s = n(10),
        c = r(s),
        l = n(12),
        f = r(l),
        d = n(6),
        p = r(d),
        _ = (function (e) {
          function t() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              n = arguments[1],
              r = arguments[2];
            i(this, t);
            var a = (0, f.default)({ identifiable: !0 }, e);
            return o(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this, a, n, r)
            );
          }
          return (
            a(t, e),
            u(t, [
              {
                key: 'identify',
                value: function () {
                  var e = this;
                  return new Promise(function (t) {
                    for (var n in e.identity.traits)
                      if (e.identity.traits.hasOwnProperty(n)) {
                        var r = e.identity.traits[n];
                        window.newrelic.setCustomAttribute(n, r);
                      }
                    var i = (0, p.default)(e.options.guid);
                    window.newrelic.setCustomAttribute('guid', i), t(!0);
                  });
                },
              },
              {
                key: 'initialize',
                value: function () {
                  var e = this;
                  return new Promise(function (t, n) {
                    e.retry(
                      function () {
                        return (
                          window.newrelic &&
                          'function' == typeof window.newrelic.addPageAction
                        );
                      },
                      5,
                      100,
                      function (n, r) {
                        e._logger.trace(
                          'window.newrelic found after ' + (r + 1) + ' tries'
                        ),
                          t(!0);
                      },
                      function (e) {
                        n(
                          'window.newrelic could NOT be found after ' +
                            e +
                            ' tries'
                        );
                      }
                    );
                  });
                },
              },
              {
                key: 'page',
                value: function (e) {
                  this.track(e);
                },
              },
              {
                key: 'retry',
                value: function (e, t, n, r, i) {
                  var o = this,
                    a =
                      arguments.length > 5 && void 0 !== arguments[5]
                        ? arguments[5]
                        : t,
                    u = e(),
                    s = a - t;
                  u
                    ? r(u, s)
                    : t > 0
                    ? setTimeout(function () {
                        o.retry(e, t - 1, 2 * n, r, i, a);
                      }, n)
                    : i(s);
                },
              },
              {
                key: 'track',
                value: function (e) {
                  var t = this;
                  return new Promise(function (n, r) {
                    e && e._name && 'TrackEvent' == e._name
                      ? (window.newrelic.addPageAction(
                          e.eventNameFormatted,
                          (0, f.default)({}, t.identity.traits, e.properties)
                        ),
                        n(e))
                      : r('`event` must be a valid TrackEvent instance');
                  });
                },
              },
            ]),
            t
          );
        })(c.default);
      (_.pluginName = 'NewRelic'), (t.default = _);
    },
    function (e, t, n) {
      'use strict';
      function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      }
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function o(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var a = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        u = n(11),
        s = i(u),
        c = n(2),
        l = i(c),
        f = n(12),
        d = i(f),
        p = n(13),
        _ = r(p),
        g = (function () {
          function e(t, n, r) {
            var i = this;
            o(this, e),
              (this._name = this.constructor.pluginName),
              (this._logger = n),
              (this._sessionHandler = r),
              (this._identity = { userId: {}, traits: {}, config: {} }),
              (this._hasGloballyIdentified = !1),
              this._logger.trace('new ' + this._name + '()', t),
              Object.defineProperty(this, '_hasIdentified', {
                value: !1,
                configurable: !0,
              }),
              (this.eventQueue = []),
              (this.options = (0, d.default)({ identifiable: !0 }, t)),
              (this._initializePromise = new Promise(function (e, t) {
                (i._resolveInitializePromise = e),
                  (i._rejectInitializePromise = t);
              }));
          }
          return (
            a(e, [
              {
                key: 'initializePlugin',
                value: function () {
                  var e = this;
                  return this.validateConfiguration()
                    ? this.initialize()
                        .then(function () {
                          if (
                            (e._logger.trace(e._name + ' initialized'),
                            e.options.identifiable && e.hasGloballyIdentified())
                          )
                            return e.queueIdentify();
                        })
                        .then(function () {
                          e._resolveInitializePromise();
                        })
                        .catch(function (t) {
                          throw (
                            (e._rejectInitializePromise(),
                            e._logger.error(
                              'Error loading API for ' + e._name,
                              { pluginName: e._name, reason: t }
                            ),
                            t)
                          );
                        })
                    : (this._logger.error(this._name + ' was not loaded'),
                      Promise.reject(
                        new Error('Cannot validate plugin configuration')
                      ));
                },
              },
              {
                key: 'setIdentity',
                value: function () {
                  for (
                    var e, t = arguments.length, n = Array(t), r = 0;
                    r < t;
                    r++
                  )
                    n[r] = arguments[r];
                  (e = this._logger).trace.apply(
                    e,
                    [this._name + '.setIdentity()'].concat(n)
                  );
                  var i = {},
                    o = null,
                    a = {};
                  (0, l.default)(n[0])
                    ? ((i = n[0]),
                      i.customer_user_id && (o = i.customer_user_id),
                      (0, l.default)(n[1]) && (a = (0, d.default)(a, n[1])))
                    : ((o = n[0]),
                      n.length > 1 && (0, l.default)(n[1])
                        ? ((i = n[1]),
                          (0, l.default)(n[2]) && (a = (0, d.default)(a, n[2])))
                        : this._logger.error(
                            'Traits argument must be an Object literal'
                          ));
                  for (var u in _)
                    if (i[u])
                      throw new Error(u + ' should be passed as ' + _[u]);
                  (this._identity.traits = i),
                    (this._identity.userId = o),
                    (this._identity.config = a);
                },
              },
              {
                key: 'drainEventQueue',
                value: function () {
                  var e = this;
                  this._logger.trace(this._name + '.drainEventQueue()');
                  var t = this.eventQueue.slice(0);
                  return Promise.all(
                    t
                      .filter(function (e) {
                        return e.untracked();
                      })
                      .map(function (n) {
                        return (
                          n.markTracked(),
                          e._logger.trace(e._name + '.track()', n),
                          e.track(n).then(
                            function () {
                              t.splice(t.indexOf(n), 1),
                                (e.eventQueue = t),
                                e._logger.trace(
                                  '"' +
                                    n.eventNameFormatted +
                                    '" tracked successfully for ' +
                                    e._name
                                );
                            },
                            function (t) {
                              e._logger.error(t);
                            }
                          )
                        );
                      })
                  );
                },
              },
              {
                key: 'hasIdentified',
                value: function (e) {
                  return (
                    'boolean' == typeof e &&
                      (Object.defineProperty(this, '_hasIdentified', {
                        value: e,
                        configurable: !0,
                      }),
                      this._logger.trace(this._name + '.hasIdentified()', e)),
                    this._hasIdentified
                  );
                },
              },
              {
                key: 'hasGloballyIdentified',
                value: function () {
                  return this._hasGloballyIdentified;
                },
              },
              { key: 'identify', value: function () {} },
              {
                key: 'initialize',
                value: function () {
                  return new Promise(function (e) {
                    setTimeout(function () {
                      e(!0);
                    }, 1);
                  });
                },
              },
              { key: 'page', value: function (e) {} },
              {
                key: 'queueIdentify',
                value: function () {
                  var e = this;
                  return (
                    !this.identifyQueued &&
                    ((this.identifyQueued = !0),
                    this._logger.trace(this._name + '.queueIdentify()'),
                    this._initializePromise.then(
                      function () {
                        if (!e.options.identifiable)
                          return void e._logger.trace(
                            'Did not identify because plugin is not identifiable. pluginName: ' +
                              e._name
                          );
                        (e._hasGloballyIdentified = !0),
                          e.hasIdentified(!0),
                          e._logger.trace(e._name + '.identify()');
                        var t = e.identify();
                        return (
                          'function' == typeof (t || {}).then
                            ? t.then(
                                function () {
                                  e.identifyQueued = !1;
                                },
                                function () {
                                  e.identifyQueued = !1;
                                }
                              )
                            : (e.identifyQueued = !1),
                          e.drainEventQueue()
                        );
                      },
                      function (e) {
                        return !1;
                      }
                    ))
                  );
                },
              },
              {
                key: 'queuePage',
                value: function (e) {
                  var t = this;
                  return (
                    this._logger.trace(
                      this._name + '.queuePage()',
                      e.eventName,
                      e.properties,
                      e.config
                    ),
                    this._initializePromise.then(
                      function () {
                        try {
                          return (
                            t._logger.trace(
                              t._name + '.page()',
                              e.eventName,
                              e.properties,
                              e.config
                            ),
                            t.page(e)
                          );
                        } catch (n) {
                          t._logger.error(
                            t._name + '.page() could not be called',
                            {
                              name: e.eventName,
                              properties: e.properties,
                              config: e.config,
                            },
                            n
                          );
                        }
                      },
                      function (e) {}
                    )
                  );
                },
              },
              {
                key: 'queueTrack',
                value: function (e) {
                  var t = this;
                  return (
                    this._logger.trace(
                      this._name + '.queueTrack()',
                      e.eventName,
                      e.properties
                    ),
                    this.eventQueue.push(e),
                    this._initializePromise.then(
                      function () {
                        if (
                          !t.options.identifiable ||
                          (t.options.identifiable && t.hasIdentified())
                        )
                          return t.drainEventQueue();
                      },
                      function (e) {}
                    )
                  );
                },
              },
              {
                key: '$script',
                value: function (e) {
                  return (
                    this._logger.trace(this._name + '.$script()', e),
                    e
                      ? new Promise(function (t) {
                          (0, s.default)(e, function () {
                            return t();
                          });
                        })
                      : (this._logger.error('You must specify a file to load'),
                        Promise.reject(
                          new Error('You must specify a file to load')
                        ))
                  );
                },
              },
              {
                key: 'track',
                value: function (e) {
                  return new Promise(function (t) {
                    t(e);
                  });
                },
              },
              {
                key: 'validateConfiguration',
                value: function () {
                  return !0;
                },
              },
              {
                key: 'identity',
                get: function () {
                  return this._identity;
                },
              },
            ]),
            e
          );
        })();
      (g.pluginName = 'BasePlugin'), (t.default = g);
    },
    function (e, t, n) {
      var r, i;
      !(function (o, a) {
        'undefined' != typeof e && e.exports
          ? (e.exports = a())
          : ((r = a),
            (i = 'function' == typeof r ? r.call(t, n, t, e) : r),
            !(void 0 !== i && (e.exports = i)));
      })('$script', function () {
        function e(e, t) {
          for (var n = 0, r = e.length; n < r; ++n) if (!t(e[n])) return s;
          return 1;
        }
        function t(t, n) {
          e(t, function (e) {
            return n(e), 1;
          });
        }
        function n(o, a, u) {
          function s(e) {
            return e.call ? e() : d[e];
          }
          function l() {
            if (!--y) {
              (d[h] = 1), v && v();
              for (var n in _) e(n.split('|'), s) && !t(_[n], s) && (_[n] = []);
            }
          }
          o = o[c] ? o : [o];
          var f = a && a.call,
            v = f ? a : u,
            h = f ? o.join('') : a,
            y = o.length;
          return (
            setTimeout(function () {
              t(o, function e(t, n) {
                return null === t
                  ? l()
                  : (n ||
                      /^https?:\/\//.test(t) ||
                      !i ||
                      (t = t.indexOf('.js') === -1 ? i + t + '.js' : i + t),
                    g[t]
                      ? (h && (p[h] = 1),
                        2 == g[t]
                          ? l()
                          : setTimeout(function () {
                              e(t, !0);
                            }, 0))
                      : ((g[t] = 1), h && (p[h] = 1), void r(t, l)));
              });
            }, 0),
            n
          );
        }
        function r(e, t) {
          var n,
            r = a.createElement('script');
          (r.onload = r.onerror = r[f] = function () {
            (r[l] && !/^c|loade/.test(r[l])) ||
              n ||
              ((r.onload = r[f] = null), (n = 1), (g[e] = 2), t());
          }),
            (r.async = 1),
            (r.src = o ? e + (e.indexOf('?') === -1 ? '?' : '&') + o : e),
            u.insertBefore(r, u.lastChild);
        }
        var i,
          o,
          a = document,
          u = a.getElementsByTagName('head')[0],
          s = !1,
          c = 'push',
          l = 'readyState',
          f = 'onreadystatechange',
          d = {},
          p = {},
          _ = {},
          g = {};
        return (
          (n.get = r),
          (n.order = function (e, t, r) {
            !(function i(o) {
              (o = e.shift()), e.length ? n(o, i) : n(o, t, r);
            })();
          }),
          (n.path = function (e) {
            i = e;
          }),
          (n.urlArgs = function (e) {
            o = e;
          }),
          (n.ready = function (r, i, o) {
            r = r[c] ? r : [r];
            var a = [];
            return (
              !t(r, function (e) {
                d[e] || a[c](e);
              }) &&
              e(r, function (e) {
                return d[e];
              })
                ? i()
                : !(function (e) {
                    (_[e] = _[e] || []), _[e][c](i), o && o(a);
                  })(r.join('|')),
              n
            );
          }),
          (n.done = function (e) {
            n([null], e);
          }),
          n
        );
      });
    },
    function (e, t) {
      'use strict';
      function n(e) {
        if (void 0 === e || null === e)
          throw new TypeError('Cannot convert undefined or null to object');
        for (
          var t = Object(e),
            n = arguments.length,
            r = Array(n > 1 ? n - 1 : 0),
            i = 1;
          i < n;
          i++
        )
          r[i - 1] = arguments[i];
        var o = !0,
          a = !1,
          u = void 0;
        try {
          for (
            var s, c = r[Symbol.iterator]();
            !(o = (s = c.next()).done);
            o = !0
          ) {
            var l = s.value;
            if (void 0 != l && null !== l)
              for (var f in l) l.hasOwnProperty(f) && (t[f] = l[f]);
          }
        } catch (e) {
          (a = !0), (u = e);
        } finally {
          try {
            !o && c.return && c.return();
          } finally {
            if (a) throw u;
          }
        }
        return t;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = n);
    },
    function (e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = {
          name: 'customer_user_full_name',
          customer_user_email: 'email',
          owner_id: 'customer_user_id',
          permission_role: 'customer_user_permission_role',
          job_title: 'customer_user_job_title',
          total_volume_host_count: 'apm_connected_hosts_parent',
          connected_hosts: 'apm_connected_hosts_sub',
          current_apm_product: 'apm_current_product',
          apm_first_paid_for_date: 'apm_first_payment_date',
          application_language: 'apm_language_agents',
          licensed_hosts: 'apm_license_amount',
          trial_expires_on: 'apm_trial_complete_date',
          deployed_on: 'apm_trial_start_date',
          new_relic_create_date: 'customer_account_create_date',
          rpm_account_id: 'customer_account_id',
          rpm_account_name: 'customer_account_name',
          company_size: 'customer_company_size',
          number_of_users: 'customer_number_of_users',
          owner_email: 'customer_owner_email',
          payment_method: 'customer_payment_method',
        });
    },
    function (e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
      }
      function a(e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var u = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        s = n(10),
        c = r(s),
        l = n(12),
        f = r(l),
        d = 3e3,
        p = 30,
        _ = (function (e) {
          function t() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              n = arguments[1],
              r = arguments[2];
            i(this, t);
            var a = (0, f.default)(e, { identifiable: !1 }),
              u = {
                key: {
                  get: function () {
                    return 'staging' == s._currentEnv()
                      ? '1mz1pjBqh38DZUSw8gjG-YrM6dBNqk7i'
                      : '9lWE0ITAJr03cUUQAFN7N-4wvgOojjwp';
                  },
                },
                url: {
                  get: function () {
                    return (
                      'https://' +
                      s._collectorUrl() +
                      '/v1/accounts/' +
                      s.accountId +
                      '/events'
                    );
                  },
                },
                accountId: {
                  get: function () {
                    return 'staging' == s._currentEnv() ? 1478838 : 1002319;
                  },
                },
                defaultEventType: { value: 'TessenAction' },
                customStagingPatterns: {
                  get: function () {
                    return a.additionalStagingUrlPatterns || [];
                  },
                },
              },
              s = o(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, a, n, r)
              );
            return (
              Object.defineProperties(s, u),
              (s._queuedEvents = []),
              (s._logTimeout = s._logTimeout.bind(s)),
              (s.submitEvents = s.submitEvents.bind(s)),
              s
            );
          }
          return (
            a(t, e),
            u(t, [
              {
                key: 'track',
                value: function (e) {
                  return (
                    this._queuedEvents.push(e),
                    this._logTimeoutId
                      ? this._queuedEvents.length >= p && this.submitEvents()
                      : (this._logTimeoutId = setTimeout(this._logTimeout, d)),
                    Promise.resolve()
                  );
                },
              },
              {
                key: 'page',
                value: function (e) {
                  this.track(e);
                },
              },
              {
                key: 'submitEvents',
                value: function () {
                  var e = this,
                    t = this._queuedEvents;
                  return (
                    (this._logTimeoutId = null),
                    (this._queuedEvents = []),
                    new Promise(function (n, r) {
                      var i = e.accountId;
                      if (!Number.isInteger(i) || i <= 0)
                        return (
                          e._logger.error(
                            'accountId must be a positive integer'
                          ),
                          void r(
                            new Error('accountId must be a positive integer')
                          )
                        );
                      var o = t.map(function (t) {
                          var n = (0, f.default)(
                            {},
                            e.identity.traits,
                            t.properties
                          );
                          return (
                            (n.eventType = e.defaultEventType),
                            (n.eventName = t.eventNameFormatted),
                            n
                          );
                        }),
                        a = new XMLHttpRequest();
                      a.open('POST', e.url),
                        a.setRequestHeader('Content-Type', 'application/json'),
                        a.setRequestHeader('X-Insert-Key', e.key),
                        (a.onreadystatechange = function () {
                          if (a.readyState == XMLHttpRequest.DONE)
                            if (a.status >= 200 && a.status <= 299) n(t);
                            else {
                              var i =
                                '' != a.responseText
                                  ? a.responseText
                                  : 'Tessen failed to submit events: Status ' +
                                    a.status;
                              e._logger.error(i), r(i);
                            }
                        }),
                        a.send(JSON.stringify(o));
                    })
                  );
                },
              },
              {
                key: '_logTimeout',
                value: function () {
                  window.requestIdleCallback
                    ? window.requestIdleCallback(this.submitEvents, {
                        timeout: d,
                      })
                    : setTimeout(this.submitEvents, d);
                },
              },
              {
                key: '_collectorUrl',
                value: function () {
                  return 'staging' == this._currentEnv()
                    ? 'insights-collector.newrelic.com'
                    : 'staging-insights-collector.newrelic.com';
                },
              },
              {
                key: '_currentEnv',
                value: function () {
                  var e = this.customStagingPatterns.concat([
                      /staging|localhost|rpm-branch/,
                    ]),
                    t = !0,
                    n = !1,
                    r = void 0;
                  try {
                    for (
                      var i, o = e[Symbol.iterator]();
                      !(t = (i = o.next()).done);
                      t = !0
                    ) {
                      var a = i.value;
                      if (a.test(window.location.host)) return 'staging';
                    }
                  } catch (e) {
                    (n = !0), (r = e);
                  } finally {
                    try {
                      !t && o.return && o.return();
                    } finally {
                      if (n) throw r;
                    }
                  }
                  return 'production';
                },
              },
            ]),
            t
          );
        })(c.default);
      (_.pluginName = 'NewRelicInsights'), (t.default = _);
    },
    function (e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      function o(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
      }
      function a(e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var u =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          },
        s = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        c = n(10),
        l = r(c),
        f = n(12),
        d = r(f),
        p = n(16),
        _ = r(p),
        g = n(17),
        v = [
          'trackSubmit',
          'trackClick',
          'trackLink',
          'trackForm',
          'pageview',
          'identify',
          'reset',
          'group',
          'track',
          'ready',
          'alias',
          'page',
          'once',
          'off',
          'on',
        ],
        h = [
          'customer_user_full_name',
          'email',
          'customer_user_id',
          'customer_user_permission_role',
          'customer_user_job_title',
          'customer_user_create_date',
        ];
      window.analytics = window.analytics || [];
      var y = (function (e) {
        function t() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            n = arguments[1],
            r = arguments[2];
          i(this, t);
          var a = (0, d.default)({ identifiable: !0 }, e);
          return o(
            this,
            (t.__proto__ || Object.getPrototypeOf(t)).call(this, a, n, r)
          );
        }
        return (
          a(t, e),
          s(t, [
            {
              key: 'identify',
              value: function () {
                var e = this,
                  t = this._identity.config,
                  n = this._identity.userId,
                  r = { identity: { name: null }, group: {} },
                  i = [],
                  o = t.Segment || {};
                for (var a in this._identity.traits)
                  if (this._identity.traits.hasOwnProperty(a)) {
                    var s = this._identity.traits[a];
                    h.indexOf(a) !== -1
                      ? (r.identity[a] = s)
                      : (r.group[a] = s);
                  }
                return (
                  r.identity.customer_user_full_name &&
                    (r.identity.name = r.identity.customer_user_full_name),
                  r.group.customer_account_name &&
                    (r.group.name = r.group.customer_account_name),
                  i.push(
                    new Promise(function (t) {
                      var i = function (i, o) {
                          window.analytics.user().anonymousId(null),
                            (o.Intercom = o.Intercom || {}),
                            (o.Intercom.user_hash = i),
                            (window.intercomSettings =
                              window.intercomSettings || {}),
                            (window.intercomSettings.user_hash = i),
                            e._logger.trace(
                              'Identifying to Intercom with user ID and user hash'
                            ),
                            window.analytics.identify(
                              n,
                              r.identity,
                              u({}, o, {
                                integrations: u(
                                  {},
                                  e._getAmplitudeConfig(),
                                  o.integrations
                                ),
                              }),
                              function () {
                                return t(!0);
                              }
                            );
                        },
                        a = function (i) {
                          (n = void 0),
                            e._logger.trace(
                              'Identifying to Intercom as an anonymous user'
                            ),
                            window.analytics.user().anonymousId(),
                            window.analytics.user().traits(r.identity),
                            window.analytics.user().save();
                          var o =
                            window.Intercom && window.Intercom.booted
                              ? 'update'
                              : 'boot';
                          window.Intercom && window.Intercom(o, i), t();
                        };
                      n
                        ? e
                            .getUserHash()
                            .then(function (e) {
                              return e ? i(e, o) : a(o);
                            })
                            .catch(function (t) {
                              e._logger.warn(
                                "Tessen.js encountered an error trying to retrieve the user's hashed email for Intercom identification:",
                                t
                              ),
                                a(o);
                            })
                        : a(o);
                    })
                  ),
                  r.group.customer_account_id ||
                  r.group.current_customer_account_id
                    ? i.push(
                        new Promise(function (t) {
                          e._logger.trace(
                            'analytics.group()',
                            r.group.current_customer_account_id ||
                              r.group.customer_account_id,
                            r.group
                          ),
                            window.analytics.group(
                              r.group.current_customer_account_id ||
                                r.group.customer_account_id,
                              r.group,
                              function () {
                                t(!0);
                              }
                            );
                        })
                      )
                    : this._logger.trace(
                        '`analytics.group()` was not fired because the `customer_account_id` or `current_customer_account_id` trait was not set'
                      ),
                  new Promise(function (t, n) {
                    Promise.all(i).then(
                      function () {
                        t(!0);
                      },
                      function (t) {
                        e._logger.error(
                          e._name + ' had a problem identifying the user'
                        ),
                          n(t);
                      }
                    );
                  })
                );
              },
            },
            {
              key: 'initialize',
              value: function () {
                var e = this;
                return window.analytics.initialize || window.analytics.invoked
                  ? ((this.options.identifiable = !1),
                    new Promise(function (e) {
                      window.analytics.ready(e);
                    }))
                  : ((window.analytics.invoked = !0),
                    new Promise(function (t, n) {
                      (window.analytics.methods = v),
                        (window.analytics.factory = function (e) {
                          return function () {
                            for (
                              var t = arguments.length, n = Array(t), r = 0;
                              r < t;
                              r++
                            )
                              n[r] = arguments[r];
                            return (
                              n.unshift(e),
                              window.analytics.push(n),
                              window.analytics
                            );
                          };
                        });
                      for (
                        var r = 0;
                        r < window.analytics.methods.length;
                        r++
                      ) {
                        var i = window.analytics.methods[r];
                        window.analytics[i] = window.analytics.factory(i);
                      }
                      (window.analytics.SNIPPET_VERSION = '3.1.0'),
                        'complete' === document.readyState
                          ? e.load().then(t, n)
                          : (0, _.default)(window, 'load', function () {
                              e.load().then(t, n);
                            });
                    }));
              },
            },
            {
              key: 'load',
              value: function () {
                var e =
                  'https:' === document.location.protocol ? 'https:' : 'http:';
                return this.$script(
                  e +
                    '//cdn.segment.com/analytics.js/v1/' +
                    this.options.writeKey +
                    '/analytics.min.js'
                );
              },
            },
            {
              key: 'page',
              value: function (e) {
                var t = e.config.Segment || {},
                  n = u({}, t, {
                    integrations: u(
                      {
                        Intercom: !0,
                        'Amazon Kinesis Firehose': !0,
                        Split: !0,
                      },
                      this._getAmplitudeConfig(),
                      t.integrations
                    ),
                  });
                window.analytics.page(e.eventNameFormatted, e.properties, n),
                  window.analytics.track(
                    e.eventNameFormatted,
                    e.properties || {},
                    n
                  );
              },
            },
            {
              key: 'track',
              value: function (e) {
                var t = this;
                return new Promise(function (n, r) {
                  if ('TrackEvent' == e._name) {
                    var i = e.config.Segment || {};
                    window.analytics.track(
                      e.eventNameFormatted,
                      (0, d.default)({}, t._identity.traits, e.properties),
                      u({}, i, {
                        integrations: u(
                          {},
                          t._getAmplitudeConfig(),
                          i.integrations
                        ),
                      })
                    ),
                      n(e);
                  } else r('`event` must be a valid TrackEvent instance');
                });
              },
            },
            {
              key: 'validateConfiguration',
              value: function () {
                return (
                  !!this.options.writeKey ||
                  (this._logger.error(
                    'You must provide a Segment Write Key. Get it at Segment > Project Settings > Keys'
                  ),
                  !1)
                );
              },
            },
            {
              key: 'getUserHash',
              value: function () {
                var e = this;
                return new Promise(function (t, n) {
                  var r = new XMLHttpRequest();
                  (r.withCredentials = !0),
                    (r.onerror = function () {
                      n(new Error('HTTP network error'));
                    }),
                    (r.onreadystatechange = function () {
                      if (4 === r.readyState) {
                        200 !== r.status &&
                          n(
                            new Error(
                              'HTTP error ' + r.status + ': ' + r.statusText
                            )
                          );
                        try {
                          t(JSON.parse(r.responseText));
                        } catch (e) {
                          t(null);
                        }
                      }
                    }),
                    r.open('GET', e.getIntercomAuthUrl(), !0),
                    r.setRequestHeader('X-Requested-With', 'XMLHttpRequest'),
                    r.send();
                });
              },
            },
            {
              key: 'getIntercomInstance',
              value: function (e) {
                return e.indexOf('helix.newrelic.com') === -1
                  ? g.INTERCOM_INSTANCES.newrelic
                  : g.INTERCOM_INSTANCES.helix;
              },
            },
            {
              key: 'getIntercomAuthUrl',
              value: function () {
                var e = window.location.hostname,
                  t = this.getIntercomInstance(e),
                  n = window.__nr && window.__nr.env,
                  r = void 0;
                return (
                  (r =
                    n === g.INTERCOM_AUTH_ENVIRONMENTS.staging ||
                    n === g.INTERCOM_AUTH_ENVIRONMENTS.dev
                      ? g.INTERCOM_AUTH_HOSTNAMES.staging
                      : e.indexOf(g.INTERCOM_AUTH_ENVIRONMENTS.staging) === -1
                      ? g.INTERCOM_AUTH_HOSTNAMES.production
                      : g.INTERCOM_AUTH_HOSTNAMES.staging),
                  'https://' + r + '/' + t
                );
              },
            },
            {
              key: '_getAmplitudeConfig',
              value: function () {
                return this.options.useAmplitudeSessions
                  ? {
                      Amplitude: {
                        session_id: this._sessionHandler.getSessionId(),
                      },
                    }
                  : {};
              },
            },
          ]),
          t
        );
      })(l.default);
      (y.pluginName = 'Segment'), (t.default = y);
    },
    function (e, t) {
      'use strict';
      function n(e, t, n) {
        e.addEventListener
          ? e.addEventListener(t, n, !1)
          : e.attachEvent && e.attachEvent('on' + t, n);
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = n);
    },
    function (e, t) {
      'use strict';
      function n(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r,
        i = {
          mobapps: 'mobapps',
          nr1: 'nr1',
          private: 'private',
          public: 'public',
          seldon: 'seldon',
          wanda: 'wanda',
        };
      Object.freeze(i);
      var o = {
          nr1: [
            'currentAuthorizedAccounts',
            'location',
            'pageComponent',
            'pageName',
          ],
          seldon: ['location', 'nr_product', 'nr_subproduct', 'category'],
        },
        a = {
          nr1: [
            'dashboardID',
            'chartID',
            'entityIDs',
            'interactionType',
            'isUserInteraction',
          ],
        },
        u = {
          locationInvalid:
            'You must provide a valid value for `location`. Valid values are "nr1", "seldon", "public", and "mobapps".',
          locationPrivate:
            '"private" is no longer valid for `location` and should be changed to "seldon".',
          nr1Optional: ' property is optional but frequently used in NR1.',
        },
        s = { page: 'page', track: 'track' },
        c =
          ((r = {}),
          n(r, s.page, { view: 'view' }),
          n(r, s.track, {
            click: 'click',
            drag: 'drag',
            hover: 'hover',
            keystroke: 'keystroke',
          }),
          r),
        l = { helix: 'helix', newrelic: 'newrelic' };
      Object.freeze(l);
      var f = { production: 'production', staging: 'staging', dev: 'dev' };
      Object.freeze(f);
      var d = {};
      (d[f.production] = 'intercom-auth.service.newrelic.com'),
        (d[f.staging] = 'intercom-auth.staging-service.newrelic.com'),
        Object.freeze(d);
      (t.CAMEL_CASE = /^[a-z]+([A-Z][a-z]*|[0-9]+)*$/),
        (t.TITLE_CASE = /^((^| )[A-Z\d][\w-]+)+$/);
      (t.INTERCOM_INSTANCES = l),
        (t.INTERCOM_AUTH_ENVIRONMENTS = f),
        (t.INTERCOM_AUTH_HOSTNAMES = d),
        (t.LOCATIONS = i),
        (t.NR1_EVENT_TYPES = c),
        (t.OPTIONAL_PROPERTIES = a),
        (t.REQUIRED_PROPERTIES = o),
        (t.TRACK_EVENT_TYPES = s),
        (t.VALIDATION_MESSAGES = u);
    },
    function (e, t) {
      'use strict';
      !(function (e) {
        e.console || (e.console = {});
        for (
          var t,
            n,
            r = e.console,
            i = function () {},
            o = ['memory'],
            a = 'assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn'.split(
              ','
            );
          (t = o.pop());

        )
          r[t] || (r[t] = {});
        for (; (n = a.pop()); ) 'function' != typeof r[n] && (r[n] = i);
      })('undefined' == typeof window ? void 0 : window);
    },
    function (e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      }
      function o(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var a = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        u = n(17),
        s = i(u),
        c = n(4),
        l = r(c),
        f = 1,
        d = (function () {
          function e(t, n) {
            var r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {},
              i =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : {};
            o(this, e);
            var a = r.pageName ? r.pageName : r.nr_subproduct,
              u = r.pageComponent ? r.pageComponent : r.category,
              s = [a, u, t].join('_');
            r.tessenVersionNumber = l.default;
            var c = {
              id: { value: f++ },
              eventName: { value: t },
              eventNameFormatted: { value: s },
              properties: { value: r },
              config: { value: i },
              _tracked: { value: !1, configurable: !0 },
            };
            (this._name = 'TrackEvent'),
              (this._logger = n),
              Object.defineProperties(this, c);
          }
          return (
            a(e, [
              {
                key: 'markTracked',
                value: function () {
                  Object.defineProperty(this, '_tracked', { value: !0 });
                },
              },
              {
                key: 'tracked',
                value: function () {
                  return this._tracked;
                },
              },
              {
                key: 'untracked',
                value: function () {
                  return !this._tracked;
                },
              },
              {
                key: 'valid',
                value: function () {
                  var e = this,
                    t = !1,
                    n = s.LOCATIONS,
                    r = n.mobapps,
                    i = n.nr1,
                    o = n.private,
                    a = n.public,
                    u = n.seldon,
                    c = n.wanda,
                    l = this.properties,
                    f = l.interactionType,
                    d = l.location,
                    p = l.trackOrPage,
                    _ = void 0;
                  if (
                    (this.eventName ||
                      ((t = !0), this._logger.error('eventName is required')),
                    s.CAMEL_CASE.test(this.eventName) ||
                      ((t = !0),
                      this._logger.error('eventName must be camelCase')),
                    this.properties.category &&
                      !s.TITLE_CASE.test(this.properties.category) &&
                      ((t = !0),
                      this._logger.error(
                        'category property must be Title Case'
                      )),
                    !d)
                  )
                    return (
                      this._logger.error(s.VALIDATION_MESSAGES.locationInvalid),
                      !1
                    );
                  switch (d.toLowerCase()) {
                    case i:
                    case c:
                      s.REQUIRED_PROPERTIES.nr1.forEach(function (n) {
                        e.properties[n] ||
                          ((t = !0),
                          e._logger.error(n + ' property is required'));
                      }),
                        s.OPTIONAL_PROPERTIES.nr1.forEach(function (t) {
                          if (!e.properties[t]) {
                            var n =
                              '`' + t + '`' + s.VALIDATION_MESSAGES.nr1Optional;
                            e._logger.trace(n);
                          }
                        }),
                        (_ = s.NR1_EVENT_TYPES[p]),
                        f &&
                          !_[f] &&
                          ((t = !0),
                          this._logger.error(
                            'Value "' +
                              f +
                              '" for `interactionType` property is invalid for the combination of location "nr1" and the use of `Tessen.page()` or `Tessen.track()`.'
                          ));
                      break;
                    case o:
                    case u:
                    case a:
                    case r:
                      d === o &&
                        this._logger.warn(
                          s.VALIDATION_MESSAGES.locationPrivate
                        ),
                        s.REQUIRED_PROPERTIES.seldon.forEach(function (n) {
                          e.properties[n] ||
                            ((t = !0),
                            e._logger.error(n + ' property is required'));
                        });
                      break;
                    default:
                      (t = !0),
                        this._logger.error(
                          s.VALIDATION_MESSAGES.locationInvalid
                        );
                  }
                  return !t;
                },
              },
            ]),
            e
          );
        })();
      t.default = d;
    },
    function (e, t, n) {
      'use strict';
      function r(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var o = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        a = n(7),
        u = r(a),
        s = 'TessenSessionId',
        c = 18e5,
        l = 1e3,
        f = (function () {
          function e() {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : c;
            i(this, e),
              (this._sessionTimeout = t),
              (this._cookie = new u.default()),
              this.enable();
          }
          return (
            o(e, [
              {
                key: 'enable',
                value: function () {
                  (this._enabled = !0), this._init();
                },
              },
              {
                key: 'disable',
                value: function () {
                  (this._enabled = !1),
                    this._cookie.destroy(s),
                    (this._sessionId = null);
                },
              },
              {
                key: '_init',
                value: function () {
                  this._getCookieData();
                  var e = new Date().getTime();
                  (!this._sessionId ||
                    !this._lastEventTime ||
                    e - this._lastEventTime > this._sessionTimeout) &&
                    (this._sessionId = e),
                    (this._lastEventTime = e);
                },
              },
              {
                key: '_getCookieData',
                value: function () {
                  var e = this._cookie.get(s);
                  if (e) {
                    var t = e.split(',');
                    t &&
                      ((this._sessionId = parseInt(t[0], 10)),
                      (this._lastEventTime = parseInt(t[1], 10)));
                  }
                },
              },
              {
                key: '_saveCookieData',
                value: function () {
                  this._cookie.set(
                    s,
                    this._sessionId + ',' + this._lastEventTime
                  );
                },
              },
              {
                key: 'getSessionId',
                value: function () {
                  return this._sessionId;
                },
              },
              {
                key: 'updateLastEventTime',
                value: function () {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : new Date().getTime();
                  if (this._enabled) {
                    var t = !1;
                    (!this._sessionId ||
                      !this._lastEventTime ||
                      e - this._lastEventTime > this._sessionTimeout) &&
                      ((this._sessionId = e), (t = !0)),
                      e - this._lastEventTime > l &&
                        ((t = !0), (this._lastEventTime = e)),
                      t && this._saveCookieData();
                  }
                },
              },
            ]),
            e
          );
        })();
      t.default = f;
    },
  ]);
});
