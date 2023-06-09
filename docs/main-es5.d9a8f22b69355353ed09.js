(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    zUnb: function (t, e, n) {
      "use strict";
      n.r(e);
      var r = function (t, e) {
        return (r =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
          })(t, e);
      };
      function o(t, e) {
        function n() {
          this.constructor = t;
        }
        r(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((n.prototype = e.prototype), new n()));
      }
      var i = function () {
        return (i =
          Object.assign ||
          function (t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var o in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t;
          }).apply(this, arguments);
      };
      function l(t, e, n, r) {
        var o,
          i = arguments.length,
          l =
            i < 3
              ? e
              : null === r
              ? (r = Object.getOwnPropertyDescriptor(e, n))
              : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          l = Reflect.decorate(t, e, n, r);
        else
          for (var a = t.length - 1; a >= 0; a--)
            (o = t[a]) &&
              (l = (i < 3 ? o(l) : i > 3 ? o(e, n, l) : o(e, n)) || l);
        return i > 3 && l && Object.defineProperty(e, n, l), l;
      }
      function a(t, e) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
          return Reflect.metadata(t, e);
      }
      function u(t) {
        var e = "function" == typeof Symbol && t[Symbol.iterator],
          n = 0;
        return e
          ? e.call(t)
          : {
              next: function () {
                return (
                  t && n >= t.length && (t = void 0),
                  { value: t && t[n++], done: !t }
                );
              },
            };
      }
      function s(t, e) {
        var n = "function" == typeof Symbol && t[Symbol.iterator];
        if (!n) return t;
        var r,
          o,
          i = n.call(t),
          l = [];
        try {
          for (; (void 0 === e || e-- > 0) && !(r = i.next()).done; )
            l.push(r.value);
        } catch (a) {
          o = { error: a };
        } finally {
          try {
            r && !r.done && (n = i.return) && n.call(i);
          } finally {
            if (o) throw o.error;
          }
        }
        return l;
      }
      function c() {
        for (var t = [], e = 0; e < arguments.length; e++)
          t = t.concat(s(arguments[e]));
        return t;
      }
      var h =
        Array.isArray ||
        function (t) {
          return t && "number" == typeof t.length;
        };
      function p(t) {
        return null !== t && "object" == typeof t;
      }
      function f(t) {
        return "function" == typeof t;
      }
      function d(t) {
        return (
          Error.call(this),
          (this.message = t
            ? t.length +
              " errors occurred during unsubscription:\n" +
              t
                .map(function (t, e) {
                  return e + 1 + ") " + t.toString();
                })
                .join("\n  ")
            : ""),
          (this.name = "UnsubscriptionError"),
          (this.errors = t),
          this
        );
      }
      d.prototype = Object.create(Error.prototype);
      var g = d,
        v = (function () {
          function t(t) {
            (this.closed = !1),
              (this._parent = null),
              (this._parents = null),
              (this._subscriptions = null),
              t && (this._unsubscribe = t);
          }
          var e;
          return (
            (t.prototype.unsubscribe = function () {
              var t,
                e = !1;
              if (!this.closed) {
                var n = this._parent,
                  r = this._parents,
                  o = this._unsubscribe,
                  i = this._subscriptions;
                (this.closed = !0),
                  (this._parent = null),
                  (this._parents = null),
                  (this._subscriptions = null);
                for (var l = -1, a = r ? r.length : 0; n; )
                  n.remove(this), (n = (++l < a && r[l]) || null);
                if (f(o))
                  try {
                    o.call(this);
                  } catch (s) {
                    (e = !0), (t = s instanceof g ? m(s.errors) : [s]);
                  }
                if (h(i))
                  for (l = -1, a = i.length; ++l < a; ) {
                    var u = i[l];
                    if (p(u))
                      try {
                        u.unsubscribe();
                      } catch (s) {
                        (e = !0),
                          (t = t || []),
                          s instanceof g
                            ? (t = t.concat(m(s.errors)))
                            : t.push(s);
                      }
                  }
                if (e) throw new g(t);
              }
            }),
            (t.prototype.add = function (e) {
              var n = e;
              switch (typeof e) {
                case "function":
                  n = new t(e);
                case "object":
                  if (
                    n === this ||
                    n.closed ||
                    "function" != typeof n.unsubscribe
                  )
                    return n;
                  if (this.closed) return n.unsubscribe(), n;
                  if (!(n instanceof t)) {
                    var r = n;
                    (n = new t())._subscriptions = [r];
                  }
                  break;
                default:
                  if (!e) return t.EMPTY;
                  throw new Error(
                    "unrecognized teardown " + e + " added to Subscription."
                  );
              }
              if (n._addParent(this)) {
                var o = this._subscriptions;
                o ? o.push(n) : (this._subscriptions = [n]);
              }
              return n;
            }),
            (t.prototype.remove = function (t) {
              var e = this._subscriptions;
              if (e) {
                var n = e.indexOf(t);
                -1 !== n && e.splice(n, 1);
              }
            }),
            (t.prototype._addParent = function (t) {
              var e = this._parent,
                n = this._parents;
              return (
                e !== t &&
                (e
                  ? n
                    ? -1 === n.indexOf(t) && (n.push(t), !0)
                    : ((this._parents = [t]), !0)
                  : ((this._parent = t), !0))
              );
            }),
            (t.EMPTY = (((e = new t()).closed = !0), e)),
            t
          );
        })();
      function m(t) {
        return t.reduce(function (t, e) {
          return t.concat(e instanceof g ? e.errors : e);
        }, []);
      }
      var y = !1,
        b = {
          Promise: void 0,
          set useDeprecatedSynchronousErrorHandling(t) {
            y = t;
          },
          get useDeprecatedSynchronousErrorHandling() {
            return y;
          },
        };
      function _(t) {
        setTimeout(function () {
          throw t;
        });
      }
      var w = {
          closed: !0,
          next: function (t) {},
          error: function (t) {
            if (b.useDeprecatedSynchronousErrorHandling) throw t;
            _(t);
          },
          complete: function () {},
        },
        C =
          "function" == typeof Symbol
            ? Symbol("rxSubscriber")
            : "@@rxSubscriber_" + Math.random(),
        E = (function (t) {
          function e(n, r, o) {
            var i = t.call(this) || this;
            switch (
              ((i.syncErrorValue = null),
              (i.syncErrorThrown = !1),
              (i.syncErrorThrowable = !1),
              (i.isStopped = !1),
              arguments.length)
            ) {
              case 0:
                i.destination = w;
                break;
              case 1:
                if (!n) {
                  i.destination = w;
                  break;
                }
                if ("object" == typeof n) {
                  n instanceof e
                    ? ((i.syncErrorThrowable = n.syncErrorThrowable),
                      (i.destination = n),
                      n.add(i))
                    : ((i.syncErrorThrowable = !0),
                      (i.destination = new S(i, n)));
                  break;
                }
              default:
                (i.syncErrorThrowable = !0),
                  (i.destination = new S(i, n, r, o));
            }
            return i;
          }
          return (
            o(e, t),
            (e.prototype[C] = function () {
              return this;
            }),
            (e.create = function (t, n, r) {
              var o = new e(t, n, r);
              return (o.syncErrorThrowable = !1), o;
            }),
            (e.prototype.next = function (t) {
              this.isStopped || this._next(t);
            }),
            (e.prototype.error = function (t) {
              this.isStopped || ((this.isStopped = !0), this._error(t));
            }),
            (e.prototype.complete = function () {
              this.isStopped || ((this.isStopped = !0), this._complete());
            }),
            (e.prototype.unsubscribe = function () {
              this.closed ||
                ((this.isStopped = !0), t.prototype.unsubscribe.call(this));
            }),
            (e.prototype._next = function (t) {
              this.destination.next(t);
            }),
            (e.prototype._error = function (t) {
              this.destination.error(t), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.destination.complete(), this.unsubscribe();
            }),
            (e.prototype._unsubscribeAndRecycle = function () {
              var t = this._parent,
                e = this._parents;
              return (
                (this._parent = null),
                (this._parents = null),
                this.unsubscribe(),
                (this.closed = !1),
                (this.isStopped = !1),
                (this._parent = t),
                (this._parents = e),
                this
              );
            }),
            e
          );
        })(v),
        S = (function (t) {
          function e(e, n, r, o) {
            var i,
              l = t.call(this) || this;
            l._parentSubscriber = e;
            var a = l;
            return (
              f(n)
                ? (i = n)
                : n &&
                  ((i = n.next),
                  (r = n.error),
                  (o = n.complete),
                  n !== w &&
                    (f((a = Object.create(n)).unsubscribe) &&
                      l.add(a.unsubscribe.bind(a)),
                    (a.unsubscribe = l.unsubscribe.bind(l)))),
              (l._context = a),
              (l._next = i),
              (l._error = r),
              (l._complete = o),
              l
            );
          }
          return (
            o(e, t),
            (e.prototype.next = function (t) {
              if (!this.isStopped && this._next) {
                var e = this._parentSubscriber;
                b.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                  ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
                  : this.__tryOrUnsub(this._next, t);
              }
            }),
            (e.prototype.error = function (t) {
              if (!this.isStopped) {
                var e = this._parentSubscriber,
                  n = b.useDeprecatedSynchronousErrorHandling;
                if (this._error)
                  n && e.syncErrorThrowable
                    ? (this.__tryOrSetError(e, this._error, t),
                      this.unsubscribe())
                    : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
                else if (e.syncErrorThrowable)
                  n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : _(t),
                    this.unsubscribe();
                else {
                  if ((this.unsubscribe(), n)) throw t;
                  _(t);
                }
              }
            }),
            (e.prototype.complete = function () {
              var t = this;
              if (!this.isStopped) {
                var e = this._parentSubscriber;
                if (this._complete) {
                  var n = function () {
                    return t._complete.call(t._context);
                  };
                  b.useDeprecatedSynchronousErrorHandling &&
                  e.syncErrorThrowable
                    ? (this.__tryOrSetError(e, n), this.unsubscribe())
                    : (this.__tryOrUnsub(n), this.unsubscribe());
                } else this.unsubscribe();
              }
            }),
            (e.prototype.__tryOrUnsub = function (t, e) {
              try {
                t.call(this._context, e);
              } catch (n) {
                if (
                  (this.unsubscribe(), b.useDeprecatedSynchronousErrorHandling)
                )
                  throw n;
                _(n);
              }
            }),
            (e.prototype.__tryOrSetError = function (t, e, n) {
              if (!b.useDeprecatedSynchronousErrorHandling)
                throw new Error("bad call");
              try {
                e.call(this._context, n);
              } catch (r) {
                return b.useDeprecatedSynchronousErrorHandling
                  ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
                  : (_(r), !0);
              }
              return !1;
            }),
            (e.prototype._unsubscribe = function () {
              var t = this._parentSubscriber;
              (this._context = null),
                (this._parentSubscriber = null),
                t.unsubscribe();
            }),
            e
          );
        })(E),
        x =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function O() {}
      function T() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return k(t);
      }
      function k(t) {
        return t
          ? 1 === t.length
            ? t[0]
            : function (e) {
                return t.reduce(function (t, e) {
                  return e(t);
                }, e);
              }
          : O;
      }
      var A = (function () {
        function t(t) {
          (this._isScalar = !1), t && (this._subscribe = t);
        }
        return (
          (t.prototype.lift = function (e) {
            var n = new t();
            return (n.source = this), (n.operator = e), n;
          }),
          (t.prototype.subscribe = function (t, e, n) {
            var r = this.operator,
              o = (function (t, e, n) {
                if (t) {
                  if (t instanceof E) return t;
                  if (t[C]) return t[C]();
                }
                return t || e || n ? new E(t, e, n) : new E(w);
              })(t, e, n);
            if (
              (o.add(
                r
                  ? r.call(o, this.source)
                  : this.source ||
                    (b.useDeprecatedSynchronousErrorHandling &&
                      !o.syncErrorThrowable)
                  ? this._subscribe(o)
                  : this._trySubscribe(o)
              ),
              b.useDeprecatedSynchronousErrorHandling &&
                o.syncErrorThrowable &&
                ((o.syncErrorThrowable = !1), o.syncErrorThrown))
            )
              throw o.syncErrorValue;
            return o;
          }),
          (t.prototype._trySubscribe = function (t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              b.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    var e = t.destination;
                    if (t.closed || t.isStopped) return !1;
                    t = e && e instanceof E ? e : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }),
          (t.prototype.forEach = function (t, e) {
            var n = this;
            return new (e = I(e))(function (e, r) {
              var o;
              o = n.subscribe(
                function (e) {
                  try {
                    t(e);
                  } catch (n) {
                    r(n), o && o.unsubscribe();
                  }
                },
                r,
                e
              );
            });
          }),
          (t.prototype._subscribe = function (t) {
            var e = this.source;
            return e && e.subscribe(t);
          }),
          (t.prototype[x] = function () {
            return this;
          }),
          (t.prototype.pipe = function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e] = arguments[e];
            return 0 === t.length ? this : k(t)(this);
          }),
          (t.prototype.toPromise = function (t) {
            var e = this;
            return new (t = I(t))(function (t, n) {
              var r;
              e.subscribe(
                function (t) {
                  return (r = t);
                },
                function (t) {
                  return n(t);
                },
                function () {
                  return t(r);
                }
              );
            });
          }),
          (t.create = function (e) {
            return new t(e);
          }),
          t
        );
      })();
      function I(t) {
        if ((t || (t = b.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      function P() {
        return (
          Error.call(this),
          (this.message = "object unsubscribed"),
          (this.name = "ObjectUnsubscribedError"),
          this
        );
      }
      P.prototype = Object.create(Error.prototype);
      var R = P,
        N = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (r.subject = e), (r.subscriber = n), (r.closed = !1), r;
          }
          return (
            o(e, t),
            (e.prototype.unsubscribe = function () {
              if (!this.closed) {
                this.closed = !0;
                var t = this.subject,
                  e = t.observers;
                if (
                  ((this.subject = null),
                  e && 0 !== e.length && !t.isStopped && !t.closed)
                ) {
                  var n = e.indexOf(this.subscriber);
                  -1 !== n && e.splice(n, 1);
                }
              }
            }),
            e
          );
        })(v),
        D = (function (t) {
          function e(e) {
            var n = t.call(this, e) || this;
            return (n.destination = e), n;
          }
          return o(e, t), e;
        })(E),
        M = (function (t) {
          function e() {
            var e = t.call(this) || this;
            return (
              (e.observers = []),
              (e.closed = !1),
              (e.isStopped = !1),
              (e.hasError = !1),
              (e.thrownError = null),
              e
            );
          }
          return (
            o(e, t),
            (e.prototype[C] = function () {
              return new D(this);
            }),
            (e.prototype.lift = function (t) {
              var e = new j(this, this);
              return (e.operator = t), e;
            }),
            (e.prototype.next = function (t) {
              if (this.closed) throw new R();
              if (!this.isStopped)
                for (
                  var e = this.observers, n = e.length, r = e.slice(), o = 0;
                  o < n;
                  o++
                )
                  r[o].next(t);
            }),
            (e.prototype.error = function (t) {
              if (this.closed) throw new R();
              (this.hasError = !0),
                (this.thrownError = t),
                (this.isStopped = !0);
              for (
                var e = this.observers, n = e.length, r = e.slice(), o = 0;
                o < n;
                o++
              )
                r[o].error(t);
              this.observers.length = 0;
            }),
            (e.prototype.complete = function () {
              if (this.closed) throw new R();
              this.isStopped = !0;
              for (
                var t = this.observers, e = t.length, n = t.slice(), r = 0;
                r < e;
                r++
              )
                n[r].complete();
              this.observers.length = 0;
            }),
            (e.prototype.unsubscribe = function () {
              (this.isStopped = !0),
                (this.closed = !0),
                (this.observers = null);
            }),
            (e.prototype._trySubscribe = function (e) {
              if (this.closed) throw new R();
              return t.prototype._trySubscribe.call(this, e);
            }),
            (e.prototype._subscribe = function (t) {
              if (this.closed) throw new R();
              return this.hasError
                ? (t.error(this.thrownError), v.EMPTY)
                : this.isStopped
                ? (t.complete(), v.EMPTY)
                : (this.observers.push(t), new N(this, t));
            }),
            (e.prototype.asObservable = function () {
              var t = new A();
              return (t.source = this), t;
            }),
            (e.create = function (t, e) {
              return new j(t, e);
            }),
            e
          );
        })(A),
        j = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (r.destination = e), (r.source = n), r;
          }
          return (
            o(e, t),
            (e.prototype.next = function (t) {
              var e = this.destination;
              e && e.next && e.next(t);
            }),
            (e.prototype.error = function (t) {
              var e = this.destination;
              e && e.error && this.destination.error(t);
            }),
            (e.prototype.complete = function () {
              var t = this.destination;
              t && t.complete && this.destination.complete();
            }),
            (e.prototype._subscribe = function (t) {
              return this.source ? this.source.subscribe(t) : v.EMPTY;
            }),
            e
          );
        })(M);
      function V(t) {
        return t && "function" == typeof t.schedule;
      }
      var L = (function (t) {
          function e(e, n, r) {
            var o = t.call(this) || this;
            return (
              (o.parent = e),
              (o.outerValue = n),
              (o.outerIndex = r),
              (o.index = 0),
              o
            );
          }
          return (
            o(e, t),
            (e.prototype._next = function (t) {
              this.parent.notifyNext(
                this.outerValue,
                t,
                this.outerIndex,
                this.index++,
                this
              );
            }),
            (e.prototype._error = function (t) {
              this.parent.notifyError(t, this), this.unsubscribe();
            }),
            (e.prototype._complete = function () {
              this.parent.notifyComplete(this), this.unsubscribe();
            }),
            e
          );
        })(E),
        F = function (t) {
          return function (e) {
            for (var n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
            e.closed || e.complete();
          };
        },
        U = function (t) {
          return function (e) {
            return (
              t
                .then(
                  function (t) {
                    e.closed || (e.next(t), e.complete());
                  },
                  function (t) {
                    return e.error(t);
                  }
                )
                .then(null, _),
              e
            );
          };
        };
      function H() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      var z = H(),
        B = function (t) {
          return function (e) {
            for (var n = t[z](); ; ) {
              var r = n.next();
              if (r.done) {
                e.complete();
                break;
              }
              if ((e.next(r.value), e.closed)) break;
            }
            return (
              "function" == typeof n.return &&
                e.add(function () {
                  n.return && n.return();
                }),
              e
            );
          };
        },
        W = function (t) {
          return function (e) {
            var n = t[x]();
            if ("function" != typeof n.subscribe)
              throw new TypeError(
                "Provided object does not correctly implement Symbol.observable"
              );
            return n.subscribe(e);
          };
        },
        G = function (t) {
          return t && "number" == typeof t.length && "function" != typeof t;
        };
      function q(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      var Z = function (t) {
        if (t instanceof A)
          return function (e) {
            return t._isScalar
              ? (e.next(t.value), void e.complete())
              : t.subscribe(e);
          };
        if (t && "function" == typeof t[x]) return W(t);
        if (G(t)) return F(t);
        if (q(t)) return U(t);
        if (t && "function" == typeof t[z]) return B(t);
        var e = p(t) ? "an invalid object" : "'" + t + "'";
        throw new TypeError(
          "You provided " +
            e +
            " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable."
        );
      };
      function Q(t, e, n, r, o) {
        if ((void 0 === o && (o = new L(t, n, r)), !o.closed)) return Z(e)(o);
      }
      var Y = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          o(e, t),
          (e.prototype.notifyNext = function (t, e, n, r, o) {
            this.destination.next(e);
          }),
          (e.prototype.notifyError = function (t, e) {
            this.destination.error(t);
          }),
          (e.prototype.notifyComplete = function (t) {
            this.destination.complete();
          }),
          e
        );
      })(E);
      function $(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new K(t, e));
        };
      }
      var K = (function () {
          function t(t, e) {
            (this.project = t), (this.thisArg = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new X(t, this.project, this.thisArg));
            }),
            t
          );
        })(),
        X = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e) || this;
            return (o.project = n), (o.count = 0), (o.thisArg = r || o), o;
          }
          return (
            o(e, t),
            (e.prototype._next = function (t) {
              var e;
              try {
                e = this.project.call(this.thisArg, t, this.count++);
              } catch (n) {
                return void this.destination.error(n);
              }
              this.destination.next(e);
            }),
            e
          );
        })(E);
      function J(t, e) {
        return new A(
          e
            ? function (n) {
                var r = new v(),
                  o = 0;
                return (
                  r.add(
                    e.schedule(function () {
                      o !== t.length
                        ? (n.next(t[o++]), n.closed || r.add(this.schedule()))
                        : n.complete();
                    })
                  ),
                  r
                );
              }
            : F(t)
        );
      }
      function tt(t, e) {
        if (!e) return t instanceof A ? t : new A(Z(t));
        if (null != t) {
          if (
            (function (t) {
              return t && "function" == typeof t[x];
            })(t)
          )
            return (function (t, e) {
              return new A(
                e
                  ? function (n) {
                      var r = new v();
                      return (
                        r.add(
                          e.schedule(function () {
                            var o = t[x]();
                            r.add(
                              o.subscribe({
                                next: function (t) {
                                  r.add(
                                    e.schedule(function () {
                                      return n.next(t);
                                    })
                                  );
                                },
                                error: function (t) {
                                  r.add(
                                    e.schedule(function () {
                                      return n.error(t);
                                    })
                                  );
                                },
                                complete: function () {
                                  r.add(
                                    e.schedule(function () {
                                      return n.complete();
                                    })
                                  );
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    }
                  : W(t)
              );
            })(t, e);
          if (q(t))
            return (function (t, e) {
              return new A(
                e
                  ? function (n) {
                      var r = new v();
                      return (
                        r.add(
                          e.schedule(function () {
                            return t.then(
                              function (t) {
                                r.add(
                                  e.schedule(function () {
                                    n.next(t),
                                      r.add(
                                        e.schedule(function () {
                                          return n.complete();
                                        })
                                      );
                                  })
                                );
                              },
                              function (t) {
                                r.add(
                                  e.schedule(function () {
                                    return n.error(t);
                                  })
                                );
                              }
                            );
                          })
                        ),
                        r
                      );
                    }
                  : U(t)
              );
            })(t, e);
          if (G(t)) return J(t, e);
          if (
            (function (t) {
              return t && "function" == typeof t[z];
            })(t) ||
            "string" == typeof t
          )
            return (function (t, e) {
              if (!t) throw new Error("Iterable cannot be null");
              return new A(
                e
                  ? function (n) {
                      var r,
                        o = new v();
                      return (
                        o.add(function () {
                          r && "function" == typeof r.return && r.return();
                        }),
                        o.add(
                          e.schedule(function () {
                            (r = t[z]()),
                              o.add(
                                e.schedule(function () {
                                  if (!n.closed) {
                                    var t, e;
                                    try {
                                      var o = r.next();
                                      (t = o.value), (e = o.done);
                                    } catch (i) {
                                      return void n.error(i);
                                    }
                                    e
                                      ? n.complete()
                                      : (n.next(t), this.schedule());
                                  }
                                })
                              );
                          })
                        ),
                        o
                      );
                    }
                  : B(t)
              );
            })(t, e);
        }
        throw new TypeError(
          ((null !== t && typeof t) || t) + " is not observable"
        );
      }
      function et(t, e, n) {
        return (
          void 0 === n && (n = Number.POSITIVE_INFINITY),
          "function" == typeof e
            ? function (r) {
                return r.pipe(
                  et(function (n, r) {
                    return tt(t(n, r)).pipe(
                      $(function (t, o) {
                        return e(n, t, r, o);
                      })
                    );
                  }, n)
                );
              }
            : ("number" == typeof e && (n = e),
              function (e) {
                return e.lift(new nt(t, n));
              })
        );
      }
      var nt = (function () {
          function t(t, e) {
            void 0 === e && (e = Number.POSITIVE_INFINITY),
              (this.project = t),
              (this.concurrent = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new rt(t, this.project, this.concurrent));
            }),
            t
          );
        })(),
        rt = (function (t) {
          function e(e, n, r) {
            void 0 === r && (r = Number.POSITIVE_INFINITY);
            var o = t.call(this, e) || this;
            return (
              (o.project = n),
              (o.concurrent = r),
              (o.hasCompleted = !1),
              (o.buffer = []),
              (o.active = 0),
              (o.index = 0),
              o
            );
          }
          return (
            o(e, t),
            (e.prototype._next = function (t) {
              this.active < this.concurrent
                ? this._tryNext(t)
                : this.buffer.push(t);
            }),
            (e.prototype._tryNext = function (t) {
              var e,
                n = this.index++;
              try {
                e = this.project(t, n);
              } catch (r) {
                return void this.destination.error(r);
              }
              this.active++, this._innerSub(e, t, n);
            }),
            (e.prototype._innerSub = function (t, e, n) {
              var r = new L(this, void 0, void 0);
              this.destination.add(r), Q(this, t, e, n, r);
            }),
            (e.prototype._complete = function () {
              (this.hasCompleted = !0),
                0 === this.active &&
                  0 === this.buffer.length &&
                  this.destination.complete(),
                this.unsubscribe();
            }),
            (e.prototype.notifyNext = function (t, e, n, r, o) {
              this.destination.next(e);
            }),
            (e.prototype.notifyComplete = function (t) {
              var e = this.buffer;
              this.remove(t),
                this.active--,
                e.length > 0
                  ? this._next(e.shift())
                  : 0 === this.active &&
                    this.hasCompleted &&
                    this.destination.complete();
            }),
            e
          );
        })(Y);
      function ot(t) {
        return t;
      }
      function it(t) {
        return void 0 === t && (t = Number.POSITIVE_INFINITY), et(ot, t);
      }
      function lt() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var n = Number.POSITIVE_INFINITY,
          r = null,
          o = t[t.length - 1];
        return (
          V(o)
            ? ((r = t.pop()),
              t.length > 1 &&
                "number" == typeof t[t.length - 1] &&
                (n = t.pop()))
            : "number" == typeof o && (n = t.pop()),
          null === r && 1 === t.length && t[0] instanceof A
            ? t[0]
            : it(n)(J(t, r))
        );
      }
      function at() {
        return function (t) {
          return t.lift(new ut(t));
        };
      }
      var ut = (function () {
          function t(t) {
            this.connectable = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              var n = this.connectable;
              n._refCount++;
              var r = new st(t, n),
                o = e.subscribe(r);
              return r.closed || (r.connection = n.connect()), o;
            }),
            t
          );
        })(),
        st = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.connectable = n), r;
          }
          return (
            o(e, t),
            (e.prototype._unsubscribe = function () {
              var t = this.connectable;
              if (t) {
                this.connectable = null;
                var e = t._refCount;
                if (e <= 0) this.connection = null;
                else if (((t._refCount = e - 1), e > 1)) this.connection = null;
                else {
                  var n = this.connection,
                    r = t._connection;
                  (this.connection = null),
                    !r || (n && r !== n) || r.unsubscribe();
                }
              } else this.connection = null;
            }),
            e
          );
        })(E),
        ct = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (
              (r.source = e),
              (r.subjectFactory = n),
              (r._refCount = 0),
              (r._isComplete = !1),
              r
            );
          }
          return (
            o(e, t),
            (e.prototype._subscribe = function (t) {
              return this.getSubject().subscribe(t);
            }),
            (e.prototype.getSubject = function () {
              var t = this._subject;
              return (
                (t && !t.isStopped) || (this._subject = this.subjectFactory()),
                this._subject
              );
            }),
            (e.prototype.connect = function () {
              var t = this._connection;
              return (
                t ||
                  ((this._isComplete = !1),
                  (t = this._connection = new v()).add(
                    this.source.subscribe(new pt(this.getSubject(), this))
                  ),
                  t.closed
                    ? ((this._connection = null), (t = v.EMPTY))
                    : (this._connection = t)),
                t
              );
            }),
            (e.prototype.refCount = function () {
              return at()(this);
            }),
            e
          );
        })(A).prototype,
        ht = {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: ct._subscribe },
          _isComplete: { value: ct._isComplete, writable: !0 },
          getSubject: { value: ct.getSubject },
          connect: { value: ct.connect },
          refCount: { value: ct.refCount },
        },
        pt = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.connectable = n), r;
          }
          return (
            o(e, t),
            (e.prototype._error = function (e) {
              this._unsubscribe(), t.prototype._error.call(this, e);
            }),
            (e.prototype._complete = function () {
              (this.connectable._isComplete = !0),
                this._unsubscribe(),
                t.prototype._complete.call(this);
            }),
            (e.prototype._unsubscribe = function () {
              var t = this.connectable;
              if (t) {
                this.connectable = null;
                var e = t._connection;
                (t._refCount = 0),
                  (t._subject = null),
                  (t._connection = null),
                  e && e.unsubscribe();
              }
            }),
            e
          );
        })(D);
      function ft() {
        return new M();
      }
      var dt = "__parameters__",
        gt = "__prop__metadata__";
      function vt(t) {
        return function () {
          for (var e = [], n = 0; n < arguments.length; n++)
            e[n] = arguments[n];
          if (t) {
            var r = t.apply(void 0, c(e));
            for (var o in r) this[o] = r[o];
          }
        };
      }
      function mt(t, e, n) {
        var r = vt(e);
        function o() {
          for (var t, e = [], n = 0; n < arguments.length; n++)
            e[n] = arguments[n];
          if (this instanceof o) return r.apply(this, e), this;
          var i = new ((t = o).bind.apply(t, c([void 0], e)))();
          return (l.annotation = i), l;
          function l(t, e, n) {
            for (
              var r = t.hasOwnProperty(dt)
                ? t[dt]
                : Object.defineProperty(t, dt, { value: [] })[dt];
              r.length <= n;

            )
              r.push(null);
            return (r[n] = r[n] || []).push(i), t;
          }
        }
        return (
          n && (o.prototype = Object.create(n.prototype)),
          (o.prototype.ngMetadataName = t),
          (o.annotationCls = o),
          o
        );
      }
      function yt(t, e, n, r) {
        var o = vt(e);
        function i() {
          for (var t, e = [], n = 0; n < arguments.length; n++)
            e[n] = arguments[n];
          if (this instanceof i) return o.apply(this, e), this;
          var l = new ((t = i).bind.apply(t, c([void 0], e)))();
          return function (t, n) {
            var o = t.constructor,
              i = o.hasOwnProperty(gt)
                ? o[gt]
                : Object.defineProperty(o, gt, { value: {} })[gt];
            (i[n] = (i.hasOwnProperty(n) && i[n]) || []),
              i[n].unshift(l),
              r && r.apply(void 0, c([t, n], e));
          };
        }
        return (
          n && (i.prototype = Object.create(n.prototype)),
          (i.prototype.ngMetadataName = t),
          (i.annotationCls = i),
          i
        );
      }
      var bt = mt("Inject", function (t) {
          return { token: t };
        }),
        _t = mt("Optional"),
        wt = mt("Self"),
        Ct = mt("SkipSelf"),
        Et = (function (t) {
          return (
            (t[(t.Default = 0)] = "Default"),
            (t[(t.Host = 1)] = "Host"),
            (t[(t.Self = 2)] = "Self"),
            (t[(t.SkipSelf = 4)] = "SkipSelf"),
            (t[(t.Optional = 8)] = "Optional"),
            t
          );
        })({});
      function St(t) {
        for (var e in t) if (t[e] === St) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function xt(t) {
        return {
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function Ot(t) {
        return t && t.hasOwnProperty(Tt) ? t[Tt] : null;
      }
      var Tt = St({ ngInjectableDef: St });
      function kt(t) {
        if ("string" == typeof t) return t;
        if (t instanceof Array) return "[" + t.map(kt).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return "" + t.overriddenName;
        if (t.name) return "" + t.name;
        var e = t.toString();
        if (null == e) return "" + e;
        var n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      var At = St({ __forward_ref__: St });
      function It(t) {
        return (
          (t.__forward_ref__ = It),
          (t.toString = function () {
            return kt(this());
          }),
          t
        );
      }
      function Pt(t) {
        var e = t;
        return "function" == typeof e &&
          e.hasOwnProperty(At) &&
          e.__forward_ref__ === It
          ? e()
          : t;
      }
      function Rt() {
        var t = "undefined" != typeof globalThis && globalThis,
          e = "undefined" != typeof window && window,
          n =
            "undefined" != typeof self &&
            "undefined" != typeof WorkerGlobalScope &&
            self instanceof WorkerGlobalScope &&
            self,
          r = "undefined" != typeof global && global;
        return t || r || e || n;
      }
      var Nt,
        Dt = Rt(),
        Mt = void 0;
      function jt(t) {
        var e = Mt;
        return (Mt = t), e;
      }
      function Vt(t, e) {
        return (
          void 0 === e && (e = Et.Default),
          (
            Nt ||
            function (t, e) {
              if ((void 0 === e && (e = Et.Default), void 0 === Mt))
                throw new Error(
                  "inject() must be called from an injection context"
                );
              return null === Mt
                ? (function (t, e, n) {
                    var r = Ot(t);
                    if (r && "root" == r.providedIn)
                      return void 0 === r.value
                        ? (r.value = r.factory())
                        : r.value;
                    if (n & Et.Optional) return null;
                    throw new Error("Injector: NOT_FOUND [" + kt(t) + "]");
                  })(t, 0, e)
                : Mt.get(t, e & Et.Optional ? null : void 0, e);
            }
          )(t, e)
        );
      }
      var Lt = (function () {
          function t(t, e) {
            (this._desc = t),
              (this.ngMetadataName = "InjectionToken"),
              (this.ngInjectableDef = void 0),
              "number" == typeof e
                ? (this.__NG_ELEMENT_ID__ = e)
                : void 0 !== e &&
                  (this.ngInjectableDef = xt({
                    providedIn: e.providedIn || "root",
                    factory: e.factory,
                  }));
          }
          return (
            (t.prototype.toString = function () {
              return "InjectionToken " + this._desc;
            }),
            t
          );
        })(),
        Ft = "__source",
        Ut = new Object(),
        Ht = new Lt("INJECTOR", -1),
        zt = (function () {
          function t() {}
          return (
            (t.prototype.get = function (t, e) {
              if ((void 0 === e && (e = Ut), e === Ut)) {
                var n = new Error(
                  "NullInjectorError: No provider for " + kt(t) + "!"
                );
                throw ((n.name = "NullInjectorError"), n);
              }
              return e;
            }),
            t
          );
        })(),
        Bt = (function () {
          function t() {}
          return (
            (t.create = function (t, e) {
              return Array.isArray(t)
                ? new Kt(t, e)
                : new Kt(t.providers, t.parent, t.name || null);
            }),
            (t.THROW_IF_NOT_FOUND = Ut),
            (t.NULL = new zt()),
            (t.ngInjectableDef = xt({
              providedIn: "any",
              factory: function () {
                return Vt(Ht);
              },
            })),
            (t.__NG_ELEMENT_ID__ = -1),
            t
          );
        })(),
        Wt = function (t) {
          return t;
        },
        Gt = [],
        qt = Wt,
        Zt = function () {
          return Array.prototype.slice.call(arguments);
        },
        Qt = St({ provide: String, useValue: St }),
        Yt = /\n/gm,
        $t = "\u0275",
        Kt = (function () {
          function t(t, e, n) {
            void 0 === e && (e = Bt.NULL),
              void 0 === n && (n = null),
              (this.parent = e),
              (this.source = n);
            var r = (this._records = new Map());
            r.set(Bt, { token: Bt, fn: Wt, deps: Gt, value: this, useNew: !1 }),
              r.set(Ht, {
                token: Ht,
                fn: Wt,
                deps: Gt,
                value: this,
                useNew: !1,
              }),
              (function t(e, n) {
                if (n)
                  if ((n = Pt(n)) instanceof Array)
                    for (var r = 0; r < n.length; r++) t(e, n[r]);
                  else {
                    if ("function" == typeof n)
                      throw te("Function/Class not supported", n);
                    if (!n || "object" != typeof n || !n.provide)
                      throw te("Unexpected provider", n);
                    var o = Pt(n.provide),
                      i = (function (t) {
                        var e = (function (t) {
                            var e = Gt,
                              n = t.deps;
                            if (n && n.length) {
                              e = [];
                              for (var r = 0; r < n.length; r++) {
                                var o = 6;
                                if ((u = Pt(n[r])) instanceof Array)
                                  for (var i = 0, l = u; i < l.length; i++) {
                                    var a = l[i];
                                    a instanceof _t || a == _t
                                      ? (o |= 1)
                                      : a instanceof Ct || a == Ct
                                      ? (o &= -3)
                                      : a instanceof wt || a == wt
                                      ? (o &= -5)
                                      : (u = a instanceof bt ? a.token : Pt(a));
                                  }
                                e.push({ token: u, options: o });
                              }
                            } else if (t.useExisting) {
                              var u;
                              e = [
                                { token: (u = Pt(t.useExisting)), options: 6 },
                              ];
                            } else if (!(n || Qt in t))
                              throw te("'deps' required", t);
                            return e;
                          })(t),
                          n = Wt,
                          r = Gt,
                          o = !1,
                          i = Pt(t.provide);
                        if (Qt in t) r = t.useValue;
                        else if (t.useFactory) n = t.useFactory;
                        else if (t.useExisting);
                        else if (t.useClass) (o = !0), (n = Pt(t.useClass));
                        else {
                          if ("function" != typeof i)
                            throw te(
                              "StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable",
                              t
                            );
                          (o = !0), (n = i);
                        }
                        return { deps: e, fn: n, useNew: o, value: r };
                      })(n);
                    if (!0 === n.multi) {
                      var l = e.get(o);
                      if (l) {
                        if (l.fn !== Zt) throw Xt(o);
                      } else
                        e.set(
                          o,
                          (l = {
                            token: n.provide,
                            deps: [],
                            useNew: !1,
                            fn: Zt,
                            value: Gt,
                          })
                        );
                      l.deps.push({ token: (o = n), options: 6 });
                    }
                    var a = e.get(o);
                    if (a && a.fn == Zt) throw Xt(o);
                    e.set(o, i);
                  }
              })(r, t);
          }
          return (
            (t.prototype.get = function (t, e, n) {
              void 0 === n && (n = Et.Default);
              var r = this._records.get(t);
              try {
                return (function t(e, n, r, o, i, l) {
                  try {
                    return (function (e, n, r, o, i, l) {
                      var a, u;
                      if (!n || l & Et.SkipSelf)
                        l & Et.Self || (u = o.get(e, i, Et.Default));
                      else {
                        if ((u = n.value) == qt)
                          throw Error($t + "Circular dependency");
                        if (u === Gt) {
                          n.value = qt;
                          var s = n.useNew,
                            h = n.fn,
                            p = n.deps,
                            f = Gt;
                          if (p.length) {
                            f = [];
                            for (var d = 0; d < p.length; d++) {
                              var g = p[d],
                                v = g.options,
                                m = 2 & v ? r.get(g.token) : void 0;
                              f.push(
                                t(
                                  g.token,
                                  m,
                                  r,
                                  m || 4 & v ? o : Bt.NULL,
                                  1 & v ? null : Bt.THROW_IF_NOT_FOUND,
                                  Et.Default
                                )
                              );
                            }
                          }
                          n.value = u = s
                            ? new ((a = h).bind.apply(a, c([void 0], f)))()
                            : h.apply(void 0, f);
                        }
                      }
                      return u;
                    })(e, n, r, o, i, l);
                  } catch (a) {
                    throw (
                      (a instanceof Error || (a = new Error(a)),
                      (a.ngTempTokenPath = a.ngTempTokenPath || []).unshift(e),
                      n && n.value == qt && (n.value = Gt),
                      a)
                    );
                  }
                })(t, r, this._records, this.parent, e, n);
              } catch (o) {
                return (function (t, e, n, r) {
                  var o = t.ngTempTokenPath;
                  throw (
                    (e[Ft] && o.unshift(e[Ft]),
                    (t.message = Jt(
                      "\n" + t.message,
                      o,
                      "StaticInjectorError",
                      r
                    )),
                    (t.ngTokenPath = o),
                    (t.ngTempTokenPath = null),
                    t)
                  );
                })(o, t, 0, this.source);
              }
            }),
            (t.prototype.toString = function () {
              var t = [];
              return (
                this._records.forEach(function (e, n) {
                  return t.push(kt(n));
                }),
                "StaticInjector[" + t.join(", ") + "]"
              );
            }),
            t
          );
        })();
      function Xt(t) {
        return te("Cannot mix multi providers and regular providers", t);
      }
      function Jt(t, e, n, r) {
        void 0 === r && (r = null),
          (t =
            t && "\n" === t.charAt(0) && t.charAt(1) == $t ? t.substr(2) : t);
        var o = kt(e);
        if (e instanceof Array) o = e.map(kt).join(" -> ");
        else if ("object" == typeof e) {
          var i = [];
          for (var l in e)
            if (e.hasOwnProperty(l)) {
              var a = e[l];
              i.push(
                l + ":" + ("string" == typeof a ? JSON.stringify(a) : kt(a))
              );
            }
          o = "{" + i.join(", ") + "}";
        }
        return (
          n + (r ? "(" + r + ")" : "") + "[" + o + "]: " + t.replace(Yt, "\n  ")
        );
      }
      function te(t, e) {
        return new Error(Jt(t, e, "StaticInjectorError"));
      }
      var ee = "ngDebugContext",
        ne = "ngOriginalError",
        re = "ngErrorLogger",
        oe = new Lt("AnalyzeForEntryComponents"),
        ie = (function (t) {
          return (
            (t[(t.Emulated = 0)] = "Emulated"),
            (t[(t.Native = 1)] = "Native"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            t
          );
        })({}),
        le = (function () {
          return (
            ("undefined" != typeof requestAnimationFrame &&
              requestAnimationFrame) ||
            setTimeout
          ).bind(Dt);
        })();
      function ae(t) {
        return t[ee];
      }
      function ue(t) {
        return t[ne];
      }
      function se(t) {
        for (var e = [], n = 1; n < arguments.length; n++)
          e[n - 1] = arguments[n];
        t.error.apply(t, c(e));
      }
      var ce = (function () {
          function t() {
            this._console = console;
          }
          return (
            (t.prototype.handleError = function (t) {
              var e = this._findOriginalError(t),
                n = this._findContext(t),
                r = (function (t) {
                  return t[re] || se;
                })(t);
              r(this._console, "ERROR", t),
                e && r(this._console, "ORIGINAL ERROR", e),
                n && r(this._console, "ERROR CONTEXT", n);
            }),
            (t.prototype._findContext = function (t) {
              return t ? (ae(t) ? ae(t) : this._findContext(ue(t))) : null;
            }),
            (t.prototype._findOriginalError = function (t) {
              for (var e = ue(t); e && ue(e); ) e = ue(e);
              return e;
            }),
            t
          );
        })(),
        he = !0,
        pe = !1;
      function fe() {
        return (pe = !0), he;
      }
      var de = (function () {
          function t(t) {
            if (
              ((this.defaultDoc = t),
              (this.inertDocument =
                this.defaultDoc.implementation.createHTMLDocument(
                  "sanitization-inert"
                )),
              (this.inertBodyElement = this.inertDocument.body),
              null == this.inertBodyElement)
            ) {
              var e = this.inertDocument.createElement("html");
              this.inertDocument.appendChild(e),
                (this.inertBodyElement =
                  this.inertDocument.createElement("body")),
                e.appendChild(this.inertBodyElement);
            }
            (this.inertBodyElement.innerHTML =
              '<svg><g onload="this.parentNode.remove()"></g></svg>'),
              !this.inertBodyElement.querySelector ||
              this.inertBodyElement.querySelector("svg")
                ? ((this.inertBodyElement.innerHTML =
                    '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">'),
                  (this.getInertBodyElement =
                    this.inertBodyElement.querySelector &&
                    this.inertBodyElement.querySelector("svg img") &&
                    (function () {
                      try {
                        return !!window.DOMParser;
                      } catch (t) {
                        return !1;
                      }
                    })()
                      ? this.getInertBodyElement_DOMParser
                      : this.getInertBodyElement_InertDocument))
                : (this.getInertBodyElement = this.getInertBodyElement_XHR);
          }
          return (
            (t.prototype.getInertBodyElement_XHR = function (t) {
              t = "<body><remove></remove>" + t + "</body>";
              try {
                t = encodeURI(t);
              } catch (r) {
                return null;
              }
              var e = new XMLHttpRequest();
              (e.responseType = "document"),
                e.open("GET", "data:text/html;charset=utf-8," + t, !1),
                e.send(void 0);
              var n = e.response.body;
              return n.removeChild(n.firstChild), n;
            }),
            (t.prototype.getInertBodyElement_DOMParser = function (t) {
              t = "<body><remove></remove>" + t + "</body>";
              try {
                var e = new window.DOMParser().parseFromString(
                  t,
                  "text/html"
                ).body;
                return e.removeChild(e.firstChild), e;
              } catch (n) {
                return null;
              }
            }),
            (t.prototype.getInertBodyElement_InertDocument = function (t) {
              var e = this.inertDocument.createElement("template");
              return "content" in e
                ? ((e.innerHTML = t), e)
                : ((this.inertBodyElement.innerHTML = t),
                  this.defaultDoc.documentMode &&
                    this.stripCustomNsAttrs(this.inertBodyElement),
                  this.inertBodyElement);
            }),
            (t.prototype.stripCustomNsAttrs = function (t) {
              for (var e = t.attributes, n = e.length - 1; 0 < n; n--) {
                var r = e.item(n).name;
                ("xmlns:ns1" !== r && 0 !== r.indexOf("ns1:")) ||
                  t.removeAttribute(r);
              }
              for (var o = t.firstChild; o; )
                o.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(o),
                  (o = o.nextSibling);
            }),
            t
          );
        })(),
        ge = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
        ve =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function me(t) {
        return (t = String(t)).match(ge) || t.match(ve)
          ? t
          : (fe() &&
              console.warn(
                "WARNING: sanitizing unsafe URL value " +
                  t +
                  " (see http://g.co/ng/security#xss)"
              ),
            "unsafe:" + t);
      }
      function ye(t) {
        var e,
          n,
          r = {};
        try {
          for (var o = u(t.split(",")), i = o.next(); !i.done; i = o.next())
            r[i.value] = !0;
        } catch (l) {
          e = { error: l };
        } finally {
          try {
            i && !i.done && (n = o.return) && n.call(o);
          } finally {
            if (e) throw e.error;
          }
        }
        return r;
      }
      function be() {
        for (var t, e, n = [], r = 0; r < arguments.length; r++)
          n[r] = arguments[r];
        var o = {};
        try {
          for (var i = u(n), l = i.next(); !l.done; l = i.next()) {
            var a = l.value;
            for (var s in a) a.hasOwnProperty(s) && (o[s] = !0);
          }
        } catch (c) {
          t = { error: c };
        } finally {
          try {
            l && !l.done && (e = i.return) && e.call(i);
          } finally {
            if (t) throw t.error;
          }
        }
        return o;
      }
      var _e,
        we = ye("area,br,col,hr,img,wbr"),
        Ce = ye("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        Ee = ye("rp,rt"),
        Se = be(Ee, Ce),
        xe = be(
          we,
          be(
            Ce,
            ye(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          be(
            Ee,
            ye(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          Se
        ),
        Oe = ye("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Te = ye("srcset"),
        ke = be(
          Oe,
          Te,
          ye(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          ye(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        Ae = ye("script,style,template"),
        Ie = (function () {
          function t() {
            (this.sanitizedSomething = !1), (this.buf = []);
          }
          return (
            (t.prototype.sanitizeChildren = function (t) {
              for (var e = t.firstChild, n = !0; e; )
                if (
                  (e.nodeType === Node.ELEMENT_NODE
                    ? (n = this.startElement(e))
                    : e.nodeType === Node.TEXT_NODE
                    ? this.chars(e.nodeValue)
                    : (this.sanitizedSomething = !0),
                  n && e.firstChild)
                )
                  e = e.firstChild;
                else
                  for (; e; ) {
                    e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                    var r = this.checkClobberedElement(e, e.nextSibling);
                    if (r) {
                      e = r;
                      break;
                    }
                    e = this.checkClobberedElement(e, e.parentNode);
                  }
              return this.buf.join("");
            }),
            (t.prototype.startElement = function (t) {
              var e,
                n = t.nodeName.toLowerCase();
              if (!xe.hasOwnProperty(n))
                return (this.sanitizedSomething = !0), !Ae.hasOwnProperty(n);
              this.buf.push("<"), this.buf.push(n);
              for (var r = t.attributes, o = 0; o < r.length; o++) {
                var i = r.item(o),
                  l = i.name,
                  a = l.toLowerCase();
                if (ke.hasOwnProperty(a)) {
                  var u = i.value;
                  Oe[a] && (u = me(u)),
                    Te[a] &&
                      ((e = u),
                      (u = (e = String(e))
                        .split(",")
                        .map(function (t) {
                          return me(t.trim());
                        })
                        .join(", "))),
                    this.buf.push(" ", l, '="', Ne(u), '"');
                } else this.sanitizedSomething = !0;
              }
              return this.buf.push(">"), !0;
            }),
            (t.prototype.endElement = function (t) {
              var e = t.nodeName.toLowerCase();
              xe.hasOwnProperty(e) &&
                !we.hasOwnProperty(e) &&
                (this.buf.push("</"), this.buf.push(e), this.buf.push(">"));
            }),
            (t.prototype.chars = function (t) {
              this.buf.push(Ne(t));
            }),
            (t.prototype.checkClobberedElement = function (t, e) {
              if (
                e &&
                (t.compareDocumentPosition(e) &
                  Node.DOCUMENT_POSITION_CONTAINED_BY) ===
                  Node.DOCUMENT_POSITION_CONTAINED_BY
              )
                throw new Error(
                  "Failed to sanitize html because the element is clobbered: " +
                    t.outerHTML
                );
              return e;
            }),
            t
          );
        })(),
        Pe = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        Re = /([^\#-~ |!])/g;
      function Ne(t) {
        return t
          .replace(/&/g, "&amp;")
          .replace(Pe, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(Re, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      function De(t) {
        return "content" in t &&
          (function (t) {
            return (
              t.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === t.nodeName
            );
          })(t)
          ? t.content
          : null;
      }
      var Me = (function (t) {
          return (
            (t[(t.NONE = 0)] = "NONE"),
            (t[(t.HTML = 1)] = "HTML"),
            (t[(t.STYLE = 2)] = "STYLE"),
            (t[(t.SCRIPT = 3)] = "SCRIPT"),
            (t[(t.URL = 4)] = "URL"),
            (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
            t
          );
        })({}),
        je = (function () {
          return function () {};
        })(),
        Ve = new RegExp(
          "^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$",
          "g"
        ),
        Le = /^url\(([^)]+)\)$/,
        Fe = /([A-Z])/g;
      function Ue(t) {
        try {
          return null != t ? t.toString().slice(0, 30) : t;
        } catch (e) {
          return "[ERROR] Exception while trying to serialize the value";
        }
      }
      function He(t) {
        return !!t && "function" == typeof t.then;
      }
      function ze(t) {
        return !!t && "function" == typeof t.subscribe;
      }
      var Be = null;
      function We() {
        if (!Be) {
          var t = Dt.Symbol;
          if (t && t.iterator) Be = t.iterator;
          else
            for (
              var e = Object.getOwnPropertyNames(Map.prototype), n = 0;
              n < e.length;
              ++n
            ) {
              var r = e[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (Be = r);
            }
        }
        return Be;
      }
      function Ge(t, e) {
        return (
          t === e ||
          ("number" == typeof t && "number" == typeof e && isNaN(t) && isNaN(e))
        );
      }
      function qe(t, e) {
        var n = Qe(t),
          r = Qe(e);
        return n && r
          ? (function (t, e, n) {
              for (var r = t[We()](), o = e[We()](); ; ) {
                var i = r.next(),
                  l = o.next();
                if (i.done && l.done) return !0;
                if (i.done || l.done) return !1;
                if (!n(i.value, l.value)) return !1;
              }
            })(t, e, qe)
          : !(
              n ||
              !t ||
              ("object" != typeof t && "function" != typeof t) ||
              r ||
              !e ||
              ("object" != typeof e && "function" != typeof e)
            ) || Ge(t, e);
      }
      var Ze = (function () {
        function t(t) {
          this.wrapped = t;
        }
        return (
          (t.wrap = function (e) {
            return new t(e);
          }),
          (t.unwrap = function (e) {
            return t.isWrapped(e) ? e.wrapped : e;
          }),
          (t.isWrapped = function (e) {
            return e instanceof t;
          }),
          t
        );
      })();
      function Qe(t) {
        return (
          !!Ye(t) && (Array.isArray(t) || (!(t instanceof Map) && We() in t))
        );
      }
      function Ye(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      var $e = (function () {
          function t(t, e, n) {
            (this.previousValue = t),
              (this.currentValue = e),
              (this.firstChange = n);
          }
          return (
            (t.prototype.isFirstChange = function () {
              return this.firstChange;
            }),
            t
          );
        })(),
        Ke = new Lt(
          "The presence of this token marks an injector as being the root injector."
        ),
        Xe = (function () {
          return function () {};
        })(),
        Je = (function () {
          return function () {};
        })();
      function tn(t) {
        var e = Error(
          "No component factory found for " +
            kt(t) +
            ". Did you add it to @NgModule.entryComponents?"
        );
        return (e[en] = t), e;
      }
      var en = "ngComponent",
        nn = (function () {
          function t() {}
          return (
            (t.prototype.resolveComponentFactory = function (t) {
              throw tn(t);
            }),
            t
          );
        })(),
        rn = (function () {
          function t() {}
          return (t.NULL = new nn()), t;
        })(),
        on = (function () {
          function t(t, e, n) {
            (this._parent = e),
              (this._ngModule = n),
              (this._factories = new Map());
            for (var r = 0; r < t.length; r++) {
              var o = t[r];
              this._factories.set(o.componentType, o);
            }
          }
          return (
            (t.prototype.resolveComponentFactory = function (t) {
              var e = this._factories.get(t);
              if (
                (!e &&
                  this._parent &&
                  (e = this._parent.resolveComponentFactory(t)),
                !e)
              )
                throw tn(t);
              return new ln(e, this._ngModule);
            }),
            t
          );
        })(),
        ln = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (
              (r.factory = e),
              (r.ngModule = n),
              (r.selector = e.selector),
              (r.componentType = e.componentType),
              (r.ngContentSelectors = e.ngContentSelectors),
              (r.inputs = e.inputs),
              (r.outputs = e.outputs),
              r
            );
          }
          return (
            o(e, t),
            (e.prototype.create = function (t, e, n, r) {
              return this.factory.create(t, e, n, r || this.ngModule);
            }),
            e
          );
        })(Je),
        an = (function () {
          return function () {};
        })(),
        un = (function () {
          return function () {};
        })();
      function sn() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
      }
      var cn = (function () {
          function t(t) {
            this.nativeElement = t;
          }
          return (
            (t.__NG_ELEMENT_ID__ = function () {
              return hn(t);
            }),
            t
          );
        })(),
        hn = sn,
        pn = (function () {
          return function () {};
        })(),
        fn = (function () {
          return function () {};
        })(),
        dn = (function (t) {
          return (
            (t[(t.Important = 1)] = "Important"),
            (t[(t.DashCase = 2)] = "DashCase"),
            t
          );
        })({}),
        gn = (function () {
          function t() {}
          return (
            (t.__NG_ELEMENT_ID__ = function () {
              return vn();
            }),
            t
          );
        })(),
        vn = sn,
        mn = new ((function () {
          return function (t) {
            (this.full = t),
              (this.major = t.split(".")[0]),
              (this.minor = t.split(".")[1]),
              (this.patch = t.split(".").slice(2).join("."));
          };
        })())("8.0.0"),
        yn = (function () {
          function t() {}
          return (
            (t.prototype.supports = function (t) {
              return Qe(t);
            }),
            (t.prototype.create = function (t) {
              return new _n(t);
            }),
            t
          );
        })(),
        bn = function (t, e) {
          return e;
        },
        _n = (function () {
          function t(t) {
            (this.length = 0),
              (this._linkedRecords = null),
              (this._unlinkedRecords = null),
              (this._previousItHead = null),
              (this._itHead = null),
              (this._itTail = null),
              (this._additionsHead = null),
              (this._additionsTail = null),
              (this._movesHead = null),
              (this._movesTail = null),
              (this._removalsHead = null),
              (this._removalsTail = null),
              (this._identityChangesHead = null),
              (this._identityChangesTail = null),
              (this._trackByFn = t || bn);
          }
          return (
            (t.prototype.forEachItem = function (t) {
              var e;
              for (e = this._itHead; null !== e; e = e._next) t(e);
            }),
            (t.prototype.forEachOperation = function (t) {
              for (
                var e = this._itHead, n = this._removalsHead, r = 0, o = null;
                e || n;

              ) {
                var i = !n || (e && e.currentIndex < Sn(n, r, o)) ? e : n,
                  l = Sn(i, r, o),
                  a = i.currentIndex;
                if (i === n) r--, (n = n._nextRemoved);
                else if (((e = e._next), null == i.previousIndex)) r++;
                else {
                  o || (o = []);
                  var u = l - r,
                    s = a - r;
                  if (u != s) {
                    for (var c = 0; c < u; c++) {
                      var h = c < o.length ? o[c] : (o[c] = 0),
                        p = h + c;
                      s <= p && p < u && (o[c] = h + 1);
                    }
                    o[i.previousIndex] = s - u;
                  }
                }
                l !== a && t(i, l, a);
              }
            }),
            (t.prototype.forEachPreviousItem = function (t) {
              var e;
              for (e = this._previousItHead; null !== e; e = e._nextPrevious)
                t(e);
            }),
            (t.prototype.forEachAddedItem = function (t) {
              var e;
              for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
            }),
            (t.prototype.forEachMovedItem = function (t) {
              var e;
              for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
            }),
            (t.prototype.forEachRemovedItem = function (t) {
              var e;
              for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
            }),
            (t.prototype.forEachIdentityChange = function (t) {
              var e;
              for (
                e = this._identityChangesHead;
                null !== e;
                e = e._nextIdentityChange
              )
                t(e);
            }),
            (t.prototype.diff = function (t) {
              if ((null == t && (t = []), !Qe(t)))
                throw new Error(
                  "Error trying to diff '" +
                    kt(t) +
                    "'. Only arrays and iterables are allowed"
                );
              return this.check(t) ? this : null;
            }),
            (t.prototype.onDestroy = function () {}),
            (t.prototype.check = function (t) {
              var e = this;
              this._reset();
              var n,
                r,
                o,
                i = this._itHead,
                l = !1;
              if (Array.isArray(t)) {
                this.length = t.length;
                for (var a = 0; a < this.length; a++)
                  (o = this._trackByFn(a, (r = t[a]))),
                    null !== i && Ge(i.trackById, o)
                      ? (l && (i = this._verifyReinsertion(i, r, o, a)),
                        Ge(i.item, r) || this._addIdentityChange(i, r))
                      : ((i = this._mismatch(i, r, o, a)), (l = !0)),
                    (i = i._next);
              } else
                (n = 0),
                  (function (t, e) {
                    if (Array.isArray(t))
                      for (var n = 0; n < t.length; n++) e(t[n]);
                    else
                      for (
                        var r = t[We()](), o = void 0;
                        !(o = r.next()).done;

                      )
                        e(o.value);
                  })(t, function (t) {
                    (o = e._trackByFn(n, t)),
                      null !== i && Ge(i.trackById, o)
                        ? (l && (i = e._verifyReinsertion(i, t, o, n)),
                          Ge(i.item, t) || e._addIdentityChange(i, t))
                        : ((i = e._mismatch(i, t, o, n)), (l = !0)),
                      (i = i._next),
                      n++;
                  }),
                  (this.length = n);
              return this._truncate(i), (this.collection = t), this.isDirty;
            }),
            Object.defineProperty(t.prototype, "isDirty", {
              get: function () {
                return (
                  null !== this._additionsHead ||
                  null !== this._movesHead ||
                  null !== this._removalsHead ||
                  null !== this._identityChangesHead
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype._reset = function () {
              if (this.isDirty) {
                var t = void 0,
                  e = void 0;
                for (
                  t = this._previousItHead = this._itHead;
                  null !== t;
                  t = t._next
                )
                  t._nextPrevious = t._next;
                for (t = this._additionsHead; null !== t; t = t._nextAdded)
                  t.previousIndex = t.currentIndex;
                for (
                  this._additionsHead = this._additionsTail = null,
                    t = this._movesHead;
                  null !== t;
                  t = e
                )
                  (t.previousIndex = t.currentIndex), (e = t._nextMoved);
                (this._movesHead = this._movesTail = null),
                  (this._removalsHead = this._removalsTail = null),
                  (this._identityChangesHead = this._identityChangesTail =
                    null);
              }
            }),
            (t.prototype._mismatch = function (t, e, n, r) {
              var o;
              return (
                null === t
                  ? (o = this._itTail)
                  : ((o = t._prev), this._remove(t)),
                null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(n, r))
                  ? (Ge(t.item, e) || this._addIdentityChange(t, e),
                    this._moveAfter(t, o, r))
                  : null !==
                    (t =
                      null === this._unlinkedRecords
                        ? null
                        : this._unlinkedRecords.get(n, null))
                  ? (Ge(t.item, e) || this._addIdentityChange(t, e),
                    this._reinsertAfter(t, o, r))
                  : (t = this._addAfter(new wn(e, n), o, r)),
                t
              );
            }),
            (t.prototype._verifyReinsertion = function (t, e, n, r) {
              var o =
                null === this._unlinkedRecords
                  ? null
                  : this._unlinkedRecords.get(n, null);
              return (
                null !== o
                  ? (t = this._reinsertAfter(o, t._prev, r))
                  : t.currentIndex != r &&
                    ((t.currentIndex = r), this._addToMoves(t, r)),
                t
              );
            }),
            (t.prototype._truncate = function (t) {
              for (; null !== t; ) {
                var e = t._next;
                this._addToRemovals(this._unlink(t)), (t = e);
              }
              null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
                null !== this._additionsTail &&
                  (this._additionsTail._nextAdded = null),
                null !== this._movesTail && (this._movesTail._nextMoved = null),
                null !== this._itTail && (this._itTail._next = null),
                null !== this._removalsTail &&
                  (this._removalsTail._nextRemoved = null),
                null !== this._identityChangesTail &&
                  (this._identityChangesTail._nextIdentityChange = null);
            }),
            (t.prototype._reinsertAfter = function (t, e, n) {
              null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
              var r = t._prevRemoved,
                o = t._nextRemoved;
              return (
                null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
                null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
                this._insertAfter(t, e, n),
                this._addToMoves(t, n),
                t
              );
            }),
            (t.prototype._moveAfter = function (t, e, n) {
              return (
                this._unlink(t),
                this._insertAfter(t, e, n),
                this._addToMoves(t, n),
                t
              );
            }),
            (t.prototype._addAfter = function (t, e, n) {
              return (
                this._insertAfter(t, e, n),
                (this._additionsTail =
                  null === this._additionsTail
                    ? (this._additionsHead = t)
                    : (this._additionsTail._nextAdded = t)),
                t
              );
            }),
            (t.prototype._insertAfter = function (t, e, n) {
              var r = null === e ? this._itHead : e._next;
              return (
                (t._next = r),
                (t._prev = e),
                null === r ? (this._itTail = t) : (r._prev = t),
                null === e ? (this._itHead = t) : (e._next = t),
                null === this._linkedRecords &&
                  (this._linkedRecords = new En()),
                this._linkedRecords.put(t),
                (t.currentIndex = n),
                t
              );
            }),
            (t.prototype._remove = function (t) {
              return this._addToRemovals(this._unlink(t));
            }),
            (t.prototype._unlink = function (t) {
              null !== this._linkedRecords && this._linkedRecords.remove(t);
              var e = t._prev,
                n = t._next;
              return (
                null === e ? (this._itHead = n) : (e._next = n),
                null === n ? (this._itTail = e) : (n._prev = e),
                t
              );
            }),
            (t.prototype._addToMoves = function (t, e) {
              return t.previousIndex === e
                ? t
                : ((this._movesTail =
                    null === this._movesTail
                      ? (this._movesHead = t)
                      : (this._movesTail._nextMoved = t)),
                  t);
            }),
            (t.prototype._addToRemovals = function (t) {
              return (
                null === this._unlinkedRecords &&
                  (this._unlinkedRecords = new En()),
                this._unlinkedRecords.put(t),
                (t.currentIndex = null),
                (t._nextRemoved = null),
                null === this._removalsTail
                  ? ((this._removalsTail = this._removalsHead = t),
                    (t._prevRemoved = null))
                  : ((t._prevRemoved = this._removalsTail),
                    (this._removalsTail = this._removalsTail._nextRemoved = t)),
                t
              );
            }),
            (t.prototype._addIdentityChange = function (t, e) {
              return (
                (t.item = e),
                (this._identityChangesTail =
                  null === this._identityChangesTail
                    ? (this._identityChangesHead = t)
                    : (this._identityChangesTail._nextIdentityChange = t)),
                t
              );
            }),
            t
          );
        })(),
        wn = (function () {
          return function (t, e) {
            (this.item = t),
              (this.trackById = e),
              (this.currentIndex = null),
              (this.previousIndex = null),
              (this._nextPrevious = null),
              (this._prev = null),
              (this._next = null),
              (this._prevDup = null),
              (this._nextDup = null),
              (this._prevRemoved = null),
              (this._nextRemoved = null),
              (this._nextAdded = null),
              (this._nextMoved = null),
              (this._nextIdentityChange = null);
          };
        })(),
        Cn = (function () {
          function t() {
            (this._head = null), (this._tail = null);
          }
          return (
            (t.prototype.add = function (t) {
              null === this._head
                ? ((this._head = this._tail = t),
                  (t._nextDup = null),
                  (t._prevDup = null))
                : ((this._tail._nextDup = t),
                  (t._prevDup = this._tail),
                  (t._nextDup = null),
                  (this._tail = t));
            }),
            (t.prototype.get = function (t, e) {
              var n;
              for (n = this._head; null !== n; n = n._nextDup)
                if ((null === e || e <= n.currentIndex) && Ge(n.trackById, t))
                  return n;
              return null;
            }),
            (t.prototype.remove = function (t) {
              var e = t._prevDup,
                n = t._nextDup;
              return (
                null === e ? (this._head = n) : (e._nextDup = n),
                null === n ? (this._tail = e) : (n._prevDup = e),
                null === this._head
              );
            }),
            t
          );
        })(),
        En = (function () {
          function t() {
            this.map = new Map();
          }
          return (
            (t.prototype.put = function (t) {
              var e = t.trackById,
                n = this.map.get(e);
              n || ((n = new Cn()), this.map.set(e, n)), n.add(t);
            }),
            (t.prototype.get = function (t, e) {
              var n = this.map.get(t);
              return n ? n.get(t, e) : null;
            }),
            (t.prototype.remove = function (t) {
              var e = t.trackById;
              return this.map.get(e).remove(t) && this.map.delete(e), t;
            }),
            Object.defineProperty(t.prototype, "isEmpty", {
              get: function () {
                return 0 === this.map.size;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.clear = function () {
              this.map.clear();
            }),
            t
          );
        })();
      function Sn(t, e, n) {
        var r = t.previousIndex;
        if (null === r) return r;
        var o = 0;
        return n && r < n.length && (o = n[r]), r + e + o;
      }
      var xn = (function () {
          function t() {}
          return (
            (t.prototype.supports = function (t) {
              return t instanceof Map || Ye(t);
            }),
            (t.prototype.create = function () {
              return new On();
            }),
            t
          );
        })(),
        On = (function () {
          function t() {
            (this._records = new Map()),
              (this._mapHead = null),
              (this._appendAfter = null),
              (this._previousMapHead = null),
              (this._changesHead = null),
              (this._changesTail = null),
              (this._additionsHead = null),
              (this._additionsTail = null),
              (this._removalsHead = null),
              (this._removalsTail = null);
          }
          return (
            Object.defineProperty(t.prototype, "isDirty", {
              get: function () {
                return (
                  null !== this._additionsHead ||
                  null !== this._changesHead ||
                  null !== this._removalsHead
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.forEachItem = function (t) {
              var e;
              for (e = this._mapHead; null !== e; e = e._next) t(e);
            }),
            (t.prototype.forEachPreviousItem = function (t) {
              var e;
              for (e = this._previousMapHead; null !== e; e = e._nextPrevious)
                t(e);
            }),
            (t.prototype.forEachChangedItem = function (t) {
              var e;
              for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
            }),
            (t.prototype.forEachAddedItem = function (t) {
              var e;
              for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
            }),
            (t.prototype.forEachRemovedItem = function (t) {
              var e;
              for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
            }),
            (t.prototype.diff = function (t) {
              if (t) {
                if (!(t instanceof Map || Ye(t)))
                  throw new Error(
                    "Error trying to diff '" +
                      kt(t) +
                      "'. Only maps and objects are allowed"
                  );
              } else t = new Map();
              return this.check(t) ? this : null;
            }),
            (t.prototype.onDestroy = function () {}),
            (t.prototype.check = function (t) {
              var e = this;
              this._reset();
              var n = this._mapHead;
              if (
                ((this._appendAfter = null),
                this._forEach(t, function (t, r) {
                  if (n && n.key === r)
                    e._maybeAddToChanges(n, t),
                      (e._appendAfter = n),
                      (n = n._next);
                  else {
                    var o = e._getOrCreateRecordForKey(r, t);
                    n = e._insertBeforeOrAppend(n, o);
                  }
                }),
                n)
              ) {
                n._prev && (n._prev._next = null), (this._removalsHead = n);
                for (var r = n; null !== r; r = r._nextRemoved)
                  r === this._mapHead && (this._mapHead = null),
                    this._records.delete(r.key),
                    (r._nextRemoved = r._next),
                    (r.previousValue = r.currentValue),
                    (r.currentValue = null),
                    (r._prev = null),
                    (r._next = null);
              }
              return (
                this._changesTail && (this._changesTail._nextChanged = null),
                this._additionsTail && (this._additionsTail._nextAdded = null),
                this.isDirty
              );
            }),
            (t.prototype._insertBeforeOrAppend = function (t, e) {
              if (t) {
                var n = t._prev;
                return (
                  (e._next = t),
                  (e._prev = n),
                  (t._prev = e),
                  n && (n._next = e),
                  t === this._mapHead && (this._mapHead = e),
                  (this._appendAfter = t),
                  t
                );
              }
              return (
                this._appendAfter
                  ? ((this._appendAfter._next = e),
                    (e._prev = this._appendAfter))
                  : (this._mapHead = e),
                (this._appendAfter = e),
                null
              );
            }),
            (t.prototype._getOrCreateRecordForKey = function (t, e) {
              if (this._records.has(t)) {
                var n = this._records.get(t);
                this._maybeAddToChanges(n, e);
                var r = n._prev,
                  o = n._next;
                return (
                  r && (r._next = o),
                  o && (o._prev = r),
                  (n._next = null),
                  (n._prev = null),
                  n
                );
              }
              var i = new Tn(t);
              return (
                this._records.set(t, i),
                (i.currentValue = e),
                this._addToAdditions(i),
                i
              );
            }),
            (t.prototype._reset = function () {
              if (this.isDirty) {
                var t = void 0;
                for (
                  this._previousMapHead = this._mapHead,
                    t = this._previousMapHead;
                  null !== t;
                  t = t._next
                )
                  t._nextPrevious = t._next;
                for (t = this._changesHead; null !== t; t = t._nextChanged)
                  t.previousValue = t.currentValue;
                for (t = this._additionsHead; null != t; t = t._nextAdded)
                  t.previousValue = t.currentValue;
                (this._changesHead = this._changesTail = null),
                  (this._additionsHead = this._additionsTail = null),
                  (this._removalsHead = null);
              }
            }),
            (t.prototype._maybeAddToChanges = function (t, e) {
              Ge(e, t.currentValue) ||
                ((t.previousValue = t.currentValue),
                (t.currentValue = e),
                this._addToChanges(t));
            }),
            (t.prototype._addToAdditions = function (t) {
              null === this._additionsHead
                ? (this._additionsHead = this._additionsTail = t)
                : ((this._additionsTail._nextAdded = t),
                  (this._additionsTail = t));
            }),
            (t.prototype._addToChanges = function (t) {
              null === this._changesHead
                ? (this._changesHead = this._changesTail = t)
                : ((this._changesTail._nextChanged = t),
                  (this._changesTail = t));
            }),
            (t.prototype._forEach = function (t, e) {
              t instanceof Map
                ? t.forEach(e)
                : Object.keys(t).forEach(function (n) {
                    return e(t[n], n);
                  });
            }),
            t
          );
        })(),
        Tn = (function () {
          return function (t) {
            (this.key = t),
              (this.previousValue = null),
              (this.currentValue = null),
              (this._nextPrevious = null),
              (this._next = null),
              (this._prev = null),
              (this._nextAdded = null),
              (this._nextRemoved = null),
              (this._nextChanged = null);
          };
        })(),
        kn = (function () {
          function t(t) {
            this.factories = t;
          }
          return (
            (t.create = function (e, n) {
              if (null != n) {
                var r = n.factories.slice();
                e = e.concat(r);
              }
              return new t(e);
            }),
            (t.extend = function (e) {
              return {
                provide: t,
                useFactory: function (n) {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new Ct(), new _t()]],
              };
            }),
            (t.prototype.find = function (t) {
              var e,
                n = this.factories.find(function (e) {
                  return e.supports(t);
                });
              if (null != n) return n;
              throw new Error(
                "Cannot find a differ supporting object '" +
                  t +
                  "' of type '" +
                  ((e = t).name || typeof e) +
                  "'"
              );
            }),
            (t.ngInjectableDef = xt({
              providedIn: "root",
              factory: function () {
                return new t([new yn()]);
              },
            })),
            t
          );
        })(),
        An = (function () {
          function t(t) {
            this.factories = t;
          }
          return (
            (t.create = function (e, n) {
              if (n) {
                var r = n.factories.slice();
                e = e.concat(r);
              }
              return new t(e);
            }),
            (t.extend = function (e) {
              return {
                provide: t,
                useFactory: function (n) {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new Ct(), new _t()]],
              };
            }),
            (t.prototype.find = function (t) {
              var e = this.factories.find(function (e) {
                return e.supports(t);
              });
              if (e) return e;
              throw new Error(
                "Cannot find a differ supporting object '" + t + "'"
              );
            }),
            (t.ngInjectableDef = xt({
              providedIn: "root",
              factory: function () {
                return new t([new xn()]);
              },
            })),
            t
          );
        })(),
        In = (function () {
          function t() {}
          return (
            (t.__NG_ELEMENT_ID__ = function () {
              return Pn();
            }),
            t
          );
        })(),
        Pn = function () {
          for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
        },
        Rn = [new xn()],
        Nn = new kn([new yn()]),
        Dn = new An(Rn),
        Mn = (function () {
          function t() {}
          return (
            (t.__NG_ELEMENT_ID__ = function () {
              return jn(t, cn);
            }),
            t
          );
        })(),
        jn = sn,
        Vn = (function () {
          function t() {}
          return (
            (t.__NG_ELEMENT_ID__ = function () {
              return Ln(t, cn);
            }),
            t
          );
        })(),
        Ln = sn;
      function Fn(t, e, n, r) {
        var o =
          "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '" +
          e +
          "'. Current value: '" +
          n +
          "'.";
        return (
          r &&
            (o +=
              " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"),
          (function (t, e) {
            var n = new Error(t);
            return Un(n, e), n;
          })(o, t)
        );
      }
      function Un(t, e) {
        (t[ee] = e), (t[re] = e.logError.bind(e));
      }
      function Hn(t) {
        return new Error(
          "ViewDestroyedError: Attempt to use a destroyed view: " + t
        );
      }
      function zn(t, e, n) {
        var r = t.state,
          o = 1792 & r;
        return o === e
          ? ((t.state = (-1793 & r) | n), (t.initIndex = -1), !0)
          : o === n;
      }
      function Bn(t, e, n) {
        return (
          (1792 & t.state) === e &&
          t.initIndex <= n &&
          ((t.initIndex = n + 1), !0)
        );
      }
      function Wn(t, e) {
        return t.nodes[e];
      }
      function Gn(t, e) {
        return t.nodes[e];
      }
      function qn(t, e) {
        return t.nodes[e];
      }
      function Zn(t, e) {
        return t.nodes[e];
      }
      function Qn(t, e) {
        return t.nodes[e];
      }
      var Yn = {
          setCurrentNode: void 0,
          createRootView: void 0,
          createEmbeddedView: void 0,
          createComponentView: void 0,
          createNgModuleRef: void 0,
          overrideProvider: void 0,
          overrideComponentView: void 0,
          clearOverrides: void 0,
          checkAndUpdateView: void 0,
          checkNoChangesView: void 0,
          destroyView: void 0,
          resolveDep: void 0,
          createDebugContext: void 0,
          handleEvent: void 0,
          updateDirectives: void 0,
          updateRenderer: void 0,
          dirtyParentQueries: void 0,
        },
        $n = function () {},
        Kn = new Map();
      function Xn(t) {
        var e = Kn.get(t);
        return e || ((e = kt(t) + "_" + Kn.size), Kn.set(t, e)), e;
      }
      function Jn(t, e, n, r) {
        if (Ze.isWrapped(r)) {
          r = Ze.unwrap(r);
          var o = t.def.nodes[e].bindingIndex + n,
            i = Ze.unwrap(t.oldValues[o]);
          t.oldValues[o] = new Ze(i);
        }
        return r;
      }
      var tr = "$$undefined",
        er = "$$empty";
      function nr(t) {
        return {
          id: tr,
          styles: t.styles,
          encapsulation: t.encapsulation,
          data: t.data,
        };
      }
      var rr = 0;
      function or(t, e, n, r) {
        return !(!(2 & t.state) && Ge(t.oldValues[e.bindingIndex + n], r));
      }
      function ir(t, e, n, r) {
        return !!or(t, e, n, r) && ((t.oldValues[e.bindingIndex + n] = r), !0);
      }
      function lr(t, e, n, r) {
        var o = t.oldValues[e.bindingIndex + n];
        if (1 & t.state || !qe(o, r)) {
          var i = e.bindings[n].name;
          throw Fn(
            Yn.createDebugContext(t, e.nodeIndex),
            i + ": " + o,
            i + ": " + r,
            0 != (1 & t.state)
          );
        }
      }
      function ar(t) {
        for (var e = t; e; )
          2 & e.def.flags && (e.state |= 8),
            (e = e.viewContainerParent || e.parent);
      }
      function ur(t, e) {
        for (var n = t; n && n !== e; )
          (n.state |= 64), (n = n.viewContainerParent || n.parent);
      }
      function sr(t, e, n, r) {
        try {
          return (
            ar(33554432 & t.def.nodes[e].flags ? Gn(t, e).componentView : t),
            Yn.handleEvent(t, e, n, r)
          );
        } catch (o) {
          t.root.errorHandler.handleError(o);
        }
      }
      function cr(t) {
        return t.parent ? Gn(t.parent, t.parentNodeDef.nodeIndex) : null;
      }
      function hr(t) {
        return t.parent ? t.parentNodeDef.parent : null;
      }
      function pr(t, e) {
        switch (201347067 & e.flags) {
          case 1:
            return Gn(t, e.nodeIndex).renderElement;
          case 2:
            return Wn(t, e.nodeIndex).renderText;
        }
      }
      function fr(t) {
        return !!t.parent && !!(32768 & t.parentNodeDef.flags);
      }
      function dr(t) {
        return !(!t.parent || 32768 & t.parentNodeDef.flags);
      }
      function gr(t) {
        return 1 << t % 32;
      }
      function vr(t) {
        var e = {},
          n = 0,
          r = {};
        return (
          t &&
            t.forEach(function (t) {
              var o = s(t, 2),
                i = o[0],
                l = o[1];
              "number" == typeof i ? ((e[i] = l), (n |= gr(i))) : (r[i] = l);
            }),
          { matchedQueries: e, references: r, matchedQueryIds: n }
        );
      }
      function mr(t, e) {
        return t.map(function (t) {
          var n, r, o;
          return (
            Array.isArray(t)
              ? ((o = (n = s(t, 2))[0]), (r = n[1]))
              : ((o = 0), (r = t)),
            r &&
              ("function" == typeof r || "object" == typeof r) &&
              e &&
              Object.defineProperty(r, Ft, { value: e, configurable: !0 }),
            { flags: o, token: r, tokenKey: Xn(r) }
          );
        });
      }
      function yr(t, e, n) {
        var r = n.renderParent;
        return r
          ? 0 == (1 & r.flags) ||
            0 == (33554432 & r.flags) ||
            (r.element.componentRendererType &&
              r.element.componentRendererType.encapsulation === ie.Native)
            ? Gn(t, n.renderParent.nodeIndex).renderElement
            : void 0
          : e;
      }
      var br = new WeakMap();
      function _r(t) {
        var e = br.get(t);
        return (
          e ||
            (((e = t(function () {
              return $n;
            })).factory = t),
            br.set(t, e)),
          e
        );
      }
      function wr(t, e, n, r, o) {
        3 === e && (n = t.renderer.parentNode(pr(t, t.def.lastRenderRootNode))),
          Cr(t, e, 0, t.def.nodes.length - 1, n, r, o);
      }
      function Cr(t, e, n, r, o, i, l) {
        for (var a = n; a <= r; a++) {
          var u = t.def.nodes[a];
          11 & u.flags && Sr(t, u, e, o, i, l), (a += u.childCount);
        }
      }
      function Er(t, e, n, r, o, i) {
        for (var l = t; l && !fr(l); ) l = l.parent;
        for (
          var a = l.parent,
            u = hr(l),
            s = u.nodeIndex + u.childCount,
            c = u.nodeIndex + 1;
          c <= s;
          c++
        ) {
          var h = a.def.nodes[c];
          h.ngContentIndex === e && Sr(a, h, n, r, o, i), (c += h.childCount);
        }
        if (!a.parent) {
          var p = t.root.projectableNodes[e];
          if (p) for (c = 0; c < p.length; c++) xr(t, p[c], n, r, o, i);
        }
      }
      function Sr(t, e, n, r, o, i) {
        if (8 & e.flags) Er(t, e.ngContent.index, n, r, o, i);
        else {
          var l = pr(t, e);
          if (
            (3 === n && 33554432 & e.flags && 48 & e.bindingFlags
              ? (16 & e.bindingFlags && xr(t, l, n, r, o, i),
                32 & e.bindingFlags &&
                  xr(Gn(t, e.nodeIndex).componentView, l, n, r, o, i))
              : xr(t, l, n, r, o, i),
            16777216 & e.flags)
          )
            for (
              var a = Gn(t, e.nodeIndex).viewContainer._embeddedViews, u = 0;
              u < a.length;
              u++
            )
              wr(a[u], n, r, o, i);
          1 & e.flags &&
            !e.element.name &&
            Cr(t, n, e.nodeIndex + 1, e.nodeIndex + e.childCount, r, o, i);
        }
      }
      function xr(t, e, n, r, o, i) {
        var l = t.renderer;
        switch (n) {
          case 1:
            l.appendChild(r, e);
            break;
          case 2:
            l.insertBefore(r, e, o);
            break;
          case 3:
            l.removeChild(r, e);
            break;
          case 0:
            i.push(e);
        }
      }
      var Or = /^:([^:]+):(.+)$/;
      function Tr(t) {
        if (":" === t[0]) {
          var e = t.match(Or);
          return [e[1], e[2]];
        }
        return ["", t];
      }
      function kr(t) {
        for (var e = 0, n = 0; n < t.length; n++) e |= t[n].flags;
        return e;
      }
      var Ar = new Object(),
        Ir = Xn(Bt),
        Pr = Xn(Ht),
        Rr = Xn(an);
      function Nr(t, e, n, r) {
        return (
          (n = Pt(n)),
          { index: -1, deps: mr(r, kt(e)), flags: t, token: e, value: n }
        );
      }
      function Dr(t, e, n) {
        void 0 === n && (n = Bt.THROW_IF_NOT_FOUND);
        var r,
          o,
          i = jt(t);
        try {
          if (8 & e.flags) return e.token;
          if ((2 & e.flags && (n = null), 1 & e.flags))
            return t._parent.get(e.token, n);
          var l = e.tokenKey;
          switch (l) {
            case Ir:
            case Pr:
            case Rr:
              return t;
          }
          var a,
            u = t._def.providersByKey[l];
          if (u) {
            var s = t._providers[u.index];
            return (
              void 0 === s && (s = t._providers[u.index] = Mr(t, u)),
              s === Ar ? void 0 : s
            );
          }
          if (
            (a = Ot(e.token)) &&
            ((r = t),
            null != (o = a).providedIn &&
              ((function (t, e) {
                return t._def.modules.indexOf(o.providedIn) > -1;
              })(r) ||
                ("root" === o.providedIn && r._def.isRoot)))
          ) {
            var c = t._providers.length;
            return (
              (t._def.providers[c] = t._def.providersByKey[e.tokenKey] =
                {
                  flags: 5120,
                  value: a.factory,
                  deps: [],
                  index: c,
                  token: e.token,
                }),
              (t._providers[c] = Ar),
              (t._providers[c] = Mr(t, t._def.providersByKey[e.tokenKey]))
            );
          }
          return 4 & e.flags ? n : t._parent.get(e.token, n);
        } finally {
          jt(i);
        }
      }
      function Mr(t, e) {
        var n;
        switch (201347067 & e.flags) {
          case 512:
            n = (function (t, e, n) {
              var r = n.length;
              switch (r) {
                case 0:
                  return new e();
                case 1:
                  return new e(Dr(t, n[0]));
                case 2:
                  return new e(Dr(t, n[0]), Dr(t, n[1]));
                case 3:
                  return new e(Dr(t, n[0]), Dr(t, n[1]), Dr(t, n[2]));
                default:
                  for (var o = new Array(r), i = 0; i < r; i++)
                    o[i] = Dr(t, n[i]);
                  return new (e.bind.apply(e, c([void 0], o)))();
              }
            })(t, e.value, e.deps);
            break;
          case 1024:
            n = (function (t, e, n) {
              var r = n.length;
              switch (r) {
                case 0:
                  return e();
                case 1:
                  return e(Dr(t, n[0]));
                case 2:
                  return e(Dr(t, n[0]), Dr(t, n[1]));
                case 3:
                  return e(Dr(t, n[0]), Dr(t, n[1]), Dr(t, n[2]));
                default:
                  for (var o = Array(r), i = 0; i < r; i++) o[i] = Dr(t, n[i]);
                  return e.apply(void 0, c(o));
              }
            })(t, e.value, e.deps);
            break;
          case 2048:
            n = Dr(t, e.deps[0]);
            break;
          case 256:
            n = e.value;
        }
        return (
          n === Ar ||
            null === n ||
            "object" != typeof n ||
            131072 & e.flags ||
            "function" != typeof n.ngOnDestroy ||
            (e.flags |= 131072),
          void 0 === n ? Ar : n
        );
      }
      function jr(t, e) {
        var n = t.viewContainer._embeddedViews;
        if (((null == e || e >= n.length) && (e = n.length - 1), e < 0))
          return null;
        var r = n[e];
        return (
          (r.viewContainerParent = null),
          Ur(n, e),
          Yn.dirtyParentQueries(r),
          Lr(r),
          r
        );
      }
      function Vr(t, e, n) {
        var r = e ? pr(e, e.def.lastRenderRootNode) : t.renderElement,
          o = n.renderer.parentNode(r),
          i = n.renderer.nextSibling(r);
        wr(n, 2, o, i, void 0);
      }
      function Lr(t) {
        wr(t, 3, null, null, void 0);
      }
      function Fr(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function Ur(t, e) {
        e >= t.length - 1 ? t.pop() : t.splice(e, 1);
      }
      var Hr = new Object();
      function zr(t, e, n, r, o, i) {
        return new Br(t, e, n, r, o, i);
      }
      var Br = (function (t) {
          function e(e, n, r, o, i, l) {
            var a = t.call(this) || this;
            return (
              (a.selector = e),
              (a.componentType = n),
              (a._inputs = o),
              (a._outputs = i),
              (a.ngContentSelectors = l),
              (a.viewDefFactory = r),
              a
            );
          }
          return (
            o(e, t),
            Object.defineProperty(e.prototype, "inputs", {
              get: function () {
                var t = [],
                  e = this._inputs;
                for (var n in e) t.push({ propName: n, templateName: e[n] });
                return t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "outputs", {
              get: function () {
                var t = [];
                for (var e in this._outputs)
                  t.push({ propName: e, templateName: this._outputs[e] });
                return t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.create = function (t, e, n, r) {
              if (!r) throw new Error("ngModule should be provided");
              var o = _r(this.viewDefFactory),
                i = o.nodes[0].element.componentProvider.nodeIndex,
                l = Yn.createRootView(t, e || [], n, o, r, Hr),
                a = qn(l, i).instance;
              return (
                n &&
                  l.renderer.setAttribute(
                    Gn(l, 0).renderElement,
                    "ng-version",
                    mn.full
                  ),
                new Wr(l, new Qr(l), a)
              );
            }),
            e
          );
        })(Je),
        Wr = (function (t) {
          function e(e, n, r) {
            var o = t.call(this) || this;
            return (
              (o._view = e),
              (o._viewRef = n),
              (o._component = r),
              (o._elDef = o._view.def.nodes[0]),
              (o.hostView = n),
              (o.changeDetectorRef = n),
              (o.instance = r),
              o
            );
          }
          return (
            o(e, t),
            Object.defineProperty(e.prototype, "location", {
              get: function () {
                return new cn(
                  Gn(this._view, this._elDef.nodeIndex).renderElement
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "injector", {
              get: function () {
                return new Xr(this._view, this._elDef);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "componentType", {
              get: function () {
                return this._component.constructor;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.destroy = function () {
              this._viewRef.destroy();
            }),
            (e.prototype.onDestroy = function (t) {
              this._viewRef.onDestroy(t);
            }),
            e
          );
        })(Xe);
      function Gr(t, e, n) {
        return new qr(t, e, n);
      }
      var qr = (function () {
        function t(t, e, n) {
          (this._view = t),
            (this._elDef = e),
            (this._data = n),
            (this._embeddedViews = []);
        }
        return (
          Object.defineProperty(t.prototype, "element", {
            get: function () {
              return new cn(this._data.renderElement);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "injector", {
            get: function () {
              return new Xr(this._view, this._elDef);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "parentInjector", {
            get: function () {
              for (var t = this._view, e = this._elDef.parent; !e && t; )
                (e = hr(t)), (t = t.parent);
              return t ? new Xr(t, e) : new Xr(this._view, null);
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.clear = function () {
            for (var t = this._embeddedViews.length - 1; t >= 0; t--) {
              var e = jr(this._data, t);
              Yn.destroyView(e);
            }
          }),
          (t.prototype.get = function (t) {
            var e = this._embeddedViews[t];
            if (e) {
              var n = new Qr(e);
              return n.attachToViewContainerRef(this), n;
            }
            return null;
          }),
          Object.defineProperty(t.prototype, "length", {
            get: function () {
              return this._embeddedViews.length;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.createEmbeddedView = function (t, e, n) {
            var r = t.createEmbeddedView(e || {});
            return this.insert(r, n), r;
          }),
          (t.prototype.createComponent = function (t, e, n, r, o) {
            var i = n || this.parentInjector;
            o || t instanceof ln || (o = i.get(an));
            var l = t.create(i, r, void 0, o);
            return this.insert(l.hostView, e), l;
          }),
          (t.prototype.insert = function (t, e) {
            if (t.destroyed)
              throw new Error(
                "Cannot insert a destroyed View in a ViewContainer!"
              );
            var n,
              r,
              o,
              i,
              l = t;
            return (
              (i = (n = this._data).viewContainer._embeddedViews),
              null == (r = e) && (r = i.length),
              ((o = l._view).viewContainerParent = this._view),
              Fr(i, r, o),
              (function (t, e) {
                var n = cr(e);
                if (n && n !== t && !(16 & e.state)) {
                  e.state |= 16;
                  var r = n.template._projectedViews;
                  r || (r = n.template._projectedViews = []),
                    r.push(e),
                    (function (t, n) {
                      if (!(4 & n.flags)) {
                        (e.parent.def.nodeFlags |= 4), (n.flags |= 4);
                        for (var r = n.parent; r; )
                          (r.childFlags |= 4), (r = r.parent);
                      }
                    })(0, e.parentNodeDef);
                }
              })(n, o),
              Yn.dirtyParentQueries(o),
              Vr(n, r > 0 ? i[r - 1] : null, o),
              l.attachToViewContainerRef(this),
              t
            );
          }),
          (t.prototype.move = function (t, e) {
            if (t.destroyed)
              throw new Error(
                "Cannot move a destroyed View in a ViewContainer!"
              );
            var n,
              r,
              o,
              i,
              l,
              a = this._embeddedViews.indexOf(t._view);
            return (
              (o = e),
              (l = (i = (n = this._data).viewContainer._embeddedViews)[
                (r = a)
              ]),
              Ur(i, r),
              null == o && (o = i.length),
              Fr(i, o, l),
              Yn.dirtyParentQueries(l),
              Lr(l),
              Vr(n, o > 0 ? i[o - 1] : null, l),
              t
            );
          }),
          (t.prototype.indexOf = function (t) {
            return this._embeddedViews.indexOf(t._view);
          }),
          (t.prototype.remove = function (t) {
            var e = jr(this._data, t);
            e && Yn.destroyView(e);
          }),
          (t.prototype.detach = function (t) {
            var e = jr(this._data, t);
            return e ? new Qr(e) : null;
          }),
          t
        );
      })();
      function Zr(t) {
        return new Qr(t);
      }
      var Qr = (function () {
        function t(t) {
          (this._view = t),
            (this._viewContainerRef = null),
            (this._appRef = null);
        }
        return (
          Object.defineProperty(t.prototype, "rootNodes", {
            get: function () {
              return wr(this._view, 0, void 0, void 0, (t = [])), t;
              var t;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "context", {
            get: function () {
              return this._view.context;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "destroyed", {
            get: function () {
              return 0 != (128 & this._view.state);
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.markForCheck = function () {
            ar(this._view);
          }),
          (t.prototype.detach = function () {
            this._view.state &= -5;
          }),
          (t.prototype.detectChanges = function () {
            var t = this._view.root.rendererFactory;
            t.begin && t.begin();
            try {
              Yn.checkAndUpdateView(this._view);
            } finally {
              t.end && t.end();
            }
          }),
          (t.prototype.checkNoChanges = function () {
            Yn.checkNoChangesView(this._view);
          }),
          (t.prototype.reattach = function () {
            this._view.state |= 4;
          }),
          (t.prototype.onDestroy = function (t) {
            this._view.disposables || (this._view.disposables = []),
              this._view.disposables.push(t);
          }),
          (t.prototype.destroy = function () {
            this._appRef
              ? this._appRef.detachView(this)
              : this._viewContainerRef &&
                this._viewContainerRef.detach(
                  this._viewContainerRef.indexOf(this)
                ),
              Yn.destroyView(this._view);
          }),
          (t.prototype.detachFromAppRef = function () {
            (this._appRef = null),
              Lr(this._view),
              Yn.dirtyParentQueries(this._view);
          }),
          (t.prototype.attachToAppRef = function (t) {
            if (this._viewContainerRef)
              throw new Error(
                "This view is already attached to a ViewContainer!"
              );
            this._appRef = t;
          }),
          (t.prototype.attachToViewContainerRef = function (t) {
            if (this._appRef)
              throw new Error(
                "This view is already attached directly to the ApplicationRef!"
              );
            this._viewContainerRef = t;
          }),
          t
        );
      })();
      function Yr(t, e) {
        return new $r(t, e);
      }
      var $r = (function (t) {
        function e(e, n) {
          var r = t.call(this) || this;
          return (r._parentView = e), (r._def = n), r;
        }
        return (
          o(e, t),
          (e.prototype.createEmbeddedView = function (t) {
            return new Qr(
              Yn.createEmbeddedView(
                this._parentView,
                this._def,
                this._def.element.template,
                t
              )
            );
          }),
          Object.defineProperty(e.prototype, "elementRef", {
            get: function () {
              return new cn(
                Gn(this._parentView, this._def.nodeIndex).renderElement
              );
            },
            enumerable: !0,
            configurable: !0,
          }),
          e
        );
      })(Mn);
      function Kr(t, e) {
        return new Xr(t, e);
      }
      var Xr = (function () {
        function t(t, e) {
          (this.view = t), (this.elDef = e);
        }
        return (
          (t.prototype.get = function (t, e) {
            return (
              void 0 === e && (e = Bt.THROW_IF_NOT_FOUND),
              Yn.resolveDep(
                this.view,
                this.elDef,
                !!this.elDef && 0 != (33554432 & this.elDef.flags),
                { flags: 0, token: t, tokenKey: Xn(t) },
                e
              )
            );
          }),
          t
        );
      })();
      function Jr(t, e) {
        var n = t.def.nodes[e];
        if (1 & n.flags) {
          var r = Gn(t, n.nodeIndex);
          return n.element.template ? r.template : r.renderElement;
        }
        if (2 & n.flags) return Wn(t, n.nodeIndex).renderText;
        if (20240 & n.flags) return qn(t, n.nodeIndex).instance;
        throw new Error("Illegal state: read nodeValue for node index " + e);
      }
      function to(t) {
        return new eo(t.renderer);
      }
      var eo = (function () {
        function t(t) {
          this.delegate = t;
        }
        return (
          (t.prototype.selectRootElement = function (t) {
            return this.delegate.selectRootElement(t);
          }),
          (t.prototype.createElement = function (t, e) {
            var n = s(Tr(e), 2),
              r = this.delegate.createElement(n[1], n[0]);
            return t && this.delegate.appendChild(t, r), r;
          }),
          (t.prototype.createViewRoot = function (t) {
            return t;
          }),
          (t.prototype.createTemplateAnchor = function (t) {
            var e = this.delegate.createComment("");
            return t && this.delegate.appendChild(t, e), e;
          }),
          (t.prototype.createText = function (t, e) {
            var n = this.delegate.createText(e);
            return t && this.delegate.appendChild(t, n), n;
          }),
          (t.prototype.projectNodes = function (t, e) {
            for (var n = 0; n < e.length; n++)
              this.delegate.appendChild(t, e[n]);
          }),
          (t.prototype.attachViewAfter = function (t, e) {
            for (
              var n = this.delegate.parentNode(t),
                r = this.delegate.nextSibling(t),
                o = 0;
              o < e.length;
              o++
            )
              this.delegate.insertBefore(n, e[o], r);
          }),
          (t.prototype.detachView = function (t) {
            for (var e = 0; e < t.length; e++) {
              var n = t[e],
                r = this.delegate.parentNode(n);
              this.delegate.removeChild(r, n);
            }
          }),
          (t.prototype.destroyView = function (t, e) {
            for (var n = 0; n < e.length; n++) this.delegate.destroyNode(e[n]);
          }),
          (t.prototype.listen = function (t, e, n) {
            return this.delegate.listen(t, e, n);
          }),
          (t.prototype.listenGlobal = function (t, e, n) {
            return this.delegate.listen(t, e, n);
          }),
          (t.prototype.setElementProperty = function (t, e, n) {
            this.delegate.setProperty(t, e, n);
          }),
          (t.prototype.setElementAttribute = function (t, e, n) {
            var r = s(Tr(e), 2),
              o = r[0],
              i = r[1];
            null != n
              ? this.delegate.setAttribute(t, i, n, o)
              : this.delegate.removeAttribute(t, i, o);
          }),
          (t.prototype.setBindingDebugInfo = function (t, e, n) {}),
          (t.prototype.setElementClass = function (t, e, n) {
            n ? this.delegate.addClass(t, e) : this.delegate.removeClass(t, e);
          }),
          (t.prototype.setElementStyle = function (t, e, n) {
            null != n
              ? this.delegate.setStyle(t, e, n)
              : this.delegate.removeStyle(t, e);
          }),
          (t.prototype.invokeElementMethod = function (t, e, n) {
            t[e].apply(t, n);
          }),
          (t.prototype.setText = function (t, e) {
            this.delegate.setValue(t, e);
          }),
          (t.prototype.animate = function () {
            throw new Error("Renderer.animate is no longer supported!");
          }),
          t
        );
      })();
      function no(t, e, n, r) {
        return new ro(t, e, n, r);
      }
      var ro = (function () {
          function t(t, e, n, r) {
            (this._moduleType = t),
              (this._parent = e),
              (this._bootstrapComponents = n),
              (this._def = r),
              (this._destroyListeners = []),
              (this._destroyed = !1),
              (this.injector = this),
              (function (t) {
                for (
                  var e = t._def,
                    n = (t._providers = new Array(e.providers.length)),
                    r = 0;
                  r < e.providers.length;
                  r++
                ) {
                  var o = e.providers[r];
                  4096 & o.flags || (void 0 === n[r] && (n[r] = Mr(t, o)));
                }
              })(this);
          }
          return (
            (t.prototype.get = function (t, e, n) {
              void 0 === e && (e = Bt.THROW_IF_NOT_FOUND),
                void 0 === n && (n = Et.Default);
              var r = 0;
              return (
                n & Et.SkipSelf ? (r |= 1) : n & Et.Self && (r |= 4),
                Dr(this, { token: t, tokenKey: Xn(t), flags: r }, e)
              );
            }),
            Object.defineProperty(t.prototype, "instance", {
              get: function () {
                return this.get(this._moduleType);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "componentFactoryResolver", {
              get: function () {
                return this.get(rn);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.destroy = function () {
              if (this._destroyed)
                throw new Error(
                  "The ng module " +
                    kt(this.instance.constructor) +
                    " has already been destroyed."
                );
              (this._destroyed = !0),
                (function (t, e) {
                  for (
                    var n = t._def, r = new Set(), o = 0;
                    o < n.providers.length;
                    o++
                  )
                    if (131072 & n.providers[o].flags) {
                      var i = t._providers[o];
                      if (i && i !== Ar) {
                        var l = i.ngOnDestroy;
                        "function" != typeof l ||
                          r.has(i) ||
                          (l.apply(i), r.add(i));
                      }
                    }
                })(this),
                this._destroyListeners.forEach(function (t) {
                  return t();
                });
            }),
            (t.prototype.onDestroy = function (t) {
              this._destroyListeners.push(t);
            }),
            t
          );
        })(),
        oo = Xn(pn),
        io = Xn(gn),
        lo = Xn(cn),
        ao = Xn(Vn),
        uo = Xn(Mn),
        so = Xn(In),
        co = Xn(Bt),
        ho = Xn(Ht);
      function po(t, e, n, r, o, i, l, a) {
        var u = [];
        if (l)
          for (var c in l) {
            var h = s(l[c], 2);
            u[h[0]] = {
              flags: 8,
              name: c,
              nonMinifiedName: h[1],
              ns: null,
              securityContext: null,
              suffix: null,
            };
          }
        var p = [];
        if (a)
          for (var f in a)
            p.push({ type: 1, propName: f, target: null, eventName: a[f] });
        return vo(t, (e |= 16384), n, r, o, o, i, u, p);
      }
      function fo(t, e, n) {
        return vo(-1, (t |= 16), null, 0, e, e, n);
      }
      function go(t, e, n, r, o) {
        return vo(-1, t, e, 0, n, r, o);
      }
      function vo(t, e, n, r, o, i, l, a, u) {
        var s = vr(n),
          c = s.matchedQueries,
          h = s.references,
          p = s.matchedQueryIds;
        u || (u = []), a || (a = []), (i = Pt(i));
        var f = mr(l, kt(o));
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: t,
          flags: e,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: c,
          matchedQueryIds: p,
          references: h,
          ngContentIndex: -1,
          childCount: r,
          bindings: a,
          bindingFlags: kr(a),
          outputs: u,
          element: null,
          provider: { token: o, value: i, deps: f },
          text: null,
          query: null,
          ngContent: null,
        };
      }
      function mo(t, e) {
        return wo(t, e);
      }
      function yo(t, e) {
        for (var n = t; n.parent && !fr(n); ) n = n.parent;
        return Co(n.parent, hr(n), !0, e.provider.value, e.provider.deps);
      }
      function bo(t, e) {
        var n = Co(
          t,
          e.parent,
          (32768 & e.flags) > 0,
          e.provider.value,
          e.provider.deps
        );
        if (e.outputs.length)
          for (var r = 0; r < e.outputs.length; r++) {
            var o = e.outputs[r],
              i = n[o.propName];
            if (!ze(i))
              throw new Error(
                "@Output " +
                  o.propName +
                  " not initialized in '" +
                  n.constructor.name +
                  "'."
              );
            var l = i.subscribe(_o(t, e.parent.nodeIndex, o.eventName));
            t.disposables[e.outputIndex + r] = l.unsubscribe.bind(l);
          }
        return n;
      }
      function _o(t, e, n) {
        return function (r) {
          return sr(t, e, n, r);
        };
      }
      function wo(t, e) {
        var n = (8192 & e.flags) > 0,
          r = e.provider;
        switch (201347067 & e.flags) {
          case 512:
            return Co(t, e.parent, n, r.value, r.deps);
          case 1024:
            return (function (t, e, n, r, o) {
              var i = o.length;
              switch (i) {
                case 0:
                  return r();
                case 1:
                  return r(So(t, e, n, o[0]));
                case 2:
                  return r(So(t, e, n, o[0]), So(t, e, n, o[1]));
                case 3:
                  return r(
                    So(t, e, n, o[0]),
                    So(t, e, n, o[1]),
                    So(t, e, n, o[2])
                  );
                default:
                  for (var l = Array(i), a = 0; a < i; a++)
                    l[a] = So(t, e, n, o[a]);
                  return r.apply(void 0, c(l));
              }
            })(t, e.parent, n, r.value, r.deps);
          case 2048:
            return So(t, e.parent, n, r.deps[0]);
          case 256:
            return r.value;
        }
      }
      function Co(t, e, n, r, o) {
        var i = o.length;
        switch (i) {
          case 0:
            return new r();
          case 1:
            return new r(So(t, e, n, o[0]));
          case 2:
            return new r(So(t, e, n, o[0]), So(t, e, n, o[1]));
          case 3:
            return new r(
              So(t, e, n, o[0]),
              So(t, e, n, o[1]),
              So(t, e, n, o[2])
            );
          default:
            for (var l = new Array(i), a = 0; a < i; a++)
              l[a] = So(t, e, n, o[a]);
            return new (r.bind.apply(r, c([void 0], l)))();
        }
      }
      var Eo = {};
      function So(t, e, n, r, o) {
        if ((void 0 === o && (o = Bt.THROW_IF_NOT_FOUND), 8 & r.flags))
          return r.token;
        var i = t;
        2 & r.flags && (o = null);
        var l = r.tokenKey;
        l === so && (n = !(!e || !e.element.componentView)),
          e && 1 & r.flags && ((n = !1), (e = e.parent));
        for (var a = t; a; ) {
          if (e)
            switch (l) {
              case oo:
                return to(xo(a, e, n));
              case io:
                return xo(a, e, n).renderer;
              case lo:
                return new cn(Gn(a, e.nodeIndex).renderElement);
              case ao:
                return Gn(a, e.nodeIndex).viewContainer;
              case uo:
                if (e.element.template) return Gn(a, e.nodeIndex).template;
                break;
              case so:
                return Zr(xo(a, e, n));
              case co:
              case ho:
                return Kr(a, e);
              default:
                var u = (
                  n ? e.element.allProviders : e.element.publicProviders
                )[l];
                if (u) {
                  var s = qn(a, u.nodeIndex);
                  return (
                    s ||
                      ((s = { instance: wo(a, u) }),
                      (a.nodes[u.nodeIndex] = s)),
                    s.instance
                  );
                }
            }
          (n = fr(a)), (e = hr(a)), (a = a.parent), 4 & r.flags && (a = null);
        }
        var c = i.root.injector.get(r.token, Eo);
        return c !== Eo || o === Eo
          ? c
          : i.root.ngModule.injector.get(r.token, o);
      }
      function xo(t, e, n) {
        var r;
        if (n) r = Gn(t, e.nodeIndex).componentView;
        else for (r = t; r.parent && !fr(r); ) r = r.parent;
        return r;
      }
      function Oo(t, e, n, r, o, i) {
        if (32768 & n.flags) {
          var l = Gn(t, n.parent.nodeIndex).componentView;
          2 & l.def.flags && (l.state |= 8);
        }
        if (((e.instance[n.bindings[r].name] = o), 524288 & n.flags)) {
          i = i || {};
          var a = Ze.unwrap(t.oldValues[n.bindingIndex + r]);
          i[n.bindings[r].nonMinifiedName] = new $e(a, o, 0 != (2 & t.state));
        }
        return (t.oldValues[n.bindingIndex + r] = o), i;
      }
      function To(t, e) {
        if (t.def.nodeFlags & e)
          for (var n = t.def.nodes, r = 0, o = 0; o < n.length; o++) {
            var i = n[o],
              l = i.parent;
            for (
              !l && i.flags & e && Ao(t, o, i.flags & e, r++),
                0 == (i.childFlags & e) && (o += i.childCount);
              l && 1 & l.flags && o === l.nodeIndex + l.childCount;

            )
              l.directChildFlags & e && (r = ko(t, l, e, r)), (l = l.parent);
          }
      }
      function ko(t, e, n, r) {
        for (var o = e.nodeIndex + 1; o <= e.nodeIndex + e.childCount; o++) {
          var i = t.def.nodes[o];
          i.flags & n && Ao(t, o, i.flags & n, r++), (o += i.childCount);
        }
        return r;
      }
      function Ao(t, e, n, r) {
        var o = qn(t, e);
        if (o) {
          var i = o.instance;
          i &&
            (Yn.setCurrentNode(t, e),
            1048576 & n && Bn(t, 512, r) && i.ngAfterContentInit(),
            2097152 & n && i.ngAfterContentChecked(),
            4194304 & n && Bn(t, 768, r) && i.ngAfterViewInit(),
            8388608 & n && i.ngAfterViewChecked(),
            131072 & n && i.ngOnDestroy());
        }
      }
      var Io = new Lt("SCHEDULER_TOKEN", {
          providedIn: "root",
          factory: function () {
            return le;
          },
        }),
        Po = (function (t) {
          function e(e) {
            void 0 === e && (e = !1);
            var n = t.call(this) || this;
            return (n.__isAsync = e), n;
          }
          return (
            o(e, t),
            (e.prototype.emit = function (e) {
              t.prototype.next.call(this, e);
            }),
            (e.prototype.subscribe = function (e, n, r) {
              var o,
                i = function (t) {
                  return null;
                },
                l = function () {
                  return null;
                };
              e && "object" == typeof e
                ? ((o = this.__isAsync
                    ? function (t) {
                        setTimeout(function () {
                          return e.next(t);
                        });
                      }
                    : function (t) {
                        e.next(t);
                      }),
                  e.error &&
                    (i = this.__isAsync
                      ? function (t) {
                          setTimeout(function () {
                            return e.error(t);
                          });
                        }
                      : function (t) {
                          e.error(t);
                        }),
                  e.complete &&
                    (l = this.__isAsync
                      ? function () {
                          setTimeout(function () {
                            return e.complete();
                          });
                        }
                      : function () {
                          e.complete();
                        }))
                : ((o = this.__isAsync
                    ? function (t) {
                        setTimeout(function () {
                          return e(t);
                        });
                      }
                    : function (t) {
                        e(t);
                      }),
                  n &&
                    (i = this.__isAsync
                      ? function (t) {
                          setTimeout(function () {
                            return n(t);
                          });
                        }
                      : function (t) {
                          n(t);
                        }),
                  r &&
                    (l = this.__isAsync
                      ? function () {
                          setTimeout(function () {
                            return r();
                          });
                        }
                      : function () {
                          r();
                        }));
              var a = t.prototype.subscribe.call(this, o, i, l);
              return e instanceof v && e.add(a), a;
            }),
            e
          );
        })(M),
        Ro = (function () {
          function t() {
            (this.dirty = !0),
              (this._results = []),
              (this.changes = new Po()),
              (this.length = 0);
          }
          return (
            (t.prototype.map = function (t) {
              return this._results.map(t);
            }),
            (t.prototype.filter = function (t) {
              return this._results.filter(t);
            }),
            (t.prototype.find = function (t) {
              return this._results.find(t);
            }),
            (t.prototype.reduce = function (t, e) {
              return this._results.reduce(t, e);
            }),
            (t.prototype.forEach = function (t) {
              this._results.forEach(t);
            }),
            (t.prototype.some = function (t) {
              return this._results.some(t);
            }),
            (t.prototype.toArray = function () {
              return this._results.slice();
            }),
            (t.prototype[We()] = function () {
              return this._results[We()]();
            }),
            (t.prototype.toString = function () {
              return this._results.toString();
            }),
            (t.prototype.reset = function (t) {
              (this._results = (function t(e, n) {
                void 0 === n && (n = e);
                for (var r = 0; r < e.length; r++) {
                  var o = e[r];
                  Array.isArray(o)
                    ? (n === e && (n = e.slice(0, r)), t(o, n))
                    : n !== e && n.push(o);
                }
                return n;
              })(t)),
                (this.dirty = !1),
                (this.length = this._results.length),
                (this.last = this._results[this.length - 1]),
                (this.first = this._results[0]);
            }),
            (t.prototype.notifyOnChanges = function () {
              this.changes.emit(this);
            }),
            (t.prototype.setDirty = function () {
              this.dirty = !0;
            }),
            (t.prototype.destroy = function () {
              this.changes.complete(), this.changes.unsubscribe();
            }),
            t
          );
        })(),
        No = (function () {
          return function () {};
        })(),
        Do = yt("Input", function (t) {
          return { bindingPropertyName: t };
        }),
        Mo = yt("HostBinding", function (t) {
          return { hostPropertyName: t };
        }),
        jo = new Lt("Application Initializer"),
        Vo = (function () {
          function t(t) {
            var e = this;
            (this.appInits = t),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise(function (t, n) {
                (e.resolve = t), (e.reject = n);
              }));
          }
          return (
            (t.prototype.runInitializers = function () {
              var t = this;
              if (!this.initialized) {
                var e = [],
                  n = function () {
                    (t.done = !0), t.resolve();
                  };
                if (this.appInits)
                  for (var r = 0; r < this.appInits.length; r++) {
                    var o = this.appInits[r]();
                    He(o) && e.push(o);
                  }
                Promise.all(e)
                  .then(function () {
                    n();
                  })
                  .catch(function (e) {
                    t.reject(e);
                  }),
                  0 === e.length && n(),
                  (this.initialized = !0);
              }
            }),
            t
          );
        })(),
        Lo = new Lt("AppId");
      function Fo() {
        return "" + Uo() + Uo() + Uo();
      }
      function Uo() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      var Ho = new Lt("Platform Initializer"),
        zo = new Lt("Platform ID"),
        Bo = new Lt("appBootstrapListener"),
        Wo = (function () {
          function t() {}
          return (
            (t.prototype.log = function (t) {
              console.log(t);
            }),
            (t.prototype.warn = function (t) {
              console.warn(t);
            }),
            t
          );
        })();
      function Go() {
        throw new Error("Runtime compiler is not loaded");
      }
      var qo,
        Zo,
        Qo = Go,
        Yo = Go,
        $o = Go,
        Ko = Go,
        Xo = (function () {
          function t() {
            (this.compileModuleSync = Qo),
              (this.compileModuleAsync = Yo),
              (this.compileModuleAndAllComponentsSync = $o),
              (this.compileModuleAndAllComponentsAsync = Ko);
          }
          return (
            (t.prototype.clearCache = function () {}),
            (t.prototype.clearCacheFor = function (t) {}),
            (t.prototype.getModuleId = function (t) {}),
            t
          );
        })(),
        Jo = (function () {
          return function () {};
        })();
      function ti() {
        var t = Dt.wtf;
        return !(!t || !(qo = t.trace) || ((Zo = qo.events), 0));
      }
      var ei = ti();
      function ni(t, e) {
        return null;
      }
      var ri = ei
          ? function (t, e) {
              return void 0 === e && (e = null), Zo.createScope(t, e);
            }
          : function (t, e) {
              return ni;
            },
        oi = ei
          ? function (t, e) {
              return qo.leaveScope(t, e), e;
            }
          : function (t, e) {
              return e;
            },
        ii = (function () {
          return Promise.resolve(0);
        })();
      function li(t) {
        "undefined" == typeof Zone
          ? ii.then(function () {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      var ai = (function () {
        function t(t) {
          var e,
            n = t.enableLongStackTrace,
            r = void 0 !== n && n;
          if (
            ((this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Po(!1)),
            (this.onMicrotaskEmpty = new Po(!1)),
            (this.onStable = new Po(!1)),
            (this.onError = new Po(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            r &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            ((e = this)._inner = e._inner.fork({
              name: "angular",
              properties: { isAngularZone: !0 },
              onInvokeTask: function (t, n, r, o, i, l) {
                try {
                  return hi(e), t.invokeTask(r, o, i, l);
                } finally {
                  pi(e);
                }
              },
              onInvoke: function (t, n, r, o, i, l, a) {
                try {
                  return hi(e), t.invoke(r, o, i, l, a);
                } finally {
                  pi(e);
                }
              },
              onHasTask: function (t, n, r, o) {
                t.hasTask(r, o),
                  n === r &&
                    ("microTask" == o.change
                      ? ((e.hasPendingMicrotasks = o.microTask), ci(e))
                      : "macroTask" == o.change &&
                        (e.hasPendingMacrotasks = o.macroTask));
              },
              onHandleError: function (t, n, r, o) {
                return (
                  t.handleError(r, o),
                  e.runOutsideAngular(function () {
                    return e.onError.emit(o);
                  }),
                  !1
                );
              },
            }));
        }
        return (
          (t.isInAngularZone = function () {
            return !0 === Zone.current.get("isAngularZone");
          }),
          (t.assertInAngularZone = function () {
            if (!t.isInAngularZone())
              throw new Error("Expected to be in Angular Zone, but it is not!");
          }),
          (t.assertNotInAngularZone = function () {
            if (t.isInAngularZone())
              throw new Error("Expected to not be in Angular Zone, but it is!");
          }),
          (t.prototype.run = function (t, e, n) {
            return this._inner.run(t, e, n);
          }),
          (t.prototype.runTask = function (t, e, n, r) {
            var o = this._inner,
              i = o.scheduleEventTask("NgZoneEvent: " + r, t, si, ui, ui);
            try {
              return o.runTask(i, e, n);
            } finally {
              o.cancelTask(i);
            }
          }),
          (t.prototype.runGuarded = function (t, e, n) {
            return this._inner.runGuarded(t, e, n);
          }),
          (t.prototype.runOutsideAngular = function (t) {
            return this._outer.run(t);
          }),
          t
        );
      })();
      function ui() {}
      var si = {};
      function ci(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(function () {
                  return t.onStable.emit(null);
                });
              } finally {
                t.isStable = !0;
              }
          }
      }
      function hi(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function pi(t) {
        t._nesting--, ci(t);
      }
      var fi,
        di = (function () {
          function t() {
            (this.hasPendingMicrotasks = !1),
              (this.hasPendingMacrotasks = !1),
              (this.isStable = !0),
              (this.onUnstable = new Po()),
              (this.onMicrotaskEmpty = new Po()),
              (this.onStable = new Po()),
              (this.onError = new Po());
          }
          return (
            (t.prototype.run = function (t) {
              return t();
            }),
            (t.prototype.runGuarded = function (t) {
              return t();
            }),
            (t.prototype.runOutsideAngular = function (t) {
              return t();
            }),
            (t.prototype.runTask = function (t) {
              return t();
            }),
            t
          );
        })(),
        gi = (function () {
          function t(t) {
            var e = this;
            (this._ngZone = t),
              (this._pendingCount = 0),
              (this._isZoneStable = !0),
              (this._didWork = !1),
              (this._callbacks = []),
              (this.taskTrackingZone = null),
              this._watchAngularEvents(),
              t.run(function () {
                e.taskTrackingZone =
                  "undefined" == typeof Zone
                    ? null
                    : Zone.current.get("TaskTrackingZone");
              });
          }
          return (
            (t.prototype._watchAngularEvents = function () {
              var t = this;
              this._ngZone.onUnstable.subscribe({
                next: function () {
                  (t._didWork = !0), (t._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(function () {
                  t._ngZone.onStable.subscribe({
                    next: function () {
                      ai.assertNotInAngularZone(),
                        li(function () {
                          (t._isZoneStable = !0), t._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }),
            (t.prototype.increasePendingRequestCount = function () {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }),
            (t.prototype.decreasePendingRequestCount = function () {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }),
            (t.prototype.isStable = function () {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }),
            (t.prototype._runCallbacksIfReady = function () {
              var t = this;
              if (this.isStable())
                li(function () {
                  for (; 0 !== t._callbacks.length; ) {
                    var e = t._callbacks.pop();
                    clearTimeout(e.timeoutId), e.doneCb(t._didWork);
                  }
                  t._didWork = !1;
                });
              else {
                var e = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(function (t) {
                  return (
                    !t.updateCb ||
                    !t.updateCb(e) ||
                    (clearTimeout(t.timeoutId), !1)
                  );
                })),
                  (this._didWork = !0);
              }
            }),
            (t.prototype.getPendingTasks = function () {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map(function (t) {
                    return {
                      source: t.source,
                      creationLocation: t.creationLocation,
                      data: t.data,
                    };
                  })
                : [];
            }),
            (t.prototype.addCallback = function (t, e, n) {
              var r = this,
                o = -1;
              e &&
                e > 0 &&
                (o = setTimeout(function () {
                  (r._callbacks = r._callbacks.filter(function (t) {
                    return t.timeoutId !== o;
                  })),
                    t(r._didWork, r.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: o, updateCb: n });
            }),
            (t.prototype.whenStable = function (t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }),
            (t.prototype.getPendingRequestCount = function () {
              return this._pendingCount;
            }),
            (t.prototype.findProviders = function (t, e, n) {
              return [];
            }),
            t
          );
        })(),
        vi = (function () {
          function t() {
            (this._applications = new Map()), mi.addToWindow(this);
          }
          return (
            (t.prototype.registerApplication = function (t, e) {
              this._applications.set(t, e);
            }),
            (t.prototype.unregisterApplication = function (t) {
              this._applications.delete(t);
            }),
            (t.prototype.unregisterAllApplications = function () {
              this._applications.clear();
            }),
            (t.prototype.getTestability = function (t) {
              return this._applications.get(t) || null;
            }),
            (t.prototype.getAllTestabilities = function () {
              return Array.from(this._applications.values());
            }),
            (t.prototype.getAllRootElements = function () {
              return Array.from(this._applications.keys());
            }),
            (t.prototype.findTestabilityInTree = function (t, e) {
              return (
                void 0 === e && (e = !0), mi.findTestabilityInTree(this, t, e)
              );
            }),
            l([a("design:paramtypes", [])], t)
          );
        })(),
        mi = new ((function () {
          function t() {}
          return (
            (t.prototype.addToWindow = function (t) {}),
            (t.prototype.findTestabilityInTree = function (t, e, n) {
              return null;
            }),
            t
          );
        })())(),
        yi = new Lt("AllowMultipleToken"),
        bi = (function () {
          return function (t, e) {
            (this.name = t), (this.token = e);
          };
        })();
      function _i(t, e, n) {
        void 0 === n && (n = []);
        var r = "Platform: " + e,
          o = new Lt(r);
        return function (e) {
          void 0 === e && (e = []);
          var i = wi();
          if (!i || i.injector.get(yi, !1))
            if (t) t(n.concat(e).concat({ provide: o, useValue: !0 }));
            else {
              var l = n.concat(e).concat({ provide: o, useValue: !0 });
              !(function (t) {
                if (fi && !fi.destroyed && !fi.injector.get(yi, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                fi = t.get(Ci);
                var e = t.get(Ho, null);
                e &&
                  e.forEach(function (t) {
                    return t();
                  });
              })(Bt.create({ providers: l, name: r }));
            }
          return (function (t) {
            var e = wi();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(o);
        };
      }
      function wi() {
        return fi && !fi.destroyed ? fi : null;
      }
      var Ci = (function () {
        function t(t) {
          (this._injector = t),
            (this._modules = []),
            (this._destroyListeners = []),
            (this._destroyed = !1);
        }
        return (
          (t.prototype.bootstrapModuleFactory = function (t, e) {
            var n,
              r = this,
              o =
                "noop" === (n = e ? e.ngZone : void 0)
                  ? new di()
                  : ("zone.js" === n ? void 0 : n) ||
                    new ai({ enableLongStackTrace: fe() }),
              i = [{ provide: ai, useValue: o }];
            return o.run(function () {
              var e = Bt.create({
                  providers: i,
                  parent: r.injector,
                  name: t.moduleType.name,
                }),
                n = t.create(e),
                l = n.injector.get(ce, null);
              if (!l)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                n.onDestroy(function () {
                  return xi(r._modules, n);
                }),
                o.runOutsideAngular(function () {
                  return o.onError.subscribe({
                    next: function (t) {
                      l.handleError(t);
                    },
                  });
                }),
                (function (t, e, o) {
                  try {
                    var i =
                      ((l = n.injector.get(Vo)).runInitializers(),
                      l.donePromise.then(function () {
                        return r._moduleDoBootstrap(n), n;
                      }));
                    return He(i)
                      ? i.catch(function (n) {
                          throw (
                            (e.runOutsideAngular(function () {
                              return t.handleError(n);
                            }),
                            n)
                          );
                        })
                      : i;
                  } catch (a) {
                    throw (
                      (e.runOutsideAngular(function () {
                        return t.handleError(a);
                      }),
                      a)
                    );
                  }
                  var l;
                })(l, o)
              );
            });
          }),
          (t.prototype.bootstrapModule = function (t, e) {
            var n = this;
            void 0 === e && (e = []);
            var r = Ei({}, e);
            return (function (t, e, n) {
              return t.get(Jo).createCompiler([e]).compileModuleAsync(n);
            })(this.injector, r, t).then(function (t) {
              return n.bootstrapModuleFactory(t, r);
            });
          }),
          (t.prototype._moduleDoBootstrap = function (t) {
            var e = t.injector.get(Si);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach(function (t) {
                return e.bootstrap(t);
              });
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  "The module " +
                    kt(t.instance.constructor) +
                    ' was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.'
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }),
          (t.prototype.onDestroy = function (t) {
            this._destroyListeners.push(t);
          }),
          Object.defineProperty(t.prototype, "injector", {
            get: function () {
              return this._injector;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.destroy = function () {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach(function (t) {
              return t.destroy();
            }),
              this._destroyListeners.forEach(function (t) {
                return t();
              }),
              (this._destroyed = !0);
          }),
          Object.defineProperty(t.prototype, "destroyed", {
            get: function () {
              return this._destroyed;
            },
            enumerable: !0,
            configurable: !0,
          }),
          t
        );
      })();
      function Ei(t, e) {
        return Array.isArray(e) ? e.reduce(Ei, t) : i({}, t, e);
      }
      var Si = (function () {
        function t(t, e, n, r, o, i) {
          var l = this;
          (this._zone = t),
            (this._console = e),
            (this._injector = n),
            (this._exceptionHandler = r),
            (this._componentFactoryResolver = o),
            (this._initStatus = i),
            (this._bootstrapListeners = []),
            (this._views = []),
            (this._runningTick = !1),
            (this._enforceNoNewChanges = !1),
            (this._stable = !0),
            (this.componentTypes = []),
            (this.components = []),
            (this._enforceNoNewChanges = fe()),
            this._zone.onMicrotaskEmpty.subscribe({
              next: function () {
                l._zone.run(function () {
                  l.tick();
                });
              },
            });
          var a = new A(function (t) {
              (l._stable =
                l._zone.isStable &&
                !l._zone.hasPendingMacrotasks &&
                !l._zone.hasPendingMicrotasks),
                l._zone.runOutsideAngular(function () {
                  t.next(l._stable), t.complete();
                });
            }),
            u = new A(function (t) {
              var e;
              l._zone.runOutsideAngular(function () {
                e = l._zone.onStable.subscribe(function () {
                  ai.assertNotInAngularZone(),
                    li(function () {
                      l._stable ||
                        l._zone.hasPendingMacrotasks ||
                        l._zone.hasPendingMicrotasks ||
                        ((l._stable = !0), t.next(!0));
                    });
                });
              });
              var n = l._zone.onUnstable.subscribe(function () {
                ai.assertInAngularZone(),
                  l._stable &&
                    ((l._stable = !1),
                    l._zone.runOutsideAngular(function () {
                      t.next(!1);
                    }));
              });
              return function () {
                e.unsubscribe(), n.unsubscribe();
              };
            });
          this.isStable = lt(
            a,
            u.pipe(function (t) {
              return at()(
                ((e = ft),
                function (t) {
                  var n;
                  n =
                    "function" == typeof e
                      ? e
                      : function () {
                          return e;
                        };
                  var r = Object.create(t, ht);
                  return (r.source = t), (r.subjectFactory = n), r;
                })(t)
              );
              var e;
            })
          );
        }
        var e;
        return (
          (e = t),
          (t.prototype.bootstrap = function (t, e) {
            var n,
              r = this;
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            (n =
              t instanceof Je
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            var o = n instanceof ln ? null : this._injector.get(an),
              i = n.create(Bt.NULL, [], e || n.selector, o);
            i.onDestroy(function () {
              r._unloadComponent(i);
            });
            var l = i.injector.get(gi, null);
            return (
              l &&
                i.injector
                  .get(vi)
                  .registerApplication(i.location.nativeElement, l),
              this._loadComponent(i),
              fe() &&
                this._console.log(
                  "Angular is running in the development mode. Call enableProdMode() to enable the production mode."
                ),
              i
            );
          }),
          (t.prototype.tick = function () {
            var t,
              n,
              r,
              o,
              i = this;
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            var l = e._tickScope();
            try {
              this._runningTick = !0;
              try {
                for (
                  var a = u(this._views), s = a.next();
                  !s.done;
                  s = a.next()
                )
                  s.value.detectChanges();
              } catch (p) {
                t = { error: p };
              } finally {
                try {
                  s && !s.done && (n = a.return) && n.call(a);
                } finally {
                  if (t) throw t.error;
                }
              }
              if (this._enforceNoNewChanges)
                try {
                  for (
                    var c = u(this._views), h = c.next();
                    !h.done;
                    h = c.next()
                  )
                    h.value.checkNoChanges();
                } catch (f) {
                  r = { error: f };
                } finally {
                  try {
                    h && !h.done && (o = c.return) && o.call(c);
                  } finally {
                    if (r) throw r.error;
                  }
                }
            } catch (d) {
              this._zone.runOutsideAngular(function () {
                return i._exceptionHandler.handleError(d);
              });
            } finally {
              (this._runningTick = !1), oi(l);
            }
          }),
          (t.prototype.attachView = function (t) {
            var e = t;
            this._views.push(e), e.attachToAppRef(this);
          }),
          (t.prototype.detachView = function (t) {
            var e = t;
            xi(this._views, e), e.detachFromAppRef();
          }),
          (t.prototype._loadComponent = function (t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(Bo, [])
                .concat(this._bootstrapListeners)
                .forEach(function (e) {
                  return e(t);
                });
          }),
          (t.prototype._unloadComponent = function (t) {
            this.detachView(t.hostView), xi(this.components, t);
          }),
          (t.prototype.ngOnDestroy = function () {
            this._views.slice().forEach(function (t) {
              return t.destroy();
            });
          }),
          Object.defineProperty(t.prototype, "viewCount", {
            get: function () {
              return this._views.length;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t._tickScope = ri("ApplicationRef#tick()")),
          t
        );
      })();
      function xi(t, e) {
        var n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      var Oi = (function () {
          return function () {};
        })(),
        Ti = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" },
        ki = (function () {
          function t(t, e) {
            (this._compiler = t), (this._config = e || Ti);
          }
          return (
            (t.prototype.load = function (t) {
              return this._compiler instanceof Xo
                ? this.loadFactory(t)
                : this.loadAndCompile(t);
            }),
            (t.prototype.loadAndCompile = function (t) {
              var e = this,
                r = s(t.split("#"), 2),
                o = r[0],
                i = r[1];
              return (
                void 0 === i && (i = "default"),
                n("zn8P")(o)
                  .then(function (t) {
                    return t[i];
                  })
                  .then(function (t) {
                    return Ai(t, o, i);
                  })
                  .then(function (t) {
                    return e._compiler.compileModuleAsync(t);
                  })
              );
            }),
            (t.prototype.loadFactory = function (t) {
              var e = s(t.split("#"), 2),
                r = e[0],
                o = e[1],
                i = "NgFactory";
              return (
                void 0 === o && ((o = "default"), (i = "")),
                n("zn8P")(
                  this._config.factoryPathPrefix +
                    r +
                    this._config.factoryPathSuffix
                )
                  .then(function (t) {
                    return t[o + i];
                  })
                  .then(function (t) {
                    return Ai(t, r, o);
                  })
              );
            }),
            t
          );
        })();
      function Ai(t, e, n) {
        if (!t) throw new Error("Cannot find '" + n + "' in '" + e + "'");
        return t;
      }
      var Ii = (function () {
          return function (t, e) {
            (this.name = t), (this.callback = e);
          };
        })(),
        Pi = (function () {
          function t(t, e, n) {
            (this.listeners = []),
              (this.parent = null),
              (this._debugContext = n),
              (this.nativeNode = t),
              e && e instanceof Ri && e.addChild(this);
          }
          return (
            Object.defineProperty(t.prototype, "injector", {
              get: function () {
                return this._debugContext.injector;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "componentInstance", {
              get: function () {
                return this._debugContext.component;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "context", {
              get: function () {
                return this._debugContext.context;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "references", {
              get: function () {
                return this._debugContext.references;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "providerTokens", {
              get: function () {
                return this._debugContext.providerTokens;
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(),
        Ri = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e, n, r) || this;
            return (
              (o.properties = {}),
              (o.attributes = {}),
              (o.classes = {}),
              (o.styles = {}),
              (o.childNodes = []),
              (o.nativeElement = e),
              o
            );
          }
          return (
            o(e, t),
            (e.prototype.addChild = function (t) {
              t && (this.childNodes.push(t), (t.parent = this));
            }),
            (e.prototype.removeChild = function (t) {
              var e = this.childNodes.indexOf(t);
              -1 !== e && ((t.parent = null), this.childNodes.splice(e, 1));
            }),
            (e.prototype.insertChildrenAfter = function (t, e) {
              var n,
                r = this,
                o = this.childNodes.indexOf(t);
              -1 !== o &&
                ((n = this.childNodes).splice.apply(n, c([o + 1, 0], e)),
                e.forEach(function (e) {
                  e.parent && e.parent.removeChild(e), (t.parent = r);
                }));
            }),
            (e.prototype.insertBefore = function (t, e) {
              var n = this.childNodes.indexOf(t);
              -1 === n
                ? this.addChild(e)
                : (e.parent && e.parent.removeChild(e),
                  (e.parent = this),
                  this.childNodes.splice(n, 0, e));
            }),
            (e.prototype.query = function (t) {
              return this.queryAll(t)[0] || null;
            }),
            (e.prototype.queryAll = function (t) {
              var e = [];
              return (
                (function t(e, n, r) {
                  e.childNodes.forEach(function (e) {
                    e instanceof Ri && (n(e) && r.push(e), t(e, n, r));
                  });
                })(this, t, e),
                e
              );
            }),
            (e.prototype.queryAllNodes = function (t) {
              var e = [];
              return (
                (function t(e, n, r) {
                  e instanceof Ri &&
                    e.childNodes.forEach(function (e) {
                      n(e) && r.push(e), e instanceof Ri && t(e, n, r);
                    });
                })(this, t, e),
                e
              );
            }),
            Object.defineProperty(e.prototype, "children", {
              get: function () {
                return this.childNodes.filter(function (t) {
                  return t instanceof e;
                });
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.triggerEventHandler = function (t, e) {
              this.listeners.forEach(function (n) {
                n.name == t && n.callback(e);
              });
            }),
            e
          );
        })(Pi),
        Ni = new Map(),
        Di = function (t) {
          return Ni.get(t) || null;
        };
      function Mi(t) {
        Ni.set(t.nativeNode, t);
      }
      var ji = _i(null, "core", [
          { provide: zo, useValue: "unknown" },
          { provide: Ci, deps: [Bt] },
          { provide: vi, deps: [] },
          { provide: Wo, deps: [] },
        ]),
        Vi = new Lt("LocaleId");
      function Li() {
        return Nn;
      }
      function Fi() {
        return Dn;
      }
      function Ui(t) {
        return t || "en-US";
      }
      function Hi(t) {
        var e = [];
        return (
          t.onStable.subscribe(function () {
            for (; e.length; ) e.pop()();
          }),
          function (t) {
            e.push(t);
          }
        );
      }
      var zi = (function () {
        return function (t) {};
      })();
      function Bi(t, e, n, r, o, i) {
        t |= 1;
        var l = vr(e);
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          flags: t,
          checkIndex: -1,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: l.matchedQueries,
          matchedQueryIds: l.matchedQueryIds,
          references: l.references,
          ngContentIndex: n,
          childCount: r,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: {
            ns: null,
            name: null,
            attrs: null,
            template: i ? _r(i) : null,
            componentProvider: null,
            componentView: null,
            componentRendererType: null,
            publicProviders: null,
            allProviders: null,
            handleEvent: o || $n,
          },
          provider: null,
          text: null,
          query: null,
          ngContent: null,
        };
      }
      function Wi(t, e, n, r, o, i, l, a, u, c, h, p) {
        var f;
        void 0 === l && (l = []), c || (c = $n);
        var d = vr(n),
          g = d.matchedQueries,
          v = d.references,
          m = d.matchedQueryIds,
          y = null,
          b = null;
        i && ((y = (f = s(Tr(i), 2))[0]), (b = f[1])), (a = a || []);
        for (var _ = new Array(a.length), w = 0; w < a.length; w++) {
          var C = s(a[w], 3),
            E = C[0],
            S = C[2],
            x = s(Tr(C[1]), 2),
            O = x[0],
            T = x[1],
            k = void 0,
            A = void 0;
          switch (15 & E) {
            case 4:
              A = S;
              break;
            case 1:
            case 8:
              k = S;
          }
          _[w] = {
            flags: E,
            ns: O,
            name: T,
            nonMinifiedName: T,
            securityContext: k,
            suffix: A,
          };
        }
        u = u || [];
        var I = new Array(u.length);
        for (w = 0; w < u.length; w++) {
          var P = s(u[w], 2);
          I[w] = { type: 0, target: P[0], eventName: P[1], propName: null };
        }
        var R = (l = l || []).map(function (t) {
          var e = s(t, 2),
            n = e[1],
            r = s(Tr(e[0]), 2);
          return [r[0], r[1], n];
        });
        return (
          (p = (function (t) {
            if (t && t.id === tr) {
              var e =
                (null != t.encapsulation && t.encapsulation !== ie.None) ||
                t.styles.length ||
                Object.keys(t.data).length;
              t.id = e ? "c" + rr++ : er;
            }
            return t && t.id === er && (t = null), t || null;
          })(p)),
          h && (e |= 33554432),
          {
            nodeIndex: -1,
            parent: null,
            renderParent: null,
            bindingIndex: -1,
            outputIndex: -1,
            checkIndex: t,
            flags: (e |= 1),
            childFlags: 0,
            directChildFlags: 0,
            childMatchedQueries: 0,
            matchedQueries: g,
            matchedQueryIds: m,
            references: v,
            ngContentIndex: r,
            childCount: o,
            bindings: _,
            bindingFlags: kr(_),
            outputs: I,
            element: {
              ns: y,
              name: b,
              attrs: R,
              template: null,
              componentProvider: null,
              componentView: h || null,
              componentRendererType: p,
              publicProviders: null,
              allProviders: null,
              handleEvent: c || $n,
            },
            provider: null,
            text: null,
            query: null,
            ngContent: null,
          }
        );
      }
      function Gi(t, e, n) {
        var r,
          o = n.element,
          i = t.root.selectorOrNode,
          l = t.renderer;
        if (t.parent || !i) {
          r = o.name ? l.createElement(o.name, o.ns) : l.createComment("");
          var a = yr(t, e, n);
          a && l.appendChild(a, r);
        } else
          r = l.selectRootElement(
            i,
            !!o.componentRendererType &&
              o.componentRendererType.encapsulation === ie.ShadowDom
          );
        if (o.attrs)
          for (var u = 0; u < o.attrs.length; u++) {
            var c = s(o.attrs[u], 3);
            l.setAttribute(r, c[1], c[2], c[0]);
          }
        return r;
      }
      function qi(t, e, n, r) {
        for (var o = 0; o < n.outputs.length; o++) {
          var i = n.outputs[o],
            l = Zi(
              t,
              n.nodeIndex,
              ((h = i.eventName), (c = i.target) ? c + ":" + h : h)
            ),
            a = i.target,
            u = t;
          "component" === i.target && ((a = null), (u = e));
          var s = u.renderer.listen(a || r, i.eventName, l);
          t.disposables[n.outputIndex + o] = s;
        }
        var c, h;
      }
      function Zi(t, e, n) {
        return function (r) {
          return sr(t, e, n, r);
        };
      }
      function Qi(t, e, n, r) {
        if (!ir(t, e, n, r)) return !1;
        var o = e.bindings[n],
          i = Gn(t, e.nodeIndex),
          l = i.renderElement,
          a = o.name;
        switch (15 & o.flags) {
          case 1:
            !(function (t, e, n, r, o, i) {
              var l = e.securityContext,
                a = l ? t.root.sanitizer.sanitize(l, i) : i;
              a = null != a ? a.toString() : null;
              var u = t.renderer;
              null != i
                ? u.setAttribute(n, o, a, r)
                : u.removeAttribute(n, o, r);
            })(t, o, l, o.ns, a, r);
            break;
          case 2:
            !(function (t, e, n, r) {
              var o = t.renderer;
              r ? o.addClass(e, n) : o.removeClass(e, n);
            })(t, l, a, r);
            break;
          case 4:
            !(function (t, e, n, r, o) {
              var i = t.root.sanitizer.sanitize(Me.STYLE, o);
              if (null != i) {
                i = i.toString();
                var l = e.suffix;
                null != l && (i += l);
              } else i = null;
              var a = t.renderer;
              null != i ? a.setStyle(n, r, i) : a.removeStyle(n, r);
            })(t, o, l, a, r);
            break;
          case 8:
            !(function (t, e, n, r, o) {
              var i = e.securityContext,
                l = i ? t.root.sanitizer.sanitize(i, o) : o;
              t.renderer.setProperty(n, r, l);
            })(
              33554432 & e.flags && 32 & o.flags ? i.componentView : t,
              o,
              l,
              a,
              r
            );
        }
        return !0;
      }
      function Yi(t, e, n) {
        var r = [];
        for (var o in n) r.push({ propName: o, bindingType: n[o] });
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: -1,
          flags: t,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          ngContentIndex: -1,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          childCount: 0,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: null,
          provider: null,
          text: null,
          query: { id: e, filterId: gr(e), bindings: r },
          ngContent: null,
        };
      }
      function $i(t) {
        for (var e = t.def.nodeMatchedQueries; t.parent && dr(t); ) {
          var n = t.parentNodeDef;
          t = t.parent;
          for (var r = n.nodeIndex + n.childCount, o = 0; o <= r; o++)
            67108864 & (i = t.def.nodes[o]).flags &&
              536870912 & i.flags &&
              (i.query.filterId & e) === i.query.filterId &&
              Qn(t, o).setDirty(),
              (!(1 & i.flags && o + i.childCount < n.nodeIndex) &&
                67108864 & i.childFlags &&
                536870912 & i.childFlags) ||
                (o += i.childCount);
        }
        if (134217728 & t.def.nodeFlags)
          for (o = 0; o < t.def.nodes.length; o++) {
            var i;
            134217728 & (i = t.def.nodes[o]).flags &&
              536870912 & i.flags &&
              Qn(t, o).setDirty(),
              (o += i.childCount);
          }
      }
      function Ki(t, e) {
        var n = Qn(t, e.nodeIndex);
        if (n.dirty) {
          var r,
            o = void 0;
          if (67108864 & e.flags) {
            var i = e.parent.parent;
            (o = Xi(t, i.nodeIndex, i.nodeIndex + i.childCount, e.query, [])),
              (r = qn(t, e.parent.nodeIndex).instance);
          } else
            134217728 & e.flags &&
              ((o = Xi(t, 0, t.def.nodes.length - 1, e.query, [])),
              (r = t.component));
          n.reset(o);
          for (var l = e.query.bindings, a = !1, u = 0; u < l.length; u++) {
            var s = l[u],
              c = void 0;
            switch (s.bindingType) {
              case 0:
                c = n.first;
                break;
              case 1:
                (c = n), (a = !0);
            }
            r[s.propName] = c;
          }
          a && n.notifyOnChanges();
        }
      }
      function Xi(t, e, n, r, o) {
        for (var i = e; i <= n; i++) {
          var l = t.def.nodes[i],
            a = l.matchedQueries[r.id];
          if (
            (null != a && o.push(Ji(t, l, a)),
            1 & l.flags &&
              l.element.template &&
              (l.element.template.nodeMatchedQueries & r.filterId) ===
                r.filterId)
          ) {
            var u = Gn(t, i);
            if (
              ((l.childMatchedQueries & r.filterId) === r.filterId &&
                (Xi(t, i + 1, i + l.childCount, r, o), (i += l.childCount)),
              16777216 & l.flags)
            )
              for (
                var s = u.viewContainer._embeddedViews, c = 0;
                c < s.length;
                c++
              ) {
                var h = s[c],
                  p = cr(h);
                p && p === u && Xi(h, 0, h.def.nodes.length - 1, r, o);
              }
            var f = u.template._projectedViews;
            if (f)
              for (c = 0; c < f.length; c++) {
                var d = f[c];
                Xi(d, 0, d.def.nodes.length - 1, r, o);
              }
          }
          (l.childMatchedQueries & r.filterId) !== r.filterId &&
            (i += l.childCount);
        }
        return o;
      }
      function Ji(t, e, n) {
        if (null != n)
          switch (n) {
            case 1:
              return Gn(t, e.nodeIndex).renderElement;
            case 0:
              return new cn(Gn(t, e.nodeIndex).renderElement);
            case 2:
              return Gn(t, e.nodeIndex).template;
            case 3:
              return Gn(t, e.nodeIndex).viewContainer;
            case 4:
              return qn(t, e.nodeIndex).instance;
          }
      }
      function tl(t, e, n) {
        var r = yr(t, e, n);
        r && Er(t, n.ngContent.index, 1, r, null, void 0);
      }
      function nl(t, e, n) {
        for (var r = new Array(n.length - 1), o = 1; o < n.length; o++)
          r[o - 1] = {
            flags: 8,
            name: null,
            ns: null,
            nonMinifiedName: null,
            securityContext: null,
            suffix: n[o],
          };
        return {
          nodeIndex: -1,
          parent: null,
          renderParent: null,
          bindingIndex: -1,
          outputIndex: -1,
          checkIndex: t,
          flags: 2,
          childFlags: 0,
          directChildFlags: 0,
          childMatchedQueries: 0,
          matchedQueries: {},
          matchedQueryIds: 0,
          references: {},
          ngContentIndex: e,
          childCount: 0,
          bindings: r,
          bindingFlags: 8,
          outputs: [],
          element: null,
          provider: null,
          text: { prefix: n[0] },
          query: null,
          ngContent: null,
        };
      }
      function rl(t, e, n) {
        var r,
          o = t.renderer;
        r = o.createText(n.text.prefix);
        var i = yr(t, e, n);
        return i && o.appendChild(i, r), { renderText: r };
      }
      function ol(t, e) {
        return (null != t ? t.toString() : "") + e.suffix;
      }
      function il(t, e, n, r) {
        for (
          var o = 0,
            i = 0,
            l = 0,
            a = 0,
            u = 0,
            s = null,
            c = null,
            h = !1,
            p = !1,
            f = null,
            d = 0;
          d < e.length;
          d++
        ) {
          var g = e[d];
          if (
            ((g.nodeIndex = d),
            (g.parent = s),
            (g.bindingIndex = o),
            (g.outputIndex = i),
            (g.renderParent = c),
            (l |= g.flags),
            (u |= g.matchedQueryIds),
            g.element)
          ) {
            var v = g.element;
            (v.publicProviders = s
              ? s.element.publicProviders
              : Object.create(null)),
              (v.allProviders = v.publicProviders),
              (h = !1),
              (p = !1),
              g.element.template &&
                (u |= g.element.template.nodeMatchedQueries);
          }
          if (
            (al(s, g, e.length),
            (o += g.bindings.length),
            (i += g.outputs.length),
            !c && 3 & g.flags && (f = g),
            20224 & g.flags)
          ) {
            h ||
              ((h = !0),
              (s.element.publicProviders = Object.create(
                s.element.publicProviders
              )),
              (s.element.allProviders = s.element.publicProviders));
            var m = 0 != (32768 & g.flags);
            0 == (8192 & g.flags) || m
              ? (s.element.publicProviders[Xn(g.provider.token)] = g)
              : (p ||
                  ((p = !0),
                  (s.element.allProviders = Object.create(
                    s.element.publicProviders
                  ))),
                (s.element.allProviders[Xn(g.provider.token)] = g)),
              m && (s.element.componentProvider = g);
          }
          if (
            (s
              ? ((s.childFlags |= g.flags),
                (s.directChildFlags |= g.flags),
                (s.childMatchedQueries |= g.matchedQueryIds),
                g.element &&
                  g.element.template &&
                  (s.childMatchedQueries |=
                    g.element.template.nodeMatchedQueries))
              : (a |= g.flags),
            g.childCount > 0)
          )
            (s = g), ll(g) || (c = g);
          else
            for (; s && d === s.nodeIndex + s.childCount; ) {
              var y = s.parent;
              y &&
                ((y.childFlags |= s.childFlags),
                (y.childMatchedQueries |= s.childMatchedQueries)),
                (c = (s = y) && ll(s) ? s.renderParent : s);
            }
        }
        return {
          factory: null,
          nodeFlags: l,
          rootNodeFlags: a,
          nodeMatchedQueries: u,
          flags: t,
          nodes: e,
          updateDirectives: n || $n,
          updateRenderer: r || $n,
          handleEvent: function (t, n, r, o) {
            return e[n].element.handleEvent(t, r, o);
          },
          bindingCount: o,
          outputCount: i,
          lastRenderRootNode: f,
        };
      }
      function ll(t) {
        return 0 != (1 & t.flags) && null === t.element.name;
      }
      function al(t, e, n) {
        var r = e.element && e.element.template;
        if (r) {
          if (!r.lastRenderRootNode)
            throw new Error(
              "Illegal State: Embedded templates without nodes are not allowed!"
            );
          if (r.lastRenderRootNode && 16777216 & r.lastRenderRootNode.flags)
            throw new Error(
              "Illegal State: Last root node of a template can't have embedded views, at index " +
                e.nodeIndex +
                "!"
            );
        }
        if (20224 & e.flags && 0 == (1 & (t ? t.flags : 0)))
          throw new Error(
            "Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index " +
              e.nodeIndex +
              "!"
          );
        if (e.query) {
          if (67108864 & e.flags && (!t || 0 == (16384 & t.flags)))
            throw new Error(
              "Illegal State: Content Query nodes need to be children of directives, at index " +
                e.nodeIndex +
                "!"
            );
          if (134217728 & e.flags && t)
            throw new Error(
              "Illegal State: View Query nodes have to be top level nodes, at index " +
                e.nodeIndex +
                "!"
            );
        }
        if (e.childCount) {
          var o = t ? t.nodeIndex + t.childCount : n - 1;
          if (e.nodeIndex <= o && e.nodeIndex + e.childCount > o)
            throw new Error(
              "Illegal State: childCount of node leads outside of parent, at index " +
                e.nodeIndex +
                "!"
            );
        }
      }
      function ul(t, e, n, r) {
        var o = hl(t.root, t.renderer, t, e, n);
        return pl(o, t.component, r), fl(o), o;
      }
      function sl(t, e, n) {
        var r = hl(t, t.renderer, null, null, e);
        return pl(r, n, n), fl(r), r;
      }
      function cl(t, e, n, r) {
        var o,
          i = e.element.componentRendererType;
        return (
          (o = i
            ? t.root.rendererFactory.createRenderer(r, i)
            : t.root.renderer),
          hl(t.root, o, t, e.element.componentProvider, n)
        );
      }
      function hl(t, e, n, r, o) {
        var i = new Array(o.nodes.length),
          l = o.outputCount ? new Array(o.outputCount) : null;
        return {
          def: o,
          parent: n,
          viewContainerParent: null,
          parentNodeDef: r,
          context: null,
          component: null,
          nodes: i,
          state: 13,
          root: t,
          renderer: e,
          oldValues: new Array(o.bindingCount),
          disposables: l,
          initIndex: -1,
        };
      }
      function pl(t, e, n) {
        (t.component = e), (t.context = n);
      }
      function fl(t) {
        var e;
        fr(t) &&
          (e = Gn(t.parent, t.parentNodeDef.parent.nodeIndex).renderElement);
        for (var n = t.def, r = t.nodes, o = 0; o < n.nodes.length; o++) {
          var i = n.nodes[o];
          Yn.setCurrentNode(t, o);
          var l = void 0;
          switch (201347067 & i.flags) {
            case 1:
              var a = Gi(t, e, i),
                u = void 0;
              if (33554432 & i.flags) {
                var s = _r(i.element.componentView);
                u = Yn.createComponentView(t, i, s, a);
              }
              qi(t, u, i, a),
                (l = {
                  renderElement: a,
                  componentView: u,
                  viewContainer: null,
                  template: i.element.template ? Yr(t, i) : void 0,
                }),
                16777216 & i.flags && (l.viewContainer = Gr(t, i, l));
              break;
            case 2:
              l = rl(t, e, i);
              break;
            case 512:
            case 1024:
            case 2048:
            case 256:
              (l = r[o]) || 4096 & i.flags || (l = { instance: mo(t, i) });
              break;
            case 16:
              l = { instance: yo(t, i) };
              break;
            case 16384:
              (l = r[o]) || (l = { instance: bo(t, i) }),
                32768 & i.flags &&
                  pl(
                    Gn(t, i.parent.nodeIndex).componentView,
                    l.instance,
                    l.instance
                  );
              break;
            case 32:
            case 64:
            case 128:
              l = { value: void 0 };
              break;
            case 67108864:
            case 134217728:
              l = new Ro();
              break;
            case 8:
              tl(t, e, i), (l = void 0);
          }
          r[o] = l;
        }
        Cl(t, wl.CreateViewNodes), Ol(t, 201326592, 268435456, 0);
      }
      function dl(t) {
        ml(t),
          Yn.updateDirectives(t, 1),
          El(t, wl.CheckNoChanges),
          Yn.updateRenderer(t, 1),
          Cl(t, wl.CheckNoChanges),
          (t.state &= -97);
      }
      function gl(t) {
        1 & t.state ? ((t.state &= -2), (t.state |= 2)) : (t.state &= -3),
          zn(t, 0, 256),
          ml(t),
          Yn.updateDirectives(t, 0),
          El(t, wl.CheckAndUpdate),
          Ol(t, 67108864, 536870912, 0);
        var e = zn(t, 256, 512);
        To(t, 2097152 | (e ? 1048576 : 0)),
          Yn.updateRenderer(t, 0),
          Cl(t, wl.CheckAndUpdate),
          Ol(t, 134217728, 536870912, 0),
          To(t, 8388608 | ((e = zn(t, 512, 768)) ? 4194304 : 0)),
          2 & t.def.flags && (t.state &= -9),
          (t.state &= -97),
          zn(t, 768, 1024);
      }
      function vl(t, e, n, r, o, i, l, a, u, s, h, p, f) {
        return 0 === n
          ? (function (t, e, n, r, o, i, l, a, u, s, c, h) {
              switch (201347067 & e.flags) {
                case 1:
                  return (function (t, e, n, r, o, i, l, a, u, s, c, h) {
                    var p = e.bindings.length,
                      f = !1;
                    return (
                      p > 0 && Qi(t, e, 0, n) && (f = !0),
                      p > 1 && Qi(t, e, 1, r) && (f = !0),
                      p > 2 && Qi(t, e, 2, o) && (f = !0),
                      p > 3 && Qi(t, e, 3, i) && (f = !0),
                      p > 4 && Qi(t, e, 4, l) && (f = !0),
                      p > 5 && Qi(t, e, 5, a) && (f = !0),
                      p > 6 && Qi(t, e, 6, u) && (f = !0),
                      p > 7 && Qi(t, e, 7, s) && (f = !0),
                      p > 8 && Qi(t, e, 8, c) && (f = !0),
                      p > 9 && Qi(t, e, 9, h) && (f = !0),
                      f
                    );
                  })(t, e, n, r, o, i, l, a, u, s, c, h);
                case 2:
                  return (function (t, e, n, r, o, i, l, a, u, s, c, h) {
                    var p = !1,
                      f = e.bindings,
                      d = f.length;
                    if (
                      (d > 0 && ir(t, e, 0, n) && (p = !0),
                      d > 1 && ir(t, e, 1, r) && (p = !0),
                      d > 2 && ir(t, e, 2, o) && (p = !0),
                      d > 3 && ir(t, e, 3, i) && (p = !0),
                      d > 4 && ir(t, e, 4, l) && (p = !0),
                      d > 5 && ir(t, e, 5, a) && (p = !0),
                      d > 6 && ir(t, e, 6, u) && (p = !0),
                      d > 7 && ir(t, e, 7, s) && (p = !0),
                      d > 8 && ir(t, e, 8, c) && (p = !0),
                      d > 9 && ir(t, e, 9, h) && (p = !0),
                      p)
                    ) {
                      var g = e.text.prefix;
                      d > 0 && (g += ol(n, f[0])),
                        d > 1 && (g += ol(r, f[1])),
                        d > 2 && (g += ol(o, f[2])),
                        d > 3 && (g += ol(i, f[3])),
                        d > 4 && (g += ol(l, f[4])),
                        d > 5 && (g += ol(a, f[5])),
                        d > 6 && (g += ol(u, f[6])),
                        d > 7 && (g += ol(s, f[7])),
                        d > 8 && (g += ol(c, f[8])),
                        d > 9 && (g += ol(h, f[9]));
                      var v = Wn(t, e.nodeIndex).renderText;
                      t.renderer.setValue(v, g);
                    }
                    return p;
                  })(t, e, n, r, o, i, l, a, u, s, c, h);
                case 16384:
                  return (function (t, e, n, r, o, i, l, a, u, s, c, h) {
                    var p = qn(t, e.nodeIndex),
                      f = p.instance,
                      d = !1,
                      g = void 0,
                      v = e.bindings.length;
                    return (
                      v > 0 &&
                        or(t, e, 0, n) &&
                        ((d = !0), (g = Oo(t, p, e, 0, n, g))),
                      v > 1 &&
                        or(t, e, 1, r) &&
                        ((d = !0), (g = Oo(t, p, e, 1, r, g))),
                      v > 2 &&
                        or(t, e, 2, o) &&
                        ((d = !0), (g = Oo(t, p, e, 2, o, g))),
                      v > 3 &&
                        or(t, e, 3, i) &&
                        ((d = !0), (g = Oo(t, p, e, 3, i, g))),
                      v > 4 &&
                        or(t, e, 4, l) &&
                        ((d = !0), (g = Oo(t, p, e, 4, l, g))),
                      v > 5 &&
                        or(t, e, 5, a) &&
                        ((d = !0), (g = Oo(t, p, e, 5, a, g))),
                      v > 6 &&
                        or(t, e, 6, u) &&
                        ((d = !0), (g = Oo(t, p, e, 6, u, g))),
                      v > 7 &&
                        or(t, e, 7, s) &&
                        ((d = !0), (g = Oo(t, p, e, 7, s, g))),
                      v > 8 &&
                        or(t, e, 8, c) &&
                        ((d = !0), (g = Oo(t, p, e, 8, c, g))),
                      v > 9 &&
                        or(t, e, 9, h) &&
                        ((d = !0), (g = Oo(t, p, e, 9, h, g))),
                      g && f.ngOnChanges(g),
                      65536 & e.flags &&
                        Bn(t, 256, e.nodeIndex) &&
                        f.ngOnInit(),
                      262144 & e.flags && f.ngDoCheck(),
                      d
                    );
                  })(t, e, n, r, o, i, l, a, u, s, c, h);
                case 32:
                case 64:
                case 128:
                  return (function (t, e, n, r, o, i, l, a, u, s, c, h) {
                    var p = e.bindings,
                      f = !1,
                      d = p.length;
                    if (
                      (d > 0 && ir(t, e, 0, n) && (f = !0),
                      d > 1 && ir(t, e, 1, r) && (f = !0),
                      d > 2 && ir(t, e, 2, o) && (f = !0),
                      d > 3 && ir(t, e, 3, i) && (f = !0),
                      d > 4 && ir(t, e, 4, l) && (f = !0),
                      d > 5 && ir(t, e, 5, a) && (f = !0),
                      d > 6 && ir(t, e, 6, u) && (f = !0),
                      d > 7 && ir(t, e, 7, s) && (f = !0),
                      d > 8 && ir(t, e, 8, c) && (f = !0),
                      d > 9 && ir(t, e, 9, h) && (f = !0),
                      f)
                    ) {
                      var g = Zn(t, e.nodeIndex),
                        v = void 0;
                      switch (201347067 & e.flags) {
                        case 32:
                          (v = new Array(p.length)),
                            d > 0 && (v[0] = n),
                            d > 1 && (v[1] = r),
                            d > 2 && (v[2] = o),
                            d > 3 && (v[3] = i),
                            d > 4 && (v[4] = l),
                            d > 5 && (v[5] = a),
                            d > 6 && (v[6] = u),
                            d > 7 && (v[7] = s),
                            d > 8 && (v[8] = c),
                            d > 9 && (v[9] = h);
                          break;
                        case 64:
                          (v = {}),
                            d > 0 && (v[p[0].name] = n),
                            d > 1 && (v[p[1].name] = r),
                            d > 2 && (v[p[2].name] = o),
                            d > 3 && (v[p[3].name] = i),
                            d > 4 && (v[p[4].name] = l),
                            d > 5 && (v[p[5].name] = a),
                            d > 6 && (v[p[6].name] = u),
                            d > 7 && (v[p[7].name] = s),
                            d > 8 && (v[p[8].name] = c),
                            d > 9 && (v[p[9].name] = h);
                          break;
                        case 128:
                          var m = n;
                          switch (d) {
                            case 1:
                              v = m.transform(n);
                              break;
                            case 2:
                              v = m.transform(r);
                              break;
                            case 3:
                              v = m.transform(r, o);
                              break;
                            case 4:
                              v = m.transform(r, o, i);
                              break;
                            case 5:
                              v = m.transform(r, o, i, l);
                              break;
                            case 6:
                              v = m.transform(r, o, i, l, a);
                              break;
                            case 7:
                              v = m.transform(r, o, i, l, a, u);
                              break;
                            case 8:
                              v = m.transform(r, o, i, l, a, u, s);
                              break;
                            case 9:
                              v = m.transform(r, o, i, l, a, u, s, c);
                              break;
                            case 10:
                              v = m.transform(r, o, i, l, a, u, s, c, h);
                          }
                      }
                      g.value = v;
                    }
                    return f;
                  })(t, e, n, r, o, i, l, a, u, s, c, h);
                default:
                  throw "unreachable";
              }
            })(t, e, r, o, i, l, a, u, s, h, p, f)
          : (function (t, e, n) {
              switch (201347067 & e.flags) {
                case 1:
                  return (function (t, e, n) {
                    for (var r = !1, o = 0; o < n.length; o++)
                      Qi(t, e, o, n[o]) && (r = !0);
                    return r;
                  })(t, e, n);
                case 2:
                  return (function (t, e, n) {
                    for (var r = e.bindings, o = !1, i = 0; i < n.length; i++)
                      ir(t, e, i, n[i]) && (o = !0);
                    if (o) {
                      var l = "";
                      for (i = 0; i < n.length; i++) l += ol(n[i], r[i]);
                      l = e.text.prefix + l;
                      var a = Wn(t, e.nodeIndex).renderText;
                      t.renderer.setValue(a, l);
                    }
                    return o;
                  })(t, e, n);
                case 16384:
                  return (function (t, e, n) {
                    for (
                      var r = qn(t, e.nodeIndex),
                        o = r.instance,
                        i = !1,
                        l = void 0,
                        a = 0;
                      a < n.length;
                      a++
                    )
                      or(t, e, a, n[a]) &&
                        ((i = !0), (l = Oo(t, r, e, a, n[a], l)));
                    return (
                      l && o.ngOnChanges(l),
                      65536 & e.flags &&
                        Bn(t, 256, e.nodeIndex) &&
                        o.ngOnInit(),
                      262144 & e.flags && o.ngDoCheck(),
                      i
                    );
                  })(t, e, n);
                case 32:
                case 64:
                case 128:
                  return (function (t, e, n) {
                    for (var r = e.bindings, o = !1, i = 0; i < n.length; i++)
                      ir(t, e, i, n[i]) && (o = !0);
                    if (o) {
                      var l = Zn(t, e.nodeIndex),
                        a = void 0;
                      switch (201347067 & e.flags) {
                        case 32:
                          a = n;
                          break;
                        case 64:
                          for (a = {}, i = 0; i < n.length; i++)
                            a[r[i].name] = n[i];
                          break;
                        case 128:
                          var u = n[0],
                            s = n.slice(1);
                          a = u.transform.apply(u, c(s));
                      }
                      l.value = a;
                    }
                    return o;
                  })(t, e, n);
                default:
                  throw "unreachable";
              }
            })(t, e, r);
      }
      function ml(t) {
        var e = t.def;
        if (4 & e.nodeFlags)
          for (var n = 0; n < e.nodes.length; n++) {
            var r = e.nodes[n];
            if (4 & r.flags) {
              var o = Gn(t, n).template._projectedViews;
              if (o)
                for (var i = 0; i < o.length; i++) {
                  var l = o[i];
                  (l.state |= 32), ur(l, t);
                }
            } else 0 == (4 & r.childFlags) && (n += r.childCount);
          }
      }
      function yl(t, e, n, r, o, i, l, a, u, s, c, h, p) {
        return (
          0 === n
            ? (function (t, e, n, r, o, i, l, a, u, s, c, h) {
                var p = e.bindings.length;
                p > 0 && lr(t, e, 0, n),
                  p > 1 && lr(t, e, 1, r),
                  p > 2 && lr(t, e, 2, o),
                  p > 3 && lr(t, e, 3, i),
                  p > 4 && lr(t, e, 4, l),
                  p > 5 && lr(t, e, 5, a),
                  p > 6 && lr(t, e, 6, u),
                  p > 7 && lr(t, e, 7, s),
                  p > 8 && lr(t, e, 8, c),
                  p > 9 && lr(t, e, 9, h);
              })(t, e, r, o, i, l, a, u, s, c, h, p)
            : (function (t, e, n) {
                for (var r = 0; r < n.length; r++) lr(t, e, r, n[r]);
              })(t, e, r),
          !1
        );
      }
      function bl(t, e) {
        if (Qn(t, e.nodeIndex).dirty)
          throw Fn(
            Yn.createDebugContext(t, e.nodeIndex),
            "Query " + e.query.id + " not dirty",
            "Query " + e.query.id + " dirty",
            0 != (1 & t.state)
          );
      }
      function _l(t) {
        if (!(128 & t.state)) {
          if (
            (El(t, wl.Destroy), Cl(t, wl.Destroy), To(t, 131072), t.disposables)
          )
            for (var e = 0; e < t.disposables.length; e++) t.disposables[e]();
          !(function (t) {
            if (16 & t.state) {
              var e = cr(t);
              if (e) {
                var n = e.template._projectedViews;
                n && (Ur(n, n.indexOf(t)), Yn.dirtyParentQueries(t));
              }
            }
          })(t),
            t.renderer.destroyNode &&
              (function (t) {
                for (var e = t.def.nodes.length, n = 0; n < e; n++) {
                  var r = t.def.nodes[n];
                  1 & r.flags
                    ? t.renderer.destroyNode(Gn(t, n).renderElement)
                    : 2 & r.flags
                    ? t.renderer.destroyNode(Wn(t, n).renderText)
                    : (67108864 & r.flags || 134217728 & r.flags) &&
                      Qn(t, n).destroy();
                }
              })(t),
            fr(t) && t.renderer.destroy(),
            (t.state |= 128);
        }
      }
      var wl = (function (t) {
        return (
          (t[(t.CreateViewNodes = 0)] = "CreateViewNodes"),
          (t[(t.CheckNoChanges = 1)] = "CheckNoChanges"),
          (t[(t.CheckNoChangesProjectedViews = 2)] =
            "CheckNoChangesProjectedViews"),
          (t[(t.CheckAndUpdate = 3)] = "CheckAndUpdate"),
          (t[(t.CheckAndUpdateProjectedViews = 4)] =
            "CheckAndUpdateProjectedViews"),
          (t[(t.Destroy = 5)] = "Destroy"),
          t
        );
      })({});
      function Cl(t, e) {
        var n = t.def;
        if (33554432 & n.nodeFlags)
          for (var r = 0; r < n.nodes.length; r++) {
            var o = n.nodes[r];
            33554432 & o.flags
              ? Sl(Gn(t, r).componentView, e)
              : 0 == (33554432 & o.childFlags) && (r += o.childCount);
          }
      }
      function El(t, e) {
        var n = t.def;
        if (16777216 & n.nodeFlags)
          for (var r = 0; r < n.nodes.length; r++) {
            var o = n.nodes[r];
            if (16777216 & o.flags)
              for (
                var i = Gn(t, r).viewContainer._embeddedViews, l = 0;
                l < i.length;
                l++
              )
                Sl(i[l], e);
            else 0 == (16777216 & o.childFlags) && (r += o.childCount);
          }
      }
      function Sl(t, e) {
        var n = t.state;
        switch (e) {
          case wl.CheckNoChanges:
            0 == (128 & n) &&
              (12 == (12 & n)
                ? dl(t)
                : 64 & n && xl(t, wl.CheckNoChangesProjectedViews));
            break;
          case wl.CheckNoChangesProjectedViews:
            0 == (128 & n) && (32 & n ? dl(t) : 64 & n && xl(t, e));
            break;
          case wl.CheckAndUpdate:
            0 == (128 & n) &&
              (12 == (12 & n)
                ? gl(t)
                : 64 & n && xl(t, wl.CheckAndUpdateProjectedViews));
            break;
          case wl.CheckAndUpdateProjectedViews:
            0 == (128 & n) && (32 & n ? gl(t) : 64 & n && xl(t, e));
            break;
          case wl.Destroy:
            _l(t);
            break;
          case wl.CreateViewNodes:
            fl(t);
        }
      }
      function xl(t, e) {
        El(t, e), Cl(t, e);
      }
      function Ol(t, e, n, r) {
        if (t.def.nodeFlags & e && t.def.nodeFlags & n)
          for (var o = t.def.nodes.length, i = 0; i < o; i++) {
            var l = t.def.nodes[i];
            if (l.flags & e && l.flags & n)
              switch ((Yn.setCurrentNode(t, l.nodeIndex), r)) {
                case 0:
                  Ki(t, l);
                  break;
                case 1:
                  bl(t, l);
              }
            (l.childFlags & e && l.childFlags & n) || (i += l.childCount);
          }
      }
      var Tl = !1;
      function kl(t, e, n, r, o, i) {
        var l = o.injector.get(fn);
        return sl(Il(t, o, l, e, n), r, i);
      }
      function Al(t, e, n, r, o, i) {
        var l = o.injector.get(fn),
          a = Il(t, o, new ua(l), e, n),
          u = Ul(r);
        return la(Yl.create, sl, null, [a, u, i]);
      }
      function Il(t, e, n, r, o) {
        var i = e.injector.get(je),
          l = e.injector.get(ce),
          a = n.createRenderer(null, null);
        return {
          ngModule: e,
          injector: t,
          projectableNodes: r,
          selectorOrNode: o,
          sanitizer: i,
          rendererFactory: n,
          renderer: a,
          errorHandler: l,
        };
      }
      function Pl(t, e, n, r) {
        var o = Ul(n);
        return la(Yl.create, ul, null, [t, e, o, r]);
      }
      function Rl(t, e, n, r) {
        return (
          (n = jl.get(e.element.componentProvider.provider.token) || Ul(n)),
          la(Yl.create, cl, null, [t, e, n, r])
        );
      }
      function Nl(t, e, n, r) {
        return no(
          t,
          e,
          n,
          (function (t) {
            var e = (function (t) {
                var e = !1,
                  n = !1;
                return 0 === Dl.size
                  ? { hasOverrides: e, hasDeprecatedOverrides: n }
                  : (t.providers.forEach(function (t) {
                      var r = Dl.get(t.token);
                      3840 & t.flags &&
                        r &&
                        ((e = !0), (n = n || r.deprecatedBehavior));
                    }),
                    t.modules.forEach(function (t) {
                      Ml.forEach(function (r, o) {
                        Ot(o).providedIn === t &&
                          ((e = !0), (n = n || r.deprecatedBehavior));
                      });
                    }),
                    { hasOverrides: e, hasDeprecatedOverrides: n });
              })(t),
              n = e.hasDeprecatedOverrides;
            return e.hasOverrides
              ? ((function (t) {
                  for (var e = 0; e < t.providers.length; e++) {
                    var r = t.providers[e];
                    n && (r.flags |= 4096);
                    var o = Dl.get(r.token);
                    o &&
                      ((r.flags = (-3841 & r.flags) | o.flags),
                      (r.deps = mr(o.deps)),
                      (r.value = o.value));
                  }
                  if (Ml.size > 0) {
                    var i = new Set(t.modules);
                    Ml.forEach(function (e, r) {
                      if (i.has(Ot(r).providedIn)) {
                        var o = {
                          token: r,
                          flags: e.flags | (n ? 4096 : 0),
                          deps: mr(e.deps),
                          value: e.value,
                          index: t.providers.length,
                        };
                        t.providers.push(o), (t.providersByKey[Xn(r)] = o);
                      }
                    });
                  }
                })(
                  (t = t.factory(function () {
                    return $n;
                  }))
                ),
                t)
              : t;
          })(r)
        );
      }
      var Dl = new Map(),
        Ml = new Map(),
        jl = new Map();
      function Vl(t) {
        var e;
        Dl.set(t.token, t),
          "function" == typeof t.token &&
            (e = Ot(t.token)) &&
            "function" == typeof e.providedIn &&
            Ml.set(t.token, t);
      }
      function Ll(t, e) {
        var n = _r(e.viewDefFactory),
          r = _r(n.nodes[0].element.componentView);
        jl.set(t, r);
      }
      function Fl() {
        Dl.clear(), Ml.clear(), jl.clear();
      }
      function Ul(t) {
        if (0 === Dl.size) return t;
        var e = (function (t) {
          for (var e = [], n = null, r = 0; r < t.nodes.length; r++) {
            var o = t.nodes[r];
            1 & o.flags && (n = o),
              n &&
                3840 & o.flags &&
                Dl.has(o.provider.token) &&
                (e.push(n.nodeIndex), (n = null));
          }
          return e;
        })(t);
        if (0 === e.length) return t;
        t = t.factory(function () {
          return $n;
        });
        for (var n = 0; n < e.length; n++) r(t, e[n]);
        return t;
        function r(t, e) {
          for (var n = e + 1; n < t.nodes.length; n++) {
            var r = t.nodes[n];
            if (1 & r.flags) return;
            if (3840 & r.flags) {
              var o = r.provider,
                i = Dl.get(o.token);
              i &&
                ((r.flags = (-3841 & r.flags) | i.flags),
                (o.deps = mr(i.deps)),
                (o.value = i.value));
            }
          }
        }
      }
      function Hl(t, e, n, r, o, i, l, a, u, s, c, h, p) {
        var f = t.def.nodes[e];
        return (
          vl(t, f, n, r, o, i, l, a, u, s, c, h, p),
          224 & f.flags ? Zn(t, e).value : void 0
        );
      }
      function zl(t, e, n, r, o, i, l, a, u, s, c, h, p) {
        var f = t.def.nodes[e];
        return (
          yl(t, f, n, r, o, i, l, a, u, s, c, h, p),
          224 & f.flags ? Zn(t, e).value : void 0
        );
      }
      function Bl(t) {
        return la(Yl.detectChanges, gl, null, [t]);
      }
      function Wl(t) {
        return la(Yl.checkNoChanges, dl, null, [t]);
      }
      function Gl(t) {
        return la(Yl.destroy, _l, null, [t]);
      }
      var ql,
        Zl,
        Ql,
        Yl = (function (t) {
          return (
            (t[(t.create = 0)] = "create"),
            (t[(t.detectChanges = 1)] = "detectChanges"),
            (t[(t.checkNoChanges = 2)] = "checkNoChanges"),
            (t[(t.destroy = 3)] = "destroy"),
            (t[(t.handleEvent = 4)] = "handleEvent"),
            t
          );
        })({});
      function $l(t, e) {
        (Zl = t), (Ql = e);
      }
      function Kl(t, e, n, r) {
        return (
          $l(t, e), la(Yl.handleEvent, t.def.handleEvent, null, [t, e, n, r])
        );
      }
      function Xl(t, e) {
        if (128 & t.state) throw Hn(Yl[ql]);
        return (
          $l(t, na(t, 0)),
          t.def.updateDirectives(function (t, n, r) {
            for (var o = [], i = 3; i < arguments.length; i++)
              o[i - 3] = arguments[i];
            var l = t.def.nodes[n];
            return (
              0 === e ? ta(t, l, r, o) : ea(t, l, r, o),
              16384 & l.flags && $l(t, na(t, n)),
              224 & l.flags ? Zn(t, l.nodeIndex).value : void 0
            );
          }, t)
        );
      }
      function Jl(t, e) {
        if (128 & t.state) throw Hn(Yl[ql]);
        return (
          $l(t, ra(t, 0)),
          t.def.updateRenderer(function (t, n, r) {
            for (var o = [], i = 3; i < arguments.length; i++)
              o[i - 3] = arguments[i];
            var l = t.def.nodes[n];
            return (
              0 === e ? ta(t, l, r, o) : ea(t, l, r, o),
              3 & l.flags && $l(t, ra(t, n)),
              224 & l.flags ? Zn(t, l.nodeIndex).value : void 0
            );
          }, t)
        );
      }
      function ta(t, e, n, r) {
        if (vl.apply(void 0, c([t, e, n], r))) {
          var o = 1 === n ? r[0] : r;
          if (16384 & e.flags) {
            for (var i = {}, l = 0; l < e.bindings.length; l++) {
              var a = e.bindings[l],
                u = o[l];
              8 & a.flags &&
                (i[
                  ((f = a.nonMinifiedName),
                  "ng-reflect-" +
                    f.replace(/[$@]/g, "_").replace(Fe, function () {
                      for (var t = [], e = 0; e < arguments.length; e++)
                        t[e] = arguments[e];
                      return "-" + t[1].toLowerCase();
                    }))
                ] = Ue(u));
            }
            var s = e.parent,
              h = Gn(t, s.nodeIndex).renderElement;
            if (s.element.name)
              for (var p in i)
                null != (u = i[p])
                  ? t.renderer.setAttribute(h, p, u)
                  : t.renderer.removeAttribute(h, p);
            else
              t.renderer.setValue(h, "bindings=" + JSON.stringify(i, null, 2));
          }
        }
        var f;
      }
      function ea(t, e, n, r) {
        yl.apply(void 0, c([t, e, n], r));
      }
      function na(t, e) {
        for (var n = e; n < t.def.nodes.length; n++) {
          var r = t.def.nodes[n];
          if (16384 & r.flags && r.bindings && r.bindings.length) return n;
        }
        return null;
      }
      function ra(t, e) {
        for (var n = e; n < t.def.nodes.length; n++) {
          var r = t.def.nodes[n];
          if (3 & r.flags && r.bindings && r.bindings.length) return n;
        }
        return null;
      }
      var oa = (function () {
        function t(t, e) {
          (this.view = t),
            (this.nodeIndex = e),
            null == e && (this.nodeIndex = e = 0),
            (this.nodeDef = t.def.nodes[e]);
          for (var n = this.nodeDef, r = t; n && 0 == (1 & n.flags); )
            n = n.parent;
          if (!n) for (; !n && r; ) (n = hr(r)), (r = r.parent);
          (this.elDef = n), (this.elView = r);
        }
        return (
          Object.defineProperty(t.prototype, "elOrCompView", {
            get: function () {
              return (
                Gn(this.elView, this.elDef.nodeIndex).componentView || this.view
              );
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "injector", {
            get: function () {
              return Kr(this.elView, this.elDef);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "component", {
            get: function () {
              return this.elOrCompView.component;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "context", {
            get: function () {
              return this.elOrCompView.context;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "providerTokens", {
            get: function () {
              var t = [];
              if (this.elDef)
                for (
                  var e = this.elDef.nodeIndex + 1;
                  e <= this.elDef.nodeIndex + this.elDef.childCount;
                  e++
                ) {
                  var n = this.elView.def.nodes[e];
                  20224 & n.flags && t.push(n.provider.token),
                    (e += n.childCount);
                }
              return t;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "references", {
            get: function () {
              var t = {};
              if (this.elDef) {
                ia(this.elView, this.elDef, t);
                for (
                  var e = this.elDef.nodeIndex + 1;
                  e <= this.elDef.nodeIndex + this.elDef.childCount;
                  e++
                ) {
                  var n = this.elView.def.nodes[e];
                  20224 & n.flags && ia(this.elView, n, t), (e += n.childCount);
                }
              }
              return t;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "componentRenderElement", {
            get: function () {
              var t = (function (t) {
                for (; t && !fr(t); ) t = t.parent;
                return t.parent ? Gn(t.parent, hr(t).nodeIndex) : null;
              })(this.elOrCompView);
              return t ? t.renderElement : void 0;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "renderNode", {
            get: function () {
              return 2 & this.nodeDef.flags
                ? pr(this.view, this.nodeDef)
                : pr(this.elView, this.elDef);
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.logError = function (t) {
            for (var e, n, r = [], o = 1; o < arguments.length; o++)
              r[o - 1] = arguments[o];
            2 & this.nodeDef.flags
              ? ((e = this.view.def), (n = this.nodeDef.nodeIndex))
              : ((e = this.elView.def), (n = this.elDef.nodeIndex));
            var i = (function (t, e) {
                for (var n = -1, r = 0; r <= e; r++)
                  3 & t.nodes[r].flags && n++;
                return n;
              })(e, n),
              l = -1;
            e.factory(function () {
              var e;
              return ++l === i ? (e = t.error).bind.apply(e, c([t], r)) : $n;
            }),
              l < i &&
                (t.error(
                  "Illegal state: the ViewDefinitionFactory did not call the logger!"
                ),
                t.error.apply(t, c(r)));
          }),
          t
        );
      })();
      function ia(t, e, n) {
        for (var r in e.references) n[r] = Ji(t, e, e.references[r]);
      }
      function la(t, e, n, r) {
        var o = ql,
          i = Zl,
          l = Ql;
        try {
          ql = t;
          var a = e.apply(n, r);
          return (Zl = i), (Ql = l), (ql = o), a;
        } catch (u) {
          if (ae(u) || !Zl) throw u;
          throw (function (t, e) {
            return (
              t instanceof Error || (t = new Error(t.toString())), Un(t, e), t
            );
          })(u, aa());
        }
      }
      function aa() {
        return Zl ? new oa(Zl, Ql) : null;
      }
      var ua = (function () {
          function t(t) {
            this.delegate = t;
          }
          return (
            (t.prototype.createRenderer = function (t, e) {
              return new sa(this.delegate.createRenderer(t, e));
            }),
            (t.prototype.begin = function () {
              this.delegate.begin && this.delegate.begin();
            }),
            (t.prototype.end = function () {
              this.delegate.end && this.delegate.end();
            }),
            (t.prototype.whenRenderingDone = function () {
              return this.delegate.whenRenderingDone
                ? this.delegate.whenRenderingDone()
                : Promise.resolve(null);
            }),
            t
          );
        })(),
        sa = (function () {
          function t(t) {
            (this.delegate = t),
              (this.debugContextFactory = aa),
              (this.data = this.delegate.data);
          }
          return (
            (t.prototype.createDebugContext = function (t) {
              return this.debugContextFactory(t);
            }),
            (t.prototype.destroyNode = function (t) {
              !(function (t) {
                Ni.delete(t.nativeNode);
              })(Di(t)),
                this.delegate.destroyNode && this.delegate.destroyNode(t);
            }),
            (t.prototype.destroy = function () {
              this.delegate.destroy();
            }),
            (t.prototype.createElement = function (t, e) {
              var n = this.delegate.createElement(t, e),
                r = this.createDebugContext(n);
              if (r) {
                var o = new Ri(n, null, r);
                (o.name = t), Mi(o);
              }
              return n;
            }),
            (t.prototype.createComment = function (t) {
              var e = this.delegate.createComment(t),
                n = this.createDebugContext(e);
              return n && Mi(new Pi(e, null, n)), e;
            }),
            (t.prototype.createText = function (t) {
              var e = this.delegate.createText(t),
                n = this.createDebugContext(e);
              return n && Mi(new Pi(e, null, n)), e;
            }),
            (t.prototype.appendChild = function (t, e) {
              var n = Di(t),
                r = Di(e);
              n && r && n instanceof Ri && n.addChild(r),
                this.delegate.appendChild(t, e);
            }),
            (t.prototype.insertBefore = function (t, e, n) {
              var r = Di(t),
                o = Di(e),
                i = Di(n);
              r && o && r instanceof Ri && r.insertBefore(i, o),
                this.delegate.insertBefore(t, e, n);
            }),
            (t.prototype.removeChild = function (t, e) {
              var n = Di(t),
                r = Di(e);
              n && r && n instanceof Ri && n.removeChild(r),
                this.delegate.removeChild(t, e);
            }),
            (t.prototype.selectRootElement = function (t, e) {
              var n = this.delegate.selectRootElement(t, e),
                r = aa();
              return r && Mi(new Ri(n, null, r)), n;
            }),
            (t.prototype.setAttribute = function (t, e, n, r) {
              var o = Di(t);
              o && o instanceof Ri && (o.attributes[r ? r + ":" + e : e] = n),
                this.delegate.setAttribute(t, e, n, r);
            }),
            (t.prototype.removeAttribute = function (t, e, n) {
              var r = Di(t);
              r &&
                r instanceof Ri &&
                (r.attributes[n ? n + ":" + e : e] = null),
                this.delegate.removeAttribute(t, e, n);
            }),
            (t.prototype.addClass = function (t, e) {
              var n = Di(t);
              n && n instanceof Ri && (n.classes[e] = !0),
                this.delegate.addClass(t, e);
            }),
            (t.prototype.removeClass = function (t, e) {
              var n = Di(t);
              n && n instanceof Ri && (n.classes[e] = !1),
                this.delegate.removeClass(t, e);
            }),
            (t.prototype.setStyle = function (t, e, n, r) {
              var o = Di(t);
              o && o instanceof Ri && (o.styles[e] = n),
                this.delegate.setStyle(t, e, n, r);
            }),
            (t.prototype.removeStyle = function (t, e, n) {
              var r = Di(t);
              r && r instanceof Ri && (r.styles[e] = null),
                this.delegate.removeStyle(t, e, n);
            }),
            (t.prototype.setProperty = function (t, e, n) {
              var r = Di(t);
              r && r instanceof Ri && (r.properties[e] = n),
                this.delegate.setProperty(t, e, n);
            }),
            (t.prototype.listen = function (t, e, n) {
              if ("string" != typeof t) {
                var r = Di(t);
                r && r.listeners.push(new Ii(e, n));
              }
              return this.delegate.listen(t, e, n);
            }),
            (t.prototype.parentNode = function (t) {
              return this.delegate.parentNode(t);
            }),
            (t.prototype.nextSibling = function (t) {
              return this.delegate.nextSibling(t);
            }),
            (t.prototype.setValue = function (t, e) {
              return this.delegate.setValue(t, e);
            }),
            t
          );
        })();
      function ca(t, e, n) {
        return new ha(t, e, n);
      }
      var ha = (function (t) {
          function e(e, n, r) {
            var o = t.call(this) || this;
            return (
              (o.moduleType = e),
              (o._bootstrapComponents = n),
              (o._ngModuleDefFactory = r),
              o
            );
          }
          return (
            o(e, t),
            (e.prototype.create = function (t) {
              !(function () {
                if (!Tl) {
                  Tl = !0;
                  var t = fe()
                    ? {
                        setCurrentNode: $l,
                        createRootView: Al,
                        createEmbeddedView: Pl,
                        createComponentView: Rl,
                        createNgModuleRef: Nl,
                        overrideProvider: Vl,
                        overrideComponentView: Ll,
                        clearOverrides: Fl,
                        checkAndUpdateView: Bl,
                        checkNoChangesView: Wl,
                        destroyView: Gl,
                        createDebugContext: function (t, e) {
                          return new oa(t, e);
                        },
                        handleEvent: Kl,
                        updateDirectives: Xl,
                        updateRenderer: Jl,
                      }
                    : {
                        setCurrentNode: function () {},
                        createRootView: kl,
                        createEmbeddedView: ul,
                        createComponentView: cl,
                        createNgModuleRef: no,
                        overrideProvider: $n,
                        overrideComponentView: $n,
                        clearOverrides: $n,
                        checkAndUpdateView: gl,
                        checkNoChangesView: dl,
                        destroyView: _l,
                        createDebugContext: function (t, e) {
                          return new oa(t, e);
                        },
                        handleEvent: function (t, e, n, r) {
                          return t.def.handleEvent(t, e, n, r);
                        },
                        updateDirectives: function (t, e) {
                          return t.def.updateDirectives(0 === e ? Hl : zl, t);
                        },
                        updateRenderer: function (t, e) {
                          return t.def.updateRenderer(0 === e ? Hl : zl, t);
                        },
                      };
                  (Yn.setCurrentNode = t.setCurrentNode),
                    (Yn.createRootView = t.createRootView),
                    (Yn.createEmbeddedView = t.createEmbeddedView),
                    (Yn.createComponentView = t.createComponentView),
                    (Yn.createNgModuleRef = t.createNgModuleRef),
                    (Yn.overrideProvider = t.overrideProvider),
                    (Yn.overrideComponentView = t.overrideComponentView),
                    (Yn.clearOverrides = t.clearOverrides),
                    (Yn.checkAndUpdateView = t.checkAndUpdateView),
                    (Yn.checkNoChangesView = t.checkNoChangesView),
                    (Yn.destroyView = t.destroyView),
                    (Yn.resolveDep = So),
                    (Yn.createDebugContext = t.createDebugContext),
                    (Yn.handleEvent = t.handleEvent),
                    (Yn.updateDirectives = t.updateDirectives),
                    (Yn.updateRenderer = t.updateRenderer),
                    (Yn.dirtyParentQueries = $i);
                }
              })();
              var e = (function (t) {
                var e = Array.from(t.providers),
                  n = Array.from(t.modules),
                  r = {};
                for (var o in t.providersByKey) r[o] = t.providersByKey[o];
                return {
                  factory: t.factory,
                  isRoot: t.isRoot,
                  providers: e,
                  modules: n,
                  providersByKey: r,
                };
              })(_r(this._ngModuleDefFactory));
              return Yn.createNgModuleRef(
                this.moduleType,
                t || Bt.NULL,
                this._bootstrapComponents,
                e
              );
            }),
            e
          );
        })(un),
        pa = (function () {
          return function () {};
        })(),
        fa = (function () {
          function t() {
            this.navbarCollapsed = !0;
          }
          return (
            Object.defineProperty(t.prototype, "showTestCases", {
              get: function () {
                return "true" === localStorage.getItem("showTestCases");
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(),
        da = (function () {
          return function () {};
        })(),
        ga = new Lt("Location Initialized"),
        va = (function () {
          return function () {};
        })(),
        ma = new Lt("appBaseHref"),
        ya = (function () {
          function t(t, n) {
            var r = this;
            (this._subject = new Po()),
              (this._urlChangeListeners = []),
              (this._platformStrategy = t);
            var o = this._platformStrategy.getBaseHref();
            (this._platformLocation = n),
              (this._baseHref = e.stripTrailingSlash(ba(o))),
              this._platformStrategy.onPopState(function (t) {
                r._subject.emit({
                  url: r.path(!0),
                  pop: !0,
                  state: t.state,
                  type: t.type,
                });
              });
          }
          var e;
          return (
            (e = t),
            (t.prototype.path = function (t) {
              return (
                void 0 === t && (t = !1),
                this.normalize(this._platformStrategy.path(t))
              );
            }),
            (t.prototype.getState = function () {
              return this._platformLocation.getState();
            }),
            (t.prototype.isCurrentPathEqualTo = function (t, n) {
              return (
                void 0 === n && (n = ""),
                this.path() == this.normalize(t + e.normalizeQueryParams(n))
              );
            }),
            (t.prototype.normalize = function (t) {
              return e.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, ba(t))
              );
            }),
            (t.prototype.prepareExternalUrl = function (t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }),
            (t.prototype.go = function (t, n, r) {
              void 0 === n && (n = ""),
                void 0 === r && (r = null),
                this._platformStrategy.pushState(r, "", t, n),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + e.normalizeQueryParams(n)),
                  r
                );
            }),
            (t.prototype.replaceState = function (t, n, r) {
              void 0 === n && (n = ""),
                void 0 === r && (r = null),
                this._platformStrategy.replaceState(r, "", t, n),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + e.normalizeQueryParams(n)),
                  r
                );
            }),
            (t.prototype.forward = function () {
              this._platformStrategy.forward();
            }),
            (t.prototype.back = function () {
              this._platformStrategy.back();
            }),
            (t.prototype.onUrlChange = function (t) {
              var e = this;
              this._urlChangeListeners.push(t),
                this.subscribe(function (t) {
                  e._notifyUrlChangeListeners(t.url, t.state);
                });
            }),
            (t.prototype._notifyUrlChangeListeners = function (t, e) {
              void 0 === t && (t = ""),
                this._urlChangeListeners.forEach(function (n) {
                  return n(t, e);
                });
            }),
            (t.prototype.subscribe = function (t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }),
            (t.normalizeQueryParams = function (t) {
              return t && "?" !== t[0] ? "?" + t : t;
            }),
            (t.joinWithSlash = function (t, e) {
              if (0 == t.length) return e;
              if (0 == e.length) return t;
              var n = 0;
              return (
                t.endsWith("/") && n++,
                e.startsWith("/") && n++,
                2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
              );
            }),
            (t.stripTrailingSlash = function (t) {
              var e = t.match(/#|\?|$/),
                n = (e && e.index) || t.length;
              return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
            }),
            t
          );
        })();
      function ba(t) {
        return t.replace(/\/index.html$/, "");
      }
      var _a = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (
              (r._platformLocation = e),
              (r._baseHref = ""),
              null != n && (r._baseHref = n),
              r
            );
          }
          return (
            o(e, t),
            (e.prototype.onPopState = function (t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }),
            (e.prototype.getBaseHref = function () {
              return this._baseHref;
            }),
            (e.prototype.path = function (t) {
              void 0 === t && (t = !1);
              var e = this._platformLocation.hash;
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e;
            }),
            (e.prototype.prepareExternalUrl = function (t) {
              var e = ya.joinWithSlash(this._baseHref, t);
              return e.length > 0 ? "#" + e : e;
            }),
            (e.prototype.pushState = function (t, e, n, r) {
              var o = this.prepareExternalUrl(n + ya.normalizeQueryParams(r));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, o);
            }),
            (e.prototype.replaceState = function (t, e, n, r) {
              var o = this.prepareExternalUrl(n + ya.normalizeQueryParams(r));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, o);
            }),
            (e.prototype.forward = function () {
              this._platformLocation.forward();
            }),
            (e.prototype.back = function () {
              this._platformLocation.back();
            }),
            e
          );
        })(va),
        wa = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            if (
              ((r._platformLocation = e),
              null == n && (n = r._platformLocation.getBaseHrefFromDOM()),
              null == n)
            )
              throw new Error(
                "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
              );
            return (r._baseHref = n), r;
          }
          return (
            o(e, t),
            (e.prototype.onPopState = function (t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }),
            (e.prototype.getBaseHref = function () {
              return this._baseHref;
            }),
            (e.prototype.prepareExternalUrl = function (t) {
              return ya.joinWithSlash(this._baseHref, t);
            }),
            (e.prototype.path = function (t) {
              void 0 === t && (t = !1);
              var e =
                  this._platformLocation.pathname +
                  ya.normalizeQueryParams(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? "" + e + n : e;
            }),
            (e.prototype.pushState = function (t, e, n, r) {
              var o = this.prepareExternalUrl(n + ya.normalizeQueryParams(r));
              this._platformLocation.pushState(t, e, o);
            }),
            (e.prototype.replaceState = function (t, e, n, r) {
              var o = this.prepareExternalUrl(n + ya.normalizeQueryParams(r));
              this._platformLocation.replaceState(t, e, o);
            }),
            (e.prototype.forward = function () {
              this._platformLocation.forward();
            }),
            (e.prototype.back = function () {
              this._platformLocation.back();
            }),
            e
          );
        })(va),
        Ca = void 0,
        Ea = [
          "en",
          [["a", "p"], ["AM", "PM"], Ca],
          [["AM", "PM"], Ca, Ca],
          [
            ["S", "M", "T", "W", "T", "F", "S"],
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          ],
          Ca,
          [
            ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
            [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
          ],
          Ca,
          [
            ["B", "A"],
            ["BC", "AD"],
            ["Before Christ", "Anno Domini"],
          ],
          0,
          [6, 0],
          ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
          ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
          ["{1}, {0}", Ca, "{1} 'at' {0}", Ca],
          [
            ".",
            ",",
            ";",
            "%",
            "+",
            "-",
            "E",
            "\xd7",
            "\u2030",
            "\u221e",
            "NaN",
            ":",
          ],
          ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
          "$",
          "US Dollar",
          {},
          function (t) {
            var e = Math.floor(Math.abs(t)),
              n = t.toString().replace(/^[^.]*\.?/, "").length;
            return 1 === e && 0 === n ? 1 : 5;
          },
        ],
        Sa = {},
        xa = (function (t) {
          return (
            (t[(t.Zero = 0)] = "Zero"),
            (t[(t.One = 1)] = "One"),
            (t[(t.Two = 2)] = "Two"),
            (t[(t.Few = 3)] = "Few"),
            (t[(t.Many = 4)] = "Many"),
            (t[(t.Other = 5)] = "Other"),
            t
          );
        })({}),
        Oa = new Lt("UseV4Plurals"),
        Ta = (function () {
          return function () {};
        })(),
        ka = (function (t) {
          function e(e, n) {
            var r = t.call(this) || this;
            return (r.locale = e), (r.deprecatedPluralFn = n), r;
          }
          return (
            o(e, t),
            (e.prototype.getPluralCategory = function (t, e) {
              switch (
                this.deprecatedPluralFn
                  ? this.deprecatedPluralFn(e || this.locale, t)
                  : (function (t) {
                      return (function (t) {
                        var e = t.toLowerCase().replace(/_/g, "-"),
                          n = Sa[e];
                        if (n) return n;
                        var r = e.split("-")[0];
                        if ((n = Sa[r])) return n;
                        if ("en" === r) return Ea;
                        throw new Error(
                          'Missing locale data for the locale "' + t + '".'
                        );
                      })(t)[18];
                    })(e || this.locale)(t)
              ) {
                case xa.Zero:
                  return "zero";
                case xa.One:
                  return "one";
                case xa.Two:
                  return "two";
                case xa.Few:
                  return "few";
                case xa.Many:
                  return "many";
                default:
                  return "other";
              }
            }),
            e
          );
        })(Ta),
        Aa = (function () {
          function t(t, e, n, r) {
            (this.$implicit = t),
              (this.ngForOf = e),
              (this.index = n),
              (this.count = r);
          }
          return (
            Object.defineProperty(t.prototype, "first", {
              get: function () {
                return 0 === this.index;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "last", {
              get: function () {
                return this.index === this.count - 1;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "even", {
              get: function () {
                return this.index % 2 == 0;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "odd", {
              get: function () {
                return !this.even;
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(),
        Ia = (function () {
          function t(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          return (
            Object.defineProperty(t.prototype, "ngForOf", {
              set: function (t) {
                (this._ngForOf = t), (this._ngForOfDirty = !0);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngForTrackBy", {
              get: function () {
                return this._trackByFn;
              },
              set: function (t) {
                fe() &&
                  null != t &&
                  "function" != typeof t &&
                  console &&
                  console.warn &&
                  console.warn(
                    "trackBy must be a function, but received " +
                      JSON.stringify(t) +
                      ". See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information."
                  ),
                  (this._trackByFn = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngForTemplate", {
              set: function (t) {
                t && (this._template = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.ngDoCheck = function () {
              if (this._ngForOfDirty) {
                this._ngForOfDirty = !1;
                var t = this._ngForOf;
                if (!this._differ && t)
                  try {
                    this._differ = this._differs
                      .find(t)
                      .create(this.ngForTrackBy);
                  } catch (r) {
                    throw new Error(
                      "Cannot find a differ supporting object '" +
                        t +
                        "' of type '" +
                        ((e = t).name || typeof e) +
                        "'. NgFor only supports binding to Iterables such as Arrays."
                    );
                  }
              }
              var e;
              if (this._differ) {
                var n = this._differ.diff(this._ngForOf);
                n && this._applyChanges(n);
              }
            }),
            (t.prototype._applyChanges = function (t) {
              var e = this,
                n = [];
              t.forEachOperation(function (t, r, o) {
                if (null == t.previousIndex) {
                  var i = e._viewContainer.createEmbeddedView(
                      e._template,
                      new Aa(null, e._ngForOf, -1, -1),
                      o
                    ),
                    l = new Pa(t, i);
                  n.push(l);
                } else null == o ? e._viewContainer.remove(r) : ((i = e._viewContainer.get(r)), e._viewContainer.move(i, o), (l = new Pa(t, i)), n.push(l));
              });
              for (var r = 0; r < n.length; r++)
                this._perViewChange(n[r].view, n[r].record);
              r = 0;
              for (var o = this._viewContainer.length; r < o; r++) {
                var i = this._viewContainer.get(r);
                (i.context.index = r),
                  (i.context.count = o),
                  (i.context.ngForOf = this._ngForOf);
              }
              t.forEachIdentityChange(function (t) {
                e._viewContainer.get(t.currentIndex).context.$implicit = t.item;
              });
            }),
            (t.prototype._perViewChange = function (t, e) {
              t.context.$implicit = e.item;
            }),
            (t.ngTemplateContextGuard = function (t, e) {
              return !0;
            }),
            t
          );
        })(),
        Pa = (function () {
          return function (t, e) {
            (this.record = t), (this.view = e);
          };
        })(),
        Ra = (function () {
          function t(t, e) {
            (this._viewContainer = t),
              (this._context = new Na()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          return (
            Object.defineProperty(t.prototype, "ngIf", {
              set: function (t) {
                (this._context.$implicit = this._context.ngIf = t),
                  this._updateView();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngIfThen", {
              set: function (t) {
                Da("ngIfThen", t),
                  (this._thenTemplateRef = t),
                  (this._thenViewRef = null),
                  this._updateView();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "ngIfElse", {
              set: function (t) {
                Da("ngIfElse", t),
                  (this._elseTemplateRef = t),
                  (this._elseViewRef = null),
                  this._updateView();
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype._updateView = function () {
              this._context.$implicit
                ? this._thenViewRef ||
                  (this._viewContainer.clear(),
                  (this._elseViewRef = null),
                  this._thenTemplateRef &&
                    (this._thenViewRef = this._viewContainer.createEmbeddedView(
                      this._thenTemplateRef,
                      this._context
                    )))
                : this._elseViewRef ||
                  (this._viewContainer.clear(),
                  (this._thenViewRef = null),
                  this._elseTemplateRef &&
                    (this._elseViewRef = this._viewContainer.createEmbeddedView(
                      this._elseTemplateRef,
                      this._context
                    )));
            }),
            (t.ngTemplateGuard_ngIf = function (t, e) {
              return !0;
            }),
            t
          );
        })(),
        Na = (function () {
          return function () {
            (this.$implicit = null), (this.ngIf = null);
          };
        })();
      function Da(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            t + " must be a TemplateRef, but received '" + kt(e) + "'."
          );
      }
      var Ma = (function () {
          function t() {}
          return (
            (t.prototype.transform = function (t) {
              return JSON.stringify(t, null, 2);
            }),
            t
          );
        })(),
        ja = (function () {
          return function () {};
        })(),
        Va = new Lt("DocumentToken"),
        La = "browser",
        Fa = "server",
        Ua = (function () {
          function t() {}
          return (
            (t.ngInjectableDef = xt({
              providedIn: "root",
              factory: function () {
                return new Ha(Vt(Va), window, Vt(ce));
              },
            })),
            t
          );
        })(),
        Ha = (function () {
          function t(t, e, n) {
            (this.document = t),
              (this.window = e),
              (this.errorHandler = n),
              (this.offset = function () {
                return [0, 0];
              });
          }
          return (
            (t.prototype.setOffset = function (t) {
              this.offset = Array.isArray(t)
                ? function () {
                    return t;
                  }
                : t;
            }),
            (t.prototype.getScrollPosition = function () {
              return this.supportScrollRestoration()
                ? [this.window.scrollX, this.window.scrollY]
                : [0, 0];
            }),
            (t.prototype.scrollToPosition = function (t) {
              this.supportScrollRestoration() &&
                this.window.scrollTo(t[0], t[1]);
            }),
            (t.prototype.scrollToAnchor = function (t) {
              if (this.supportScrollRestoration()) {
                t =
                  this.window.CSS && this.window.CSS.escape
                    ? this.window.CSS.escape(t)
                    : t.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
                try {
                  var e = this.document.querySelector("#" + t);
                  if (e) return void this.scrollToElement(e);
                  var n = this.document.querySelector("[name='" + t + "']");
                  if (n) return void this.scrollToElement(n);
                } catch (r) {
                  this.errorHandler.handleError(r);
                }
              }
            }),
            (t.prototype.setHistoryScrollRestoration = function (t) {
              if (this.supportScrollRestoration()) {
                var e = this.window.history;
                e && e.scrollRestoration && (e.scrollRestoration = t);
              }
            }),
            (t.prototype.scrollToElement = function (t) {
              var e = t.getBoundingClientRect(),
                n = e.left + this.window.pageXOffset,
                r = e.top + this.window.pageYOffset,
                o = this.offset();
              this.window.scrollTo(n - o[0], r - o[1]);
            }),
            (t.prototype.supportScrollRestoration = function () {
              try {
                return !!this.window && !!this.window.scrollTo;
              } catch (t) {
                return !1;
              }
            }),
            t
          );
        })(),
        za = new A(function (t) {
          return t.complete();
        });
      function Ba(t) {
        return t
          ? (function (t) {
              return new A(function (e) {
                return t.schedule(function () {
                  return e.complete();
                });
              });
            })(t)
          : za;
      }
      function Wa(t) {
        var e = new A(function (e) {
          e.next(t), e.complete();
        });
        return (e._isScalar = !0), (e.value = t), e;
      }
      function Ga() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var n = t[t.length - 1];
        switch ((V(n) ? t.pop() : (n = void 0), t.length)) {
          case 0:
            return Ba(n);
          case 1:
            return n ? J(t, n) : Wa(t[0]);
          default:
            return J(t, n);
        }
      }
      var qa = (function (t) {
        function e(e) {
          var n = t.call(this) || this;
          return (n._value = e), n;
        }
        return (
          o(e, t),
          Object.defineProperty(e.prototype, "value", {
            get: function () {
              return this.getValue();
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype._subscribe = function (e) {
            var n = t.prototype._subscribe.call(this, e);
            return n && !n.closed && e.next(this._value), n;
          }),
          (e.prototype.getValue = function () {
            if (this.hasError) throw this.thrownError;
            if (this.closed) throw new R();
            return this._value;
          }),
          (e.prototype.next = function (e) {
            t.prototype.next.call(this, (this._value = e));
          }),
          e
        );
      })(M);
      function Za() {
        return (
          Error.call(this),
          (this.message = "no elements in sequence"),
          (this.name = "EmptyError"),
          this
        );
      }
      Za.prototype = Object.create(Error.prototype);
      var Qa = Za,
        Ya = {},
        $a = (function () {
          function t(t) {
            this.resultSelector = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new Ka(t, this.resultSelector));
            }),
            t
          );
        })(),
        Ka = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (
              (r.resultSelector = n),
              (r.active = 0),
              (r.values = []),
              (r.observables = []),
              r
            );
          }
          return (
            o(e, t),
            (e.prototype._next = function (t) {
              this.values.push(Ya), this.observables.push(t);
            }),
            (e.prototype._complete = function () {
              var t = this.observables,
                e = t.length;
              if (0 === e) this.destination.complete();
              else {
                (this.active = e), (this.toRespond = e);
                for (var n = 0; n < e; n++) {
                  var r = t[n];
                  this.add(Q(this, r, r, n));
                }
              }
            }),
            (e.prototype.notifyComplete = function (t) {
              0 == (this.active -= 1) && this.destination.complete();
            }),
            (e.prototype.notifyNext = function (t, e, n, r, o) {
              var i = this.values,
                l = this.toRespond
                  ? i[n] === Ya
                    ? --this.toRespond
                    : this.toRespond
                  : 0;
              (i[n] = e),
                0 === l &&
                  (this.resultSelector
                    ? this._tryResultSelector(i)
                    : this.destination.next(i.slice()));
            }),
            (e.prototype._tryResultSelector = function (t) {
              var e;
              try {
                e = this.resultSelector.apply(this, t);
              } catch (n) {
                return void this.destination.error(n);
              }
              this.destination.next(e);
            }),
            e
          );
        })(Y);
      function Xa(t) {
        return new A(function (e) {
          var n;
          try {
            n = t();
          } catch (r) {
            return void e.error(r);
          }
          return (n ? tt(n) : Ba()).subscribe(e);
        });
      }
      function Ja() {
        return it(1);
      }
      function tu(t, e) {
        return function (n) {
          return n.lift(new eu(t, e));
        };
      }
      var eu = (function () {
          function t(t, e) {
            (this.predicate = t), (this.thisArg = e);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new nu(t, this.predicate, this.thisArg));
            }),
            t
          );
        })(),
        nu = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e) || this;
            return (o.predicate = n), (o.thisArg = r), (o.count = 0), o;
          }
          return (
            o(e, t),
            (e.prototype._next = function (t) {
              var e;
              try {
                e = this.predicate.call(this.thisArg, t, this.count++);
              } catch (n) {
                return void this.destination.error(n);
              }
              e && this.destination.next(t);
            }),
            e
          );
        })(E);
      function ru() {
        return (
          Error.call(this),
          (this.message = "argument out of range"),
          (this.name = "ArgumentOutOfRangeError"),
          this
        );
      }
      ru.prototype = Object.create(Error.prototype);
      var ou = ru;
      function iu(t) {
        return function (e) {
          return 0 === t ? Ba() : e.lift(new lu(t));
        };
      }
      var lu = (function () {
          function t(t) {
            if (((this.total = t), this.total < 0)) throw new ou();
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new au(t, this.total));
            }),
            t
          );
        })(),
        au = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.total = n), (r.ring = new Array()), (r.count = 0), r;
          }
          return (
            o(e, t),
            (e.prototype._next = function (t) {
              var e = this.ring,
                n = this.total,
                r = this.count++;
              e.length < n ? e.push(t) : (e[r % n] = t);
            }),
            (e.prototype._complete = function () {
              var t = this.destination,
                e = this.count;
              if (e > 0)
                for (
                  var n = this.count >= this.total ? this.total : this.count,
                    r = this.ring,
                    o = 0;
                  o < n;
                  o++
                ) {
                  var i = e++ % n;
                  t.next(r[i]);
                }
              t.complete();
            }),
            e
          );
        })(E);
      function uu(t, e, n) {
        return function (r) {
          return r.lift(new su(t, e, n));
        };
      }
      var su = (function () {
          function t(t, e, n) {
            (this.nextOrObserver = t), (this.error = e), (this.complete = n);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new cu(t, this.nextOrObserver, this.error, this.complete)
              );
            }),
            t
          );
        })(),
        cu = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e) || this;
            return (
              (i._tapNext = O),
              (i._tapError = O),
              (i._tapComplete = O),
              (i._tapError = r || O),
              (i._tapComplete = o || O),
              f(n)
                ? ((i._context = i), (i._tapNext = n))
                : n &&
                  ((i._context = n),
                  (i._tapNext = n.next || O),
                  (i._tapError = n.error || O),
                  (i._tapComplete = n.complete || O)),
              i
            );
          }
          return (
            o(e, t),
            (e.prototype._next = function (t) {
              try {
                this._tapNext.call(this._context, t);
              } catch (e) {
                return void this.destination.error(e);
              }
              this.destination.next(t);
            }),
            (e.prototype._error = function (t) {
              try {
                this._tapError.call(this._context, t);
              } catch (t) {
                return void this.destination.error(t);
              }
              this.destination.error(t);
            }),
            (e.prototype._complete = function () {
              try {
                this._tapComplete.call(this._context);
              } catch (t) {
                return void this.destination.error(t);
              }
              return this.destination.complete();
            }),
            e
          );
        })(E),
        hu = function (t) {
          return (
            void 0 === t && (t = pu),
            uu({
              hasValue: !1,
              next: function () {
                this.hasValue = !0;
              },
              complete: function () {
                if (!this.hasValue) throw t();
              },
            })
          );
        };
      function pu() {
        return new Qa();
      }
      function fu(t) {
        return (
          void 0 === t && (t = null),
          function (e) {
            return e.lift(new du(t));
          }
        );
      }
      var du = (function () {
          function t(t) {
            this.defaultValue = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new gu(t, this.defaultValue));
            }),
            t
          );
        })(),
        gu = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.defaultValue = n), (r.isEmpty = !0), r;
          }
          return (
            o(e, t),
            (e.prototype._next = function (t) {
              (this.isEmpty = !1), this.destination.next(t);
            }),
            (e.prototype._complete = function () {
              this.isEmpty && this.destination.next(this.defaultValue),
                this.destination.complete();
            }),
            e
          );
        })(E);
      function vu(t, e) {
        var n = arguments.length >= 2;
        return function (r) {
          return r.pipe(
            t
              ? tu(function (e, n) {
                  return t(e, n, r);
                })
              : ot,
            iu(1),
            n
              ? fu(e)
              : hu(function () {
                  return new Qa();
                })
          );
        };
      }
      function mu(t) {
        return function (e) {
          var n = new yu(t),
            r = e.lift(n);
          return (n.caught = r);
        };
      }
      var yu = (function () {
          function t(t) {
            this.selector = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new bu(t, this.selector, this.caught));
            }),
            t
          );
        })(),
        bu = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e) || this;
            return (o.selector = n), (o.caught = r), o;
          }
          return (
            o(e, t),
            (e.prototype.error = function (e) {
              if (!this.isStopped) {
                var n = void 0;
                try {
                  n = this.selector(e, this.caught);
                } catch (o) {
                  return void t.prototype.error.call(this, o);
                }
                this._unsubscribeAndRecycle();
                var r = new L(this, void 0, void 0);
                this.add(r), Q(this, n, void 0, void 0, r);
              }
            }),
            e
          );
        })(Y);
      function _u(t) {
        return function (e) {
          return 0 === t ? Ba() : e.lift(new wu(t));
        };
      }
      var wu = (function () {
          function t(t) {
            if (((this.total = t), this.total < 0)) throw new ou();
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new Cu(t, this.total));
            }),
            t
          );
        })(),
        Cu = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.total = n), (r.count = 0), r;
          }
          return (
            o(e, t),
            (e.prototype._next = function (t) {
              var e = this.total,
                n = ++this.count;
              n <= e &&
                (this.destination.next(t),
                n === e && (this.destination.complete(), this.unsubscribe()));
            }),
            e
          );
        })(E);
      function Eu(t, e) {
        var n = arguments.length >= 2;
        return function (r) {
          return r.pipe(
            t
              ? tu(function (e, n) {
                  return t(e, n, r);
                })
              : ot,
            _u(1),
            n
              ? fu(e)
              : hu(function () {
                  return new Qa();
                })
          );
        };
      }
      var Su = (function () {
          function t(t, e, n) {
            (this.predicate = t), (this.thisArg = e), (this.source = n);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new xu(t, this.predicate, this.thisArg, this.source)
              );
            }),
            t
          );
        })(),
        xu = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e) || this;
            return (
              (i.predicate = n),
              (i.thisArg = r),
              (i.source = o),
              (i.index = 0),
              (i.thisArg = r || i),
              i
            );
          }
          return (
            o(e, t),
            (e.prototype.notifyComplete = function (t) {
              this.destination.next(t), this.destination.complete();
            }),
            (e.prototype._next = function (t) {
              var e = !1;
              try {
                e = this.predicate.call(
                  this.thisArg,
                  t,
                  this.index++,
                  this.source
                );
              } catch (n) {
                return void this.destination.error(n);
              }
              e || this.notifyComplete(!1);
            }),
            (e.prototype._complete = function () {
              this.notifyComplete(!0);
            }),
            e
          );
        })(E);
      function Ou(t, e) {
        return "function" == typeof e
          ? function (n) {
              return n.pipe(
                Ou(function (n, r) {
                  return tt(t(n, r)).pipe(
                    $(function (t, o) {
                      return e(n, t, r, o);
                    })
                  );
                })
              );
            }
          : function (e) {
              return e.lift(new Tu(t));
            };
      }
      var Tu = (function () {
          function t(t) {
            this.project = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new ku(t, this.project));
            }),
            t
          );
        })(),
        ku = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return (r.project = n), (r.index = 0), r;
          }
          return (
            o(e, t),
            (e.prototype._next = function (t) {
              var e,
                n = this.index++;
              try {
                e = this.project(t, n);
              } catch (r) {
                return void this.destination.error(r);
              }
              this._innerSub(e, t, n);
            }),
            (e.prototype._innerSub = function (t, e, n) {
              var r = this.innerSubscription;
              r && r.unsubscribe();
              var o = new L(this, void 0, void 0);
              this.destination.add(o),
                (this.innerSubscription = Q(this, t, e, n, o));
            }),
            (e.prototype._complete = function () {
              var e = this.innerSubscription;
              (e && !e.closed) || t.prototype._complete.call(this),
                this.unsubscribe();
            }),
            (e.prototype._unsubscribe = function () {
              this.innerSubscription = null;
            }),
            (e.prototype.notifyComplete = function (e) {
              this.destination.remove(e),
                (this.innerSubscription = null),
                this.isStopped && t.prototype._complete.call(this);
            }),
            (e.prototype.notifyNext = function (t, e, n, r, o) {
              this.destination.next(e);
            }),
            e
          );
        })(Y);
      function Au(t, e) {
        var n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (r) {
            return r.lift(new Iu(t, e, n));
          }
        );
      }
      var Iu = (function () {
          function t(t, e, n) {
            void 0 === n && (n = !1),
              (this.accumulator = t),
              (this.seed = e),
              (this.hasSeed = n);
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(
                new Pu(t, this.accumulator, this.seed, this.hasSeed)
              );
            }),
            t
          );
        })(),
        Pu = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e) || this;
            return (
              (i.accumulator = n),
              (i._seed = r),
              (i.hasSeed = o),
              (i.index = 0),
              i
            );
          }
          return (
            o(e, t),
            Object.defineProperty(e.prototype, "seed", {
              get: function () {
                return this._seed;
              },
              set: function (t) {
                (this.hasSeed = !0), (this._seed = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype._next = function (t) {
              if (this.hasSeed) return this._tryNext(t);
              (this.seed = t), this.destination.next(t);
            }),
            (e.prototype._tryNext = function (t) {
              var e,
                n = this.index++;
              try {
                e = this.accumulator(this.seed, t, n);
              } catch (r) {
                this.destination.error(r);
              }
              (this.seed = e), this.destination.next(e);
            }),
            e
          );
        })(E);
      function Ru(t, e) {
        return et(t, e, 1);
      }
      var Nu = (function () {
          function t(t) {
            this.callback = t;
          }
          return (
            (t.prototype.call = function (t, e) {
              return e.subscribe(new Du(t, this.callback));
            }),
            t
          );
        })(),
        Du = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            return r.add(new v(n)), r;
          }
          return o(e, t), e;
        })(E),
        Mu = null;
      function ju() {
        return Mu;
      }
      var Vu,
        Lu = (function (t) {
          function e() {
            var e = t.call(this) || this;
            (e._animationPrefix = null), (e._transitionEnd = null);
            try {
              var n = e.createElement("div", document);
              if (null != e.getStyle(n, "animationName"))
                e._animationPrefix = "";
              else
                for (
                  var r = ["Webkit", "Moz", "O", "ms"], o = 0;
                  o < r.length;
                  o++
                )
                  if (null != e.getStyle(n, r[o] + "AnimationName")) {
                    e._animationPrefix = "-" + r[o].toLowerCase() + "-";
                    break;
                  }
              var i = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend",
              };
              Object.keys(i).forEach(function (t) {
                null != e.getStyle(n, t) && (e._transitionEnd = i[t]);
              });
            } catch (l) {
              (e._animationPrefix = null), (e._transitionEnd = null);
            }
            return e;
          }
          return (
            o(e, t),
            (e.prototype.getDistributedNodes = function (t) {
              return t.getDistributedNodes();
            }),
            (e.prototype.resolveAndSetHref = function (t, e, n) {
              t.href = null == n ? e : e + "/../" + n;
            }),
            (e.prototype.supportsDOMEvents = function () {
              return !0;
            }),
            (e.prototype.supportsNativeShadowDOM = function () {
              return "function" == typeof document.body.createShadowRoot;
            }),
            (e.prototype.getAnimationPrefix = function () {
              return this._animationPrefix ? this._animationPrefix : "";
            }),
            (e.prototype.getTransitionEnd = function () {
              return this._transitionEnd ? this._transitionEnd : "";
            }),
            (e.prototype.supportsAnimation = function () {
              return (
                null != this._animationPrefix && null != this._transitionEnd
              );
            }),
            e
          );
        })(
          (function () {
            function t() {
              this.resourceLoaderType = null;
            }
            return (
              Object.defineProperty(t.prototype, "attrToPropMap", {
                get: function () {
                  return this._attrToPropMap;
                },
                set: function (t) {
                  this._attrToPropMap = t;
                },
                enumerable: !0,
                configurable: !0,
              }),
              t
            );
          })()
        ),
        Fu = {
          class: "className",
          innerHtml: "innerHTML",
          readonly: "readOnly",
          tabindex: "tabIndex",
        },
        Uu = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Hu = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        zu = (function () {
          if (Dt.Node)
            return (
              Dt.Node.prototype.contains ||
              function (t) {
                return !!(16 & this.compareDocumentPosition(t));
              }
            );
        })(),
        Bu = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            o(e, t),
            (e.prototype.parse = function (t) {
              throw new Error("parse not implemented");
            }),
            (e.makeCurrent = function () {
              var t;
              (t = new e()), Mu || (Mu = t);
            }),
            (e.prototype.hasProperty = function (t, e) {
              return e in t;
            }),
            (e.prototype.setProperty = function (t, e, n) {
              t[e] = n;
            }),
            (e.prototype.getProperty = function (t, e) {
              return t[e];
            }),
            (e.prototype.invoke = function (t, e, n) {
              var r;
              (r = t)[e].apply(r, c(n));
            }),
            (e.prototype.logError = function (t) {
              window.console &&
                (console.error ? console.error(t) : console.log(t));
            }),
            (e.prototype.log = function (t) {
              window.console && window.console.log && window.console.log(t);
            }),
            (e.prototype.logGroup = function (t) {
              window.console && window.console.group && window.console.group(t);
            }),
            (e.prototype.logGroupEnd = function () {
              window.console &&
                window.console.groupEnd &&
                window.console.groupEnd();
            }),
            Object.defineProperty(e.prototype, "attrToPropMap", {
              get: function () {
                return Fu;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.contains = function (t, e) {
              return zu.call(t, e);
            }),
            (e.prototype.querySelector = function (t, e) {
              return t.querySelector(e);
            }),
            (e.prototype.querySelectorAll = function (t, e) {
              return t.querySelectorAll(e);
            }),
            (e.prototype.on = function (t, e, n) {
              t.addEventListener(e, n, !1);
            }),
            (e.prototype.onAndCancel = function (t, e, n) {
              return (
                t.addEventListener(e, n, !1),
                function () {
                  t.removeEventListener(e, n, !1);
                }
              );
            }),
            (e.prototype.dispatchEvent = function (t, e) {
              t.dispatchEvent(e);
            }),
            (e.prototype.createMouseEvent = function (t) {
              var e = this.getDefaultDocument().createEvent("MouseEvent");
              return e.initEvent(t, !0, !0), e;
            }),
            (e.prototype.createEvent = function (t) {
              var e = this.getDefaultDocument().createEvent("Event");
              return e.initEvent(t, !0, !0), e;
            }),
            (e.prototype.preventDefault = function (t) {
              t.preventDefault(), (t.returnValue = !1);
            }),
            (e.prototype.isPrevented = function (t) {
              return (
                t.defaultPrevented || (null != t.returnValue && !t.returnValue)
              );
            }),
            (e.prototype.getInnerHTML = function (t) {
              return t.innerHTML;
            }),
            (e.prototype.getTemplateContent = function (t) {
              return "content" in t && this.isTemplateElement(t)
                ? t.content
                : null;
            }),
            (e.prototype.getOuterHTML = function (t) {
              return t.outerHTML;
            }),
            (e.prototype.nodeName = function (t) {
              return t.nodeName;
            }),
            (e.prototype.nodeValue = function (t) {
              return t.nodeValue;
            }),
            (e.prototype.type = function (t) {
              return t.type;
            }),
            (e.prototype.content = function (t) {
              return this.hasProperty(t, "content") ? t.content : t;
            }),
            (e.prototype.firstChild = function (t) {
              return t.firstChild;
            }),
            (e.prototype.nextSibling = function (t) {
              return t.nextSibling;
            }),
            (e.prototype.parentElement = function (t) {
              return t.parentNode;
            }),
            (e.prototype.childNodes = function (t) {
              return t.childNodes;
            }),
            (e.prototype.childNodesAsList = function (t) {
              for (
                var e = t.childNodes, n = new Array(e.length), r = 0;
                r < e.length;
                r++
              )
                n[r] = e[r];
              return n;
            }),
            (e.prototype.clearNodes = function (t) {
              for (; t.firstChild; ) t.removeChild(t.firstChild);
            }),
            (e.prototype.appendChild = function (t, e) {
              t.appendChild(e);
            }),
            (e.prototype.removeChild = function (t, e) {
              t.removeChild(e);
            }),
            (e.prototype.replaceChild = function (t, e, n) {
              t.replaceChild(e, n);
            }),
            (e.prototype.remove = function (t) {
              return t.parentNode && t.parentNode.removeChild(t), t;
            }),
            (e.prototype.insertBefore = function (t, e, n) {
              t.insertBefore(n, e);
            }),
            (e.prototype.insertAllBefore = function (t, e, n) {
              n.forEach(function (n) {
                return t.insertBefore(n, e);
              });
            }),
            (e.prototype.insertAfter = function (t, e, n) {
              t.insertBefore(n, e.nextSibling);
            }),
            (e.prototype.setInnerHTML = function (t, e) {
              t.innerHTML = e;
            }),
            (e.prototype.getText = function (t) {
              return t.textContent;
            }),
            (e.prototype.setText = function (t, e) {
              t.textContent = e;
            }),
            (e.prototype.getValue = function (t) {
              return t.value;
            }),
            (e.prototype.setValue = function (t, e) {
              t.value = e;
            }),
            (e.prototype.getChecked = function (t) {
              return t.checked;
            }),
            (e.prototype.setChecked = function (t, e) {
              t.checked = e;
            }),
            (e.prototype.createComment = function (t) {
              return this.getDefaultDocument().createComment(t);
            }),
            (e.prototype.createTemplate = function (t) {
              var e = this.getDefaultDocument().createElement("template");
              return (e.innerHTML = t), e;
            }),
            (e.prototype.createElement = function (t, e) {
              return (e = e || this.getDefaultDocument()).createElement(t);
            }),
            (e.prototype.createElementNS = function (t, e, n) {
              return (n = n || this.getDefaultDocument()).createElementNS(t, e);
            }),
            (e.prototype.createTextNode = function (t, e) {
              return (e = e || this.getDefaultDocument()).createTextNode(t);
            }),
            (e.prototype.createScriptTag = function (t, e, n) {
              var r = (n = n || this.getDefaultDocument()).createElement(
                "SCRIPT"
              );
              return r.setAttribute(t, e), r;
            }),
            (e.prototype.createStyleElement = function (t, e) {
              var n = (e = e || this.getDefaultDocument()).createElement(
                "style"
              );
              return this.appendChild(n, this.createTextNode(t, e)), n;
            }),
            (e.prototype.createShadowRoot = function (t) {
              return t.createShadowRoot();
            }),
            (e.prototype.getShadowRoot = function (t) {
              return t.shadowRoot;
            }),
            (e.prototype.getHost = function (t) {
              return t.host;
            }),
            (e.prototype.clone = function (t) {
              return t.cloneNode(!0);
            }),
            (e.prototype.getElementsByClassName = function (t, e) {
              return t.getElementsByClassName(e);
            }),
            (e.prototype.getElementsByTagName = function (t, e) {
              return t.getElementsByTagName(e);
            }),
            (e.prototype.classList = function (t) {
              return Array.prototype.slice.call(t.classList, 0);
            }),
            (e.prototype.addClass = function (t, e) {
              t.classList.add(e);
            }),
            (e.prototype.removeClass = function (t, e) {
              t.classList.remove(e);
            }),
            (e.prototype.hasClass = function (t, e) {
              return t.classList.contains(e);
            }),
            (e.prototype.setStyle = function (t, e, n) {
              t.style[e] = n;
            }),
            (e.prototype.removeStyle = function (t, e) {
              t.style[e] = "";
            }),
            (e.prototype.getStyle = function (t, e) {
              return t.style[e];
            }),
            (e.prototype.hasStyle = function (t, e, n) {
              var r = this.getStyle(t, e) || "";
              return n ? r == n : r.length > 0;
            }),
            (e.prototype.tagName = function (t) {
              return t.tagName;
            }),
            (e.prototype.attributeMap = function (t) {
              for (
                var e = new Map(), n = t.attributes, r = 0;
                r < n.length;
                r++
              ) {
                var o = n.item(r);
                e.set(o.name, o.value);
              }
              return e;
            }),
            (e.prototype.hasAttribute = function (t, e) {
              return t.hasAttribute(e);
            }),
            (e.prototype.hasAttributeNS = function (t, e, n) {
              return t.hasAttributeNS(e, n);
            }),
            (e.prototype.getAttribute = function (t, e) {
              return t.getAttribute(e);
            }),
            (e.prototype.getAttributeNS = function (t, e, n) {
              return t.getAttributeNS(e, n);
            }),
            (e.prototype.setAttribute = function (t, e, n) {
              t.setAttribute(e, n);
            }),
            (e.prototype.setAttributeNS = function (t, e, n, r) {
              t.setAttributeNS(e, n, r);
            }),
            (e.prototype.removeAttribute = function (t, e) {
              t.removeAttribute(e);
            }),
            (e.prototype.removeAttributeNS = function (t, e, n) {
              t.removeAttributeNS(e, n);
            }),
            (e.prototype.templateAwareRoot = function (t) {
              return this.isTemplateElement(t) ? this.content(t) : t;
            }),
            (e.prototype.createHtmlDocument = function () {
              return document.implementation.createHTMLDocument("fakeTitle");
            }),
            (e.prototype.getDefaultDocument = function () {
              return document;
            }),
            (e.prototype.getBoundingClientRect = function (t) {
              try {
                return t.getBoundingClientRect();
              } catch (e) {
                return {
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  width: 0,
                  height: 0,
                };
              }
            }),
            (e.prototype.getTitle = function (t) {
              return t.title;
            }),
            (e.prototype.setTitle = function (t, e) {
              t.title = e || "";
            }),
            (e.prototype.elementMatches = function (t, e) {
              return (
                !!this.isElementNode(t) &&
                ((t.matches && t.matches(e)) ||
                  (t.msMatchesSelector && t.msMatchesSelector(e)) ||
                  (t.webkitMatchesSelector && t.webkitMatchesSelector(e)))
              );
            }),
            (e.prototype.isTemplateElement = function (t) {
              return this.isElementNode(t) && "TEMPLATE" === t.nodeName;
            }),
            (e.prototype.isTextNode = function (t) {
              return t.nodeType === Node.TEXT_NODE;
            }),
            (e.prototype.isCommentNode = function (t) {
              return t.nodeType === Node.COMMENT_NODE;
            }),
            (e.prototype.isElementNode = function (t) {
              return t.nodeType === Node.ELEMENT_NODE;
            }),
            (e.prototype.hasShadowRoot = function (t) {
              return null != t.shadowRoot && t instanceof HTMLElement;
            }),
            (e.prototype.isShadowRoot = function (t) {
              return t instanceof DocumentFragment;
            }),
            (e.prototype.importIntoDoc = function (t) {
              return document.importNode(this.templateAwareRoot(t), !0);
            }),
            (e.prototype.adoptNode = function (t) {
              return document.adoptNode(t);
            }),
            (e.prototype.getHref = function (t) {
              return t.getAttribute("href");
            }),
            (e.prototype.getEventKey = function (t) {
              var e = t.key;
              if (null == e) {
                if (null == (e = t.keyIdentifier)) return "Unidentified";
                e.startsWith("U+") &&
                  ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                  3 === t.location && Hu.hasOwnProperty(e) && (e = Hu[e]));
              }
              return Uu[e] || e;
            }),
            (e.prototype.getGlobalEventTarget = function (t, e) {
              return "window" === e
                ? window
                : "document" === e
                ? t
                : "body" === e
                ? t.body
                : null;
            }),
            (e.prototype.getHistory = function () {
              return window.history;
            }),
            (e.prototype.getLocation = function () {
              return window.location;
            }),
            (e.prototype.getBaseHref = function (t) {
              var e,
                n =
                  Wu || (Wu = document.querySelector("base"))
                    ? Wu.getAttribute("href")
                    : null;
              return null == n
                ? null
                : ((e = n),
                  Vu || (Vu = document.createElement("a")),
                  Vu.setAttribute("href", e),
                  "/" === Vu.pathname.charAt(0)
                    ? Vu.pathname
                    : "/" + Vu.pathname);
            }),
            (e.prototype.resetBaseElement = function () {
              Wu = null;
            }),
            (e.prototype.getUserAgent = function () {
              return window.navigator.userAgent;
            }),
            (e.prototype.setData = function (t, e, n) {
              this.setAttribute(t, "data-" + e, n);
            }),
            (e.prototype.getData = function (t, e) {
              return this.getAttribute(t, "data-" + e);
            }),
            (e.prototype.getComputedStyle = function (t) {
              return getComputedStyle(t);
            }),
            (e.prototype.supportsWebAnimation = function () {
              return "function" == typeof Element.prototype.animate;
            }),
            (e.prototype.performanceNow = function () {
              return window.performance && window.performance.now
                ? window.performance.now()
                : new Date().getTime();
            }),
            (e.prototype.supportsCookies = function () {
              return !0;
            }),
            (e.prototype.getCookie = function (t) {
              return (function (t, e) {
                var n, r;
                e = encodeURIComponent(e);
                try {
                  for (
                    var o = u(t.split(";")), i = o.next();
                    !i.done;
                    i = o.next()
                  ) {
                    var l = i.value,
                      a = l.indexOf("="),
                      c = s(
                        -1 == a ? [l, ""] : [l.slice(0, a), l.slice(a + 1)],
                        2
                      ),
                      h = c[1];
                    if (c[0].trim() === e) return decodeURIComponent(h);
                  }
                } catch (p) {
                  n = { error: p };
                } finally {
                  try {
                    i && !i.done && (r = o.return) && r.call(o);
                  } finally {
                    if (n) throw n.error;
                  }
                }
                return null;
              })(document.cookie, t);
            }),
            (e.prototype.setCookie = function (t, e) {
              document.cookie =
                encodeURIComponent(t) + "=" + encodeURIComponent(e);
            }),
            e
          );
        })(Lu),
        Wu = null;
      function Gu() {
        return !!window.history.pushState;
      }
      var qu = (function (t) {
          function e(e) {
            var n = t.call(this) || this;
            return (n._doc = e), n._init(), n;
          }
          var n;
          return (
            o(e, t),
            (e.prototype._init = function () {
              (this.location = ju().getLocation()),
                (this._history = ju().getHistory());
            }),
            (e.prototype.getBaseHrefFromDOM = function () {
              return ju().getBaseHref(this._doc);
            }),
            (e.prototype.onPopState = function (t) {
              ju()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("popstate", t, !1);
            }),
            (e.prototype.onHashChange = function (t) {
              ju()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("hashchange", t, !1);
            }),
            Object.defineProperty(e.prototype, "href", {
              get: function () {
                return this.location.href;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "protocol", {
              get: function () {
                return this.location.protocol;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "hostname", {
              get: function () {
                return this.location.hostname;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "port", {
              get: function () {
                return this.location.port;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "pathname", {
              get: function () {
                return this.location.pathname;
              },
              set: function (t) {
                this.location.pathname = t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "search", {
              get: function () {
                return this.location.search;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "hash", {
              get: function () {
                return this.location.hash;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.pushState = function (t, e, n) {
              Gu()
                ? this._history.pushState(t, e, n)
                : (this.location.hash = n);
            }),
            (e.prototype.replaceState = function (t, e, n) {
              Gu()
                ? this._history.replaceState(t, e, n)
                : (this.location.hash = n);
            }),
            (e.prototype.forward = function () {
              this._history.forward();
            }),
            (e.prototype.back = function () {
              this._history.back();
            }),
            (e.prototype.getState = function () {
              return this._history.state;
            }),
            l(
              [
                ((n = bt(Va)),
                function (t, e) {
                  n(t, e, 0);
                }),
                a("design:paramtypes", [Object]),
              ],
              e
            )
          );
        })(da),
        Zu = new Lt("TRANSITION_ID"),
        Qu = [
          {
            provide: jo,
            useFactory: function (t, e, n) {
              return function () {
                n.get(Vo).donePromise.then(function () {
                  var n = ju();
                  Array.prototype.slice
                    .apply(n.querySelectorAll(e, "style[ng-transition]"))
                    .filter(function (e) {
                      return n.getAttribute(e, "ng-transition") === t;
                    })
                    .forEach(function (t) {
                      return n.remove(t);
                    });
                });
              };
            },
            deps: [Zu, Va, Bt],
            multi: !0,
          },
        ],
        Yu = (function () {
          function t() {}
          return (
            (t.init = function () {
              var e;
              (e = new t()), (mi = e);
            }),
            (t.prototype.addToWindow = function (t) {
              (Dt.getAngularTestability = function (e, n) {
                void 0 === n && (n = !0);
                var r = t.findTestabilityInTree(e, n);
                if (null == r)
                  throw new Error("Could not find testability for element.");
                return r;
              }),
                (Dt.getAllAngularTestabilities = function () {
                  return t.getAllTestabilities();
                }),
                (Dt.getAllAngularRootElements = function () {
                  return t.getAllRootElements();
                }),
                Dt.frameworkStabilizers || (Dt.frameworkStabilizers = []),
                Dt.frameworkStabilizers.push(function (t) {
                  var e = Dt.getAllAngularTestabilities(),
                    n = e.length,
                    r = !1,
                    o = function (e) {
                      (r = r || e), 0 == --n && t(r);
                    };
                  e.forEach(function (t) {
                    t.whenStable(o);
                  });
                });
            }),
            (t.prototype.findTestabilityInTree = function (t, e, n) {
              if (null == e) return null;
              var r = t.getTestability(e);
              return null != r
                ? r
                : n
                ? ju().isShadowRoot(e)
                  ? this.findTestabilityInTree(t, ju().getHost(e), !0)
                  : this.findTestabilityInTree(t, ju().parentElement(e), !0)
                : null;
            }),
            t
          );
        })();
      function $u(t, e) {
        ("undefined" != typeof COMPILED && COMPILED) ||
          ((Dt.ng = Dt.ng || {})[t] = e);
      }
      var Ku = (function () {
        return { ApplicationRef: Si, NgZone: ai };
      })();
      function Xu(t) {
        return Di(t);
      }
      var Ju = new Lt("EventManagerPlugins"),
        ts = (function () {
          function t(t, e) {
            var n = this;
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach(function (t) {
                return (t.manager = n);
              }),
              (this._plugins = t.slice().reverse());
          }
          return (
            (t.prototype.addEventListener = function (t, e, n) {
              return this._findPluginFor(e).addEventListener(t, e, n);
            }),
            (t.prototype.addGlobalEventListener = function (t, e, n) {
              return this._findPluginFor(e).addGlobalEventListener(t, e, n);
            }),
            (t.prototype.getZone = function () {
              return this._zone;
            }),
            (t.prototype._findPluginFor = function (t) {
              var e = this._eventNameToPlugin.get(t);
              if (e) return e;
              for (var n = this._plugins, r = 0; r < n.length; r++) {
                var o = n[r];
                if (o.supports(t)) return this._eventNameToPlugin.set(t, o), o;
              }
              throw new Error("No event manager plugin found for event " + t);
            }),
            t
          );
        })(),
        es = (function () {
          function t(t) {
            this._doc = t;
          }
          return (
            (t.prototype.addGlobalEventListener = function (t, e, n) {
              var r = ju().getGlobalEventTarget(this._doc, t);
              if (!r)
                throw new Error(
                  "Unsupported event target " + r + " for event " + e
                );
              return this.addEventListener(r, e, n);
            }),
            t
          );
        })(),
        ns = (function () {
          function t() {
            this._stylesSet = new Set();
          }
          return (
            (t.prototype.addStyles = function (t) {
              var e = this,
                n = new Set();
              t.forEach(function (t) {
                e._stylesSet.has(t) || (e._stylesSet.add(t), n.add(t));
              }),
                this.onStylesAdded(n);
            }),
            (t.prototype.onStylesAdded = function (t) {}),
            (t.prototype.getAllStyles = function () {
              return Array.from(this._stylesSet);
            }),
            t
          );
        })(),
        rs = (function (t) {
          function e(e) {
            var n = t.call(this) || this;
            return (
              (n._doc = e),
              (n._hostNodes = new Set()),
              (n._styleNodes = new Set()),
              n._hostNodes.add(e.head),
              n
            );
          }
          return (
            o(e, t),
            (e.prototype._addStylesToHost = function (t, e) {
              var n = this;
              t.forEach(function (t) {
                var r = n._doc.createElement("style");
                (r.textContent = t), n._styleNodes.add(e.appendChild(r));
              });
            }),
            (e.prototype.addHost = function (t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }),
            (e.prototype.removeHost = function (t) {
              this._hostNodes.delete(t);
            }),
            (e.prototype.onStylesAdded = function (t) {
              var e = this;
              this._hostNodes.forEach(function (n) {
                return e._addStylesToHost(t, n);
              });
            }),
            (e.prototype.ngOnDestroy = function () {
              this._styleNodes.forEach(function (t) {
                return ju().remove(t);
              });
            }),
            e
          );
        })(ns),
        os = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        is = /%COMP%/g,
        ls = "_nghost-%COMP%",
        as = "_ngcontent-%COMP%";
      function us(t, e, n) {
        for (var r = 0; r < e.length; r++) {
          var o = e[r];
          Array.isArray(o) ? us(t, o, n) : ((o = o.replace(is, t)), n.push(o));
        }
        return n;
      }
      function ss(t) {
        return function (e) {
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      var cs = (function () {
          function t(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new hs(t));
          }
          return (
            (t.prototype.createRenderer = function (t, e) {
              if (!t || !e) return this.defaultRenderer;
              switch (e.encapsulation) {
                case ie.Emulated:
                  var n = this.rendererByCompId.get(e.id);
                  return (
                    n ||
                      ((n = new ds(
                        this.eventManager,
                        this.sharedStylesHost,
                        e,
                        this.appId
                      )),
                      this.rendererByCompId.set(e.id, n)),
                    n.applyToHost(t),
                    n
                  );
                case ie.Native:
                case ie.ShadowDom:
                  return new gs(this.eventManager, this.sharedStylesHost, t, e);
                default:
                  if (!this.rendererByCompId.has(e.id)) {
                    var r = us(e.id, e.styles, []);
                    this.sharedStylesHost.addStyles(r),
                      this.rendererByCompId.set(e.id, this.defaultRenderer);
                  }
                  return this.defaultRenderer;
              }
            }),
            (t.prototype.begin = function () {}),
            (t.prototype.end = function () {}),
            t
          );
        })(),
        hs = (function () {
          function t(t) {
            (this.eventManager = t), (this.data = Object.create(null));
          }
          return (
            (t.prototype.destroy = function () {}),
            (t.prototype.createElement = function (t, e) {
              return e
                ? document.createElementNS(os[e] || e, t)
                : document.createElement(t);
            }),
            (t.prototype.createComment = function (t) {
              return document.createComment(t);
            }),
            (t.prototype.createText = function (t) {
              return document.createTextNode(t);
            }),
            (t.prototype.appendChild = function (t, e) {
              t.appendChild(e);
            }),
            (t.prototype.insertBefore = function (t, e, n) {
              t && t.insertBefore(e, n);
            }),
            (t.prototype.removeChild = function (t, e) {
              t && t.removeChild(e);
            }),
            (t.prototype.selectRootElement = function (t, e) {
              var n = "string" == typeof t ? document.querySelector(t) : t;
              if (!n)
                throw new Error(
                  'The selector "' + t + '" did not match any elements'
                );
              return e || (n.textContent = ""), n;
            }),
            (t.prototype.parentNode = function (t) {
              return t.parentNode;
            }),
            (t.prototype.nextSibling = function (t) {
              return t.nextSibling;
            }),
            (t.prototype.setAttribute = function (t, e, n, r) {
              if (r) {
                e = r + ":" + e;
                var o = os[r];
                o ? t.setAttributeNS(o, e, n) : t.setAttribute(e, n);
              } else t.setAttribute(e, n);
            }),
            (t.prototype.removeAttribute = function (t, e, n) {
              if (n) {
                var r = os[n];
                r ? t.removeAttributeNS(r, e) : t.removeAttribute(n + ":" + e);
              } else t.removeAttribute(e);
            }),
            (t.prototype.addClass = function (t, e) {
              t.classList.add(e);
            }),
            (t.prototype.removeClass = function (t, e) {
              t.classList.remove(e);
            }),
            (t.prototype.setStyle = function (t, e, n, r) {
              r & dn.DashCase
                ? t.style.setProperty(e, n, r & dn.Important ? "important" : "")
                : (t.style[e] = n);
            }),
            (t.prototype.removeStyle = function (t, e, n) {
              n & dn.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
            }),
            (t.prototype.setProperty = function (t, e, n) {
              fs(e, "property"), (t[e] = n);
            }),
            (t.prototype.setValue = function (t, e) {
              t.nodeValue = e;
            }),
            (t.prototype.listen = function (t, e, n) {
              return (
                fs(e, "listener"),
                "string" == typeof t
                  ? this.eventManager.addGlobalEventListener(t, e, ss(n))
                  : this.eventManager.addEventListener(t, e, ss(n))
              );
            }),
            t
          );
        })(),
        ps = (function () {
          return "@".charCodeAt(0);
        })();
      function fs(t, e) {
        if (t.charCodeAt(0) === ps)
          throw new Error(
            "Found the synthetic " +
              e +
              " " +
              t +
              '. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.'
          );
      }
      var ds = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e) || this;
            i.component = r;
            var l = us(o + "-" + r.id, r.styles, []);
            return (
              n.addStyles(l),
              (i.contentAttr = as.replace(is, o + "-" + r.id)),
              (i.hostAttr = ls.replace(is, o + "-" + r.id)),
              i
            );
          }
          return (
            o(e, t),
            (e.prototype.applyToHost = function (e) {
              t.prototype.setAttribute.call(this, e, this.hostAttr, "");
            }),
            (e.prototype.createElement = function (e, n) {
              var r = t.prototype.createElement.call(this, e, n);
              return (
                t.prototype.setAttribute.call(this, r, this.contentAttr, ""), r
              );
            }),
            e
          );
        })(hs),
        gs = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e) || this;
            (i.sharedStylesHost = n),
              (i.hostEl = r),
              (i.component = o),
              (i.shadowRoot =
                o.encapsulation === ie.ShadowDom
                  ? r.attachShadow({ mode: "open" })
                  : r.createShadowRoot()),
              i.sharedStylesHost.addHost(i.shadowRoot);
            for (var l = us(o.id, o.styles, []), a = 0; a < l.length; a++) {
              var u = document.createElement("style");
              (u.textContent = l[a]), i.shadowRoot.appendChild(u);
            }
            return i;
          }
          return (
            o(e, t),
            (e.prototype.nodeOrShadowRoot = function (t) {
              return t === this.hostEl ? this.shadowRoot : t;
            }),
            (e.prototype.destroy = function () {
              this.sharedStylesHost.removeHost(this.shadowRoot);
            }),
            (e.prototype.appendChild = function (e, n) {
              return t.prototype.appendChild.call(
                this,
                this.nodeOrShadowRoot(e),
                n
              );
            }),
            (e.prototype.insertBefore = function (e, n, r) {
              return t.prototype.insertBefore.call(
                this,
                this.nodeOrShadowRoot(e),
                n,
                r
              );
            }),
            (e.prototype.removeChild = function (e, n) {
              return t.prototype.removeChild.call(
                this,
                this.nodeOrShadowRoot(e),
                n
              );
            }),
            (e.prototype.parentNode = function (e) {
              return this.nodeOrShadowRoot(
                t.prototype.parentNode.call(this, this.nodeOrShadowRoot(e))
              );
            }),
            e
          );
        })(hs),
        vs = (function () {
          return (
            ("undefined" != typeof Zone && Zone.__symbol__) ||
            function (t) {
              return "__zone_symbol__" + t;
            }
          );
        })(),
        ms = vs("addEventListener"),
        ys = vs("removeEventListener"),
        bs = {},
        _s = "__zone_symbol__propagationStopped",
        ws = (function () {
          var t = "undefined" != typeof Zone && Zone[vs("BLACK_LISTED_EVENTS")];
          if (t) {
            var e = {};
            return (
              t.forEach(function (t) {
                e[t] = t;
              }),
              e
            );
          }
        })(),
        Cs = function (t) {
          return !!ws && ws.hasOwnProperty(t);
        },
        Es = function (t) {
          var e = bs[t.type];
          if (e) {
            var n = this[e];
            if (n) {
              var r = [t];
              if (1 === n.length)
                return (l = n[0]).zone !== Zone.current
                  ? l.zone.run(l.handler, this, r)
                  : l.handler.apply(this, r);
              for (
                var o = n.slice(), i = 0;
                i < o.length && !0 !== t[_s];
                i++
              ) {
                var l;
                (l = o[i]).zone !== Zone.current
                  ? l.zone.run(l.handler, this, r)
                  : l.handler.apply(this, r);
              }
            }
          }
        },
        Ss = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e) || this;
            return (
              (o.ngZone = n),
              (r &&
                (function (t) {
                  return t === Fa;
                })(r)) ||
                o.patchEvent(),
              o
            );
          }
          return (
            o(e, t),
            (e.prototype.patchEvent = function () {
              if (
                "undefined" != typeof Event &&
                Event &&
                Event.prototype &&
                !Event.prototype.__zone_symbol__stopImmediatePropagation
              ) {
                var t =
                  (Event.prototype.__zone_symbol__stopImmediatePropagation =
                    Event.prototype.stopImmediatePropagation);
                Event.prototype.stopImmediatePropagation = function () {
                  this && (this[_s] = !0), t && t.apply(this, arguments);
                };
              }
            }),
            (e.prototype.supports = function (t) {
              return !0;
            }),
            (e.prototype.addEventListener = function (t, e, n) {
              var r = this,
                o = n;
              if (!t[ms] || (ai.isInAngularZone() && !Cs(e)))
                t.addEventListener(e, o, !1);
              else {
                var i = bs[e];
                i || (i = bs[e] = vs("ANGULAR" + e + "FALSE"));
                var l = t[i],
                  a = l && l.length > 0;
                l || (l = t[i] = []);
                var u = Cs(e) ? Zone.root : Zone.current;
                if (0 === l.length) l.push({ zone: u, handler: o });
                else {
                  for (var s = !1, c = 0; c < l.length; c++)
                    if (l[c].handler === o) {
                      s = !0;
                      break;
                    }
                  s || l.push({ zone: u, handler: o });
                }
                a || t[ms](e, Es, !1);
              }
              return function () {
                return r.removeEventListener(t, e, o);
              };
            }),
            (e.prototype.removeEventListener = function (t, e, n) {
              var r = t[ys];
              if (!r) return t.removeEventListener.apply(t, [e, n, !1]);
              var o = bs[e],
                i = o && t[o];
              if (!i) return t.removeEventListener.apply(t, [e, n, !1]);
              for (var l = !1, a = 0; a < i.length; a++)
                if (i[a].handler === n) {
                  (l = !0), i.splice(a, 1);
                  break;
                }
              l
                ? 0 === i.length && r.apply(t, [e, Es, !1])
                : t.removeEventListener.apply(t, [e, n, !1]);
            }),
            e
          );
        })(es),
        xs = {
          pan: !0,
          panstart: !0,
          panmove: !0,
          panend: !0,
          pancancel: !0,
          panleft: !0,
          panright: !0,
          panup: !0,
          pandown: !0,
          pinch: !0,
          pinchstart: !0,
          pinchmove: !0,
          pinchend: !0,
          pinchcancel: !0,
          pinchin: !0,
          pinchout: !0,
          press: !0,
          pressup: !0,
          rotate: !0,
          rotatestart: !0,
          rotatemove: !0,
          rotateend: !0,
          rotatecancel: !0,
          swipe: !0,
          swipeleft: !0,
          swiperight: !0,
          swipeup: !0,
          swipedown: !0,
          tap: !0,
        },
        Os = new Lt("HammerGestureConfig"),
        Ts = new Lt("HammerLoader"),
        ks = (function () {
          function t() {
            (this.events = []), (this.overrides = {});
          }
          return (
            (t.prototype.buildHammer = function (t) {
              var e = new Hammer(t, this.options);
              for (var n in (e.get("pinch").set({ enable: !0 }),
              e.get("rotate").set({ enable: !0 }),
              this.overrides))
                e.get(n).set(this.overrides[n]);
              return e;
            }),
            t
          );
        })(),
        As = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e) || this;
            return (i._config = n), (i.console = r), (i.loader = o), i;
          }
          return (
            o(e, t),
            (e.prototype.supports = function (t) {
              return !(
                (!xs.hasOwnProperty(t.toLowerCase()) &&
                  !this.isCustomEvent(t)) ||
                (!window.Hammer &&
                  !this.loader &&
                  (this.console.warn(
                    'The "' +
                      t +
                      '" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.'
                  ),
                  1))
              );
            }),
            (e.prototype.addEventListener = function (t, e, n) {
              var r = this,
                o = this.manager.getZone();
              if (((e = e.toLowerCase()), !window.Hammer && this.loader)) {
                var i = !1,
                  l = function () {
                    i = !0;
                  };
                return (
                  this.loader()
                    .then(function () {
                      if (!window.Hammer)
                        return (
                          r.console.warn(
                            "The custom HAMMER_LOADER completed, but Hammer.JS is not present."
                          ),
                          void (l = function () {})
                        );
                      i || (l = r.addEventListener(t, e, n));
                    })
                    .catch(function () {
                      r.console.warn(
                        'The "' +
                          e +
                          '" event cannot be bound because the custom Hammer.JS loader failed.'
                      ),
                        (l = function () {});
                    }),
                  function () {
                    l();
                  }
                );
              }
              return o.runOutsideAngular(function () {
                var i = r._config.buildHammer(t),
                  l = function (t) {
                    o.runGuarded(function () {
                      n(t);
                    });
                  };
                return (
                  i.on(e, l),
                  function () {
                    i.off(e, l), "function" == typeof i.destroy && i.destroy();
                  }
                );
              });
            }),
            (e.prototype.isCustomEvent = function (t) {
              return this._config.events.indexOf(t) > -1;
            }),
            e
          );
        })(es),
        Is = ["alt", "control", "meta", "shift"],
        Ps = {
          alt: function (t) {
            return t.altKey;
          },
          control: function (t) {
            return t.ctrlKey;
          },
          meta: function (t) {
            return t.metaKey;
          },
          shift: function (t) {
            return t.shiftKey;
          },
        },
        Rs = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          var n;
          return (
            o(e, t),
            (n = e),
            (e.prototype.supports = function (t) {
              return null != n.parseEventName(t);
            }),
            (e.prototype.addEventListener = function (t, e, r) {
              var o = n.parseEventName(e),
                i = n.eventCallback(o.fullKey, r, this.manager.getZone());
              return this.manager.getZone().runOutsideAngular(function () {
                return ju().onAndCancel(t, o.domEventName, i);
              });
            }),
            (e.parseEventName = function (t) {
              var e = t.toLowerCase().split("."),
                r = e.shift();
              if (0 === e.length || ("keydown" !== r && "keyup" !== r))
                return null;
              var o = n._normalizeKey(e.pop()),
                i = "";
              if (
                (Is.forEach(function (t) {
                  var n = e.indexOf(t);
                  n > -1 && (e.splice(n, 1), (i += t + "."));
                }),
                (i += o),
                0 != e.length || 0 === o.length)
              )
                return null;
              var l = {};
              return (l.domEventName = r), (l.fullKey = i), l;
            }),
            (e.getEventFullKey = function (t) {
              var e = "",
                n = ju().getEventKey(t);
              return (
                " " === (n = n.toLowerCase())
                  ? (n = "space")
                  : "." === n && (n = "dot"),
                Is.forEach(function (r) {
                  r != n && (0, Ps[r])(t) && (e += r + ".");
                }),
                (e += n)
              );
            }),
            (e.eventCallback = function (t, e, r) {
              return function (o) {
                n.getEventFullKey(o) === t &&
                  r.runGuarded(function () {
                    return e(o);
                  });
              };
            }),
            (e._normalizeKey = function (t) {
              switch (t) {
                case "esc":
                  return "escape";
                default:
                  return t;
              }
            }),
            e
          );
        })(es),
        Ns = (function () {
          return function () {};
        })(),
        Ds = (function (t) {
          function e(e) {
            var n = t.call(this) || this;
            return (n._doc = e), n;
          }
          return (
            o(e, t),
            (e.prototype.sanitize = function (t, e) {
              if (null == e) return null;
              switch (t) {
                case Me.NONE:
                  return e;
                case Me.HTML:
                  return e instanceof js
                    ? e.changingThisBreaksApplicationSecurity
                    : (this.checkNotSafeValue(e, "HTML"),
                      (function (t, e) {
                        var n = null;
                        try {
                          _e = _e || new de(t);
                          var r = e ? String(e) : "";
                          n = _e.getInertBodyElement(r);
                          var o = 5,
                            i = r;
                          do {
                            if (0 === o)
                              throw new Error(
                                "Failed to sanitize html because the input is unstable"
                              );
                            o--,
                              (r = i),
                              (i = n.innerHTML),
                              (n = _e.getInertBodyElement(r));
                          } while (r !== i);
                          var l = new Ie(),
                            a = l.sanitizeChildren(De(n) || n);
                          return (
                            fe() &&
                              l.sanitizedSomething &&
                              console.warn(
                                "WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"
                              ),
                            a
                          );
                        } finally {
                          if (n)
                            for (var u = De(n) || n; u.firstChild; )
                              u.removeChild(u.firstChild);
                        }
                      })(this._doc, String(e)));
                case Me.STYLE:
                  return e instanceof Vs
                    ? e.changingThisBreaksApplicationSecurity
                    : (this.checkNotSafeValue(e, "Style"),
                      (function (t) {
                        if (!(t = String(t).trim())) return "";
                        var e = t.match(Le);
                        return (e && me(e[1]) === e[1]) ||
                          (t.match(Ve) &&
                            (function (t) {
                              for (
                                var e = !0, n = !0, r = 0;
                                r < t.length;
                                r++
                              ) {
                                var o = t.charAt(r);
                                "'" === o && n
                                  ? (e = !e)
                                  : '"' === o && e && (n = !n);
                              }
                              return e && n;
                            })(t))
                          ? t
                          : (fe() &&
                              console.warn(
                                "WARNING: sanitizing unsafe style value " +
                                  t +
                                  " (see http://g.co/ng/security#xss)."
                              ),
                            "unsafe");
                      })(e));
                case Me.SCRIPT:
                  if (e instanceof Ls)
                    return e.changingThisBreaksApplicationSecurity;
                  throw (
                    (this.checkNotSafeValue(e, "Script"),
                    new Error("unsafe value used in a script context"))
                  );
                case Me.URL:
                  return e instanceof Us || e instanceof Fs
                    ? e.changingThisBreaksApplicationSecurity
                    : (this.checkNotSafeValue(e, "URL"), me(String(e)));
                case Me.RESOURCE_URL:
                  if (e instanceof Us)
                    return e.changingThisBreaksApplicationSecurity;
                  throw (
                    (this.checkNotSafeValue(e, "ResourceURL"),
                    new Error(
                      "unsafe value used in a resource URL context (see http://g.co/ng/security#xss)"
                    ))
                  );
                default:
                  throw new Error(
                    "Unexpected SecurityContext " +
                      t +
                      " (see http://g.co/ng/security#xss)"
                  );
              }
            }),
            (e.prototype.checkNotSafeValue = function (t, e) {
              if (t instanceof Ms)
                throw new Error(
                  "Required a safe " +
                    e +
                    ", got a " +
                    t.getTypeName() +
                    " (see http://g.co/ng/security#xss)"
                );
            }),
            (e.prototype.bypassSecurityTrustHtml = function (t) {
              return new js(t);
            }),
            (e.prototype.bypassSecurityTrustStyle = function (t) {
              return new Vs(t);
            }),
            (e.prototype.bypassSecurityTrustScript = function (t) {
              return new Ls(t);
            }),
            (e.prototype.bypassSecurityTrustUrl = function (t) {
              return new Fs(t);
            }),
            (e.prototype.bypassSecurityTrustResourceUrl = function (t) {
              return new Us(t);
            }),
            e
          );
        })(Ns),
        Ms = (function () {
          function t(t) {
            this.changingThisBreaksApplicationSecurity = t;
          }
          return (
            (t.prototype.toString = function () {
              return (
                "SafeValue must use [property]=binding: " +
                this.changingThisBreaksApplicationSecurity +
                " (see http://g.co/ng/security#xss)"
              );
            }),
            t
          );
        })(),
        js = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            o(e, t),
            (e.prototype.getTypeName = function () {
              return "HTML";
            }),
            e
          );
        })(Ms),
        Vs = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            o(e, t),
            (e.prototype.getTypeName = function () {
              return "Style";
            }),
            e
          );
        })(Ms),
        Ls = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            o(e, t),
            (e.prototype.getTypeName = function () {
              return "Script";
            }),
            e
          );
        })(Ms),
        Fs = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            o(e, t),
            (e.prototype.getTypeName = function () {
              return "URL";
            }),
            e
          );
        })(Ms),
        Us = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            o(e, t),
            (e.prototype.getTypeName = function () {
              return "ResourceURL";
            }),
            e
          );
        })(Ms),
        Hs = _i(ji, "browser", [
          { provide: zo, useValue: La },
          {
            provide: Ho,
            useValue: function () {
              Bu.makeCurrent(), Yu.init();
            },
            multi: !0,
          },
          { provide: da, useClass: qu, deps: [Va] },
          {
            provide: Va,
            useFactory: function () {
              return document;
            },
            deps: [],
          },
        ]);
      function zs() {
        return new ce();
      }
      var Bs = (function () {
        function t(t) {
          if (t)
            throw new Error(
              "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
            );
        }
        var e;
        return (
          (e = t),
          (t.withServerTransition = function (t) {
            return {
              ngModule: e,
              providers: [
                { provide: Lo, useValue: t.appId },
                { provide: Zu, useExisting: Lo },
                Qu,
              ],
            };
          }),
          t
        );
      })();
      "undefined" != typeof window && window;
      var Ws = (function () {
          return function (t, e) {
            (this.id = t), (this.url = e);
          };
        })(),
        Gs = (function (t) {
          function e(e, n, r, o) {
            void 0 === r && (r = "imperative"), void 0 === o && (o = null);
            var i = t.call(this, e, n) || this;
            return (i.navigationTrigger = r), (i.restoredState = o), i;
          }
          return (
            o(e, t),
            (e.prototype.toString = function () {
              return (
                "NavigationStart(id: " + this.id + ", url: '" + this.url + "')"
              );
            }),
            e
          );
        })(Ws),
        qs = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e, n) || this;
            return (o.urlAfterRedirects = r), o;
          }
          return (
            o(e, t),
            (e.prototype.toString = function () {
              return (
                "NavigationEnd(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', urlAfterRedirects: '" +
                this.urlAfterRedirects +
                "')"
              );
            }),
            e
          );
        })(Ws),
        Zs = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e, n) || this;
            return (o.reason = r), o;
          }
          return (
            o(e, t),
            (e.prototype.toString = function () {
              return (
                "NavigationCancel(id: " + this.id + ", url: '" + this.url + "')"
              );
            }),
            e
          );
        })(Ws),
        Qs = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, e, n) || this;
            return (o.error = r), o;
          }
          return (
            o(e, t),
            (e.prototype.toString = function () {
              return (
                "NavigationError(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', error: " +
                this.error +
                ")"
              );
            }),
            e
          );
        })(Ws),
        Ys = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e, n) || this;
            return (i.urlAfterRedirects = r), (i.state = o), i;
          }
          return (
            o(e, t),
            (e.prototype.toString = function () {
              return (
                "RoutesRecognized(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', urlAfterRedirects: '" +
                this.urlAfterRedirects +
                "', state: " +
                this.state +
                ")"
              );
            }),
            e
          );
        })(Ws),
        $s = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e, n) || this;
            return (i.urlAfterRedirects = r), (i.state = o), i;
          }
          return (
            o(e, t),
            (e.prototype.toString = function () {
              return (
                "GuardsCheckStart(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', urlAfterRedirects: '" +
                this.urlAfterRedirects +
                "', state: " +
                this.state +
                ")"
              );
            }),
            e
          );
        })(Ws),
        Ks = (function (t) {
          function e(e, n, r, o, i) {
            var l = t.call(this, e, n) || this;
            return (
              (l.urlAfterRedirects = r),
              (l.state = o),
              (l.shouldActivate = i),
              l
            );
          }
          return (
            o(e, t),
            (e.prototype.toString = function () {
              return (
                "GuardsCheckEnd(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', urlAfterRedirects: '" +
                this.urlAfterRedirects +
                "', state: " +
                this.state +
                ", shouldActivate: " +
                this.shouldActivate +
                ")"
              );
            }),
            e
          );
        })(Ws),
        Xs = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e, n) || this;
            return (i.urlAfterRedirects = r), (i.state = o), i;
          }
          return (
            o(e, t),
            (e.prototype.toString = function () {
              return (
                "ResolveStart(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', urlAfterRedirects: '" +
                this.urlAfterRedirects +
                "', state: " +
                this.state +
                ")"
              );
            }),
            e
          );
        })(Ws),
        Js = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this, e, n) || this;
            return (i.urlAfterRedirects = r), (i.state = o), i;
          }
          return (
            o(e, t),
            (e.prototype.toString = function () {
              return (
                "ResolveEnd(id: " +
                this.id +
                ", url: '" +
                this.url +
                "', urlAfterRedirects: '" +
                this.urlAfterRedirects +
                "', state: " +
                this.state +
                ")"
              );
            }),
            e
          );
        })(Ws),
        tc = (function () {
          function t(t) {
            this.route = t;
          }
          return (
            (t.prototype.toString = function () {
              return "RouteConfigLoadStart(path: " + this.route.path + ")";
            }),
            t
          );
        })(),
        ec = (function () {
          function t(t) {
            this.route = t;
          }
          return (
            (t.prototype.toString = function () {
              return "RouteConfigLoadEnd(path: " + this.route.path + ")";
            }),
            t
          );
        })(),
        nc = (function () {
          function t(t) {
            this.snapshot = t;
          }
          return (
            (t.prototype.toString = function () {
              return (
                "ChildActivationStart(path: '" +
                ((this.snapshot.routeConfig &&
                  this.snapshot.routeConfig.path) ||
                  "") +
                "')"
              );
            }),
            t
          );
        })(),
        rc = (function () {
          function t(t) {
            this.snapshot = t;
          }
          return (
            (t.prototype.toString = function () {
              return (
                "ChildActivationEnd(path: '" +
                ((this.snapshot.routeConfig &&
                  this.snapshot.routeConfig.path) ||
                  "") +
                "')"
              );
            }),
            t
          );
        })(),
        oc = (function () {
          function t(t) {
            this.snapshot = t;
          }
          return (
            (t.prototype.toString = function () {
              return (
                "ActivationStart(path: '" +
                ((this.snapshot.routeConfig &&
                  this.snapshot.routeConfig.path) ||
                  "") +
                "')"
              );
            }),
            t
          );
        })(),
        ic = (function () {
          function t(t) {
            this.snapshot = t;
          }
          return (
            (t.prototype.toString = function () {
              return (
                "ActivationEnd(path: '" +
                ((this.snapshot.routeConfig &&
                  this.snapshot.routeConfig.path) ||
                  "") +
                "')"
              );
            }),
            t
          );
        })(),
        lc = (function () {
          function t(t, e, n) {
            (this.routerEvent = t), (this.position = e), (this.anchor = n);
          }
          return (
            (t.prototype.toString = function () {
              return (
                "Scroll(anchor: '" +
                this.anchor +
                "', position: '" +
                (this.position
                  ? this.position[0] + ", " + this.position[1]
                  : null) +
                "')"
              );
            }),
            t
          );
        })(),
        ac = (function () {
          return function () {};
        })(),
        uc = "primary",
        sc = (function () {
          function t(t) {
            this.params = t || {};
          }
          return (
            (t.prototype.has = function (t) {
              return this.params.hasOwnProperty(t);
            }),
            (t.prototype.get = function (t) {
              if (this.has(t)) {
                var e = this.params[t];
                return Array.isArray(e) ? e[0] : e;
              }
              return null;
            }),
            (t.prototype.getAll = function (t) {
              if (this.has(t)) {
                var e = this.params[t];
                return Array.isArray(e) ? e : [e];
              }
              return [];
            }),
            Object.defineProperty(t.prototype, "keys", {
              get: function () {
                return Object.keys(this.params);
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })();
      function cc(t) {
        return new sc(t);
      }
      var hc = "ngNavigationCancelingError";
      function pc(t) {
        var e = Error("NavigationCancelingError: " + t);
        return (e[hc] = !0), e;
      }
      function fc(t, e, n) {
        var r = n.path.split("/");
        if (r.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
          return null;
        for (var o = {}, i = 0; i < r.length; i++) {
          var l = r[i],
            a = t[i];
          if (l.startsWith(":")) o[l.substring(1)] = a;
          else if (l !== a.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: o };
      }
      var dc = (function () {
        return function (t, e) {
          (this.routes = t), (this.module = e);
        };
      })();
      function gc(t, e) {
        void 0 === e && (e = "");
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          vc(r, mc(e, r));
        }
      }
      function vc(t, e) {
        if (!t)
          throw new Error(
            "\n      Invalid configuration of route '" +
              e +
              "': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    "
          );
        if (Array.isArray(t))
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': Array cannot be specified"
          );
        if (
          !t.component &&
          !t.children &&
          !t.loadChildren &&
          t.outlet &&
          t.outlet !== uc
        )
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': a componentless route without children or loadChildren cannot have a named outlet set"
          );
        if (t.redirectTo && t.children)
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': redirectTo and children cannot be used together"
          );
        if (t.redirectTo && t.loadChildren)
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': redirectTo and loadChildren cannot be used together"
          );
        if (t.children && t.loadChildren)
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': children and loadChildren cannot be used together"
          );
        if (t.redirectTo && t.component)
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': redirectTo and component cannot be used together"
          );
        if (t.path && t.matcher)
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': path and matcher cannot be used together"
          );
        if (
          void 0 === t.redirectTo &&
          !t.component &&
          !t.children &&
          !t.loadChildren
        )
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "'. One of the following must be provided: component, redirectTo, children or loadChildren"
          );
        if (void 0 === t.path && void 0 === t.matcher)
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': routes must have either a path or a matcher specified"
          );
        if ("string" == typeof t.path && "/" === t.path.charAt(0))
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': path cannot start with a slash"
          );
        if ("" === t.path && void 0 !== t.redirectTo && void 0 === t.pathMatch)
          throw new Error(
            "Invalid configuration of route '{path: \"" +
              e +
              '", redirectTo: "' +
              t.redirectTo +
              "\"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'."
          );
        if (
          void 0 !== t.pathMatch &&
          "full" !== t.pathMatch &&
          "prefix" !== t.pathMatch
        )
          throw new Error(
            "Invalid configuration of route '" +
              e +
              "': pathMatch can only be set to 'prefix' or 'full'"
          );
        t.children && gc(t.children, e);
      }
      function mc(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? t + "/"
              : !t && e.path
              ? e.path
              : t + "/" + e.path
            : ""
          : t;
      }
      function yc(t) {
        var e = t.children && t.children.map(yc),
          n = e ? i({}, t, { children: e }) : i({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            n.outlet !== uc &&
            (n.component = ac),
          n
        );
      }
      function bc(t, e) {
        var n,
          r = Object.keys(t),
          o = Object.keys(e);
        if (!r || !o || r.length != o.length) return !1;
        for (var i = 0; i < r.length; i++)
          if (t[(n = r[i])] !== e[n]) return !1;
        return !0;
      }
      function _c(t) {
        return Array.prototype.concat.apply([], t);
      }
      function wc(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Cc(t, e) {
        for (var n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function Ec(t) {
        return ze(t) ? t : He(t) ? tt(Promise.resolve(t)) : Ga(t);
      }
      function Sc(t, e, n) {
        return n
          ? (function (t, e) {
              return bc(t, e);
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                if (!kc(e.segments, n.segments)) return !1;
                if (e.numberOfChildren !== n.numberOfChildren) return !1;
                for (var r in n.children) {
                  if (!e.children[r]) return !1;
                  if (!t(e.children[r], n.children[r])) return !1;
                }
                return !0;
              })(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every(function (n) {
                  return e[n] === t[n];
                })
              );
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                return (function e(n, r, o) {
                  if (n.segments.length > o.length)
                    return (
                      !!kc((l = n.segments.slice(0, o.length)), o) &&
                      !r.hasChildren()
                    );
                  if (n.segments.length === o.length) {
                    if (!kc(n.segments, o)) return !1;
                    for (var i in r.children) {
                      if (!n.children[i]) return !1;
                      if (!t(n.children[i], r.children[i])) return !1;
                    }
                    return !0;
                  }
                  var l = o.slice(0, n.segments.length),
                    a = o.slice(n.segments.length);
                  return (
                    !!kc(n.segments, l) &&
                    !!n.children[uc] &&
                    e(n.children[uc], r, a)
                  );
                })(e, n, n.segments);
              })(t.root, e.root);
      }
      var xc = (function () {
          function t(t, e, n) {
            (this.root = t), (this.queryParams = e), (this.fragment = n);
          }
          return (
            Object.defineProperty(t.prototype, "queryParamMap", {
              get: function () {
                return (
                  this._queryParamMap ||
                    (this._queryParamMap = cc(this.queryParams)),
                  this._queryParamMap
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.toString = function () {
              return Rc.serialize(this);
            }),
            t
          );
        })(),
        Oc = (function () {
          function t(t, e) {
            var n = this;
            (this.segments = t),
              (this.children = e),
              (this.parent = null),
              Cc(e, function (t, e) {
                return (t.parent = n);
              });
          }
          return (
            (t.prototype.hasChildren = function () {
              return this.numberOfChildren > 0;
            }),
            Object.defineProperty(t.prototype, "numberOfChildren", {
              get: function () {
                return Object.keys(this.children).length;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.toString = function () {
              return Nc(this);
            }),
            t
          );
        })(),
        Tc = (function () {
          function t(t, e) {
            (this.path = t), (this.parameters = e);
          }
          return (
            Object.defineProperty(t.prototype, "parameterMap", {
              get: function () {
                return (
                  this._parameterMap ||
                    (this._parameterMap = cc(this.parameters)),
                  this._parameterMap
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.toString = function () {
              return Fc(this);
            }),
            t
          );
        })();
      function kc(t, e) {
        return (
          t.length === e.length &&
          t.every(function (t, n) {
            return t.path === e[n].path;
          })
        );
      }
      function Ac(t, e) {
        var n = [];
        return (
          Cc(t.children, function (t, r) {
            r === uc && (n = n.concat(e(t, r)));
          }),
          Cc(t.children, function (t, r) {
            r !== uc && (n = n.concat(e(t, r)));
          }),
          n
        );
      }
      var Ic = (function () {
          return function () {};
        })(),
        Pc = (function () {
          function t() {}
          return (
            (t.prototype.parse = function (t) {
              var e = new Wc(t);
              return new xc(
                e.parseRootSegment(),
                e.parseQueryParams(),
                e.parseFragment()
              );
            }),
            (t.prototype.serialize = function (t) {
              var e, n;
              return (
                "/" +
                (function t(e, n) {
                  if (!e.hasChildren()) return Nc(e);
                  if (n) {
                    var r = e.children[uc] ? t(e.children[uc], !1) : "",
                      o = [];
                    return (
                      Cc(e.children, function (e, n) {
                        n !== uc && o.push(n + ":" + t(e, !1));
                      }),
                      o.length > 0 ? r + "(" + o.join("//") + ")" : r
                    );
                  }
                  var i = Ac(e, function (n, r) {
                    return r === uc
                      ? [t(e.children[uc], !1)]
                      : [r + ":" + t(n, !1)];
                  });
                  return Nc(e) + "/(" + i.join("//") + ")";
                })(t.root, !0) +
                ((e = t.queryParams),
                (n = Object.keys(e).map(function (t) {
                  var n = e[t];
                  return Array.isArray(n)
                    ? n
                        .map(function (e) {
                          return Mc(t) + "=" + Mc(e);
                        })
                        .join("&")
                    : Mc(t) + "=" + Mc(n);
                })).length
                  ? "?" + n.join("&")
                  : "") +
                ("string" == typeof t.fragment
                  ? "#" + encodeURI(t.fragment)
                  : "")
              );
            }),
            t
          );
        })(),
        Rc = new Pc();
      function Nc(t) {
        return t.segments
          .map(function (t) {
            return Fc(t);
          })
          .join("/");
      }
      function Dc(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Mc(t) {
        return Dc(t).replace(/%3B/gi, ";");
      }
      function jc(t) {
        return Dc(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Vc(t) {
        return decodeURIComponent(t);
      }
      function Lc(t) {
        return Vc(t.replace(/\+/g, "%20"));
      }
      function Fc(t) {
        return (
          "" +
          jc(t.path) +
          ((e = t.parameters),
          Object.keys(e)
            .map(function (t) {
              return ";" + jc(t) + "=" + jc(e[t]);
            })
            .join(""))
        );
        var e;
      }
      var Uc = /^[^\/()?;=#]+/;
      function Hc(t) {
        var e = t.match(Uc);
        return e ? e[0] : "";
      }
      var zc = /^[^=?&#]+/,
        Bc = /^[^?&#]+/,
        Wc = (function () {
          function t(t) {
            (this.url = t), (this.remaining = t);
          }
          return (
            (t.prototype.parseRootSegment = function () {
              return (
                this.consumeOptional("/"),
                "" === this.remaining ||
                this.peekStartsWith("?") ||
                this.peekStartsWith("#")
                  ? new Oc([], {})
                  : new Oc([], this.parseChildren())
              );
            }),
            (t.prototype.parseQueryParams = function () {
              var t = {};
              if (this.consumeOptional("?"))
                do {
                  this.parseQueryParam(t);
                } while (this.consumeOptional("&"));
              return t;
            }),
            (t.prototype.parseFragment = function () {
              return this.consumeOptional("#")
                ? decodeURIComponent(this.remaining)
                : null;
            }),
            (t.prototype.parseChildren = function () {
              if ("" === this.remaining) return {};
              this.consumeOptional("/");
              var t = [];
              for (
                this.peekStartsWith("(") || t.push(this.parseSegment());
                this.peekStartsWith("/") &&
                !this.peekStartsWith("//") &&
                !this.peekStartsWith("/(");

              )
                this.capture("/"), t.push(this.parseSegment());
              var e = {};
              this.peekStartsWith("/(") &&
                (this.capture("/"), (e = this.parseParens(!0)));
              var n = {};
              return (
                this.peekStartsWith("(") && (n = this.parseParens(!1)),
                (t.length > 0 || Object.keys(e).length > 0) &&
                  (n[uc] = new Oc(t, e)),
                n
              );
            }),
            (t.prototype.parseSegment = function () {
              var t = Hc(this.remaining);
              if ("" === t && this.peekStartsWith(";"))
                throw new Error(
                  "Empty path url segment cannot have parameters: '" +
                    this.remaining +
                    "'."
                );
              return this.capture(t), new Tc(Vc(t), this.parseMatrixParams());
            }),
            (t.prototype.parseMatrixParams = function () {
              for (var t = {}; this.consumeOptional(";"); ) this.parseParam(t);
              return t;
            }),
            (t.prototype.parseParam = function (t) {
              var e = Hc(this.remaining);
              if (e) {
                this.capture(e);
                var n = "";
                if (this.consumeOptional("=")) {
                  var r = Hc(this.remaining);
                  r && this.capture((n = r));
                }
                t[Vc(e)] = Vc(n);
              }
            }),
            (t.prototype.parseQueryParam = function (t) {
              var e,
                n = (e = this.remaining.match(zc)) ? e[0] : "";
              if (n) {
                this.capture(n);
                var r = "";
                if (this.consumeOptional("=")) {
                  var o = (function (t) {
                    var e = t.match(Bc);
                    return e ? e[0] : "";
                  })(this.remaining);
                  o && this.capture((r = o));
                }
                var i = Lc(n),
                  l = Lc(r);
                if (t.hasOwnProperty(i)) {
                  var a = t[i];
                  Array.isArray(a) || (t[i] = a = [a]), a.push(l);
                } else t[i] = l;
              }
            }),
            (t.prototype.parseParens = function (t) {
              var e = {};
              for (
                this.capture("(");
                !this.consumeOptional(")") && this.remaining.length > 0;

              ) {
                var n = Hc(this.remaining),
                  r = this.remaining[n.length];
                if ("/" !== r && ")" !== r && ";" !== r)
                  throw new Error("Cannot parse url '" + this.url + "'");
                var o = void 0;
                n.indexOf(":") > -1
                  ? ((o = n.substr(0, n.indexOf(":"))),
                    this.capture(o),
                    this.capture(":"))
                  : t && (o = uc);
                var i = this.parseChildren();
                (e[o] = 1 === Object.keys(i).length ? i[uc] : new Oc([], i)),
                  this.consumeOptional("//");
              }
              return e;
            }),
            (t.prototype.peekStartsWith = function (t) {
              return this.remaining.startsWith(t);
            }),
            (t.prototype.consumeOptional = function (t) {
              return (
                !!this.peekStartsWith(t) &&
                ((this.remaining = this.remaining.substring(t.length)), !0)
              );
            }),
            (t.prototype.capture = function (t) {
              if (!this.consumeOptional(t))
                throw new Error('Expected "' + t + '".');
            }),
            t
          );
        })(),
        Gc = (function () {
          function t(t) {
            this._root = t;
          }
          return (
            Object.defineProperty(t.prototype, "root", {
              get: function () {
                return this._root.value;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.parent = function (t) {
              var e = this.pathFromRoot(t);
              return e.length > 1 ? e[e.length - 2] : null;
            }),
            (t.prototype.children = function (t) {
              var e = qc(t, this._root);
              return e
                ? e.children.map(function (t) {
                    return t.value;
                  })
                : [];
            }),
            (t.prototype.firstChild = function (t) {
              var e = qc(t, this._root);
              return e && e.children.length > 0 ? e.children[0].value : null;
            }),
            (t.prototype.siblings = function (t) {
              var e = Zc(t, this._root);
              return e.length < 2
                ? []
                : e[e.length - 2].children
                    .map(function (t) {
                      return t.value;
                    })
                    .filter(function (e) {
                      return e !== t;
                    });
            }),
            (t.prototype.pathFromRoot = function (t) {
              return Zc(t, this._root).map(function (t) {
                return t.value;
              });
            }),
            t
          );
        })();
      function qc(t, e) {
        var n, r;
        if (t === e.value) return e;
        try {
          for (var o = u(e.children), i = o.next(); !i.done; i = o.next()) {
            var l = qc(t, i.value);
            if (l) return l;
          }
        } catch (a) {
          n = { error: a };
        } finally {
          try {
            i && !i.done && (r = o.return) && r.call(o);
          } finally {
            if (n) throw n.error;
          }
        }
        return null;
      }
      function Zc(t, e) {
        var n, r;
        if (t === e.value) return [e];
        try {
          for (var o = u(e.children), i = o.next(); !i.done; i = o.next()) {
            var l = Zc(t, i.value);
            if (l.length) return l.unshift(e), l;
          }
        } catch (a) {
          n = { error: a };
        } finally {
          try {
            i && !i.done && (r = o.return) && r.call(o);
          } finally {
            if (n) throw n.error;
          }
        }
        return [];
      }
      var Qc = (function () {
        function t(t, e) {
          (this.value = t), (this.children = e);
        }
        return (
          (t.prototype.toString = function () {
            return "TreeNode(" + this.value + ")";
          }),
          t
        );
      })();
      function Yc(t) {
        var e = {};
        return (
          t &&
            t.children.forEach(function (t) {
              return (e[t.value.outlet] = t);
            }),
          e
        );
      }
      var $c = (function (t) {
        function e(e, n) {
          var r = t.call(this, e) || this;
          return (r.snapshot = n), nh(r, e), r;
        }
        return (
          o(e, t),
          (e.prototype.toString = function () {
            return this.snapshot.toString();
          }),
          e
        );
      })(Gc);
      function Kc(t, e) {
        var n = (function (t, e) {
            var n = new th([], {}, {}, "", {}, uc, e, null, t.root, -1, {});
            return new eh("", new Qc(n, []));
          })(t, e),
          r = new qa([new Tc("", {})]),
          o = new qa({}),
          i = new qa({}),
          l = new qa({}),
          a = new qa(""),
          u = new Xc(r, o, l, a, i, uc, e, n.root);
        return (u.snapshot = n.root), new $c(new Qc(u, []), n);
      }
      var Xc = (function () {
        function t(t, e, n, r, o, i, l, a) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = o),
            (this.outlet = i),
            (this.component = l),
            (this._futureSnapshot = a);
        }
        return (
          Object.defineProperty(t.prototype, "routeConfig", {
            get: function () {
              return this._futureSnapshot.routeConfig;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "root", {
            get: function () {
              return this._routerState.root;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "parent", {
            get: function () {
              return this._routerState.parent(this);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "firstChild", {
            get: function () {
              return this._routerState.firstChild(this);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "children", {
            get: function () {
              return this._routerState.children(this);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "pathFromRoot", {
            get: function () {
              return this._routerState.pathFromRoot(this);
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "paramMap", {
            get: function () {
              return (
                this._paramMap ||
                  (this._paramMap = this.params.pipe(
                    $(function (t) {
                      return cc(t);
                    })
                  )),
                this._paramMap
              );
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(t.prototype, "queryParamMap", {
            get: function () {
              return (
                this._queryParamMap ||
                  (this._queryParamMap = this.queryParams.pipe(
                    $(function (t) {
                      return cc(t);
                    })
                  )),
                this._queryParamMap
              );
            },
            enumerable: !0,
            configurable: !0,
          }),
          (t.prototype.toString = function () {
            return this.snapshot
              ? this.snapshot.toString()
              : "Future(" + this._futureSnapshot + ")";
          }),
          t
        );
      })();
      function Jc(t, e) {
        void 0 === e && (e = "emptyOnly");
        var n = t.pathFromRoot,
          r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            var o = n[r],
              l = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (l.component) break;
              r--;
            }
          }
        return (function (t) {
          return t.reduce(
            function (t, e) {
              return {
                params: i({}, t.params, e.params),
                data: i({}, t.data, e.data),
                resolve: i({}, t.resolve, e._resolvedData),
              };
            },
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      var th = (function () {
          function t(t, e, n, r, o, i, l, a, u, s, c) {
            (this.url = t),
              (this.params = e),
              (this.queryParams = n),
              (this.fragment = r),
              (this.data = o),
              (this.outlet = i),
              (this.component = l),
              (this.routeConfig = a),
              (this._urlSegment = u),
              (this._lastPathIndex = s),
              (this._resolve = c);
          }
          return (
            Object.defineProperty(t.prototype, "root", {
              get: function () {
                return this._routerState.root;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "parent", {
              get: function () {
                return this._routerState.parent(this);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "firstChild", {
              get: function () {
                return this._routerState.firstChild(this);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "children", {
              get: function () {
                return this._routerState.children(this);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "pathFromRoot", {
              get: function () {
                return this._routerState.pathFromRoot(this);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "paramMap", {
              get: function () {
                return (
                  this._paramMap || (this._paramMap = cc(this.params)),
                  this._paramMap
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "queryParamMap", {
              get: function () {
                return (
                  this._queryParamMap ||
                    (this._queryParamMap = cc(this.queryParams)),
                  this._queryParamMap
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.toString = function () {
              return (
                "Route(url:'" +
                this.url
                  .map(function (t) {
                    return t.toString();
                  })
                  .join("/") +
                "', path:'" +
                (this.routeConfig ? this.routeConfig.path : "") +
                "')"
              );
            }),
            t
          );
        })(),
        eh = (function (t) {
          function e(e, n) {
            var r = t.call(this, n) || this;
            return (r.url = e), nh(r, n), r;
          }
          return (
            o(e, t),
            (e.prototype.toString = function () {
              return rh(this._root);
            }),
            e
          );
        })(Gc);
      function nh(t, e) {
        (e.value._routerState = t),
          e.children.forEach(function (e) {
            return nh(t, e);
          });
      }
      function rh(t) {
        var e =
          t.children.length > 0
            ? " { " + t.children.map(rh).join(", ") + " } "
            : "";
        return "" + t.value + e;
      }
      function oh(t) {
        if (t.snapshot) {
          var e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            bc(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            bc(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (var n = 0; n < t.length; ++n) if (!bc(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            bc(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function ih(t, e) {
        var n, r;
        return (
          bc(t.params, e.params) &&
          kc((n = t.url), (r = e.url)) &&
          n.every(function (t, e) {
            return bc(t.parameters, r[e].parameters);
          }) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || ih(t.parent, e.parent))
        );
      }
      function lh(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function ah(t, e, n, r, o) {
        var i = {};
        return (
          r &&
            Cc(r, function (t, e) {
              i[e] = Array.isArray(t)
                ? t.map(function (t) {
                    return "" + t;
                  })
                : "" + t;
            }),
          new xc(
            n.root === t
              ? e
              : (function t(e, n, r) {
                  var o = {};
                  return (
                    Cc(e.children, function (e, i) {
                      o[i] = e === n ? r : t(e, n, r);
                    }),
                    new Oc(e.segments, o)
                  );
                })(n.root, t, e),
            i,
            o
          )
        );
      }
      var uh = (function () {
          function t(t, e, n) {
            if (
              ((this.isAbsolute = t),
              (this.numberOfDoubleDots = e),
              (this.commands = n),
              t && n.length > 0 && lh(n[0]))
            )
              throw new Error("Root segment cannot have matrix parameters");
            var r = n.find(function (t) {
              return "object" == typeof t && null != t && t.outlets;
            });
            if (r && r !== wc(n))
              throw new Error("{outlets:{}} has to be the last command");
          }
          return (
            (t.prototype.toRoot = function () {
              return (
                this.isAbsolute &&
                1 === this.commands.length &&
                "/" == this.commands[0]
              );
            }),
            t
          );
        })(),
        sh = (function () {
          return function (t, e, n) {
            (this.segmentGroup = t),
              (this.processChildren = e),
              (this.index = n);
          };
        })();
      function ch(t) {
        return "object" == typeof t && null != t && t.outlets
          ? t.outlets[uc]
          : "" + t;
      }
      function hh(t, e, n) {
        if (
          (t || (t = new Oc([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return ph(t, e, n);
        var r = (function (t, e, n) {
            for (
              var r = 0,
                o = e,
                i = { match: !1, pathIndex: 0, commandIndex: 0 };
              o < t.segments.length;

            ) {
              if (r >= n.length) return i;
              var l = t.segments[o],
                a = ch(n[r]),
                u = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === a) break;
              if (a && u && "object" == typeof u && void 0 === u.outlets) {
                if (!vh(a, u, l)) return i;
                r += 2;
              } else {
                if (!vh(a, {}, l)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(t, e, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          var i = new Oc(t.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[uc] = new Oc(
              t.segments.slice(r.pathIndex),
              t.children
            )),
            ph(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new Oc(t.segments, {})
          : r.match && !t.hasChildren()
          ? fh(t, e, n)
          : r.match
          ? ph(t, 0, o)
          : fh(t, e, n);
      }
      function ph(t, e, n) {
        if (0 === n.length) return new Oc(t.segments, {});
        var r = (function (t) {
            var e, n;
            return "object" != typeof t[0]
              ? (((e = {})[uc] = t), e)
              : void 0 === t[0].outlets
              ? (((n = {})[uc] = t), n)
              : t[0].outlets;
          })(n),
          o = {};
        return (
          Cc(r, function (n, r) {
            null !== n && (o[r] = hh(t.children[r], e, n));
          }),
          Cc(t.children, function (t, e) {
            void 0 === r[e] && (o[e] = t);
          }),
          new Oc(t.segments, o)
        );
      }
      function fh(t, e, n) {
        for (var r = t.segments.slice(0, e), o = 0; o < n.length; ) {
          if ("object" == typeof n[o] && void 0 !== n[o].outlets) {
            var i = dh(n[o].outlets);
            return new Oc(r, i);
          }
          if (0 === o && lh(n[0]))
            r.push(new Tc(t.segments[e].path, n[0])), o++;
          else {
            var l = ch(n[o]),
              a = o < n.length - 1 ? n[o + 1] : null;
            l && a && lh(a)
              ? (r.push(new Tc(l, gh(a))), (o += 2))
              : (r.push(new Tc(l, {})), o++);
          }
        }
        return new Oc(r, {});
      }
      function dh(t) {
        var e = {};
        return (
          Cc(t, function (t, n) {
            null !== t && (e[n] = fh(new Oc([], {}), 0, t));
          }),
          e
        );
      }
      function gh(t) {
        var e = {};
        return (
          Cc(t, function (t, n) {
            return (e[n] = "" + t);
          }),
          e
        );
      }
      function vh(t, e, n) {
        return t == n.path && bc(e, n.parameters);
      }
      var mh = (function () {
        function t(t, e, n, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = r);
        }
        return (
          (t.prototype.activate = function (t) {
            var e = this.futureState._root,
              n = this.currState ? this.currState._root : null;
            this.deactivateChildRoutes(e, n, t),
              oh(this.futureState.root),
              this.activateChildRoutes(e, n, t);
          }),
          (t.prototype.deactivateChildRoutes = function (t, e, n) {
            var r = this,
              o = Yc(e);
            t.children.forEach(function (t) {
              var e = t.value.outlet;
              r.deactivateRoutes(t, o[e], n), delete o[e];
            }),
              Cc(o, function (t, e) {
                r.deactivateRouteAndItsChildren(t, n);
              });
          }),
          (t.prototype.deactivateRoutes = function (t, e, n) {
            var r = t.value,
              o = e ? e.value : null;
            if (r === o)
              if (r.component) {
                var i = n.getContext(r.outlet);
                i && this.deactivateChildRoutes(t, e, i.children);
              } else this.deactivateChildRoutes(t, e, n);
            else o && this.deactivateRouteAndItsChildren(e, n);
          }),
          (t.prototype.deactivateRouteAndItsChildren = function (t, e) {
            this.routeReuseStrategy.shouldDetach(t.value.snapshot)
              ? this.detachAndStoreRouteSubtree(t, e)
              : this.deactivateRouteAndOutlet(t, e);
          }),
          (t.prototype.detachAndStoreRouteSubtree = function (t, e) {
            var n = e.getContext(t.value.outlet);
            if (n && n.outlet) {
              var r = n.outlet.detach(),
                o = n.children.onOutletDeactivated();
              this.routeReuseStrategy.store(t.value.snapshot, {
                componentRef: r,
                route: t,
                contexts: o,
              });
            }
          }),
          (t.prototype.deactivateRouteAndOutlet = function (t, e) {
            var n = this,
              r = e.getContext(t.value.outlet);
            if (r) {
              var o = Yc(t),
                i = t.value.component ? r.children : e;
              Cc(o, function (t, e) {
                return n.deactivateRouteAndItsChildren(t, i);
              }),
                r.outlet &&
                  (r.outlet.deactivate(), r.children.onOutletDeactivated());
            }
          }),
          (t.prototype.activateChildRoutes = function (t, e, n) {
            var r = this,
              o = Yc(e);
            t.children.forEach(function (t) {
              r.activateRoutes(t, o[t.value.outlet], n),
                r.forwardEvent(new ic(t.value.snapshot));
            }),
              t.children.length && this.forwardEvent(new rc(t.value.snapshot));
          }),
          (t.prototype.activateRoutes = function (t, e, n) {
            var r = t.value,
              o = e ? e.value : null;
            if ((oh(r), r === o))
              if (r.component) {
                var i = n.getOrCreateContext(r.outlet);
                this.activateChildRoutes(t, e, i.children);
              } else this.activateChildRoutes(t, e, n);
            else if (r.component)
              if (
                ((i = n.getOrCreateContext(r.outlet)),
                this.routeReuseStrategy.shouldAttach(r.snapshot))
              ) {
                var l = this.routeReuseStrategy.retrieve(r.snapshot);
                this.routeReuseStrategy.store(r.snapshot, null),
                  i.children.onOutletReAttached(l.contexts),
                  (i.attachRef = l.componentRef),
                  (i.route = l.route.value),
                  i.outlet && i.outlet.attach(l.componentRef, l.route.value),
                  yh(l.route);
              } else {
                var a = (function (t) {
                    for (var e = r.snapshot.parent; e; e = e.parent) {
                      var n = e.routeConfig;
                      if (n && n._loadedConfig) return n._loadedConfig;
                      if (n && n.component) return null;
                    }
                    return null;
                  })(),
                  u = a ? a.module.componentFactoryResolver : null;
                (i.attachRef = null),
                  (i.route = r),
                  (i.resolver = u),
                  i.outlet && i.outlet.activateWith(r, u),
                  this.activateChildRoutes(t, null, i.children);
              }
            else this.activateChildRoutes(t, null, n);
          }),
          t
        );
      })();
      function yh(t) {
        oh(t.value), t.children.forEach(yh);
      }
      function bh(t) {
        return "function" == typeof t;
      }
      function _h(t) {
        return t instanceof xc;
      }
      var wh = (function () {
          return function (t) {
            this.segmentGroup = t || null;
          };
        })(),
        Ch = (function () {
          return function (t) {
            this.urlTree = t;
          };
        })();
      function Eh(t) {
        return new A(function (e) {
          return e.error(new wh(t));
        });
      }
      function Sh(t) {
        return new A(function (e) {
          return e.error(new Ch(t));
        });
      }
      function xh(t) {
        return new A(function (e) {
          return e.error(
            new Error(
              "Only absolute redirects can have named outlets. redirectTo: '" +
                t +
                "'"
            )
          );
        });
      }
      var Oh = (function () {
        function t(t, e, n, r, o) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = o),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(an));
        }
        return (
          (t.prototype.apply = function () {
            var t = this;
            return this.expandSegmentGroup(
              this.ngModule,
              this.config,
              this.urlTree.root,
              uc
            )
              .pipe(
                $(function (e) {
                  return t.createUrlTree(
                    e,
                    t.urlTree.queryParams,
                    t.urlTree.fragment
                  );
                })
              )
              .pipe(
                mu(function (e) {
                  if (e instanceof Ch)
                    return (t.allowRedirects = !1), t.match(e.urlTree);
                  if (e instanceof wh) throw t.noMatchError(e);
                  throw e;
                })
              );
          }),
          (t.prototype.match = function (t) {
            var e = this;
            return this.expandSegmentGroup(
              this.ngModule,
              this.config,
              t.root,
              uc
            )
              .pipe(
                $(function (n) {
                  return e.createUrlTree(n, t.queryParams, t.fragment);
                })
              )
              .pipe(
                mu(function (t) {
                  if (t instanceof wh) throw e.noMatchError(t);
                  throw t;
                })
              );
          }),
          (t.prototype.noMatchError = function (t) {
            return new Error(
              "Cannot match any routes. URL Segment: '" + t.segmentGroup + "'"
            );
          }),
          (t.prototype.createUrlTree = function (t, e, n) {
            var r,
              o =
                t.segments.length > 0 ? new Oc([], (((r = {})[uc] = t), r)) : t;
            return new xc(o, e, n);
          }),
          (t.prototype.expandSegmentGroup = function (t, e, n, r) {
            return 0 === n.segments.length && n.hasChildren()
              ? this.expandChildren(t, e, n).pipe(
                  $(function (t) {
                    return new Oc([], t);
                  })
                )
              : this.expandSegment(t, n, e, n.segments, r, !0);
          }),
          (t.prototype.expandChildren = function (t, e, n) {
            var r = this;
            return (function (n, o) {
              if (0 === Object.keys(n).length) return Ga({});
              var i = [],
                l = [],
                a = {};
              return (
                Cc(n, function (n, o) {
                  var u,
                    s,
                    c = ((u = o),
                    (s = n),
                    r.expandSegmentGroup(t, e, s, u)).pipe(
                      $(function (t) {
                        return (a[o] = t);
                      })
                    );
                  o === uc ? i.push(c) : l.push(c);
                }),
                Ga.apply(null, i.concat(l)).pipe(
                  Ja(),
                  vu(),
                  $(function () {
                    return a;
                  })
                )
              );
            })(n.children);
          }),
          (t.prototype.expandSegment = function (t, e, n, r, o, i) {
            var l = this;
            return Ga.apply(void 0, c(n)).pipe(
              $(function (a) {
                return l.expandSegmentAgainstRoute(t, e, n, a, r, o, i).pipe(
                  mu(function (t) {
                    if (t instanceof wh) return Ga(null);
                    throw t;
                  })
                );
              }),
              Ja(),
              Eu(function (t) {
                return !!t;
              }),
              mu(function (t, n) {
                if (t instanceof Qa || "EmptyError" === t.name) {
                  if (l.noLeftoversInUrl(e, r, o)) return Ga(new Oc([], {}));
                  throw new wh(e);
                }
                throw t;
              })
            );
          }),
          (t.prototype.noLeftoversInUrl = function (t, e, n) {
            return 0 === e.length && !t.children[n];
          }),
          (t.prototype.expandSegmentAgainstRoute = function (
            t,
            e,
            n,
            r,
            o,
            i,
            l
          ) {
            return Ih(r) !== i
              ? Eh(e)
              : void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, e, r, o)
              : l && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, o, i)
              : Eh(e);
          }),
          (t.prototype.expandSegmentAgainstRouteUsingRedirect = function (
            t,
            e,
            n,
            r,
            o,
            i
          ) {
            return "**" === r.path
              ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(
                  t,
                  n,
                  r,
                  i
                )
              : this.expandRegularSegmentAgainstRouteUsingRedirect(
                  t,
                  e,
                  n,
                  r,
                  o,
                  i
                );
          }),
          (t.prototype.expandWildCardWithParamsAgainstRouteUsingRedirect =
            function (t, e, n, r) {
              var o = this,
                i = this.applyRedirectCommands([], n.redirectTo, {});
              return n.redirectTo.startsWith("/")
                ? Sh(i)
                : this.lineralizeSegments(n, i).pipe(
                    et(function (n) {
                      var i = new Oc(n, {});
                      return o.expandSegment(t, i, e, n, r, !1);
                    })
                  );
            }),
          (t.prototype.expandRegularSegmentAgainstRouteUsingRedirect =
            function (t, e, n, r, o, i) {
              var l = this,
                a = Th(e, r, o),
                u = a.consumedSegments,
                s = a.lastChild,
                c = a.positionalParamSegments;
              if (!a.matched) return Eh(e);
              var h = this.applyRedirectCommands(u, r.redirectTo, c);
              return r.redirectTo.startsWith("/")
                ? Sh(h)
                : this.lineralizeSegments(r, h).pipe(
                    et(function (r) {
                      return l.expandSegment(
                        t,
                        e,
                        n,
                        r.concat(o.slice(s)),
                        i,
                        !1
                      );
                    })
                  );
            }),
          (t.prototype.matchSegmentAgainstRoute = function (t, e, n, r) {
            var o = this;
            if ("**" === n.path)
              return n.loadChildren
                ? this.configLoader.load(t.injector, n).pipe(
                    $(function (t) {
                      return (n._loadedConfig = t), new Oc(r, {});
                    })
                  )
                : Ga(new Oc(r, {}));
            var l = Th(e, n, r),
              a = l.consumedSegments,
              s = l.lastChild;
            if (!l.matched) return Eh(e);
            var c = r.slice(s);
            return this.getChildConfig(t, n, r).pipe(
              et(function (t) {
                var n = t.module,
                  r = t.routes,
                  l = (function (t, e, n, r) {
                    return n.length > 0 &&
                      (function (t, e, n) {
                        return r.some(function (n) {
                          return Ah(t, e, n) && Ih(n) !== uc;
                        });
                      })(t, n)
                      ? {
                          segmentGroup: kh(
                            new Oc(
                              e,
                              (function (t, e) {
                                var n,
                                  r,
                                  o = {};
                                o[uc] = e;
                                try {
                                  for (
                                    var i = u(t), l = i.next();
                                    !l.done;
                                    l = i.next()
                                  ) {
                                    var a = l.value;
                                    "" === a.path &&
                                      Ih(a) !== uc &&
                                      (o[Ih(a)] = new Oc([], {}));
                                  }
                                } catch (s) {
                                  n = { error: s };
                                } finally {
                                  try {
                                    l && !l.done && (r = i.return) && r.call(i);
                                  } finally {
                                    if (n) throw n.error;
                                  }
                                }
                                return o;
                              })(r, new Oc(n, t.children))
                            )
                          ),
                          slicedSegments: [],
                        }
                      : 0 === n.length &&
                        (function (t, e, n) {
                          return r.some(function (n) {
                            return Ah(t, e, n);
                          });
                        })(t, n)
                      ? {
                          segmentGroup: kh(
                            new Oc(
                              t.segments,
                              (function (t, e, n, r) {
                                var o,
                                  l,
                                  a = {};
                                try {
                                  for (
                                    var s = u(n), c = s.next();
                                    !c.done;
                                    c = s.next()
                                  ) {
                                    var h = c.value;
                                    Ah(t, e, h) &&
                                      !r[Ih(h)] &&
                                      (a[Ih(h)] = new Oc([], {}));
                                  }
                                } catch (p) {
                                  o = { error: p };
                                } finally {
                                  try {
                                    c && !c.done && (l = s.return) && l.call(s);
                                  } finally {
                                    if (o) throw o.error;
                                  }
                                }
                                return i({}, r, a);
                              })(t, n, r, t.children)
                            )
                          ),
                          slicedSegments: n,
                        }
                      : { segmentGroup: t, slicedSegments: n };
                  })(e, a, c, r),
                  s = l.segmentGroup,
                  h = l.slicedSegments;
                return 0 === h.length && s.hasChildren()
                  ? o.expandChildren(n, r, s).pipe(
                      $(function (t) {
                        return new Oc(a, t);
                      })
                    )
                  : 0 === r.length && 0 === h.length
                  ? Ga(new Oc(a, {}))
                  : o.expandSegment(n, s, r, h, uc, !0).pipe(
                      $(function (t) {
                        return new Oc(a.concat(t.segments), t.children);
                      })
                    );
              })
            );
          }),
          (t.prototype.getChildConfig = function (t, e, n) {
            var r = this;
            return e.children
              ? Ga(new dc(e.children, t))
              : e.loadChildren
              ? void 0 !== e._loadedConfig
                ? Ga(e._loadedConfig)
                : (function (t, e, n) {
                    var r,
                      o = e.canLoad;
                    return o && 0 !== o.length
                      ? tt(o)
                          .pipe(
                            $(function (r) {
                              var o,
                                i = t.get(r);
                              if (
                                (function (t) {
                                  return t && bh(t.canLoad);
                                })(i)
                              )
                                o = i.canLoad(e, n);
                              else {
                                if (!bh(i))
                                  throw new Error("Invalid CanLoad guard");
                                o = i(e, n);
                              }
                              return Ec(o);
                            })
                          )
                          .pipe(
                            Ja(),
                            ((r = function (t) {
                              return !0 === t;
                            }),
                            function (t) {
                              return t.lift(new Su(r, void 0, t));
                            })
                          )
                      : Ga(!0);
                  })(t.injector, e, n).pipe(
                    et(function (n) {
                      return n
                        ? r.configLoader.load(t.injector, e).pipe(
                            $(function (t) {
                              return (e._loadedConfig = t), t;
                            })
                          )
                        : (function (t) {
                            return new A(function (e) {
                              return e.error(
                                pc(
                                  "Cannot load children because the guard of the route \"path: '" +
                                    t.path +
                                    "'\" returned false"
                                )
                              );
                            });
                          })(e);
                    })
                  )
              : Ga(new dc([], t));
          }),
          (t.prototype.lineralizeSegments = function (t, e) {
            for (var n = [], r = e.root; ; ) {
              if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
                return Ga(n);
              if (r.numberOfChildren > 1 || !r.children[uc])
                return xh(t.redirectTo);
              r = r.children[uc];
            }
          }),
          (t.prototype.applyRedirectCommands = function (t, e, n) {
            return this.applyRedirectCreatreUrlTree(
              e,
              this.urlSerializer.parse(e),
              t,
              n
            );
          }),
          (t.prototype.applyRedirectCreatreUrlTree = function (t, e, n, r) {
            var o = this.createSegmentGroup(t, e.root, n, r);
            return new xc(
              o,
              this.createQueryParams(e.queryParams, this.urlTree.queryParams),
              e.fragment
            );
          }),
          (t.prototype.createQueryParams = function (t, e) {
            var n = {};
            return (
              Cc(t, function (t, r) {
                if ("string" == typeof t && t.startsWith(":")) {
                  var o = t.substring(1);
                  n[r] = e[o];
                } else n[r] = t;
              }),
              n
            );
          }),
          (t.prototype.createSegmentGroup = function (t, e, n, r) {
            var o = this,
              i = this.createSegments(t, e.segments, n, r),
              l = {};
            return (
              Cc(e.children, function (e, i) {
                l[i] = o.createSegmentGroup(t, e, n, r);
              }),
              new Oc(i, l)
            );
          }),
          (t.prototype.createSegments = function (t, e, n, r) {
            var o = this;
            return e.map(function (e) {
              return e.path.startsWith(":")
                ? o.findPosParam(t, e, r)
                : o.findOrReturn(e, n);
            });
          }),
          (t.prototype.findPosParam = function (t, e, n) {
            var r = n[e.path.substring(1)];
            if (!r)
              throw new Error(
                "Cannot redirect to '" + t + "'. Cannot find '" + e.path + "'."
              );
            return r;
          }),
          (t.prototype.findOrReturn = function (t, e) {
            var n,
              r,
              o = 0;
            try {
              for (var i = u(e), l = i.next(); !l.done; l = i.next()) {
                var a = l.value;
                if (a.path === t.path) return e.splice(o), a;
                o++;
              }
            } catch (s) {
              n = { error: s };
            } finally {
              try {
                l && !l.done && (r = i.return) && r.call(i);
              } finally {
                if (n) throw n.error;
              }
            }
            return t;
          }),
          t
        );
      })();
      function Th(t, e, n) {
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              }
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              };
        var r = (e.matcher || fc)(n, t, e);
        return r
          ? {
              matched: !0,
              consumedSegments: r.consumed,
              lastChild: r.consumed.length,
              positionalParamSegments: r.posParams,
            }
          : {
              matched: !1,
              consumedSegments: [],
              lastChild: 0,
              positionalParamSegments: {},
            };
      }
      function kh(t) {
        if (1 === t.numberOfChildren && t.children[uc]) {
          var e = t.children[uc];
          return new Oc(t.segments.concat(e.segments), e.children);
        }
        return t;
      }
      function Ah(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      function Ih(t) {
        return t.outlet || uc;
      }
      var Ph = (function () {
          return function (t) {
            (this.path = t), (this.route = this.path[this.path.length - 1]);
          };
        })(),
        Rh = (function () {
          return function (t, e) {
            (this.component = t), (this.route = e);
          };
        })();
      function Nh(t, e, n) {
        var r = (function (t) {
          if (!t) return null;
          for (var e = t.parent; e; e = e.parent) {
            var n = e.routeConfig;
            if (n && n._loadedConfig) return n._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function Dh(t, e, n, r, o) {
        void 0 === o &&
          (o = { canDeactivateChecks: [], canActivateChecks: [] });
        var i = Yc(e);
        return (
          t.children.forEach(function (t) {
            !(function (t, e, n, r, o) {
              void 0 === o &&
                (o = { canDeactivateChecks: [], canActivateChecks: [] });
              var i = t.value,
                l = e ? e.value : null,
                a = n ? n.getContext(t.value.outlet) : null;
              if (l && i.routeConfig === l.routeConfig) {
                var u = (function (t, e, n) {
                  if ("function" == typeof n) return n(t, e);
                  switch (n) {
                    case "pathParamsChange":
                      return !kc(t.url, e.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !kc(t.url, e.url) || !bc(t.queryParams, e.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !ih(t, e) || !bc(t.queryParams, e.queryParams);
                    case "paramsChange":
                    default:
                      return !ih(t, e);
                  }
                })(l, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new Ph(r))
                  : ((i.data = l.data), (i._resolvedData = l._resolvedData)),
                  Dh(t, e, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    o.canDeactivateChecks.push(
                      new Rh((a && a.outlet && a.outlet.component) || null, l)
                    );
              } else
                l && Mh(e, a, o),
                  o.canActivateChecks.push(new Ph(r)),
                  Dh(t, null, i.component ? (a ? a.children : null) : n, r, o);
            })(t, i[t.value.outlet], n, r.concat([t.value]), o),
              delete i[t.value.outlet];
          }),
          Cc(i, function (t, e) {
            return Mh(t, n.getContext(e), o);
          }),
          o
        );
      }
      function Mh(t, e, n) {
        var r = Yc(t),
          o = t.value;
        Cc(r, function (t, r) {
          Mh(t, o.component ? (e ? e.children.getContext(r) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new Rh(
              o.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              o
            )
          );
      }
      var jh = Symbol("INITIAL_VALUE");
      function Vh() {
        return Ou(function (t) {
          return function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e] = arguments[e];
            var n = null,
              r = null;
            return (
              V(t[t.length - 1]) && (r = t.pop()),
              "function" == typeof t[t.length - 1] && (n = t.pop()),
              1 === t.length && h(t[0]) && (t = t[0]),
              J(t, r).lift(new $a(n))
            );
          }
            .apply(
              void 0,
              c(
                t.map(function (t) {
                  return t.pipe(
                    _u(1),
                    (function () {
                      for (var t = [], e = 0; e < arguments.length; e++)
                        t[e] = arguments[e];
                      return function (e) {
                        var n = t[t.length - 1];
                        V(n) ? t.pop() : (n = null);
                        var r = t.length;
                        return (function () {
                          for (var t = [], e = 0; e < arguments.length; e++)
                            t[e] = arguments[e];
                          return Ja()(Ga.apply(void 0, t));
                        })(
                          1 !== r || n ? (r > 0 ? J(t, n) : Ba(n)) : Wa(t[0]),
                          e
                        );
                      };
                    })(jh)
                  );
                })
              )
            )
            .pipe(
              Au(function (t, e) {
                var n = !1;
                return e.reduce(function (t, r, o) {
                  if (t !== jh) return t;
                  if ((r === jh && (n = !0), !n)) {
                    if (!1 === r) return r;
                    if (o === e.length - 1 || _h(r)) return r;
                  }
                  return t;
                }, t);
              }, jh),
              tu(function (t) {
                return t !== jh;
              }),
              $(function (t) {
                return _h(t) ? t : !0 === t;
              }),
              _u(1)
            );
        });
      }
      function Lh(t, e) {
        return null !== t && e && e(new oc(t)), Ga(!0);
      }
      function Fh(t, e) {
        return null !== t && e && e(new nc(t)), Ga(!0);
      }
      function Uh(t, e, n) {
        var r = e.routeConfig ? e.routeConfig.canActivate : null;
        return r && 0 !== r.length
          ? Ga(
              r.map(function (r) {
                return Xa(function () {
                  var o,
                    i = Nh(r, e, n);
                  if (
                    (function (t) {
                      return t && bh(t.canActivate);
                    })(i)
                  )
                    o = Ec(i.canActivate(e, t));
                  else {
                    if (!bh(i)) throw new Error("Invalid CanActivate guard");
                    o = Ec(i(e, t));
                  }
                  return o.pipe(Eu());
                });
              })
            ).pipe(Vh())
          : Ga(!0);
      }
      function Hh(t, e, n) {
        var r = e[e.length - 1],
          o = e
            .slice(0, e.length - 1)
            .reverse()
            .map(function (t) {
              return (function (t) {
                var e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                return e && 0 !== e.length ? { node: t, guards: e } : null;
              })(t);
            })
            .filter(function (t) {
              return null !== t;
            })
            .map(function (e) {
              return Xa(function () {
                return Ga(
                  e.guards.map(function (o) {
                    var i,
                      l = Nh(o, e.node, n);
                    if (
                      (function (t) {
                        return t && bh(t.canActivateChild);
                      })(l)
                    )
                      i = Ec(l.canActivateChild(r, t));
                    else {
                      if (!bh(l))
                        throw new Error("Invalid CanActivateChild guard");
                      i = Ec(l(r, t));
                    }
                    return i.pipe(Eu());
                  })
                ).pipe(Vh());
              });
            });
        return Ga(o).pipe(Vh());
      }
      var zh = (function () {
          return function () {};
        })(),
        Bh = (function () {
          function t(t, e, n, r, o, i) {
            (this.rootComponentType = t),
              (this.config = e),
              (this.urlTree = n),
              (this.url = r),
              (this.paramsInheritanceStrategy = o),
              (this.relativeLinkResolution = i);
          }
          return (
            (t.prototype.recognize = function () {
              try {
                var t = qh(
                    this.urlTree.root,
                    [],
                    [],
                    this.config,
                    this.relativeLinkResolution
                  ).segmentGroup,
                  e = this.processSegmentGroup(this.config, t, uc),
                  n = new th(
                    [],
                    Object.freeze({}),
                    Object.freeze(i({}, this.urlTree.queryParams)),
                    this.urlTree.fragment,
                    {},
                    uc,
                    this.rootComponentType,
                    null,
                    this.urlTree.root,
                    -1,
                    {}
                  ),
                  r = new Qc(n, e),
                  o = new eh(this.url, r);
                return this.inheritParamsAndData(o._root), Ga(o);
              } catch (l) {
                return new A(function (t) {
                  return t.error(l);
                });
              }
            }),
            (t.prototype.inheritParamsAndData = function (t) {
              var e = this,
                n = t.value,
                r = Jc(n, this.paramsInheritanceStrategy);
              (n.params = Object.freeze(r.params)),
                (n.data = Object.freeze(r.data)),
                t.children.forEach(function (t) {
                  return e.inheritParamsAndData(t);
                });
            }),
            (t.prototype.processSegmentGroup = function (t, e, n) {
              return 0 === e.segments.length && e.hasChildren()
                ? this.processChildren(t, e)
                : this.processSegment(t, e, e.segments, n);
            }),
            (t.prototype.processChildren = function (t, e) {
              var n,
                r = this,
                o = Ac(e, function (e, n) {
                  return r.processSegmentGroup(t, e, n);
                });
              return (
                (n = {}),
                o.forEach(function (t) {
                  var e = n[t.value.outlet];
                  if (e) {
                    var r = e.url
                        .map(function (t) {
                          return t.toString();
                        })
                        .join("/"),
                      o = t.value.url
                        .map(function (t) {
                          return t.toString();
                        })
                        .join("/");
                    throw new Error(
                      "Two segments cannot have the same outlet name: '" +
                        r +
                        "' and '" +
                        o +
                        "'."
                    );
                  }
                  n[t.value.outlet] = t.value;
                }),
                o.sort(function (t, e) {
                  return t.value.outlet === uc
                    ? -1
                    : e.value.outlet === uc
                    ? 1
                    : t.value.outlet.localeCompare(e.value.outlet);
                }),
                o
              );
            }),
            (t.prototype.processSegment = function (t, e, n, r) {
              var o, i;
              try {
                for (var l = u(t), a = l.next(); !a.done; a = l.next()) {
                  var s = a.value;
                  try {
                    return this.processSegmentAgainstRoute(s, e, n, r);
                  } catch (c) {
                    if (!(c instanceof zh)) throw c;
                  }
                }
              } catch (h) {
                o = { error: h };
              } finally {
                try {
                  a && !a.done && (i = l.return) && i.call(l);
                } finally {
                  if (o) throw o.error;
                }
              }
              if (this.noLeftoversInUrl(e, n, r)) return [];
              throw new zh();
            }),
            (t.prototype.noLeftoversInUrl = function (t, e, n) {
              return 0 === e.length && !t.children[n];
            }),
            (t.prototype.processSegmentAgainstRoute = function (t, e, n, r) {
              if (t.redirectTo) throw new zh();
              if ((t.outlet || uc) !== r) throw new zh();
              var o,
                l = [],
                a = [];
              if ("**" === t.path) {
                var u = n.length > 0 ? wc(n).parameters : {};
                o = new th(
                  n,
                  u,
                  Object.freeze(i({}, this.urlTree.queryParams)),
                  this.urlTree.fragment,
                  Yh(t),
                  r,
                  t.component,
                  t,
                  Wh(e),
                  Gh(e) + n.length,
                  $h(t)
                );
              } else {
                var s = (function (t, e, n) {
                  if ("" === e.path) {
                    if (
                      "full" === e.pathMatch &&
                      (t.hasChildren() || n.length > 0)
                    )
                      throw new zh();
                    return {
                      consumedSegments: [],
                      lastChild: 0,
                      parameters: {},
                    };
                  }
                  var r = (e.matcher || fc)(n, t, e);
                  if (!r) throw new zh();
                  var o = {};
                  Cc(r.posParams, function (t, e) {
                    o[e] = t.path;
                  });
                  var l =
                    r.consumed.length > 0
                      ? i({}, o, r.consumed[r.consumed.length - 1].parameters)
                      : o;
                  return {
                    consumedSegments: r.consumed,
                    lastChild: r.consumed.length,
                    parameters: l,
                  };
                })(e, t, n);
                (l = s.consumedSegments),
                  (a = n.slice(s.lastChild)),
                  (o = new th(
                    l,
                    s.parameters,
                    Object.freeze(i({}, this.urlTree.queryParams)),
                    this.urlTree.fragment,
                    Yh(t),
                    r,
                    t.component,
                    t,
                    Wh(e),
                    Gh(e) + l.length,
                    $h(t)
                  ));
              }
              var c = (function (t) {
                  return t.children
                    ? t.children
                    : t.loadChildren
                    ? t._loadedConfig.routes
                    : [];
                })(t),
                h = qh(e, l, a, c, this.relativeLinkResolution),
                p = h.segmentGroup,
                f = h.slicedSegments;
              if (0 === f.length && p.hasChildren()) {
                var d = this.processChildren(c, p);
                return [new Qc(o, d)];
              }
              if (0 === c.length && 0 === f.length) return [new Qc(o, [])];
              var g = this.processSegment(c, p, f, uc);
              return [new Qc(o, g)];
            }),
            t
          );
        })();
      function Wh(t) {
        for (var e = t; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function Gh(t) {
        for (
          var e = t, n = e._segmentIndexShift ? e._segmentIndexShift : 0;
          e._sourceSegment;

        )
          n += (e = e._sourceSegment)._segmentIndexShift
            ? e._segmentIndexShift
            : 0;
        return n - 1;
      }
      function qh(t, e, n, r, o) {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return r.some(function (n) {
              return Zh(t, e, n) && Qh(n) !== uc;
            });
          })(t, n)
        ) {
          var l = new Oc(
            e,
            (function (t, e, n, r) {
              var o,
                i,
                l = {};
              (l[uc] = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length);
              try {
                for (var a = u(n), s = a.next(); !s.done; s = a.next()) {
                  var c = s.value;
                  if ("" === c.path && Qh(c) !== uc) {
                    var h = new Oc([], {});
                    (h._sourceSegment = t),
                      (h._segmentIndexShift = e.length),
                      (l[Qh(c)] = h);
                  }
                }
              } catch (p) {
                o = { error: p };
              } finally {
                try {
                  s && !s.done && (i = a.return) && i.call(a);
                } finally {
                  if (o) throw o.error;
                }
              }
              return l;
            })(t, e, r, new Oc(n, t.children))
          );
          return (
            (l._sourceSegment = t),
            (l._segmentIndexShift = e.length),
            { segmentGroup: l, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return r.some(function (n) {
              return Zh(t, e, n);
            });
          })(t, n)
        ) {
          var a = new Oc(
            t.segments,
            (function (t, e, n, r, o, l) {
              var a,
                s,
                c = {};
              try {
                for (var h = u(r), p = h.next(); !p.done; p = h.next()) {
                  var f = p.value;
                  if (Zh(t, n, f) && !o[Qh(f)]) {
                    var d = new Oc([], {});
                    (d._sourceSegment = t),
                      (d._segmentIndexShift =
                        "legacy" === l ? t.segments.length : e.length),
                      (c[Qh(f)] = d);
                  }
                }
              } catch (g) {
                a = { error: g };
              } finally {
                try {
                  p && !p.done && (s = h.return) && s.call(h);
                } finally {
                  if (a) throw a.error;
                }
              }
              return i({}, o, c);
            })(t, e, n, r, t.children, o)
          );
          return (
            (a._sourceSegment = t),
            (a._segmentIndexShift = e.length),
            { segmentGroup: a, slicedSegments: n }
          );
        }
        var s = new Oc(t.segments, t.children);
        return (
          (s._sourceSegment = t),
          (s._segmentIndexShift = e.length),
          { segmentGroup: s, slicedSegments: n }
        );
      }
      function Zh(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function Qh(t) {
        return t.outlet || uc;
      }
      function Yh(t) {
        return t.data || {};
      }
      function $h(t) {
        return t.resolve || {};
      }
      function Kh(t, e, n, r) {
        var o = Nh(t, e, r);
        return Ec(o.resolve ? o.resolve(e, n) : o(e, n));
      }
      function Xh(t) {
        return function (e) {
          return e.pipe(
            Ou(function (e) {
              var n = t(e);
              return n
                ? tt(n).pipe(
                    $(function () {
                      return e;
                    })
                  )
                : tt([e]);
            })
          );
        };
      }
      var Jh = (function () {
          return function () {};
        })(),
        tp = (function () {
          function t() {}
          return (
            (t.prototype.shouldDetach = function (t) {
              return !1;
            }),
            (t.prototype.store = function (t, e) {}),
            (t.prototype.shouldAttach = function (t) {
              return !1;
            }),
            (t.prototype.retrieve = function (t) {
              return null;
            }),
            (t.prototype.shouldReuseRoute = function (t, e) {
              return t.routeConfig === e.routeConfig;
            }),
            t
          );
        })(),
        ep = new Lt("ROUTES"),
        np = (function () {
          function t(t, e, n, r) {
            (this.loader = t),
              (this.compiler = e),
              (this.onLoadStartListener = n),
              (this.onLoadEndListener = r);
          }
          return (
            (t.prototype.load = function (t, e) {
              var n = this;
              return (
                this.onLoadStartListener && this.onLoadStartListener(e),
                this.loadModuleFactory(e.loadChildren).pipe(
                  $(function (r) {
                    n.onLoadEndListener && n.onLoadEndListener(e);
                    var o = r.create(t);
                    return new dc(_c(o.injector.get(ep)).map(yc), o);
                  })
                )
              );
            }),
            (t.prototype.loadModuleFactory = function (t) {
              var e = this;
              return "string" == typeof t
                ? tt(this.loader.load(t))
                : Ec(t()).pipe(
                    et(function (t) {
                      return t instanceof un
                        ? Ga(t)
                        : tt(e.compiler.compileModuleAsync(t));
                    })
                  );
            }),
            t
          );
        })(),
        rp = (function () {
          return function () {};
        })(),
        op = (function () {
          function t() {}
          return (
            (t.prototype.shouldProcessUrl = function (t) {
              return !0;
            }),
            (t.prototype.extract = function (t) {
              return t;
            }),
            (t.prototype.merge = function (t, e) {
              return t;
            }),
            t
          );
        })();
      function ip(t) {
        throw t;
      }
      function lp(t, e, n) {
        return e.parse("/");
      }
      function ap(t, e) {
        return Ga(null);
      }
      var up = (function () {
          function t(t, e, n, r, o, i, l, a) {
            var u = this;
            (this.rootComponentType = t),
              (this.urlSerializer = e),
              (this.rootContexts = n),
              (this.location = r),
              (this.config = a),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.navigationId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new M()),
              (this.errorHandler = ip),
              (this.malformedUriErrorHandler = lp),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: ap,
                afterPreactivation: ap,
              }),
              (this.urlHandlingStrategy = new op()),
              (this.routeReuseStrategy = new tp()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "legacy"),
              (this.ngModule = o.get(an)),
              (this.console = o.get(Wo));
            var s = o.get(ai);
            (this.isNgZoneEnabled = s instanceof ai),
              this.resetConfig(a),
              (this.currentUrlTree = new xc(new Oc([], {}), {}, null)),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new np(
                i,
                l,
                function (t) {
                  return u.triggerEvent(new tc(t));
                },
                function (t) {
                  return u.triggerEvent(new ec(t));
                }
              )),
              (this.routerState = Kc(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new qa({
                id: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          return (
            (t.prototype.setupNavigations = function (t) {
              var e = this,
                n = this.events;
              return t.pipe(
                tu(function (t) {
                  return 0 !== t.id;
                }),
                $(function (t) {
                  return i({}, t, {
                    extractedUrl: e.urlHandlingStrategy.extract(t.rawUrl),
                  });
                }),
                Ou(function (t) {
                  var r,
                    o,
                    l,
                    a,
                    s = !1,
                    c = !1;
                  return Ga(t).pipe(
                    uu(function (t) {
                      e.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: e.lastSuccessfulNavigation
                          ? i({}, e.lastSuccessfulNavigation, {
                              previousNavigation: null,
                            })
                          : null,
                      };
                    }),
                    Ou(function (t) {
                      var r,
                        o,
                        l,
                        a,
                        u =
                          !e.navigated ||
                          t.extractedUrl.toString() !==
                            e.browserUrlTree.toString();
                      if (
                        ("reload" === e.onSameUrlNavigation || u) &&
                        e.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return Ga(t).pipe(
                          Ou(function (t) {
                            var r = e.transitions.getValue();
                            return (
                              n.next(
                                new Gs(
                                  t.id,
                                  e.serializeUrl(t.extractedUrl),
                                  t.source,
                                  t.restoredState
                                )
                              ),
                              r !== e.transitions.getValue() ? za : [t]
                            );
                          }),
                          Ou(function (t) {
                            return Promise.resolve(t);
                          }),
                          ((r = e.ngModule.injector),
                          (o = e.configLoader),
                          (l = e.urlSerializer),
                          (a = e.config),
                          function (t) {
                            return t.pipe(
                              Ou(function (t) {
                                return (function (e, n, r, o, i) {
                                  return new Oh(
                                    e,
                                    n,
                                    r,
                                    t.extractedUrl,
                                    i
                                  ).apply();
                                })(r, o, l, 0, a).pipe(
                                  $(function (e) {
                                    return i({}, t, { urlAfterRedirects: e });
                                  })
                                );
                              })
                            );
                          }),
                          uu(function (t) {
                            e.currentNavigation = i({}, e.currentNavigation, {
                              finalUrl: t.urlAfterRedirects,
                            });
                          }),
                          (function (t, n, r, o, l) {
                            return function (r) {
                              return r.pipe(
                                et(function (r) {
                                  return (function (t, e, n, r, o, i) {
                                    return (
                                      void 0 === o && (o = "emptyOnly"),
                                      void 0 === i && (i = "legacy"),
                                      new Bh(t, e, n, r, o, i).recognize()
                                    );
                                  })(
                                    t,
                                    n,
                                    r.urlAfterRedirects,
                                    ((a = r.urlAfterRedirects),
                                    e.serializeUrl(a)),
                                    o,
                                    l
                                  ).pipe(
                                    $(function (t) {
                                      return i({}, r, { targetSnapshot: t });
                                    })
                                  );
                                  var a;
                                })
                              );
                            };
                          })(
                            e.rootComponentType,
                            e.config,
                            0,
                            e.paramsInheritanceStrategy,
                            e.relativeLinkResolution
                          ),
                          uu(function (t) {
                            "eager" === e.urlUpdateStrategy &&
                              (t.extras.skipLocationChange ||
                                e.setBrowserUrl(
                                  t.urlAfterRedirects,
                                  !!t.extras.replaceUrl,
                                  t.id,
                                  t.extras.state
                                ),
                              (e.browserUrlTree = t.urlAfterRedirects));
                          }),
                          uu(function (t) {
                            var r = new Ys(
                              t.id,
                              e.serializeUrl(t.extractedUrl),
                              e.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            n.next(r);
                          })
                        );
                      if (
                        u &&
                        e.rawUrlTree &&
                        e.urlHandlingStrategy.shouldProcessUrl(e.rawUrlTree)
                      ) {
                        var s = t.extractedUrl,
                          c = t.source,
                          h = t.restoredState,
                          p = t.extras,
                          f = new Gs(t.id, e.serializeUrl(s), c, h);
                        n.next(f);
                        var d = Kc(s, e.rootComponentType).snapshot;
                        return Ga(
                          i({}, t, {
                            targetSnapshot: d,
                            urlAfterRedirects: s,
                            extras: i({}, p, {
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            }),
                          })
                        );
                      }
                      return (
                        (e.rawUrlTree = t.rawUrl),
                        (e.browserUrlTree = t.urlAfterRedirects),
                        t.resolve(null),
                        za
                      );
                    }),
                    Xh(function (t) {
                      var n = t.extras;
                      return e.hooks.beforePreactivation(t.targetSnapshot, {
                        navigationId: t.id,
                        appliedUrlTree: t.extractedUrl,
                        rawUrlTree: t.rawUrl,
                        skipLocationChange: !!n.skipLocationChange,
                        replaceUrl: !!n.replaceUrl,
                      });
                    }),
                    uu(function (t) {
                      var n = new $s(
                        t.id,
                        e.serializeUrl(t.extractedUrl),
                        e.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot
                      );
                      e.triggerEvent(n);
                    }),
                    $(function (t) {
                      return i({}, t, {
                        guards:
                          ((n = t.targetSnapshot),
                          (r = t.currentSnapshot),
                          (o = e.rootContexts),
                          (l = n._root),
                          Dh(l, r ? r._root : null, o, [l.value])),
                      });
                      var n, r, o, l;
                    }),
                    (function (t, e) {
                      return function (n) {
                        return n.pipe(
                          et(function (n) {
                            var r = n.targetSnapshot,
                              o = n.currentSnapshot,
                              l = n.guards,
                              a = l.canActivateChecks,
                              u = l.canDeactivateChecks;
                            return 0 === u.length && 0 === a.length
                              ? Ga(i({}, n, { guardsResult: !0 }))
                              : (function (t, e, n, r) {
                                  return tt(u).pipe(
                                    et(function (t) {
                                      return (function (t, e, n, r, o) {
                                        var i =
                                          e && e.routeConfig
                                            ? e.routeConfig.canDeactivate
                                            : null;
                                        return i && 0 !== i.length
                                          ? Ga(
                                              i.map(function (i) {
                                                var l,
                                                  a = Nh(i, e, o);
                                                if (
                                                  (function (t) {
                                                    return (
                                                      t && bh(t.canDeactivate)
                                                    );
                                                  })(a)
                                                )
                                                  l = Ec(
                                                    a.canDeactivate(t, e, n, r)
                                                  );
                                                else {
                                                  if (!bh(a))
                                                    throw new Error(
                                                      "Invalid CanDeactivate guard"
                                                    );
                                                  l = Ec(a(t, e, n, r));
                                                }
                                                return l.pipe(Eu());
                                              })
                                            ).pipe(Vh())
                                          : Ga(!0);
                                      })(t.component, t.route, n, e, r);
                                    }),
                                    Eu(function (t) {
                                      return !0 !== t;
                                    }, !0)
                                  );
                                })(0, r, o, t).pipe(
                                  et(function (n) {
                                    return n && "boolean" == typeof n
                                      ? (function (t, e, n, r) {
                                          return tt(a).pipe(
                                            Ru(function (e) {
                                              return tt([
                                                Fh(e.route.parent, r),
                                                Lh(e.route, r),
                                                Hh(t, e.path, n),
                                                Uh(t, e.route, n),
                                              ]).pipe(
                                                Ja(),
                                                Eu(function (t) {
                                                  return !0 !== t;
                                                }, !0)
                                              );
                                            }),
                                            Eu(function (t) {
                                              return !0 !== t;
                                            }, !0)
                                          );
                                        })(r, 0, t, e)
                                      : Ga(n);
                                  }),
                                  $(function (t) {
                                    return i({}, n, { guardsResult: t });
                                  })
                                );
                          })
                        );
                      };
                    })(e.ngModule.injector, function (t) {
                      return e.triggerEvent(t);
                    }),
                    uu(function (t) {
                      if (_h(t.guardsResult)) {
                        var n = pc(
                          'Redirecting to "' +
                            e.serializeUrl(t.guardsResult) +
                            '"'
                        );
                        throw ((n.url = t.guardsResult), n);
                      }
                    }),
                    uu(function (t) {
                      var n = new Ks(
                        t.id,
                        e.serializeUrl(t.extractedUrl),
                        e.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult
                      );
                      e.triggerEvent(n);
                    }),
                    tu(function (t) {
                      if (!t.guardsResult) {
                        e.resetUrlToCurrentUrlTree();
                        var r = new Zs(
                          t.id,
                          e.serializeUrl(t.extractedUrl),
                          ""
                        );
                        return n.next(r), t.resolve(!1), !1;
                      }
                      return !0;
                    }),
                    Xh(function (t) {
                      if (t.guards.canActivateChecks.length)
                        return Ga(t).pipe(
                          uu(function (t) {
                            var n = new Xs(
                              t.id,
                              e.serializeUrl(t.extractedUrl),
                              e.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.triggerEvent(n);
                          }),
                          ((n = e.paramsInheritanceStrategy),
                          (r = e.ngModule.injector),
                          function (t) {
                            return t.pipe(
                              et(function (t) {
                                var e = t.targetSnapshot,
                                  o = t.guards.canActivateChecks;
                                return o.length
                                  ? tt(o).pipe(
                                      Ru(function (t) {
                                        return (function (t, n, r, o) {
                                          return (function (t, e, n, r) {
                                            var o = Object.keys(t);
                                            if (0 === o.length) return Ga({});
                                            if (1 === o.length) {
                                              var i = o[0];
                                              return Kh(t[i], e, n, r).pipe(
                                                $(function (t) {
                                                  var e;
                                                  return ((e = {})[i] = t), e;
                                                })
                                              );
                                            }
                                            var l = {};
                                            return tt(o)
                                              .pipe(
                                                et(function (o) {
                                                  return Kh(t[o], e, n, r).pipe(
                                                    $(function (t) {
                                                      return (l[o] = t), t;
                                                    })
                                                  );
                                                })
                                              )
                                              .pipe(
                                                vu(),
                                                $(function () {
                                                  return l;
                                                })
                                              );
                                          })(t._resolve, t, e, o).pipe(
                                            $(function (e) {
                                              return (
                                                (t._resolvedData = e),
                                                (t.data = i(
                                                  {},
                                                  t.data,
                                                  Jc(t, r).resolve
                                                )),
                                                null
                                              );
                                            })
                                          );
                                        })(t.route, 0, n, r);
                                      }),
                                      (function (t, e) {
                                        return arguments.length >= 2
                                          ? function (e) {
                                              return T(
                                                Au(t, void 0),
                                                iu(1),
                                                fu(void 0)
                                              )(e);
                                            }
                                          : function (e) {
                                              return T(
                                                Au(function (e, n, r) {
                                                  return t(e);
                                                }),
                                                iu(1)
                                              )(e);
                                            };
                                      })(function (t, e) {
                                        return t;
                                      }),
                                      $(function (e) {
                                        return t;
                                      })
                                    )
                                  : Ga(t);
                              })
                            );
                          }),
                          uu(function (t) {
                            var n = new Js(
                              t.id,
                              e.serializeUrl(t.extractedUrl),
                              e.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.triggerEvent(n);
                          })
                        );
                      var n, r;
                    }),
                    Xh(function (t) {
                      var n = t.extras;
                      return e.hooks.afterPreactivation(t.targetSnapshot, {
                        navigationId: t.id,
                        appliedUrlTree: t.extractedUrl,
                        rawUrlTree: t.rawUrl,
                        skipLocationChange: !!n.skipLocationChange,
                        replaceUrl: !!n.replaceUrl,
                      });
                    }),
                    $(function (t) {
                      var n,
                        r,
                        o,
                        l =
                          ((o = (function t(e, n, r) {
                            if (
                              r &&
                              e.shouldReuseRoute(n.value, r.value.snapshot)
                            ) {
                              (s = r.value)._futureSnapshot = n.value;
                              var o = (function (e, n, r) {
                                return n.children.map(function (n) {
                                  var o, i;
                                  try {
                                    for (
                                      var l = u(r.children), a = l.next();
                                      !a.done;
                                      a = l.next()
                                    ) {
                                      var s = a.value;
                                      if (
                                        e.shouldReuseRoute(
                                          s.value.snapshot,
                                          n.value
                                        )
                                      )
                                        return t(e, n, s);
                                    }
                                  } catch (c) {
                                    o = { error: c };
                                  } finally {
                                    try {
                                      a &&
                                        !a.done &&
                                        (i = l.return) &&
                                        i.call(l);
                                    } finally {
                                      if (o) throw o.error;
                                    }
                                  }
                                  return t(e, n);
                                });
                              })(e, n, r);
                              return new Qc(s, o);
                            }
                            var i = e.retrieve(n.value);
                            if (i) {
                              var l = i.route;
                              return (
                                (function t(e, n) {
                                  if (
                                    e.value.routeConfig !== n.value.routeConfig
                                  )
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot created from a different route"
                                    );
                                  if (e.children.length !== n.children.length)
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                                    );
                                  n.value._futureSnapshot = e.value;
                                  for (var r = 0; r < e.children.length; ++r)
                                    t(e.children[r], n.children[r]);
                                })(n, l),
                                l
                              );
                            }
                            var a,
                              s = new Xc(
                                new qa((a = n.value).url),
                                new qa(a.params),
                                new qa(a.queryParams),
                                new qa(a.fragment),
                                new qa(a.data),
                                a.outlet,
                                a.component,
                                a
                              );
                            return (
                              (o = n.children.map(function (n) {
                                return t(e, n);
                              })),
                              new Qc(s, o)
                            );
                          })(
                            e.routeReuseStrategy,
                            (n = t.targetSnapshot)._root,
                            (r = t.currentRouterState) ? r._root : void 0
                          )),
                          new $c(o, n));
                      return i({}, t, { targetRouterState: l });
                    }),
                    uu(function (t) {
                      (e.currentUrlTree = t.urlAfterRedirects),
                        (e.rawUrlTree = e.urlHandlingStrategy.merge(
                          e.currentUrlTree,
                          t.rawUrl
                        )),
                        (e.routerState = t.targetRouterState),
                        "deferred" === e.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            e.setBrowserUrl(
                              e.rawUrlTree,
                              !!t.extras.replaceUrl,
                              t.id,
                              t.extras.state
                            ),
                          (e.browserUrlTree = t.urlAfterRedirects));
                    }),
                    ((o = e.rootContexts),
                    (l = e.routeReuseStrategy),
                    (a = function (t) {
                      return e.triggerEvent(t);
                    }),
                    $(function (t) {
                      return (
                        new mh(
                          l,
                          t.targetRouterState,
                          t.currentRouterState,
                          a
                        ).activate(o),
                        t
                      );
                    })),
                    uu({
                      next: function () {
                        s = !0;
                      },
                      complete: function () {
                        s = !0;
                      },
                    }),
                    ((r = function () {
                      if (!s && !c) {
                        e.resetUrlToCurrentUrlTree();
                        var r = new Zs(
                          t.id,
                          e.serializeUrl(t.extractedUrl),
                          "Navigation ID " +
                            t.id +
                            " is not equal to the current navigation id " +
                            e.navigationId
                        );
                        n.next(r), t.resolve(!1);
                      }
                      e.currentNavigation = null;
                    }),
                    function (t) {
                      return t.lift(new Nu(r));
                    }),
                    mu(function (r) {
                      if (((c = !0), (a = r) && a[hc])) {
                        var o = _h(r.url);
                        o ||
                          ((e.navigated = !0),
                          e.resetStateAndUrl(
                            t.currentRouterState,
                            t.currentUrlTree,
                            t.rawUrl
                          ));
                        var i = new Zs(
                          t.id,
                          e.serializeUrl(t.extractedUrl),
                          r.message
                        );
                        n.next(i), t.resolve(!1), o && e.navigateByUrl(r.url);
                      } else {
                        e.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl
                        );
                        var l = new Qs(t.id, e.serializeUrl(t.extractedUrl), r);
                        n.next(l);
                        try {
                          t.resolve(e.errorHandler(r));
                        } catch (u) {
                          t.reject(u);
                        }
                      }
                      var a;
                      return za;
                    })
                  );
                })
              );
            }),
            (t.prototype.resetRootComponentType = function (t) {
              (this.rootComponentType = t),
                (this.routerState.root.component = this.rootComponentType);
            }),
            (t.prototype.getTransition = function () {
              var t = this.transitions.value;
              return (t.urlAfterRedirects = this.browserUrlTree), t;
            }),
            (t.prototype.setTransition = function (t) {
              this.transitions.next(i({}, this.getTransition(), t));
            }),
            (t.prototype.initialNavigation = function () {
              this.setUpLocationChangeListener(),
                0 === this.navigationId &&
                  this.navigateByUrl(this.location.path(!0), {
                    replaceUrl: !0,
                  });
            }),
            (t.prototype.setUpLocationChangeListener = function () {
              var t = this;
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe(function (
                  e
                ) {
                  var n = t.parseUrl(e.url),
                    r = "popstate" === e.type ? "popstate" : "hashchange",
                    o = e.state && e.state.navigationId ? e.state : null;
                  setTimeout(function () {
                    t.scheduleNavigation(n, r, o, { replaceUrl: !0 });
                  }, 0);
                }));
            }),
            Object.defineProperty(t.prototype, "url", {
              get: function () {
                return this.serializeUrl(this.currentUrlTree);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.getCurrentNavigation = function () {
              return this.currentNavigation;
            }),
            (t.prototype.triggerEvent = function (t) {
              this.events.next(t);
            }),
            (t.prototype.resetConfig = function (t) {
              gc(t),
                (this.config = t.map(yc)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }),
            (t.prototype.ngOnDestroy = function () {
              this.dispose();
            }),
            (t.prototype.dispose = function () {
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = null));
            }),
            (t.prototype.createUrlTree = function (t, e) {
              void 0 === e && (e = {});
              var n = e.relativeTo,
                r = e.queryParams,
                o = e.fragment,
                l = e.preserveQueryParams,
                a = e.queryParamsHandling,
                u = e.preserveFragment;
              fe() &&
                l &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated, use queryParamsHandling instead."
                );
              var s = n || this.routerState.root,
                h = u ? this.currentUrlTree.fragment : o,
                p = null;
              if (a)
                switch (a) {
                  case "merge":
                    p = i({}, this.currentUrlTree.queryParams, r);
                    break;
                  case "preserve":
                    p = this.currentUrlTree.queryParams;
                    break;
                  default:
                    p = r || null;
                }
              else p = l ? this.currentUrlTree.queryParams : r || null;
              return (
                null !== p && (p = this.removeEmptyProps(p)),
                (function (t, e, n, r, o) {
                  if (0 === n.length) return ah(e.root, e.root, e, r, o);
                  var i = (function (t) {
                    if (
                      "string" == typeof t[0] &&
                      1 === t.length &&
                      "/" === t[0]
                    )
                      return new uh(!0, 0, t);
                    var e = 0,
                      n = !1,
                      r = t.reduce(function (t, r, o) {
                        if ("object" == typeof r && null != r) {
                          if (r.outlets) {
                            var i = {};
                            return (
                              Cc(r.outlets, function (t, e) {
                                i[e] = "string" == typeof t ? t.split("/") : t;
                              }),
                              c(t, [{ outlets: i }])
                            );
                          }
                          if (r.segmentPath) return c(t, [r.segmentPath]);
                        }
                        return "string" != typeof r
                          ? c(t, [r])
                          : 0 === o
                          ? (r.split("/").forEach(function (r, o) {
                              (0 == o && "." === r) ||
                                (0 == o && "" === r
                                  ? (n = !0)
                                  : ".." === r
                                  ? e++
                                  : "" != r && t.push(r));
                            }),
                            t)
                          : c(t, [r]);
                      }, []);
                    return new uh(n, e, r);
                  })(n);
                  if (i.toRoot()) return ah(e.root, new Oc([], {}), e, r, o);
                  var l = (function (t, n, r) {
                      if (t.isAbsolute) return new sh(e.root, !0, 0);
                      if (-1 === r.snapshot._lastPathIndex)
                        return new sh(r.snapshot._urlSegment, !0, 0);
                      var o = lh(t.commands[0]) ? 0 : 1;
                      return (function (e, n, i) {
                        for (
                          var l = r.snapshot._urlSegment,
                            a = r.snapshot._lastPathIndex + o,
                            u = t.numberOfDoubleDots;
                          u > a;

                        ) {
                          if (((u -= a), !(l = l.parent)))
                            throw new Error("Invalid number of '../'");
                          a = l.segments.length;
                        }
                        return new sh(l, !1, a - u);
                      })();
                    })(i, 0, t),
                    a = l.processChildren
                      ? ph(l.segmentGroup, l.index, i.commands)
                      : hh(l.segmentGroup, l.index, i.commands);
                  return ah(l.segmentGroup, a, e, r, o);
                })(s, this.currentUrlTree, t, p, h)
              );
            }),
            (t.prototype.navigateByUrl = function (t, e) {
              void 0 === e && (e = { skipLocationChange: !1 }),
                fe() &&
                  this.isNgZoneEnabled &&
                  !ai.isInAngularZone() &&
                  this.console.warn(
                    "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
                  );
              var n = _h(t) ? t : this.parseUrl(t),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
              return this.scheduleNavigation(r, "imperative", null, e);
            }),
            (t.prototype.navigate = function (t, e) {
              return (
                void 0 === e && (e = { skipLocationChange: !1 }),
                (function (t) {
                  for (var e = 0; e < t.length; e++) {
                    var n = t[e];
                    if (null == n)
                      throw new Error(
                        "The requested path contains " +
                          n +
                          " segment at index " +
                          e
                      );
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              );
            }),
            (t.prototype.serializeUrl = function (t) {
              return this.urlSerializer.serialize(t);
            }),
            (t.prototype.parseUrl = function (t) {
              var e;
              try {
                e = this.urlSerializer.parse(t);
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
              }
              return e;
            }),
            (t.prototype.isActive = function (t, e) {
              if (_h(t)) return Sc(this.currentUrlTree, t, e);
              var n = this.parseUrl(t);
              return Sc(this.currentUrlTree, n, e);
            }),
            (t.prototype.removeEmptyProps = function (t) {
              return Object.keys(t).reduce(function (e, n) {
                var r = t[n];
                return null != r && (e[n] = r), e;
              }, {});
            }),
            (t.prototype.processNavigations = function () {
              var t = this;
              this.navigations.subscribe(
                function (e) {
                  (t.navigated = !0),
                    (t.lastSuccessfulId = e.id),
                    t.events.next(
                      new qs(
                        e.id,
                        t.serializeUrl(e.extractedUrl),
                        t.serializeUrl(t.currentUrlTree)
                      )
                    ),
                    (t.lastSuccessfulNavigation = t.currentNavigation),
                    (t.currentNavigation = null),
                    e.resolve(!0);
                },
                function (e) {
                  t.console.warn("Unhandled Navigation Error: ");
                }
              );
            }),
            (t.prototype.scheduleNavigation = function (t, e, n, r) {
              var o = this.getTransition();
              if (
                o &&
                "imperative" !== e &&
                "imperative" === o.source &&
                o.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                o &&
                "hashchange" == e &&
                "popstate" === o.source &&
                o.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                o &&
                "popstate" == e &&
                "hashchange" === o.source &&
                o.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              var i = null,
                l = null,
                a = new Promise(function (t, e) {
                  (i = t), (l = e);
                }),
                u = ++this.navigationId;
              return (
                this.setTransition({
                  id: u,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: r,
                  resolve: i,
                  reject: l,
                  promise: a,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                a.catch(function (t) {
                  return Promise.reject(t);
                })
              );
            }),
            (t.prototype.setBrowserUrl = function (t, e, n, r) {
              var o = this.urlSerializer.serialize(t);
              (r = r || {}),
                this.location.isCurrentPathEqualTo(o) || e
                  ? this.location.replaceState(
                      o,
                      "",
                      i({}, r, { navigationId: n })
                    )
                  : this.location.go(o, "", i({}, r, { navigationId: n }));
            }),
            (t.prototype.resetStateAndUrl = function (t, e, n) {
              (this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n
                )),
                this.resetUrlToCurrentUrlTree();
            }),
            (t.prototype.resetUrlToCurrentUrlTree = function () {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                { navigationId: this.lastSuccessfulId }
              );
            }),
            t
          );
        })(),
        sp = (function () {
          function t(t, e, n, r, o) {
            (this.router = t),
              (this.route = e),
              (this.commands = []),
              null == n && r.setAttribute(o.nativeElement, "tabindex", "0");
          }
          return (
            Object.defineProperty(t.prototype, "routerLink", {
              set: function (t) {
                this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "preserveQueryParams", {
              set: function (t) {
                fe() &&
                  console &&
                  console.warn &&
                  console.warn(
                    "preserveQueryParams is deprecated!, use queryParamsHandling instead."
                  ),
                  (this.preserve = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.onClick = function () {
              var t = {
                skipLocationChange: hp(this.skipLocationChange),
                replaceUrl: hp(this.replaceUrl),
              };
              return this.router.navigateByUrl(this.urlTree, t), !0;
            }),
            Object.defineProperty(t.prototype, "urlTree", {
              get: function () {
                return this.router.createUrlTree(this.commands, {
                  relativeTo: this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  preserveQueryParams: hp(this.preserve),
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: hp(this.preserveFragment),
                });
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(),
        cp = (function () {
          function t(t, e, n) {
            var r = this;
            (this.router = t),
              (this.route = e),
              (this.locationStrategy = n),
              (this.commands = []),
              (this.subscription = t.events.subscribe(function (t) {
                t instanceof qs && r.updateTargetUrlAndHref();
              }));
          }
          return (
            Object.defineProperty(t.prototype, "routerLink", {
              set: function (t) {
                this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "preserveQueryParams", {
              set: function (t) {
                fe() &&
                  console &&
                  console.warn &&
                  console.warn(
                    "preserveQueryParams is deprecated, use queryParamsHandling instead."
                  ),
                  (this.preserve = t);
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.ngOnChanges = function (t) {
              this.updateTargetUrlAndHref();
            }),
            (t.prototype.ngOnDestroy = function () {
              this.subscription.unsubscribe();
            }),
            (t.prototype.onClick = function (t, e, n, r) {
              if (0 !== t || e || n || r) return !0;
              if ("string" == typeof this.target && "_self" != this.target)
                return !0;
              var o = {
                skipLocationChange: hp(this.skipLocationChange),
                replaceUrl: hp(this.replaceUrl),
                state: this.state,
              };
              return this.router.navigateByUrl(this.urlTree, o), !1;
            }),
            (t.prototype.updateTargetUrlAndHref = function () {
              this.href = this.locationStrategy.prepareExternalUrl(
                this.router.serializeUrl(this.urlTree)
              );
            }),
            Object.defineProperty(t.prototype, "urlTree", {
              get: function () {
                return this.router.createUrlTree(this.commands, {
                  relativeTo: this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  preserveQueryParams: hp(this.preserve),
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: hp(this.preserveFragment),
                });
              },
              enumerable: !0,
              configurable: !0,
            }),
            l(
              [Mo("attr.target"), Do(), a("design:type", String)],
              t.prototype,
              "target",
              void 0
            ),
            t
          );
        })();
      function hp(t) {
        return "" === t || !!t;
      }
      var pp = (function () {
          function t(t, e, n, r, o) {
            var i = this;
            (this.router = t),
              (this.element = e),
              (this.renderer = n),
              (this.link = r),
              (this.linkWithHref = o),
              (this.classes = []),
              (this.isActive = !1),
              (this.routerLinkActiveOptions = { exact: !1 }),
              (this.subscription = t.events.subscribe(function (t) {
                t instanceof qs && i.update();
              }));
          }
          return (
            (t.prototype.ngAfterContentInit = function () {
              var t = this;
              this.links.changes.subscribe(function (e) {
                return t.update();
              }),
                this.linksWithHrefs.changes.subscribe(function (e) {
                  return t.update();
                }),
                this.update();
            }),
            Object.defineProperty(t.prototype, "routerLinkActive", {
              set: function (t) {
                var e = Array.isArray(t) ? t : t.split(" ");
                this.classes = e.filter(function (t) {
                  return !!t;
                });
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.ngOnChanges = function (t) {
              this.update();
            }),
            (t.prototype.ngOnDestroy = function () {
              this.subscription.unsubscribe();
            }),
            (t.prototype.update = function () {
              var t = this;
              this.links &&
                this.linksWithHrefs &&
                this.router.navigated &&
                Promise.resolve().then(function () {
                  var e = t.hasActiveLinks();
                  t.isActive !== e &&
                    ((t.isActive = e),
                    t.classes.forEach(function (n) {
                      e
                        ? t.renderer.addClass(t.element.nativeElement, n)
                        : t.renderer.removeClass(t.element.nativeElement, n);
                    }));
                });
            }),
            (t.prototype.isLinkActive = function (t) {
              var e = this;
              return function (n) {
                return t.isActive(n.urlTree, e.routerLinkActiveOptions.exact);
              };
            }),
            (t.prototype.hasActiveLinks = function () {
              var t = this.isLinkActive(this.router);
              return (
                (this.link && t(this.link)) ||
                (this.linkWithHref && t(this.linkWithHref)) ||
                this.links.some(t) ||
                this.linksWithHrefs.some(t)
              );
            }),
            t
          );
        })(),
        fp = (function () {
          return function () {
            (this.outlet = null),
              (this.route = null),
              (this.resolver = null),
              (this.children = new dp()),
              (this.attachRef = null);
          };
        })(),
        dp = (function () {
          function t() {
            this.contexts = new Map();
          }
          return (
            (t.prototype.onChildOutletCreated = function (t, e) {
              var n = this.getOrCreateContext(t);
              (n.outlet = e), this.contexts.set(t, n);
            }),
            (t.prototype.onChildOutletDestroyed = function (t) {
              var e = this.getContext(t);
              e && (e.outlet = null);
            }),
            (t.prototype.onOutletDeactivated = function () {
              var t = this.contexts;
              return (this.contexts = new Map()), t;
            }),
            (t.prototype.onOutletReAttached = function (t) {
              this.contexts = t;
            }),
            (t.prototype.getOrCreateContext = function (t) {
              var e = this.getContext(t);
              return e || ((e = new fp()), this.contexts.set(t, e)), e;
            }),
            (t.prototype.getContext = function (t) {
              return this.contexts.get(t) || null;
            }),
            t
          );
        })(),
        gp = (function () {
          function t(t, e, n, r, o) {
            (this.parentContexts = t),
              (this.location = e),
              (this.resolver = n),
              (this.changeDetector = o),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new Po()),
              (this.deactivateEvents = new Po()),
              (this.name = r || uc),
              t.onChildOutletCreated(this.name, this);
          }
          return (
            (t.prototype.ngOnDestroy = function () {
              this.parentContexts.onChildOutletDestroyed(this.name);
            }),
            (t.prototype.ngOnInit = function () {
              if (!this.activated) {
                var t = this.parentContexts.getContext(this.name);
                t &&
                  t.route &&
                  (t.attachRef
                    ? this.attach(t.attachRef, t.route)
                    : this.activateWith(t.route, t.resolver || null));
              }
            }),
            Object.defineProperty(t.prototype, "isActivated", {
              get: function () {
                return !!this.activated;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "component", {
              get: function () {
                if (!this.activated) throw new Error("Outlet is not activated");
                return this.activated.instance;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "activatedRoute", {
              get: function () {
                if (!this.activated) throw new Error("Outlet is not activated");
                return this._activatedRoute;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "activatedRouteData", {
              get: function () {
                return this._activatedRoute
                  ? this._activatedRoute.snapshot.data
                  : {};
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.detach = function () {
              if (!this.activated) throw new Error("Outlet is not activated");
              this.location.detach();
              var t = this.activated;
              return (this.activated = null), (this._activatedRoute = null), t;
            }),
            (t.prototype.attach = function (t, e) {
              (this.activated = t),
                (this._activatedRoute = e),
                this.location.insert(t.hostView);
            }),
            (t.prototype.deactivate = function () {
              if (this.activated) {
                var t = this.component;
                this.activated.destroy(),
                  (this.activated = null),
                  (this._activatedRoute = null),
                  this.deactivateEvents.emit(t);
              }
            }),
            (t.prototype.activateWith = function (t, e) {
              if (this.isActivated)
                throw new Error("Cannot activate an already activated outlet");
              this._activatedRoute = t;
              var n = (e = e || this.resolver).resolveComponentFactory(
                  t._futureSnapshot.routeConfig.component
                ),
                r = this.parentContexts.getOrCreateContext(this.name).children,
                o = new vp(t, r, this.location.injector);
              (this.activated = this.location.createComponent(
                n,
                this.location.length,
                o
              )),
                this.changeDetector.markForCheck(),
                this.activateEvents.emit(this.activated.instance);
            }),
            t
          );
        })(),
        vp = (function () {
          function t(t, e, n) {
            (this.route = t), (this.childContexts = e), (this.parent = n);
          }
          return (
            (t.prototype.get = function (t, e) {
              return t === Xc
                ? this.route
                : t === dp
                ? this.childContexts
                : this.parent.get(t, e);
            }),
            t
          );
        })(),
        mp = (function () {
          return function () {};
        })(),
        yp = (function () {
          function t() {}
          return (
            (t.prototype.preload = function (t, e) {
              return e().pipe(
                mu(function () {
                  return Ga(null);
                })
              );
            }),
            t
          );
        })(),
        bp = (function () {
          function t() {}
          return (
            (t.prototype.preload = function (t, e) {
              return Ga(null);
            }),
            t
          );
        })(),
        _p = (function () {
          function t(t, e, n, r, o) {
            (this.router = t),
              (this.injector = r),
              (this.preloadingStrategy = o),
              (this.loader = new np(
                e,
                n,
                function (e) {
                  return t.triggerEvent(new tc(e));
                },
                function (e) {
                  return t.triggerEvent(new ec(e));
                }
              ));
          }
          return (
            (t.prototype.setUpPreloading = function () {
              var t = this;
              this.subscription = this.router.events
                .pipe(
                  tu(function (t) {
                    return t instanceof qs;
                  }),
                  Ru(function () {
                    return t.preload();
                  })
                )
                .subscribe(function () {});
            }),
            (t.prototype.preload = function () {
              var t = this.injector.get(an);
              return this.processRoutes(t, this.router.config);
            }),
            (t.prototype.ngOnDestroy = function () {
              this.subscription.unsubscribe();
            }),
            (t.prototype.processRoutes = function (t, e) {
              var n,
                r,
                o = [];
              try {
                for (var i = u(e), l = i.next(); !l.done; l = i.next()) {
                  var a = l.value;
                  if (a.loadChildren && !a.canLoad && a._loadedConfig) {
                    var s = a._loadedConfig;
                    o.push(this.processRoutes(s.module, s.routes));
                  } else
                    a.loadChildren && !a.canLoad
                      ? o.push(this.preloadConfig(t, a))
                      : a.children && o.push(this.processRoutes(t, a.children));
                }
              } catch (c) {
                n = { error: c };
              } finally {
                try {
                  l && !l.done && (r = i.return) && r.call(i);
                } finally {
                  if (n) throw n.error;
                }
              }
              return tt(o).pipe(
                it(),
                $(function (t) {})
              );
            }),
            (t.prototype.preloadConfig = function (t, e) {
              var n = this;
              return this.preloadingStrategy.preload(e, function () {
                return n.loader.load(t.injector, e).pipe(
                  et(function (t) {
                    return (
                      (e._loadedConfig = t), n.processRoutes(t.module, t.routes)
                    );
                  })
                );
              });
            }),
            t
          );
        })(),
        wp = (function () {
          function t(t, e, n) {
            void 0 === n && (n = {}),
              (this.router = t),
              (this.viewportScroller = e),
              (this.options = n),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (n.scrollPositionRestoration =
                n.scrollPositionRestoration || "disabled"),
              (n.anchorScrolling = n.anchorScrolling || "disabled");
          }
          return (
            (t.prototype.init = function () {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }),
            (t.prototype.createScrollEvents = function () {
              var t = this;
              return this.router.events.subscribe(function (e) {
                e instanceof Gs
                  ? ((t.store[t.lastId] =
                      t.viewportScroller.getScrollPosition()),
                    (t.lastSource = e.navigationTrigger),
                    (t.restoredId = e.restoredState
                      ? e.restoredState.navigationId
                      : 0))
                  : e instanceof qs &&
                    ((t.lastId = e.id),
                    t.scheduleScrollEvent(
                      e,
                      t.router.parseUrl(e.urlAfterRedirects).fragment
                    ));
              });
            }),
            (t.prototype.consumeScrollEvents = function () {
              var t = this;
              return this.router.events.subscribe(function (e) {
                e instanceof lc &&
                  (e.position
                    ? "top" === t.options.scrollPositionRestoration
                      ? t.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === t.options.scrollPositionRestoration &&
                        t.viewportScroller.scrollToPosition(e.position)
                    : e.anchor && "enabled" === t.options.anchorScrolling
                    ? t.viewportScroller.scrollToAnchor(e.anchor)
                    : "disabled" !== t.options.scrollPositionRestoration &&
                      t.viewportScroller.scrollToPosition([0, 0]));
              });
            }),
            (t.prototype.scheduleScrollEvent = function (t, e) {
              this.router.triggerEvent(
                new lc(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e
                )
              );
            }),
            (t.prototype.ngOnDestroy = function () {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }),
            t
          );
        })(),
        Cp = new Lt("ROUTER_CONFIGURATION"),
        Ep = new Lt("ROUTER_FORROOT_GUARD"),
        Sp = [
          ya,
          { provide: Ic, useClass: Pc },
          {
            provide: up,
            useFactory: Pp,
            deps: [
              Si,
              Ic,
              dp,
              ya,
              Bt,
              No,
              Xo,
              ep,
              Cp,
              [rp, new _t()],
              [Jh, new _t()],
            ],
          },
          dp,
          { provide: Xc, useFactory: Rp, deps: [up] },
          { provide: No, useClass: ki },
          _p,
          bp,
          yp,
          { provide: Cp, useValue: { enableTracing: !1 } },
        ];
      function xp() {
        return new bi("Router", up);
      }
      var Op = (function () {
        function t(t, e) {}
        var e;
        return (
          (e = t),
          (t.forRoot = function (t, n) {
            return {
              ngModule: e,
              providers: [
                Sp,
                Ip(t),
                {
                  provide: Ep,
                  useFactory: Ap,
                  deps: [[up, new _t(), new Ct()]],
                },
                { provide: Cp, useValue: n || {} },
                {
                  provide: va,
                  useFactory: kp,
                  deps: [da, [new bt(ma), new _t()], Cp],
                },
                { provide: wp, useFactory: Tp, deps: [up, Ua, Cp] },
                {
                  provide: mp,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : bp,
                },
                { provide: bi, multi: !0, useFactory: xp },
                [
                  Np,
                  { provide: jo, multi: !0, useFactory: Dp, deps: [Np] },
                  { provide: jp, useFactory: Mp, deps: [Np] },
                  { provide: Bo, multi: !0, useExisting: jp },
                ],
              ],
            };
          }),
          (t.forChild = function (t) {
            return { ngModule: e, providers: [Ip(t)] };
          }),
          t
        );
      })();
      function Tp(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new wp(t, e, n);
      }
      function kp(t, e, n) {
        return (
          void 0 === n && (n = {}), n.useHash ? new _a(t, e) : new wa(t, e)
        );
      }
      function Ap(t) {
        if (t)
          throw new Error(
            "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function Ip(t) {
        return [
          { provide: oe, multi: !0, useValue: t },
          { provide: ep, multi: !0, useValue: t },
        ];
      }
      function Pp(t, e, n, r, o, i, l, a, u, s, c) {
        void 0 === u && (u = {});
        var h = new up(null, e, n, r, o, i, l, _c(a));
        if (
          (s && (h.urlHandlingStrategy = s),
          c && (h.routeReuseStrategy = c),
          u.errorHandler && (h.errorHandler = u.errorHandler),
          u.malformedUriErrorHandler &&
            (h.malformedUriErrorHandler = u.malformedUriErrorHandler),
          u.enableTracing)
        ) {
          var p = ju();
          h.events.subscribe(function (t) {
            p.logGroup("Router Event: " + t.constructor.name),
              p.log(t.toString()),
              p.log(t),
              p.logGroupEnd();
          });
        }
        return (
          u.onSameUrlNavigation &&
            (h.onSameUrlNavigation = u.onSameUrlNavigation),
          u.paramsInheritanceStrategy &&
            (h.paramsInheritanceStrategy = u.paramsInheritanceStrategy),
          u.urlUpdateStrategy && (h.urlUpdateStrategy = u.urlUpdateStrategy),
          u.relativeLinkResolution &&
            (h.relativeLinkResolution = u.relativeLinkResolution),
          h
        );
      }
      function Rp(t) {
        return t.routerState.root;
      }
      var Np = (function () {
        function t(t) {
          (this.injector = t),
            (this.initNavigation = !1),
            (this.resultOfPreactivationDone = new M());
        }
        return (
          (t.prototype.appInitializer = function () {
            var t = this;
            return this.injector
              .get(ga, Promise.resolve(null))
              .then(function () {
                var e = null,
                  n = new Promise(function (t) {
                    return (e = t);
                  }),
                  r = t.injector.get(up),
                  o = t.injector.get(Cp);
                if (t.isLegacyDisabled(o) || t.isLegacyEnabled(o)) e(!0);
                else if ("disabled" === o.initialNavigation)
                  r.setUpLocationChangeListener(), e(!0);
                else {
                  if ("enabled" !== o.initialNavigation)
                    throw new Error(
                      "Invalid initialNavigation options: '" +
                        o.initialNavigation +
                        "'"
                    );
                  (r.hooks.afterPreactivation = function () {
                    return t.initNavigation
                      ? Ga(null)
                      : ((t.initNavigation = !0),
                        e(!0),
                        t.resultOfPreactivationDone);
                  }),
                    r.initialNavigation();
                }
                return n;
              });
          }),
          (t.prototype.bootstrapListener = function (t) {
            var e = this.injector.get(Cp),
              n = this.injector.get(_p),
              r = this.injector.get(wp),
              o = this.injector.get(up),
              i = this.injector.get(Si);
            t === i.components[0] &&
              (this.isLegacyEnabled(e)
                ? o.initialNavigation()
                : this.isLegacyDisabled(e) && o.setUpLocationChangeListener(),
              n.setUpPreloading(),
              r.init(),
              o.resetRootComponentType(i.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }),
          (t.prototype.isLegacyEnabled = function (t) {
            return (
              "legacy_enabled" === t.initialNavigation ||
              !0 === t.initialNavigation ||
              void 0 === t.initialNavigation
            );
          }),
          (t.prototype.isLegacyDisabled = function (t) {
            return (
              "legacy_disabled" === t.initialNavigation ||
              !1 === t.initialNavigation
            );
          }),
          t
        );
      })();
      function Dp(t) {
        return t.appInitializer.bind(t);
      }
      function Mp(t) {
        return t.bootstrapListener.bind(t);
      }
      var jp = new Lt("Router Initializer"),
        Vp = nr({ encapsulation: 2, styles: [], data: {} });
      function Lp(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              16777216,
              null,
              null,
              1,
              "router-outlet",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            po(1, 212992, null, 0, gp, [dp, Vn, rn, [8, null], In], null, null),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          null
        );
      }
      function Fp(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "ng-component",
              [],
              null,
              null,
              null,
              Lp,
              Vp
            )),
            po(1, 49152, null, 0, ac, [], null, null),
          ],
          null,
          null
        );
      }
      var Up,
        Hp = zr("ng-component", ac, Fp, {}, {}, []),
        zp = (function () {
          function t(t, e) {
            (this.open = t), (this.close = e || t);
          }
          return (
            (t.prototype.isManual = function () {
              return "manual" === this.open || "manual" === this.close;
            }),
            t
          );
        })(),
        Bp = {
          hover: ["mouseover", "mouseout"],
          focus: ["focusin", "focusout"],
        },
        Wp = ("undefined" != typeof window && window) || {};
      function Gp() {
        return (
          void 0 === Wp ||
          (void 0 === Wp.__theme
            ? Up
              ? "bs3" === Up
              : "bs3" ===
                (Up = (function () {
                  if ("undefined" == typeof document) return null;
                  var t = document.createElement("span");
                  (t.innerText = "test bs version"),
                    document.body.appendChild(t),
                    t.classList.add("d-none");
                  var e = t.getBoundingClientRect();
                  return (
                    document.body.removeChild(t),
                    e && 0 === e.top ? "bs4" : "bs3"
                  );
                })())
            : "bs4" !== Wp.__theme)
        );
      }
      "undefined" == typeof console || console;
      var qp = (function () {
          return function (t, e, n) {
            (this.nodes = t), (this.viewRef = e), (this.componentRef = n);
          };
        })(),
        Zp = (function () {
          function t(t, e, n, r, o, i, l, a) {
            (this._viewContainerRef = t),
              (this._renderer = e),
              (this._elementRef = n),
              (this._injector = r),
              (this._componentFactoryResolver = o),
              (this._ngZone = i),
              (this._applicationRef = l),
              (this._posService = a),
              (this.onBeforeShow = new Po()),
              (this.onShown = new Po()),
              (this.onBeforeHide = new Po()),
              (this.onHidden = new Po()),
              (this._providers = []),
              (this._isHiding = !1),
              (this.containerDefaultSelector = "body"),
              (this._listenOpts = {}),
              (this._globalListener = Function.prototype);
          }
          return (
            Object.defineProperty(t.prototype, "isShown", {
              get: function () {
                return !this._isHiding && !!this._componentRef;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.attach = function (t) {
              return (
                (this._componentFactory =
                  this._componentFactoryResolver.resolveComponentFactory(t)),
                this
              );
            }),
            (t.prototype.to = function (t) {
              return (this.container = t || this.container), this;
            }),
            (t.prototype.position = function (t) {
              return (
                (this.attachment = t.attachment || this.attachment),
                (this._elementRef = t.target || this._elementRef),
                this
              );
            }),
            (t.prototype.provide = function (t) {
              return this._providers.push(t), this;
            }),
            (t.prototype.show = function (t) {
              if (
                (void 0 === t && (t = {}),
                this._subscribePositioning(),
                (this._innerComponent = null),
                !this._componentRef)
              ) {
                this.onBeforeShow.emit(),
                  (this._contentRef = this._getContentRef(
                    t.content,
                    t.context,
                    t.initialState
                  ));
                var e = Bt.create({
                  providers: this._providers,
                  parent: this._injector,
                });
                (this._componentRef = this._componentFactory.create(
                  e,
                  this._contentRef.nodes
                )),
                  this._applicationRef.attachView(this._componentRef.hostView),
                  (this.instance = this._componentRef.instance),
                  Object.assign(this._componentRef.instance, t),
                  this.container instanceof cn &&
                    this.container.nativeElement.appendChild(
                      this._componentRef.location.nativeElement
                    ),
                  "string" == typeof this.container &&
                    "undefined" != typeof document &&
                    (
                      document.querySelector(this.container) ||
                      document.querySelector(this.containerDefaultSelector)
                    ).appendChild(this._componentRef.location.nativeElement),
                  !this.container &&
                    this._elementRef &&
                    this._elementRef.nativeElement.parentElement &&
                    this._elementRef.nativeElement.parentElement.appendChild(
                      this._componentRef.location.nativeElement
                    ),
                  this._contentRef.componentRef &&
                    ((this._innerComponent =
                      this._contentRef.componentRef.instance),
                    this._contentRef.componentRef.changeDetectorRef.markForCheck(),
                    this._contentRef.componentRef.changeDetectorRef.detectChanges()),
                  this._componentRef.changeDetectorRef.markForCheck(),
                  this._componentRef.changeDetectorRef.detectChanges(),
                  this.onShown.emit(this._componentRef.instance);
              }
              return this._registerOutsideClick(), this._componentRef;
            }),
            (t.prototype.hide = function () {
              if (!this._componentRef) return this;
              this._posService.deletePositionElement(
                this._componentRef.location
              ),
                this.onBeforeHide.emit(this._componentRef.instance);
              var t = this._componentRef.location.nativeElement;
              return (
                t.parentNode.removeChild(t),
                this._contentRef.componentRef &&
                  this._contentRef.componentRef.destroy(),
                this._componentRef.destroy(),
                this._viewContainerRef &&
                  this._contentRef.viewRef &&
                  this._viewContainerRef.remove(
                    this._viewContainerRef.indexOf(this._contentRef.viewRef)
                  ),
                this._contentRef.viewRef && this._contentRef.viewRef.destroy(),
                (this._contentRef = null),
                (this._componentRef = null),
                this._removeGlobalListener(),
                this.onHidden.emit(),
                this
              );
            }),
            (t.prototype.toggle = function () {
              this.isShown ? this.hide() : this.show();
            }),
            (t.prototype.dispose = function () {
              this.isShown && this.hide(),
                this._unsubscribePositioning(),
                this._unregisterListenersFn && this._unregisterListenersFn();
            }),
            (t.prototype.listen = function (t) {
              var e = this;
              (this.triggers = t.triggers || this.triggers),
                (this._listenOpts.outsideClick = t.outsideClick),
                (this._listenOpts.outsideEsc = t.outsideEsc),
                (t.target = t.target || this._elementRef.nativeElement);
              var n = (this._listenOpts.hide = function () {
                  return t.hide ? t.hide() : void e.hide();
                }),
                r = (this._listenOpts.show = function (n) {
                  t.show ? t.show(n) : e.show(n), n();
                });
              return (
                (this._unregisterListenersFn = (function (t, e) {
                  var n = (function (t, n) {
                      void 0 === n && (n = Bp);
                      var r = (e.triggers || "").trim();
                      if (0 === r.length) return [];
                      var o = r
                          .split(/\s+/)
                          .map(function (t) {
                            return t.split(":");
                          })
                          .map(function (t) {
                            var e = n[t[0]] || t;
                            return new zp(e[0], e[1]);
                          }),
                        i = o.filter(function (t) {
                          return t.isManual();
                        });
                      if (i.length > 1)
                        throw new Error(
                          "Triggers parse error: only one manual trigger is allowed"
                        );
                      if (1 === i.length && o.length > 1)
                        throw new Error(
                          "Triggers parse error: manual trigger can't be mixed with other triggers"
                        );
                      return o;
                    })(),
                    r = e.target;
                  if (1 === n.length && n[0].isManual())
                    return Function.prototype;
                  var o = [],
                    i = [],
                    l = function () {
                      i.forEach(function (t) {
                        return o.push(t());
                      }),
                        (i.length = 0);
                    };
                  return (
                    n.forEach(function (n) {
                      var a = n.open === n.close,
                        u = a ? e.toggle : e.show;
                      a ||
                        i.push(function () {
                          return t.listen(r, n.close, e.hide);
                        }),
                        o.push(
                          t.listen(r, n.open, function () {
                            return u(l);
                          })
                        );
                    }),
                    function () {
                      o.forEach(function (t) {
                        return t();
                      });
                    }
                  );
                })(this._renderer, {
                  target: t.target,
                  triggers: t.triggers,
                  show: r,
                  hide: n,
                  toggle: function (t) {
                    e.isShown ? n() : r(t);
                  },
                })),
                this
              );
            }),
            (t.prototype._removeGlobalListener = function () {
              this._globalListener &&
                (this._globalListener(), (this._globalListener = null));
            }),
            (t.prototype.attachInline = function (t, e) {
              return (this._inlineViewRef = t.createEmbeddedView(e)), this;
            }),
            (t.prototype._registerOutsideClick = function () {
              var t = this;
              if (this._componentRef && this._componentRef.location) {
                if (this._listenOpts.outsideClick) {
                  var e = this._componentRef.location.nativeElement;
                  setTimeout(function () {
                    var n;
                    t._globalListener = (n = {
                      targets: [e, t._elementRef.nativeElement],
                      outsideClick: t._listenOpts.outsideClick,
                      hide: function () {
                        return t._listenOpts.hide();
                      },
                    }).outsideClick
                      ? t._renderer.listen("document", "click", function (t) {
                          (n.target && n.target.contains(t.target)) ||
                            (n.targets &&
                              n.targets.some(function (e) {
                                return e.contains(t.target);
                              })) ||
                            n.hide();
                        })
                      : Function.prototype;
                  });
                }
                var n;
                this._listenOpts.outsideEsc &&
                  (this._globalListener = (n = {
                    targets: [
                      this._componentRef.location.nativeElement,
                      this._elementRef.nativeElement,
                    ],
                    outsideEsc: this._listenOpts.outsideEsc,
                    hide: function () {
                      return t._listenOpts.hide();
                    },
                  }).outsideEsc
                    ? this._renderer.listen(
                        "document",
                        "keyup.esc",
                        function (t) {
                          (n.target && n.target.contains(t.target)) ||
                            (n.targets &&
                              n.targets.some(function (e) {
                                return e.contains(t.target);
                              })) ||
                            n.hide();
                        }
                      )
                    : Function.prototype);
              }
            }),
            (t.prototype.getInnerComponent = function () {
              return this._innerComponent;
            }),
            (t.prototype._subscribePositioning = function () {
              var t = this;
              !this._zoneSubscription &&
                this.attachment &&
                (this.onShown.subscribe(function () {
                  t._posService.position({
                    element: t._componentRef.location,
                    target: t._elementRef,
                    attachment: t.attachment,
                    appendToBody: "body" === t.container,
                  });
                }),
                (this._zoneSubscription = this._ngZone.onStable.subscribe(
                  function () {
                    t._componentRef && t._posService.calcPosition();
                  }
                )));
            }),
            (t.prototype._unsubscribePositioning = function () {
              this._zoneSubscription &&
                (this._zoneSubscription.unsubscribe(),
                (this._zoneSubscription = null));
            }),
            (t.prototype._getContentRef = function (t, e, n) {
              if (!t) return new qp([]);
              if (t instanceof Mn) {
                if (this._viewContainerRef) {
                  var r = this._viewContainerRef.createEmbeddedView(t, e);
                  return r.markForCheck(), new qp([r.rootNodes], r);
                }
                var o = t.createEmbeddedView({});
                return (
                  this._applicationRef.attachView(o), new qp([o.rootNodes], o)
                );
              }
              if ("function" == typeof t) {
                var i =
                    this._componentFactoryResolver.resolveComponentFactory(t),
                  l = Bt.create({
                    providers: this._providers,
                    parent: this._injector,
                  }),
                  a = i.create(l);
                return (
                  Object.assign(a.instance, n),
                  this._applicationRef.attachView(a.hostView),
                  new qp([[a.location.nativeElement]], a.hostView, a)
                );
              }
              return new qp([[this._renderer.createText("" + t)]]);
            }),
            t
          );
        })(),
        Qp = (function () {
          function t(t, e, n, r, o) {
            (this._componentFactoryResolver = t),
              (this._ngZone = e),
              (this._injector = n),
              (this._posService = r),
              (this._applicationRef = o);
          }
          return (
            (t.prototype.createLoader = function (t, e, n) {
              return new Zp(
                e,
                n,
                t,
                this._injector,
                this._componentFactoryResolver,
                this._ngZone,
                this._applicationRef,
                this._posService
              );
            }),
            t
          );
        })();
      function Yp(t, e, n, r) {
        return (
          f(n) && ((r = n), (n = void 0)),
          r
            ? Yp(t, e, n).pipe(
                $(function (t) {
                  return h(t) ? r.apply(void 0, t) : r(t);
                })
              )
            : new A(function (r) {
                !(function t(e, n, r, o, i) {
                  var l;
                  if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.addEventListener &&
                        "function" == typeof t.removeEventListener
                      );
                    })(e)
                  ) {
                    var a = e;
                    e.addEventListener(n, r, i),
                      (l = function () {
                        return a.removeEventListener(n, r, i);
                      });
                  } else if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.on &&
                        "function" == typeof t.off
                      );
                    })(e)
                  ) {
                    var u = e;
                    e.on(n, r),
                      (l = function () {
                        return u.off(n, r);
                      });
                  } else if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.addListener &&
                        "function" == typeof t.removeListener
                      );
                    })(e)
                  ) {
                    var s = e;
                    e.addListener(n, r),
                      (l = function () {
                        return s.removeListener(n, r);
                      });
                  } else {
                    if (!e || !e.length)
                      throw new TypeError("Invalid event target");
                    for (var c = 0, h = e.length; c < h; c++)
                      t(e[c], n, r, o, i);
                  }
                  o.add(l);
                })(
                  t,
                  e,
                  function (t) {
                    r.next(
                      arguments.length > 1
                        ? Array.prototype.slice.call(arguments)
                        : t
                    );
                  },
                  r,
                  n
                );
              })
        );
      }
      var $p = (function (t) {
          function e(e, n) {
            var r = t.call(this, e, n) || this;
            return (r.scheduler = e), (r.work = n), r;
          }
          return (
            o(e, t),
            (e.prototype.requestAsyncId = function (e, n, r) {
              return (
                void 0 === r && (r = 0),
                null !== r && r > 0
                  ? t.prototype.requestAsyncId.call(this, e, n, r)
                  : (e.actions.push(this),
                    e.scheduled ||
                      (e.scheduled = requestAnimationFrame(function () {
                        return e.flush(null);
                      })))
              );
            }),
            (e.prototype.recycleAsyncId = function (e, n, r) {
              if (
                (void 0 === r && (r = 0),
                (null !== r && r > 0) || (null === r && this.delay > 0))
              )
                return t.prototype.recycleAsyncId.call(this, e, n, r);
              0 === e.actions.length &&
                (cancelAnimationFrame(n), (e.scheduled = void 0));
            }),
            e
          );
        })(
          (function (t) {
            function e(e, n) {
              var r = t.call(this, e, n) || this;
              return (r.scheduler = e), (r.work = n), (r.pending = !1), r;
            }
            return (
              o(e, t),
              (e.prototype.schedule = function (t, e) {
                if ((void 0 === e && (e = 0), this.closed)) return this;
                this.state = t;
                var n = this.id,
                  r = this.scheduler;
                return (
                  null != n && (this.id = this.recycleAsyncId(r, n, e)),
                  (this.pending = !0),
                  (this.delay = e),
                  (this.id = this.id || this.requestAsyncId(r, this.id, e)),
                  this
                );
              }),
              (e.prototype.requestAsyncId = function (t, e, n) {
                return (
                  void 0 === n && (n = 0), setInterval(t.flush.bind(t, this), n)
                );
              }),
              (e.prototype.recycleAsyncId = function (t, e, n) {
                if (
                  (void 0 === n && (n = 0),
                  null !== n && this.delay === n && !1 === this.pending)
                )
                  return e;
                clearInterval(e);
              }),
              (e.prototype.execute = function (t, e) {
                if (this.closed)
                  return new Error("executing a cancelled action");
                this.pending = !1;
                var n = this._execute(t, e);
                if (n) return n;
                !1 === this.pending &&
                  null != this.id &&
                  (this.id = this.recycleAsyncId(
                    this.scheduler,
                    this.id,
                    null
                  ));
              }),
              (e.prototype._execute = function (t, e) {
                var n = !1,
                  r = void 0;
                try {
                  this.work(t);
                } catch (o) {
                  (n = !0), (r = (!!o && o) || new Error(o));
                }
                if (n) return this.unsubscribe(), r;
              }),
              (e.prototype._unsubscribe = function () {
                var t = this.id,
                  e = this.scheduler,
                  n = e.actions,
                  r = n.indexOf(this);
                (this.work = null),
                  (this.state = null),
                  (this.pending = !1),
                  (this.scheduler = null),
                  -1 !== r && n.splice(r, 1),
                  null != t && (this.id = this.recycleAsyncId(e, t, null)),
                  (this.delay = null);
              }),
              e
            );
          })(
            (function (t) {
              function e(e, n) {
                return t.call(this) || this;
              }
              return (
                o(e, t),
                (e.prototype.schedule = function (t, e) {
                  return void 0 === e && (e = 0), this;
                }),
                e
              );
            })(v)
          )
        ),
        Kp = (function () {
          function t(e, n) {
            void 0 === n && (n = t.now),
              (this.SchedulerAction = e),
              (this.now = n);
          }
          return (
            (t.prototype.schedule = function (t, e, n) {
              return (
                void 0 === e && (e = 0),
                new this.SchedulerAction(this, t).schedule(n, e)
              );
            }),
            (t.now = function () {
              return Date.now();
            }),
            t
          );
        })(),
        Xp = new ((function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            o(e, t),
            (e.prototype.flush = function (t) {
              (this.active = !0), (this.scheduled = void 0);
              var e,
                n = this.actions,
                r = -1,
                o = n.length;
              t = t || n.shift();
              do {
                if ((e = t.execute(t.state, t.delay))) break;
              } while (++r < o && (t = n.shift()));
              if (((this.active = !1), e)) {
                for (; ++r < o && (t = n.shift()); ) t.unsubscribe();
                throw e;
              }
            }),
            e
          );
        })(
          (function (t) {
            function e(n, r) {
              void 0 === r && (r = Kp.now);
              var o =
                t.call(this, n, function () {
                  return e.delegate && e.delegate !== o
                    ? e.delegate.now()
                    : r();
                }) || this;
              return (
                (o.actions = []), (o.active = !1), (o.scheduled = void 0), o
              );
            }
            return (
              o(e, t),
              (e.prototype.schedule = function (n, r, o) {
                return (
                  void 0 === r && (r = 0),
                  e.delegate && e.delegate !== this
                    ? e.delegate.schedule(n, r, o)
                    : t.prototype.schedule.call(this, n, r, o)
                );
              }),
              (e.prototype.flush = function (t) {
                var e = this.actions;
                if (this.active) e.push(t);
                else {
                  var n;
                  this.active = !0;
                  do {
                    if ((n = t.execute(t.state, t.delay))) break;
                  } while ((t = e.shift()));
                  if (((this.active = !1), n)) {
                    for (; (t = e.shift()); ) t.unsubscribe();
                    throw n;
                  }
                }
              }),
              e
            );
          })(Kp)
        ))($p);
      function Jp(t, e) {
        if (1 !== t.nodeType) return [];
        var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
        return e ? n[e] : n;
      }
      function tf(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host;
      }
      function ef(t) {
        if (!t) return document.body;
        switch (t.nodeName) {
          case "HTML":
          case "BODY":
            return t.ownerDocument.body;
          case "#document":
            return t.body;
        }
        var e = Jp(t),
          n = e.overflowX,
          r = e.overflowY;
        return /(auto|scroll|overlay)/.test(
          String(e.overflow) + String(r) + String(n)
        )
          ? t
          : ef(tf(t));
      }
      var nf = "undefined" != typeof window && "undefined" != typeof document,
        rf = nf && !(!window.MSInputMethodContext || !document.documentMode),
        of =
          nf &&
          !(
            !window.MSInputMethodContext || !/MSIE 10/.test(navigator.userAgent)
          );
      function lf(t) {
        return 11 === t ? rf : 10 === t ? of : rf || of;
      }
      function af(t) {
        if (!t) return document.documentElement;
        for (
          var e, n = lf(10) ? document.body : null, r = t.offsetParent || null;
          r === n && t.nextElementSibling && "BODY" !== t.nodeName;

        )
          r = (e = t.nextElementSibling).offsetParent;
        var o = r && r.nodeName;
        return o && "BODY" !== o && "HTML" !== o
          ? -1 !== ["TH", "TD", "TABLE"].indexOf(r.nodeName) &&
            "static" === Jp(r, "position")
            ? af(r)
            : r
          : e
          ? e.ownerDocument.documentElement
          : document.documentElement;
      }
      function uf(t) {
        return null !== t.parentNode ? uf(t.parentNode) : t;
      }
      function sf(t, e) {
        if (!(t && t.nodeType && e && e.nodeType))
          return document.documentElement;
        var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
          r = n ? t : e,
          o = n ? e : t,
          i = document.createRange();
        i.setStart(r, 0), i.setEnd(o, 0);
        var l,
          a,
          u = i.commonAncestorContainer;
        if ((t !== u && e !== u) || r.contains(o))
          return "BODY" === (a = (l = u).nodeName) ||
            ("HTML" !== a && af(l.firstElementChild) !== l)
            ? af(u)
            : u;
        var s = uf(t);
        return s.host ? sf(s.host, e) : sf(t, uf(e).host);
      }
      function cf(t, e) {
        var n = "x" === e ? "Left" : "Top",
          r = "Left" === n ? "Right" : "Bottom";
        return (
          parseFloat(t["border" + n + "Width"]) +
          parseFloat(t["border" + r + "Width"])
        );
      }
      function hf(t, e, n, r) {
        return Math.max(
          e["offset" + t],
          e["scroll" + t],
          n["client" + t],
          n["offset" + t],
          n["scroll" + t],
          lf(10)
            ? parseInt(n["offset" + t], 10) +
                parseInt(r["margin" + ("Height" === t ? "Top" : "Left")], 10) +
                parseInt(
                  r["margin" + ("Height" === t ? "Bottom" : "Right")],
                  10
                )
            : 0
        );
      }
      function pf(t) {
        var e = t.body,
          n = t.documentElement,
          r = lf(10) && getComputedStyle(n);
        return { height: hf("Height", e, n, r), width: hf("Width", e, n, r) };
      }
      function ff(t, e) {
        void 0 === e && (e = "top");
        var n = "top" === e ? "scrollTop" : "scrollLeft",
          r = t.nodeName;
        return "BODY" === r || "HTML" === r
          ? (t.ownerDocument.scrollingElement ||
              t.ownerDocument.documentElement)[n]
          : t[n];
      }
      function df(t) {
        return i({}, t, { right: t.left + t.width, bottom: t.top + t.height });
      }
      function gf(t) {
        var e = {};
        try {
          if (lf(10)) {
            e = t.getBoundingClientRect();
            var n = ff(t, "top"),
              r = ff(t, "left");
            (e.top += n), (e.left += r), (e.bottom += n), (e.right += r);
          } else e = t.getBoundingClientRect();
        } catch (s) {
          return;
        }
        var o = {
            left: e.left,
            top: e.top,
            width: e.right - e.left,
            height: e.bottom - e.top,
          },
          i = "HTML" === t.nodeName ? pf(t.ownerDocument) : {},
          l = t.offsetWidth - (i.width || t.clientWidth || o.right - o.left),
          a = t.offsetHeight - (i.height || t.clientHeight || o.bottom - o.top);
        if (l || a) {
          var u = Jp(t);
          (l -= cf(u, "x")), (a -= cf(u, "y")), (o.width -= l), (o.height -= a);
        }
        return df(o);
      }
      function vf(t, e, n) {
        void 0 === n && (n = !1);
        var r = lf(10),
          o = "HTML" === e.nodeName,
          i = gf(t),
          l = gf(e),
          a = ef(t),
          u = Jp(e),
          s = parseFloat(u.borderTopWidth),
          c = parseFloat(u.borderLeftWidth);
        n &&
          o &&
          ((l.top = Math.max(l.top, 0)), (l.left = Math.max(l.left, 0)));
        var h = df({
          top: i.top - l.top - s,
          left: i.left - l.left - c,
          width: i.width,
          height: i.height,
        });
        if (((h.marginTop = 0), (h.marginLeft = 0), !r && o)) {
          var p = parseFloat(u.marginTop),
            f = parseFloat(u.marginLeft);
          (h.top -= s - p),
            (h.bottom -= s - p),
            (h.left -= c - f),
            (h.right -= c - f),
            (h.marginTop = p),
            (h.marginLeft = f);
        }
        return (
          (r && !n ? e.contains(a) : e === a && "BODY" !== a.nodeName) &&
            (h = (function (t, e, n) {
              void 0 === n && (n = !1);
              var r = ff(e, "top"),
                o = ff(e, "left"),
                i = n ? -1 : 1;
              return (
                (t.top += r * i),
                (t.bottom += r * i),
                (t.left += o * i),
                (t.right += o * i),
                t
              );
            })(h, e)),
          h
        );
      }
      function mf(t) {
        if (!t || !t.parentElement || lf()) return document.documentElement;
        for (var e = t.parentElement; e && "none" === Jp(e, "transform"); )
          e = e.parentElement;
        return e || document.documentElement;
      }
      function yf(t, e, n, r, o) {
        void 0 === n && (n = 0), void 0 === o && (o = !1);
        var i = { top: 0, left: 0 },
          l = o ? mf(t) : sf(t, e);
        if ("viewport" === r)
          i = (function (t, e) {
            void 0 === e && (e = !1);
            var n = l.ownerDocument.documentElement,
              r = vf(l, n),
              o = Math.max(n.clientWidth, window.innerWidth || 0),
              i = Math.max(n.clientHeight, window.innerHeight || 0),
              a = e ? 0 : ff(n),
              u = e ? 0 : ff(n, "left");
            return df({
              top: a - Number(r.top) + Number(r.marginTop),
              left: u - Number(r.left) + Number(r.marginLeft),
              width: o,
              height: i,
            });
          })(0, o);
        else {
          var a = void 0;
          "scrollParent" === r
            ? "BODY" === (a = ef(tf(e))).nodeName &&
              (a = t.ownerDocument.documentElement)
            : (a = "window" === r ? t.ownerDocument.documentElement : r);
          var u = vf(a, l, o);
          if (
            "HTML" !== a.nodeName ||
            (function t(e) {
              var n = e.nodeName;
              return (
                "BODY" !== n &&
                "HTML" !== n &&
                ("fixed" === Jp(e, "position") || t(tf(e)))
              );
            })(l)
          )
            i = u;
          else {
            var s = pf(t.ownerDocument),
              c = s.height,
              h = s.width;
            (i.top += u.top - u.marginTop),
              (i.bottom = Number(c) + Number(u.top)),
              (i.left += u.left - u.marginLeft),
              (i.right = Number(h) + Number(u.left));
          }
        }
        return (i.left += n), (i.top += n), (i.right -= n), (i.bottom -= n), i;
      }
      function bf(t, e, n, r, o, l, a) {
        if (
          (void 0 === o && (o = ["top", "bottom", "right", "left"]),
          void 0 === l && (l = "viewport"),
          void 0 === a && (a = 0),
          -1 === t.indexOf("auto"))
        )
          return t;
        var u = yf(n, r, a, l),
          s = {
            top: { width: u.width, height: e.top - u.top },
            right: { width: u.right - e.right, height: u.height },
            bottom: { width: u.width, height: u.bottom - e.bottom },
            left: { width: e.left - u.left, height: u.height },
          },
          c = Object.keys(s)
            .map(function (t) {
              return i({ key: t }, s[t], {
                area: ((e = s[t]), e.width * e.height),
              });
              var e;
            })
            .sort(function (t, e) {
              return e.area - t.area;
            }),
          h = c.filter(function (t) {
            return t.width >= n.clientWidth && t.height >= n.clientHeight;
          }),
          p =
            (h = h.filter(function (t) {
              return o.some(function (e) {
                return e === t.key;
              });
            })).length > 0
              ? h[0].key
              : c[0].key,
          f = t.split(" ")[1];
        return (
          (n.className = n.className.replace(
            /bs-tooltip-auto/g,
            "bs-tooltip-" + p
          )),
          p + (f ? "-" + f : "")
        );
      }
      function _f(t) {
        var e = t.ownerDocument.defaultView.getComputedStyle(t),
          n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
          r = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
        return {
          width: Number(t.offsetWidth) + r,
          height: Number(t.offsetHeight) + n,
        };
      }
      function wf(t, e, n) {
        return void 0 === n && (n = null), vf(e, n ? mf(t) : sf(t, e), n);
      }
      function Cf(t, e, n) {
        var r,
          o = n.split(" ")[0],
          i = _f(t),
          l = { width: i.width, height: i.height },
          a = -1 !== ["right", "left"].indexOf(o),
          u = a ? "top" : "left",
          s = a ? "left" : "top",
          c = a ? "height" : "width",
          h = a ? "width" : "height";
        return (
          (l[u] = e[u] + e[c] / 2 - i[c] / 2),
          (l[s] =
            o === s
              ? e[s] - i[h]
              : e[
                  ((r = {
                    left: "right",
                    right: "left",
                    bottom: "top",
                    top: "bottom",
                  }),
                  s.replace(/left|right|bottom|top/g, function (t) {
                    return r[t];
                  }))
                ]),
          l
        );
      }
      function Ef(t, e) {
        return t && t.modifiers && t.modifiers[e] && t.modifiers[e].enabled;
      }
      function Sf(t, e, n) {
        Object.keys(e).forEach(function (r) {
          var o,
            i = "";
          -1 !==
            ["width", "height", "top", "right", "bottom", "left"].indexOf(r) &&
            "" !== (o = e[r]) &&
            !isNaN(parseFloat(o)) &&
            isFinite(o) &&
            (i = "px"),
            n
              ? n.setStyle(t, r, "" + String(e[r]) + i)
              : (t.style[r] = String(e[r]) + i);
        });
      }
      function xf(t) {
        var e,
          n = t.offsets.target,
          r = t.instance.target.querySelector(".arrow");
        if (!r) return t;
        var o = -1 !== ["left", "right"].indexOf(t.placement),
          i = o ? "height" : "width",
          l = o ? "Top" : "Left",
          a = l.toLowerCase(),
          u = o ? "left" : "top",
          s = o ? "bottom" : "right",
          c = _f(r)[i];
        t.offsets.host[s] - c < n[a] &&
          (n[a] -= n[a] - (t.offsets.host[s] - c)),
          Number(t.offsets.host[a]) + Number(c) > n[s] &&
            (n[a] += Number(t.offsets.host[a]) + Number(c) - Number(n[s])),
          (n = df(n));
        var h =
            Number(t.offsets.host[a]) + Number(t.offsets.host[i] / 2 - c / 2),
          p = Jp(t.instance.target),
          f = parseFloat(p["margin" + l]),
          d = parseFloat(p["border" + l + "Width"]),
          g = h - n[a] - f - d;
        return (
          (g = Math.max(Math.min(n[i] - c, g), 0)),
          (t.offsets.arrow = (((e = {})[a] = Math.round(g)), (e[u] = ""), e)),
          (t.instance.arrow = r),
          t
        );
      }
      function Of(t) {
        if (((t.offsets.target = df(t.offsets.target)), !Ef(t.options, "flip")))
          return (
            (t.offsets.target = i(
              {},
              t.offsets.target,
              Cf(t.instance.target, t.offsets.host, t.placement)
            )),
            t
          );
        var e = yf(t.instance.target, t.instance.host, 0, "viewport", !1),
          n = t.placement.split(" ")[0],
          r = t.placement.split(" ")[1] || "",
          o = bf(
            "auto",
            t.offsets.host,
            t.instance.target,
            t.instance.host,
            t.options.allowedPositions
          ),
          l = [n, o];
        return (
          l.forEach(function (o, a) {
            if (n !== o || l.length === a + 1) return t;
            var u =
                ("left" === (n = t.placement.split(" ")[0]) &&
                  Math.floor(t.offsets.target.right) >
                    Math.floor(t.offsets.host.left)) ||
                ("right" === n &&
                  Math.floor(t.offsets.target.left) <
                    Math.floor(t.offsets.host.right)) ||
                ("top" === n &&
                  Math.floor(t.offsets.target.bottom) >
                    Math.floor(t.offsets.host.top)) ||
                ("bottom" === n &&
                  Math.floor(t.offsets.target.top) <
                    Math.floor(t.offsets.host.bottom)),
              s = Math.floor(t.offsets.target.left) < Math.floor(e.left),
              c = Math.floor(t.offsets.target.right) > Math.floor(e.right),
              h = Math.floor(t.offsets.target.top) < Math.floor(e.top),
              p = Math.floor(t.offsets.target.bottom) > Math.floor(e.bottom),
              f =
                ("left" === n && s) ||
                ("right" === n && c) ||
                ("top" === n && h) ||
                ("bottom" === n && p),
              d = -1 !== ["top", "bottom"].indexOf(n),
              g =
                (d && "left" === r && s) ||
                (d && "right" === r && c) ||
                (!d && "left" === r && h) ||
                (!d && "right" === r && p);
            (u || f || g) &&
              ((u || f) && (n = l[a + 1]),
              g &&
                (r = (function (t) {
                  return "right" === t ? "left" : "left" === t ? "right" : t;
                })(r)),
              (t.placement = n + (r ? " " + r : "")),
              (t.offsets.target = i(
                {},
                t.offsets.target,
                Cf(t.instance.target, t.offsets.host, t.placement)
              )));
          }),
          t
        );
      }
      function Tf(t) {
        if (!Ef(t.options, "preventOverflow")) return t;
        var e = t.instance.target.style,
          n = e.top,
          r = e.left,
          o = e.transform;
        (e.top = ""), (e.left = ""), (e.transform = "");
        var l = yf(t.instance.target, t.instance.host, 0, "scrollParent", !1);
        (e.top = n), (e.left = r), (e.transform = o);
        var a,
          u = {
            primary: function (e) {
              var n,
                r = t.offsets.target[e];
              return (
                t.offsets.target[e] < l[e] &&
                  (r = Math.max(t.offsets.target[e], l[e])),
                ((n = {})[e] = r),
                n
              );
            },
            secondary: function (e) {
              var n,
                r = "right" === e ? "left" : "top",
                o = t.offsets.target[r];
              return (
                t.offsets.target[e] > l[e] &&
                  (o = Math.min(
                    t.offsets.target[r],
                    l[e] -
                      ("right" === e
                        ? t.offsets.target.width
                        : t.offsets.target.height)
                  )),
                ((n = {})[r] = o),
                n
              );
            },
          };
        return (
          ["left", "right", "top", "bottom"].forEach(function (e) {
            (a = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary"),
              (t.offsets.target = i({}, t.offsets.target, u[a](e)));
          }),
          t
        );
      }
      function kf(t) {
        var e,
          n,
          r = t.placement,
          o = r.split(" ")[0],
          l = r.split(" ")[1];
        if (l) {
          var a = t.offsets,
            u = a.host,
            s = a.target,
            c = -1 !== ["bottom", "top"].indexOf(o),
            h = c ? "left" : "top",
            p = c ? "width" : "height",
            f = {
              start: ((e = {}), (e[h] = u[h]), e),
              end: ((n = {}), (n[h] = u[h] + u[p] - s[p]), n),
            };
          t.offsets.target = i({}, s, f[l]);
        }
        return t;
      }
      var Af = new ((function () {
          function t() {}
          return (
            (t.prototype.position = function (t, e, n) {
              return void 0 === n && (n = !0), this.offset(t, e, !1);
            }),
            (t.prototype.offset = function (t, e, n) {
              return void 0 === n && (n = !0), wf(e, t);
            }),
            (t.prototype.positionElements = function (t, e, n, r, o) {
              return [Of, kf, Tf, xf].reduce(
                function (t, e) {
                  return e(t);
                },
                (function (t, e, n, r) {
                  var o = wf(t, e);
                  n.match(/^(auto)*\s*(left|right|top|bottom)*$/) ||
                    n.match(/^(left|right|top|bottom)*\s*(start|end)*$/) ||
                    (n = "auto");
                  var i = !!n.match(/auto/g),
                    l = n.match(/auto\s(left|right|top|bottom)/)
                      ? n.split(" ")[1] || "auto"
                      : n;
                  return {
                    options: r,
                    instance: { target: t, host: e, arrow: null },
                    offsets: { target: Cf(t, o, l), host: o, arrow: null },
                    positionFixed: !1,
                    placement: (l = bf(
                      l,
                      o,
                      t,
                      e,
                      r ? r.allowedPositions : void 0
                    )),
                    placementAuto: i,
                  };
                })(e, t, n, o)
              );
            }),
            t
          );
        })())(),
        If = (function () {
          function t(t, e) {
            var n = this;
            (this.update$$ = new M()),
              (this.positionElements = new Map()),
              (function (t) {
                return t === La;
              })(e) &&
                lt(
                  Yp(window, "scroll"),
                  Yp(window, "resize"),
                  Ga(0, Xp),
                  this.update$$
                ).subscribe(function () {
                  n.positionElements.forEach(function (e) {
                    var r, o, i, l, a, u, s, c;
                    (r = Pf(e.target)),
                      (o = Pf(e.element)),
                      (i = e.attachment),
                      (l = e.appendToBody),
                      (a = n.options),
                      (u = t.createRenderer(null, null)),
                      Sf(
                        o,
                        {
                          "will-change": "transform",
                          top: "0px",
                          left: "0px",
                          transform:
                            "translate3d(" +
                            (c = (function (t) {
                              return {
                                width: t.offsets.target.width,
                                height: t.offsets.target.height,
                                left: Math.floor(t.offsets.target.left),
                                top: Math.round(t.offsets.target.top),
                                bottom: Math.round(t.offsets.target.bottom),
                                right: Math.floor(t.offsets.target.right),
                              };
                            })((s = Af.positionElements(r, o, i, l, a)))).left +
                            "px, " +
                            c.top +
                            "px, 0px)",
                        },
                        u
                      ),
                      s.instance.arrow &&
                        Sf(s.instance.arrow, s.offsets.arrow, u),
                      (function (t, e) {
                        var n = t.instance.target,
                          r = n.className;
                        t.placementAuto &&
                          (-1 !==
                            (r = (r = (r = r.replace(
                              /bs-popover-auto/g,
                              "bs-popover-" + t.placement
                            )).replace(
                              /bs-tooltip-auto/g,
                              "bs-tooltip-" + t.placement
                            )).replace(/\sauto/g, " " + t.placement)).indexOf(
                              "popover"
                            ) &&
                            -1 === r.indexOf("popover-auto") &&
                            (r += " popover-auto"),
                          -1 !== r.indexOf("tooltip") &&
                            -1 === r.indexOf("tooltip-auto") &&
                            (r += " tooltip-auto")),
                          (r = r.replace(
                            /left|right|top|bottom/g,
                            "" + t.placement.split(" ")[0]
                          )),
                          e ? e.setAttribute(n, "class", r) : (n.className = r);
                      })(s, u);
                  });
                });
          }
          return (
            (t.prototype.position = function (t) {
              this.addPositionElement(t);
            }),
            (t.prototype.addPositionElement = function (t) {
              this.positionElements.set(Pf(t.element), t);
            }),
            (t.prototype.calcPosition = function () {
              this.update$$.next();
            }),
            (t.prototype.deletePositionElement = function (t) {
              this.positionElements.delete(Pf(t));
            }),
            (t.prototype.setOptions = function (t) {
              this.options = t;
            }),
            t
          );
        })();
      function Pf(t) {
        return "string" == typeof t
          ? document.querySelector(t)
          : t instanceof cn
          ? t.nativeElement
          : t;
      }
      var Rf = (function () {
          return function () {
            (this.autoClose = !0), (this.insideClick = !1);
          };
        })(),
        Nf = (function () {
          return function () {
            var t = this;
            (this.direction = "down"),
              (this.isOpenChange = new Po()),
              (this.isDisabledChange = new Po()),
              (this.toggleClick = new Po()),
              (this.dropdownMenu = new Promise(function (e) {
                t.resolveDropdownMenu = e;
              }));
          };
        })(),
        Df = (function () {
          function t(t, e, n, r) {
            var o = this;
            (this._state = t),
              (this.cd = e),
              (this._renderer = n),
              (this._element = r),
              (this.isOpen = !1),
              (this._subscription = t.isOpenChange.subscribe(function (t) {
                o.isOpen = t;
                var e =
                  o._element.nativeElement.querySelector(".dropdown-menu");
                e &&
                  !Gp() &&
                  (o._renderer.addClass(e, "show"),
                  e.classList.contains("dropdown-menu-right") &&
                    (o._renderer.setStyle(e, "left", "auto"),
                    o._renderer.setStyle(e, "right", "0")),
                  "up" === o.direction &&
                    (o._renderer.setStyle(e, "top", "auto"),
                    o._renderer.setStyle(e, "transform", "translateY(-101%)"))),
                  o.cd.markForCheck(),
                  o.cd.detectChanges();
              }));
          }
          return (
            Object.defineProperty(t.prototype, "direction", {
              get: function () {
                return this._state.direction;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype._contains = function (t) {
              return this._element.nativeElement.contains(t);
            }),
            (t.prototype.ngOnDestroy = function () {
              this._subscription.unsubscribe();
            }),
            t
          );
        })(),
        Mf = (function () {
          function t(t, e, n, r, o, i) {
            (this._elementRef = t),
              (this._renderer = e),
              (this._viewContainerRef = n),
              (this._cis = r),
              (this._config = o),
              (this._state = i),
              (this._isInlineOpen = !1),
              (this._subscriptions = []),
              (this._isInited = !1),
              (this._state.autoClose = this._config.autoClose),
              (this._state.insideClick = this._config.insideClick),
              (this._dropdown = this._cis
                .createLoader(
                  this._elementRef,
                  this._viewContainerRef,
                  this._renderer
                )
                .provide({ provide: Nf, useValue: this._state })),
              (this.onShown = this._dropdown.onShown),
              (this.onHidden = this._dropdown.onHidden),
              (this.isOpenChange = this._state.isOpenChange);
          }
          return (
            Object.defineProperty(t.prototype, "autoClose", {
              get: function () {
                return this._state.autoClose;
              },
              set: function (t) {
                this._state.autoClose = t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "insideClick", {
              get: function () {
                return this._state.insideClick;
              },
              set: function (t) {
                this._state.insideClick = t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "isDisabled", {
              get: function () {
                return this._isDisabled;
              },
              set: function (t) {
                (this._isDisabled = t),
                  this._state.isDisabledChange.emit(t),
                  t && this.hide();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "isOpen", {
              get: function () {
                return this._showInline
                  ? this._isInlineOpen
                  : this._dropdown.isShown;
              },
              set: function (t) {
                t ? this.show() : this.hide();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "isBs4", {
              get: function () {
                return !Gp();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "_showInline", {
              get: function () {
                return !this.container;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.ngOnInit = function () {
              var t = this;
              this._isInited ||
                ((this._isInited = !0),
                this._dropdown.listen({
                  outsideClick: !1,
                  triggers: this.triggers,
                  show: function () {
                    return t.show();
                  },
                }),
                this._subscriptions.push(
                  this._state.toggleClick.subscribe(function (e) {
                    return t.toggle(e);
                  })
                ),
                this._subscriptions.push(
                  this._state.isDisabledChange
                    .pipe(
                      tu(function (t) {
                        return t;
                      })
                    )
                    .subscribe(function (e) {
                      return t.hide();
                    })
                ));
            }),
            (t.prototype.show = function () {
              var t = this;
              if (!this.isOpen && !this.isDisabled)
                return this._showInline
                  ? (this._inlinedMenu ||
                      this._state.dropdownMenu
                        .then(function (e) {
                          t._dropdown.attachInline(
                            e.viewContainer,
                            e.templateRef
                          ),
                            (t._inlinedMenu = t._dropdown._inlineViewRef),
                            t.addBs4Polyfills();
                        })
                        .catch(),
                    this.addBs4Polyfills(),
                    (this._isInlineOpen = !0),
                    this.onShown.emit(!0),
                    void this._state.isOpenChange.emit(!0))
                  : void this._state.dropdownMenu
                      .then(function (e) {
                        var n = t.dropup || (void 0 !== t.dropup && t.dropup);
                        t._state.direction = n ? "up" : "down";
                        var r =
                          t.placement || (n ? "top start" : "bottom start");
                        t._dropdown
                          .attach(Df)
                          .to(t.container)
                          .position({ attachment: r })
                          .show({ content: e.templateRef, placement: r }),
                          t._state.isOpenChange.emit(!0);
                      })
                      .catch();
            }),
            (t.prototype.hide = function () {
              this.isOpen &&
                (this._showInline
                  ? (this.removeShowClass(),
                    this.removeDropupStyles(),
                    (this._isInlineOpen = !1),
                    this.onHidden.emit(!0))
                  : this._dropdown.hide(),
                this._state.isOpenChange.emit(!1));
            }),
            (t.prototype.toggle = function (t) {
              return this.isOpen || !t ? this.hide() : this.show();
            }),
            (t.prototype._contains = function (t) {
              return (
                this._elementRef.nativeElement.contains(t.target) ||
                (this._dropdown.instance &&
                  this._dropdown.instance._contains(t.target))
              );
            }),
            (t.prototype.ngOnDestroy = function () {
              var t, e;
              try {
                for (
                  var n = u(this._subscriptions), r = n.next();
                  !r.done;
                  r = n.next()
                )
                  r.value.unsubscribe();
              } catch (o) {
                t = { error: o };
              } finally {
                try {
                  r && !r.done && (e = n.return) && e.call(n);
                } finally {
                  if (t) throw t.error;
                }
              }
              this._dropdown.dispose();
            }),
            (t.prototype.addBs4Polyfills = function () {
              Gp() ||
                (this.addShowClass(),
                this.checkRightAlignment(),
                this.addDropupStyles());
            }),
            (t.prototype.addShowClass = function () {
              this._inlinedMenu &&
                this._inlinedMenu.rootNodes[0] &&
                this._renderer.addClass(this._inlinedMenu.rootNodes[0], "show");
            }),
            (t.prototype.removeShowClass = function () {
              this._inlinedMenu &&
                this._inlinedMenu.rootNodes[0] &&
                this._renderer.removeClass(
                  this._inlinedMenu.rootNodes[0],
                  "show"
                );
            }),
            (t.prototype.checkRightAlignment = function () {
              if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
                var t = this._inlinedMenu.rootNodes[0].classList.contains(
                  "dropdown-menu-right"
                );
                this._renderer.setStyle(
                  this._inlinedMenu.rootNodes[0],
                  "left",
                  t ? "auto" : "0"
                ),
                  this._renderer.setStyle(
                    this._inlinedMenu.rootNodes[0],
                    "right",
                    t ? "0" : "auto"
                  );
              }
            }),
            (t.prototype.addDropupStyles = function () {
              this._inlinedMenu &&
                this._inlinedMenu.rootNodes[0] &&
                (this._renderer.setStyle(
                  this._inlinedMenu.rootNodes[0],
                  "top",
                  this.dropup ? "auto" : "100%"
                ),
                this._renderer.setStyle(
                  this._inlinedMenu.rootNodes[0],
                  "transform",
                  this.dropup ? "translateY(-101%)" : "translateY(0)"
                ),
                this._renderer.setStyle(
                  this._inlinedMenu.rootNodes[0],
                  "bottom",
                  "auto"
                ));
            }),
            (t.prototype.removeDropupStyles = function () {
              this._inlinedMenu &&
                this._inlinedMenu.rootNodes[0] &&
                (this._renderer.removeStyle(
                  this._inlinedMenu.rootNodes[0],
                  "top"
                ),
                this._renderer.removeStyle(
                  this._inlinedMenu.rootNodes[0],
                  "transform"
                ),
                this._renderer.removeStyle(
                  this._inlinedMenu.rootNodes[0],
                  "bottom"
                ));
            }),
            t
          );
        })(),
        jf = (function () {
          return function (t, e, n) {
            t.resolveDropdownMenu({ templateRef: n, viewContainer: e });
          };
        })(),
        Vf = (function () {
          function t(t, e, n, r, o) {
            var i = this;
            (this._changeDetectorRef = t),
              (this._dropdown = e),
              (this._element = n),
              (this._renderer = r),
              (this._state = o),
              (this.isDisabled = null),
              (this._subscriptions = []),
              this._subscriptions.push(
                this._state.isOpenChange.subscribe(function (t) {
                  (i.isOpen = t),
                    t
                      ? ((i._documentClickListener = i._renderer.listen(
                          "document",
                          "click",
                          function (t) {
                            !i._state.autoClose ||
                              2 === t.button ||
                              i._element.nativeElement.contains(t.target) ||
                              (i._state.insideClick &&
                                i._dropdown._contains(t)) ||
                              (i._state.toggleClick.emit(!1),
                              i._changeDetectorRef.detectChanges());
                          }
                        )),
                        (i._escKeyUpListener = i._renderer.listen(
                          i._element.nativeElement,
                          "keyup.esc",
                          function () {
                            i._state.autoClose &&
                              (i._state.toggleClick.emit(!1),
                              i._changeDetectorRef.detectChanges());
                          }
                        )))
                      : (i._documentClickListener(), i._escKeyUpListener());
                })
              ),
              this._subscriptions.push(
                this._state.isDisabledChange.subscribe(function (t) {
                  return (i.isDisabled = t || null);
                })
              );
          }
          return (
            (t.prototype.onClick = function () {
              this.isDisabled || this._state.toggleClick.emit(!0);
            }),
            (t.prototype.ngOnDestroy = function () {
              var t, e;
              this._documentClickListener && this._documentClickListener(),
                this._escKeyUpListener && this._escKeyUpListener();
              try {
                for (
                  var n = u(this._subscriptions), r = n.next();
                  !r.done;
                  r = n.next()
                )
                  r.value.unsubscribe();
              } catch (o) {
                t = { error: o };
              } finally {
                try {
                  r && !r.done && (e = n.return) && e.call(n);
                } finally {
                  if (t) throw t.error;
                }
              }
            }),
            t
          );
        })(),
        Lf = (function () {
          function t() {}
          return (
            (t.forRoot = function (e) {
              return {
                ngModule: t,
                providers: [
                  Qp,
                  If,
                  Nf,
                  {
                    provide: Rf,
                    useValue: e || { autoClose: !0, insideClick: !1 },
                  },
                ],
              };
            }),
            t
          );
        })(),
        Ff = nr({ encapsulation: 2, styles: [], data: {} });
      function Uf(t) {
        return il(
          2,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "div",
              [],
              [
                [2, "dropup", null],
                [2, "dropdown", null],
                [2, "show", null],
                [2, "open", null],
              ],
              null,
              null,
              null,
              null
            )),
            {
              nodeIndex: -1,
              parent: null,
              renderParent: null,
              bindingIndex: -1,
              outputIndex: -1,
              checkIndex: -1,
              flags: 8,
              childFlags: 0,
              directChildFlags: 0,
              childMatchedQueries: 0,
              matchedQueries: {},
              matchedQueryIds: 0,
              references: {},
              ngContentIndex: null,
              childCount: 0,
              bindings: [],
              bindingFlags: 0,
              outputs: [],
              element: null,
              provider: null,
              text: null,
              query: null,
              ngContent: { index: 0 },
            },
          ],
          null,
          function (t, e) {
            var n = e.component;
            t(
              e,
              0,
              0,
              "up" === n.direction,
              "down" === n.direction,
              n.isOpen,
              n.isOpen
            );
          }
        );
      }
      function Hf(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "bs-dropdown-container",
              [["style", "display:block;position: absolute;"]],
              null,
              null,
              null,
              Uf,
              Ff
            )),
            po(1, 180224, null, 0, Df, [Nf, In, gn, cn], null, null),
          ],
          null,
          null
        );
      }
      var zf = zr("bs-dropdown-container", Df, Hf, {}, {}, ["*"]);
      function Bf(t) {
        return (Bf =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              })(t);
      }
      function Wf(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function Gf() {
        return (Gf =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
            }
            return t;
          }).apply(this, arguments);
      }
      function qf(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {},
            r = Object.keys(n);
          "function" == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable;
              })
            )),
            r.forEach(function (e) {
              Wf(t, e, n[e]);
            });
        }
        return t;
      }
      function Zf(t) {
        return !!navigator.userAgent.match(t);
      }
      var Qf = Zf(/(?:Trident.*rv[ :]?11\.|msie|iemobile)/i),
        Yf = Zf(/Edge/i),
        $f = Zf(/firefox/i),
        Kf = Zf(/safari/i) && !Zf(/chrome/i) && !Zf(/android/i),
        Xf = Zf(/iP(ad|od|hone)/i),
        Jf = { capture: !1, passive: !1 };
      function td(t, e, n) {
        t.addEventListener(e, n, !Qf && Jf);
      }
      function ed(t, e, n) {
        t.removeEventListener(e, n, !Qf && Jf);
      }
      function nd(t, e) {
        if (e) {
          if ((">" === e[0] && (e = e.substring(1)), t))
            try {
              if (t.matches) return t.matches(e);
              if (t.msMatchesSelector) return t.msMatchesSelector(e);
              if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
            } catch (n) {
              return !1;
            }
          return !1;
        }
      }
      function rd(t) {
        return t.host && t !== document && t.host.nodeType
          ? t.host
          : t.parentNode;
      }
      function od(t, e, n, r) {
        if (t) {
          n = n || document;
          do {
            if (
              (null != e &&
                (">" === e[0] ? t.parentNode === n && nd(t, e) : nd(t, e))) ||
              (r && t === n)
            )
              return t;
            if (t === n) break;
          } while ((t = rd(t)));
        }
        return null;
      }
      var id,
        ld = /\s+/g;
      function ad(t, e, n) {
        if (t && e)
          if (t.classList) t.classList[n ? "add" : "remove"](e);
          else {
            var r = (" " + t.className + " ")
              .replace(ld, " ")
              .replace(" " + e + " ", " ");
            t.className = (r + (n ? " " + e : "")).replace(ld, " ");
          }
      }
      function ud(t, e, n) {
        var r = t && t.style;
        if (r) {
          if (void 0 === n)
            return (
              document.defaultView && document.defaultView.getComputedStyle
                ? (n = document.defaultView.getComputedStyle(t, ""))
                : t.currentStyle && (n = t.currentStyle),
              void 0 === e ? n : n[e]
            );
          e in r || -1 !== e.indexOf("webkit") || (e = "-webkit-" + e),
            (r[e] = n + ("string" == typeof n ? "" : "px"));
        }
      }
      function sd(t, e) {
        var n = "";
        do {
          var r = ud(t, "transform");
          r && "none" !== r && (n = r + " " + n);
        } while (!e && (t = t.parentNode));
        var o = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix;
        return o && new o(n);
      }
      function cd(t, e, n) {
        if (t) {
          var r = t.getElementsByTagName(e),
            o = 0,
            i = r.length;
          if (n) for (; o < i; o++) n(r[o], o);
          return r;
        }
        return [];
      }
      function hd() {
        return Qf ? document.documentElement : document.scrollingElement;
      }
      function pd(t, e, n, r, o) {
        if (t.getBoundingClientRect || t === window) {
          var i, l, a, u, s, c, h;
          if (
            (t !== window && t !== hd()
              ? ((l = (i = t.getBoundingClientRect()).top),
                (a = i.left),
                (u = i.bottom),
                (s = i.right),
                (c = i.height),
                (h = i.width))
              : ((l = 0),
                (a = 0),
                (u = window.innerHeight),
                (s = window.innerWidth),
                (c = window.innerHeight),
                (h = window.innerWidth)),
            (e || n) && t !== window && ((o = o || t.parentNode), !Qf))
          )
            do {
              if (
                o &&
                o.getBoundingClientRect &&
                ("none" !== ud(o, "transform") ||
                  (n && "static" !== ud(o, "position")))
              ) {
                var p = o.getBoundingClientRect();
                (l -= p.top + parseInt(ud(o, "border-top-width"))),
                  (a -= p.left + parseInt(ud(o, "border-left-width"))),
                  (u = l + i.height),
                  (s = a + i.width);
                break;
              }
            } while ((o = o.parentNode));
          if (r && t !== window) {
            var f = sd(o || t),
              d = f && f.a,
              g = f && f.d;
            f && ((u = (l /= g) + (c /= g)), (s = (a /= d) + (h /= d)));
          }
          return { top: l, left: a, bottom: u, right: s, width: h, height: c };
        }
      }
      function fd(t, e, n, r) {
        for (var o = yd(t, !0), i = (e || pd(t))[n]; o; ) {
          var l = pd(o)[r];
          if (!("top" === r || "left" === r ? i >= l : i <= l)) return o;
          if (o === hd()) break;
          o = yd(o, !1);
        }
        return !1;
      }
      function dd(t, e, n) {
        for (var r = 0, o = 0, i = t.children; o < i.length; ) {
          if (
            "none" !== i[o].style.display &&
            i[o] !== gg.ghost &&
            i[o] !== gg.dragged &&
            od(i[o], n.draggable, t, !1)
          ) {
            if (r === e) return i[o];
            r++;
          }
          o++;
        }
        return null;
      }
      function gd(t, e) {
        for (
          var n = t.lastElementChild;
          n &&
          (n === gg.ghost || "none" === ud(n, "display") || (e && !nd(n, e)));

        )
          n = n.previousElementSibling;
        return n || null;
      }
      function vd(t, e) {
        var n = 0;
        if (!t || !t.parentNode) return -1;
        for (; (t = t.previousElementSibling); )
          "TEMPLATE" === t.nodeName.toUpperCase() ||
            t === gg.clone ||
            (e && !nd(t, e)) ||
            n++;
        return n;
      }
      function md(t) {
        var e = 0,
          n = 0,
          r = hd();
        if (t)
          do {
            var o = sd(t);
            (e += t.scrollLeft * o.a), (n += t.scrollTop * o.d);
          } while (t !== r && (t = t.parentNode));
        return [e, n];
      }
      function yd(t, e) {
        if (!t || !t.getBoundingClientRect) return hd();
        var n = t,
          r = !1;
        do {
          if (
            n.clientWidth < n.scrollWidth ||
            n.clientHeight < n.scrollHeight
          ) {
            var o = ud(n);
            if (
              (n.clientWidth < n.scrollWidth &&
                ("auto" == o.overflowX || "scroll" == o.overflowX)) ||
              (n.clientHeight < n.scrollHeight &&
                ("auto" == o.overflowY || "scroll" == o.overflowY))
            ) {
              if (!n.getBoundingClientRect || n === document.body) return hd();
              if (r || e) return n;
              r = !0;
            }
          }
        } while ((n = n.parentNode));
        return hd();
      }
      function bd(t, e) {
        return (
          Math.round(t.top) === Math.round(e.top) &&
          Math.round(t.left) === Math.round(e.left) &&
          Math.round(t.height) === Math.round(e.height) &&
          Math.round(t.width) === Math.round(e.width)
        );
      }
      function _d(t, e) {
        return function () {
          if (!id) {
            var n = arguments;
            1 === n.length ? t.call(this, n[0]) : t.apply(this, n),
              (id = setTimeout(function () {
                id = void 0;
              }, e));
          }
        };
      }
      function wd(t, e, n) {
        (t.scrollLeft += e), (t.scrollTop += n);
      }
      function Cd(t) {
        var e = window.Polymer,
          n = window.jQuery || window.Zepto;
        return e && e.dom
          ? e.dom(t).cloneNode(!0)
          : n
          ? n(t).clone(!0)[0]
          : t.cloneNode(!0);
      }
      var Ed = "Sortable" + new Date().getTime();
      function Sd(t, e, n, r) {
        return (
          (Math.sqrt(
            Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)
          ) /
            Math.sqrt(
              Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)
            )) *
          r.animation
        );
      }
      var xd = [],
        Od = { initializeByDefault: !0 },
        Td = {
          mount: function (t) {
            for (var e in Od) !(e in t) && (t[e] = Od[e]);
            xd.push(t);
          },
          pluginEvent: function (t, e, n) {
            this.eventCanceled = !1;
            var r = t + "Global";
            for (var o in xd)
              e[xd[o].pluginName] &&
                (e[xd[o].pluginName][r] &&
                  (this.eventCanceled = !!e[xd[o].pluginName][r](
                    qf({ sortable: e }, n)
                  )),
                e.options[xd[o].pluginName] &&
                  e[xd[o].pluginName][t] &&
                  (this.eventCanceled =
                    this.eventCanceled ||
                    !!e[xd[o].pluginName][t](qf({ sortable: e }, n))));
          },
          initializePlugins: function (t, e, n) {
            for (var r in xd) {
              var o = xd[r].pluginName;
              if (t.options[o] || xd[r].initializeByDefault) {
                var i = new xd[r](t, e);
                (i.sortable = t), (t[o] = i), Gf(n, i.options);
              }
            }
            for (var l in t.options) {
              var a = this.modifyOption(t, l, t.options[l]);
              void 0 !== a && (t.options[l] = a);
            }
          },
          getEventOptions: function (t, e) {
            var n = {};
            for (var r in xd)
              "function" == typeof xd[r].eventOptions &&
                Gf(n, xd[r].eventOptions.call(e, t));
            return n;
          },
          modifyOption: function (t, e, n) {
            var r;
            for (var o in xd)
              t[xd[o].pluginName] &&
                xd[o].optionListeners &&
                "function" == typeof xd[o].optionListeners[e] &&
                (r = xd[o].optionListeners[e].call(t[xd[o].pluginName], n));
            return r;
          },
        },
        kd = function (t, e) {
          var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {},
            r = n.evt,
            o = (function (t, e) {
              if (null == t) return {};
              var n,
                r,
                o = (function (t, e) {
                  if (null == t) return {};
                  var n,
                    r,
                    o = {},
                    i = Object.keys(t);
                  for (r = 0; r < i.length; r++)
                    e.indexOf((n = i[r])) >= 0 || (o[n] = t[n]);
                  return o;
                })(t, e);
              if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(t);
                for (r = 0; r < i.length; r++)
                  e.indexOf((n = i[r])) >= 0 ||
                    (Object.prototype.propertyIsEnumerable.call(t, n) &&
                      (o[n] = t[n]));
              }
              return o;
            })(n, ["evt"]);
          Td.pluginEvent.bind(gg)(
            t,
            e,
            qf(
              {
                dragEl: Id,
                parentEl: Pd,
                ghostEl: Rd,
                rootEl: Nd,
                nextEl: Dd,
                lastDownEl: Md,
                cloneEl: jd,
                cloneHidden: Vd,
                dragStarted: qd,
                putSortable: Bd,
                activeSortable: gg.active,
                originalEvent: r,
                oldIndex: Ld,
                oldDraggableIndex: Ud,
                newIndex: Fd,
                newDraggableIndex: Hd,
                hideGhostForTarget: hg,
                unhideGhostForTarget: pg,
                cloneNowHidden: function () {
                  Vd = !0;
                },
                cloneNowShown: function () {
                  Vd = !1;
                },
                dispatchSortableEvent: function (t) {
                  Ad({ sortable: e, name: t, originalEvent: r });
                },
              },
              o
            )
          );
        };
      function Ad(t) {
        !(function (t) {
          var e,
            n = t.sortable,
            r = t.rootEl,
            o = t.name,
            i = t.targetEl,
            l = t.cloneEl,
            a = t.toEl,
            u = t.fromEl,
            s = t.oldIndex,
            c = t.newIndex,
            h = t.oldDraggableIndex,
            p = t.newDraggableIndex,
            f = t.originalEvent,
            d = t.putSortable,
            g = t.eventOptions,
            v = (n = n || r[Ed]).options,
            m = "on" + o.charAt(0).toUpperCase() + o.substr(1);
          !window.CustomEvent || Qf || Yf
            ? (e = document.createEvent("Event")).initEvent(o, !0, !0)
            : (e = new CustomEvent(o, { bubbles: !0, cancelable: !0 })),
            (e.to = a || r),
            (e.from = u || r),
            (e.item = i || r),
            (e.clone = l),
            (e.oldIndex = s),
            (e.newIndex = c),
            (e.oldDraggableIndex = h),
            (e.newDraggableIndex = p),
            (e.originalEvent = f),
            (e.pullMode = d ? d.lastPutMode : void 0);
          var y = qf({}, g, Td.getEventOptions(o, n));
          for (var b in y) e[b] = y[b];
          r && r.dispatchEvent(e), v[m] && v[m].call(n, e);
        })(
          qf(
            {
              putSortable: Bd,
              cloneEl: jd,
              targetEl: Id,
              rootEl: Nd,
              oldIndex: Ld,
              oldDraggableIndex: Ud,
              newIndex: Fd,
              newDraggableIndex: Hd,
            },
            t
          )
        );
      }
      if ("undefined" == typeof window || !window.document)
        throw new Error("Sortable.js requires a window with a document");
      var Id,
        Pd,
        Rd,
        Nd,
        Dd,
        Md,
        jd,
        Vd,
        Ld,
        Fd,
        Ud,
        Hd,
        zd,
        Bd,
        Wd,
        Gd,
        qd,
        Zd,
        Qd,
        Yd,
        $d,
        Kd = !1,
        Xd = !1,
        Jd = [],
        tg = !1,
        eg = !1,
        ng = [],
        rg = !1,
        og = [],
        ig = Xf,
        lg = Yf || Qf ? "cssFloat" : "float",
        ag = "draggable" in document.createElement("div"),
        ug = (function () {
          if (Qf) return !1;
          var t = document.createElement("x");
          return (
            (t.style.cssText = "pointer-events:auto"),
            "auto" === t.style.pointerEvents
          );
        })(),
        sg = function (t, e) {
          var n = ud(t),
            r =
              parseInt(n.width) -
              parseInt(n.paddingLeft) -
              parseInt(n.paddingRight) -
              parseInt(n.borderLeftWidth) -
              parseInt(n.borderRightWidth),
            o = dd(t, 0, e),
            i = dd(t, 1, e),
            l = o && ud(o),
            a = i && ud(i),
            u =
              l &&
              parseInt(l.marginLeft) + parseInt(l.marginRight) + pd(o).width,
            s =
              a &&
              parseInt(a.marginLeft) + parseInt(a.marginRight) + pd(i).width;
          return "flex" === n.display
            ? "column" === n.flexDirection ||
              "column-reverse" === n.flexDirection
              ? "vertical"
              : "horizontal"
            : "grid" === n.display
            ? n.gridTemplateColumns.split(" ").length <= 1
              ? "vertical"
              : "horizontal"
            : o && "none" !== l.float
            ? !i ||
              ("both" !== a.clear &&
                a.clear !== ("left" === l.float ? "left" : "right"))
              ? "horizontal"
              : "vertical"
            : o &&
              ("block" === l.display ||
                "flex" === l.display ||
                "table" === l.display ||
                "grid" === l.display ||
                (u >= r && "none" === n[lg]) ||
                (i && "none" === n[lg] && u + s > r))
            ? "vertical"
            : "horizontal";
        },
        cg = function (t) {
          function e(t, n) {
            return function (r, o, i, l) {
              if (
                null == t &&
                (n ||
                  (r.options.group.name &&
                    o.options.group.name &&
                    r.options.group.name === o.options.group.name))
              )
                return !0;
              if (null == t || !1 === t) return !1;
              if (n && "clone" === t) return t;
              if ("function" == typeof t)
                return e(t(r, o, i, l), n)(r, o, i, l);
              var a = (n ? r : o).options.group.name;
              return (
                !0 === t ||
                ("string" == typeof t && t === a) ||
                (t.join && t.indexOf(a) > -1)
              );
            };
          }
          var n = {},
            r = t.group;
          (r && "object" == Bf(r)) || (r = { name: r }),
            (n.name = r.name),
            (n.checkPull = e(r.pull, !0)),
            (n.checkPut = e(r.put)),
            (n.revertClone = r.revertClone),
            (t.group = n);
        },
        hg = function () {
          !ug && Rd && ud(Rd, "display", "none");
        },
        pg = function () {
          !ug && Rd && ud(Rd, "display", "");
        };
      document.addEventListener(
        "click",
        function (t) {
          if (Xd)
            return (
              t.preventDefault(),
              t.stopPropagation && t.stopPropagation(),
              t.stopImmediatePropagation && t.stopImmediatePropagation(),
              (Xd = !1),
              !1
            );
        },
        !0
      );
      var fg = function (t) {
          if (Id) {
            var e = (function (t, e) {
              for (var n in Jd)
                if (!gd(Jd[n])) {
                  var r = pd(Jd[n]),
                    o = Jd[n][Ed].options.emptyInsertThreshold;
                  if (
                    o &&
                    t >= r.left - o &&
                    t <= r.right + o &&
                    e >= r.top - o &&
                    e <= r.bottom + o
                  )
                    return Jd[n];
                }
            })((t = t.touches ? t.touches[0] : t).clientX, t.clientY);
            if (e) {
              var n = {};
              for (var r in t) n[r] = t[r];
              (n.target = n.rootEl = e),
                (n.preventDefault = void 0),
                (n.stopPropagation = void 0),
                e[Ed]._onDragOver(n);
            }
          }
        },
        dg = function (t) {
          Id && Id.parentNode[Ed]._isOutsideThisEl(t.target);
        };
      function gg(t, e) {
        if (!t || !t.nodeType || 1 !== t.nodeType)
          throw "Sortable: `el` must be an HTMLElement, not ".concat(
            {}.toString.call(t)
          );
        (this.el = t), (this.options = e = Gf({}, e)), (t[Ed] = this);
        var n,
          r,
          o = {
            group: null,
            sort: !0,
            disabled: !1,
            store: null,
            handle: null,
            draggable: /^[uo]l$/i.test(t.nodeName) ? ">li" : ">*",
            swapThreshold: 1,
            invertSwap: !1,
            invertedSwapThreshold: null,
            removeCloneOnHide: !0,
            direction: function () {
              return sg(t, this.options);
            },
            ghostClass: "sortable-ghost",
            chosenClass: "sortable-chosen",
            dragClass: "sortable-drag",
            ignore: "a, img",
            filter: null,
            preventOnFilter: !0,
            animation: 0,
            easing: null,
            setData: function (t, e) {
              t.setData("Text", e.textContent);
            },
            dropBubble: !1,
            dragoverBubble: !1,
            dataIdAttr: "data-id",
            delay: 0,
            delayOnTouchOnly: !1,
            touchStartThreshold:
              Number.parseInt(window.devicePixelRatio, 10) || 1,
            forceFallback: !1,
            fallbackClass: "sortable-fallback",
            fallbackOnBody: !1,
            fallbackTolerance: 0,
            fallbackOffset: { x: 0, y: 0 },
            supportPointer:
              !1 !== gg.supportPointer && "PointerEvent" in window,
            emptyInsertThreshold: 5,
          };
        for (var i in (Td.initializePlugins(this, t, o), o))
          !(i in e) && (e[i] = o[i]);
        for (var l in (cg(e), this))
          "_" === l.charAt(0) &&
            "function" == typeof this[l] &&
            (this[l] = this[l].bind(this));
        (this.nativeDraggable = !e.forceFallback && ag),
          this.nativeDraggable && (this.options.touchStartThreshold = 1),
          e.supportPointer
            ? td(t, "pointerdown", this._onTapStart)
            : (td(t, "mousedown", this._onTapStart),
              td(t, "touchstart", this._onTapStart)),
          this.nativeDraggable &&
            (td(t, "dragover", this), td(t, "dragenter", this)),
          Jd.push(this.el),
          e.store && e.store.get && this.sort(e.store.get(this) || []),
          Gf(
            this,
            ((r = []),
            {
              captureAnimationState: function () {
                if (((r = []), this.options.animation)) {
                  var t = [].slice.call(this.el.children);
                  for (var e in t)
                    if ("none" !== ud(t[e], "display") && t[e] !== gg.ghost) {
                      r.push({ target: t[e], rect: pd(t[e]) });
                      var n = pd(t[e]);
                      if (t[e].thisAnimationDuration) {
                        var o = sd(t[e], !0);
                        o && ((n.top -= o.f), (n.left -= o.e));
                      }
                      t[e].fromRect = n;
                    }
                }
              },
              addAnimationState: function (t) {
                r.push(t);
              },
              removeAnimationState: function (t) {
                r.splice(
                  (function (t, e) {
                    for (var n in t)
                      for (var r in e) if (e[r] === t[n][r]) return Number(n);
                    return -1;
                  })(r, { target: t }),
                  1
                );
              },
              animateAll: function (t) {
                if (!this.options.animation)
                  return clearTimeout(n), void ("function" == typeof t && t());
                var e = !1,
                  o = 0;
                for (var i in r) {
                  var l = 0,
                    a = r[i].target,
                    u = a.fromRect,
                    s = pd(a),
                    c = a.prevFromRect,
                    h = a.prevToRect,
                    p = r[i].rect,
                    f = sd(a, !0);
                  f && ((s.top -= f.f), (s.left -= f.e)),
                    (a.toRect = s),
                    ((fd(a, s, "bottom", "top") ||
                      fd(a, s, "top", "bottom") ||
                      fd(a, s, "right", "left") ||
                      fd(a, s, "left", "right")) &&
                      (fd(a, p, "bottom", "top") ||
                        fd(a, p, "top", "bottom") ||
                        fd(a, p, "right", "left") ||
                        fd(a, p, "left", "right")) &&
                      (fd(a, u, "bottom", "top") ||
                        fd(a, u, "top", "bottom") ||
                        fd(a, u, "right", "left") ||
                        fd(a, u, "left", "right"))) ||
                      (a.thisAnimationDuration &&
                        bd(c, s) &&
                        !bd(u, s) &&
                        (p.top - s.top) / (p.left - s.left) ==
                          (u.top - s.top) / (u.left - s.left) &&
                        (l = Sd(p, c, h, this.options)),
                      bd(s, u) ||
                        ((a.prevFromRect = u),
                        (a.prevToRect = s),
                        l || (l = this.options.animation),
                        this.animate(a, p, l)),
                      l &&
                        ((e = !0),
                        (o = Math.max(o, l)),
                        clearTimeout(a.animationResetTimer),
                        (a.animationResetTimer = setTimeout(
                          function () {
                            (this.animationStates[
                              this.i
                            ].target.animationTime = 0),
                              (this.animationStates[
                                this.i
                              ].target.prevFromRect = null),
                              (this.animationStates[this.i].target.fromRect =
                                null),
                              (this.animationStates[this.i].target.prevToRect =
                                null),
                              (this.animationStates[
                                this.i
                              ].target.thisAnimationDuration = null);
                          }.bind({ animationStates: r, i: Number(i) }),
                          l
                        )),
                        (a.thisAnimationDuration = l)));
                }
                clearTimeout(n),
                  e
                    ? (n = setTimeout(function () {
                        "function" == typeof t && t();
                      }, o))
                    : "function" == typeof t && t(),
                  (r = []);
              },
              animate: function (t, e, n) {
                if (n) {
                  ud(t, "transition", ""), ud(t, "transform", "");
                  var r = pd(t),
                    o = sd(this.el),
                    i = (e.left - r.left) / ((o && o.a) || 1),
                    l = (e.top - r.top) / ((o && o.d) || 1);
                  (t.animatingX = !!i),
                    (t.animatingY = !!l),
                    ud(
                      t,
                      "transform",
                      "translate3d(" + i + "px," + l + "px,0)"
                    ),
                    ud(
                      t,
                      "transition",
                      "transform " +
                        n +
                        "ms" +
                        (this.options.easing ? " " + this.options.easing : "")
                    ),
                    ud(t, "transform", "translate3d(0,0,0)"),
                    "number" == typeof t.animated && clearTimeout(t.animated),
                    (t.animated = setTimeout(function () {
                      ud(t, "transition", ""),
                        ud(t, "transform", ""),
                        (t.animated = !1),
                        (t.animatingX = !1),
                        (t.animatingY = !1);
                    }, n));
                }
              },
            })
          );
      }
      function vg(t, e, n, r, o, i, l, a) {
        var u,
          s,
          c = t[Ed],
          h = c.options.onMove;
        return (
          !window.CustomEvent || Qf || Yf
            ? (u = document.createEvent("Event")).initEvent("move", !0, !0)
            : (u = new CustomEvent("move", { bubbles: !0, cancelable: !0 })),
          (u.to = e),
          (u.from = t),
          (u.dragged = n),
          (u.draggedRect = r),
          (u.related = o || e),
          (u.relatedRect = i || pd(e)),
          (u.willInsertAfter = a),
          (u.originalEvent = l),
          t.dispatchEvent(u),
          h && (s = h.call(c, u, l)),
          s
        );
      }
      function mg(t) {
        t.draggable = !1;
      }
      function yg() {
        rg = !1;
      }
      function bg(t) {
        for (
          var e = t.tagName + t.className + t.src + t.href + t.textContent,
            n = e.length,
            r = 0;
          n--;

        )
          r += e.charCodeAt(n);
        return r.toString(36);
      }
      function _g(t) {
        return setTimeout(t, 0);
      }
      function wg(t) {
        return clearTimeout(t);
      }
      (gg.prototype = {
        constructor: gg,
        _isOutsideThisEl: function (t) {
          this.el.contains(t) || t === this.el || (Zd = null);
        },
        _getDirection: function (t, e) {
          return "function" == typeof this.options.direction
            ? this.options.direction.call(this, t, e, Id)
            : this.options.direction;
        },
        _onTapStart: function (t) {
          if (t.cancelable) {
            var e = this,
              n = this.el,
              r = this.options,
              o = r.preventOnFilter,
              i = t.type,
              l = t.touches && t.touches[0],
              a = (l || t).target,
              u =
                (t.target.shadowRoot &&
                  ((t.path && t.path[0]) ||
                    (t.composedPath && t.composedPath()[0]))) ||
                a,
              s = r.filter;
            if (
              ((function (t) {
                og.length = 0;
                for (
                  var e = t.getElementsByTagName("input"), n = e.length;
                  n--;

                ) {
                  var r = e[n];
                  r.checked && og.push(r);
                }
              })(n),
              !Id &&
                !(
                  (/mousedown|pointerdown/.test(i) && 0 !== t.button) ||
                  r.disabled ||
                  u.isContentEditable ||
                  ((a = od(a, r.draggable, n, !1)) && a.animated) ||
                  Md === a
                ))
            ) {
              if (
                ((Ld = vd(a)),
                (Ud = vd(a, r.draggable)),
                "function" == typeof s)
              ) {
                if (s.call(this, t, a, this))
                  return (
                    Ad({
                      sortable: e,
                      rootEl: u,
                      name: "filter",
                      targetEl: a,
                      toEl: n,
                      fromEl: n,
                    }),
                    kd("filter", e, { evt: t }),
                    void (o && t.cancelable && t.preventDefault())
                  );
              } else if (
                s &&
                (s = s.split(",").some(function (r) {
                  if ((r = od(u, r.trim(), n, !1)))
                    return (
                      Ad({
                        sortable: e,
                        rootEl: r,
                        name: "filter",
                        targetEl: a,
                        fromEl: n,
                        toEl: n,
                      }),
                      kd("filter", e, { evt: t }),
                      !0
                    );
                }))
              )
                return void (o && t.cancelable && t.preventDefault());
              (r.handle && !od(u, r.handle, n, !1)) ||
                this._prepareDragStart(t, l, a);
            }
          }
        },
        _prepareDragStart: function (t, e, n) {
          var r,
            o = this,
            i = o.el,
            l = o.options,
            a = i.ownerDocument;
          if (n && !Id && n.parentNode === i)
            if (
              ((Nd = i),
              (Pd = (Id = n).parentNode),
              (Dd = Id.nextSibling),
              (Md = n),
              (zd = l.group),
              (gg.dragged = Id),
              (Wd = {
                target: Id,
                clientX: (e || t).clientX,
                clientY: (e || t).clientY,
              }),
              (this._lastX = (e || t).clientX),
              (this._lastY = (e || t).clientY),
              (Id.style["will-change"] = "all"),
              (r = function () {
                kd("delayEnded", o, { evt: t }),
                  gg.eventCanceled
                    ? o._onDrop()
                    : (o._disableDelayedDragEvents(),
                      !$f && o.nativeDraggable && (Id.draggable = !0),
                      o._triggerDragStart(t, e),
                      Ad({ sortable: o, name: "choose", originalEvent: t }),
                      ad(Id, l.chosenClass, !0));
              }),
              l.ignore.split(",").forEach(function (t) {
                cd(Id, t.trim(), mg);
              }),
              td(a, "dragover", fg),
              td(a, "mousemove", fg),
              td(a, "touchmove", fg),
              td(a, "mouseup", o._onDrop),
              td(a, "touchend", o._onDrop),
              td(a, "touchcancel", o._onDrop),
              $f &&
                this.nativeDraggable &&
                ((this.options.touchStartThreshold = 4), (Id.draggable = !0)),
              kd("delayStart", this, { evt: t }),
              !l.delay ||
                (l.delayOnTouchOnly && !e) ||
                (this.nativeDraggable && (Yf || Qf)))
            )
              r();
            else {
              if (gg.eventCanceled) return void this._onDrop();
              td(a, "mouseup", o._disableDelayedDrag),
                td(a, "touchend", o._disableDelayedDrag),
                td(a, "touchcancel", o._disableDelayedDrag),
                td(a, "mousemove", o._delayedDragTouchMoveHandler),
                td(a, "touchmove", o._delayedDragTouchMoveHandler),
                l.supportPointer &&
                  td(a, "pointermove", o._delayedDragTouchMoveHandler),
                (o._dragStartTimer = setTimeout(r, l.delay));
            }
        },
        _delayedDragTouchMoveHandler: function (t) {
          var e = t.touches ? t.touches[0] : t;
          Math.max(
            Math.abs(e.clientX - this._lastX),
            Math.abs(e.clientY - this._lastY)
          ) >=
            Math.floor(
              this.options.touchStartThreshold /
                ((this.nativeDraggable && window.devicePixelRatio) || 1)
            ) && this._disableDelayedDrag();
        },
        _disableDelayedDrag: function () {
          Id && mg(Id),
            clearTimeout(this._dragStartTimer),
            this._disableDelayedDragEvents();
        },
        _disableDelayedDragEvents: function () {
          var t = this.el.ownerDocument;
          ed(t, "mouseup", this._disableDelayedDrag),
            ed(t, "touchend", this._disableDelayedDrag),
            ed(t, "touchcancel", this._disableDelayedDrag),
            ed(t, "mousemove", this._delayedDragTouchMoveHandler),
            ed(t, "touchmove", this._delayedDragTouchMoveHandler),
            ed(t, "pointermove", this._delayedDragTouchMoveHandler);
        },
        _triggerDragStart: function (t, e) {
          (e = e || ("touch" == t.pointerType ? t : null)),
            !this.nativeDraggable || e
              ? td(
                  document,
                  this.options.supportPointer
                    ? "pointermove"
                    : e
                    ? "touchmove"
                    : "mousemove",
                  this._onTouchMove
                )
              : (td(Id, "dragend", this),
                td(Nd, "dragstart", this._onDragStart));
          try {
            document.selection
              ? _g(function () {
                  document.selection.empty();
                })
              : window.getSelection().removeAllRanges();
          } catch (n) {}
        },
        _dragStarted: function (t, e) {
          if (((Kd = !1), Nd && Id)) {
            kd("dragStarted", this, { evt: e }),
              this.nativeDraggable && td(document, "dragover", dg);
            var n = this.options;
            !t && ad(Id, n.dragClass, !1),
              ad(Id, n.ghostClass, !0),
              (gg.active = this),
              t && this._appendGhost(),
              Ad({ sortable: this, name: "start", originalEvent: e });
          } else this._nulling();
        },
        _emulateDragOver: function () {
          if (Gd) {
            (this._lastX = Gd.clientX), (this._lastY = Gd.clientY), hg();
            for (
              var t = document.elementFromPoint(Gd.clientX, Gd.clientY), e = t;
              t &&
              t.shadowRoot &&
              (t = t.shadowRoot.elementFromPoint(Gd.clientX, Gd.clientY)) !== e;

            )
              e = t;
            if ((Id.parentNode[Ed]._isOutsideThisEl(t), e))
              do {
                if (
                  e[Ed] &&
                  e[Ed]._onDragOver({
                    clientX: Gd.clientX,
                    clientY: Gd.clientY,
                    target: t,
                    rootEl: e,
                  }) &&
                  !this.options.dragoverBubble
                )
                  break;
                t = e;
              } while ((e = e.parentNode));
            pg();
          }
        },
        _onTouchMove: function (t) {
          if (Wd) {
            var e = this.options,
              n = e.fallbackTolerance,
              r = e.fallbackOffset,
              o = t.touches ? t.touches[0] : t,
              i = Rd && sd(Rd),
              l = Rd && i && i.a,
              a = Rd && i && i.d,
              u = ig && $d && md($d),
              s =
                (o.clientX - Wd.clientX + r.x) / (l || 1) +
                (u ? u[0] - ng[0] : 0) / (l || 1),
              c =
                (o.clientY - Wd.clientY + r.y) / (a || 1) +
                (u ? u[1] - ng[1] : 0) / (a || 1),
              h = t.touches
                ? "translate3d(" + s + "px," + c + "px,0)"
                : "translate(" + s + "px," + c + "px)";
            if (!gg.active && !Kd) {
              if (
                n &&
                Math.max(
                  Math.abs(o.clientX - this._lastX),
                  Math.abs(o.clientY - this._lastY)
                ) < n
              )
                return;
              this._onDragStart(t, !0);
            }
            (Gd = o),
              ud(Rd, "webkitTransform", h),
              ud(Rd, "mozTransform", h),
              ud(Rd, "msTransform", h),
              ud(Rd, "transform", h),
              t.cancelable && t.preventDefault();
          }
        },
        _appendGhost: function () {
          if (!Rd) {
            var t = this.options.fallbackOnBody ? document.body : Nd,
              e = pd(Id, !0, ig, !0, t),
              n = this.options;
            if (ig) {
              for (
                $d = t;
                "static" === ud($d, "position") &&
                "none" === ud($d, "transform") &&
                $d !== document;

              )
                $d = $d.parentNode;
              $d !== document.body && $d !== document.documentElement
                ? ($d === document && ($d = hd()),
                  (e.top += $d.scrollTop),
                  (e.left += $d.scrollLeft))
                : ($d = hd()),
                (ng = md($d));
            }
            ad((Rd = Id.cloneNode(!0)), n.ghostClass, !1),
              ad(Rd, n.fallbackClass, !0),
              ad(Rd, n.dragClass, !0),
              ud(Rd, "transition", ""),
              ud(Rd, "transform", ""),
              ud(Rd, "box-sizing", "border-box"),
              ud(Rd, "margin", 0),
              ud(Rd, "top", e.top),
              ud(Rd, "left", e.left),
              ud(Rd, "width", e.width),
              ud(Rd, "height", e.height),
              ud(Rd, "opacity", "0.8"),
              ud(Rd, "position", ig ? "absolute" : "fixed"),
              ud(Rd, "zIndex", "100000"),
              ud(Rd, "pointerEvents", "none"),
              (gg.ghost = Rd),
              t.appendChild(Rd);
          }
        },
        _onDragStart: function (t, e) {
          var n = this,
            r = t.dataTransfer,
            o = n.options;
          kd("dragStart", this, { evt: t }),
            gg.eventCanceled
              ? this._onDrop()
              : (kd("setupClone", this),
                gg.eventCanceled ||
                  (((jd = Cd(Id)).draggable = !1),
                  (jd.style["will-change"] = ""),
                  this._hideClone(),
                  ad(jd, this.options.chosenClass, !1),
                  (gg.clone = jd)),
                (n.cloneId = _g(function () {
                  kd("clone", n),
                    gg.eventCanceled ||
                      (n.options.removeCloneOnHide || Nd.insertBefore(jd, Id),
                      n._hideClone(),
                      Ad({ sortable: n, name: "clone" }));
                })),
                !e && ad(Id, o.dragClass, !0),
                e
                  ? ((Xd = !0),
                    (n._loopId = setInterval(n._emulateDragOver, 50)))
                  : (ed(document, "mouseup", n._onDrop),
                    ed(document, "touchend", n._onDrop),
                    ed(document, "touchcancel", n._onDrop),
                    r &&
                      ((r.effectAllowed = "move"),
                      o.setData && o.setData.call(n, r, Id)),
                    td(document, "drop", n),
                    ud(Id, "transform", "translateZ(0)")),
                (Kd = !0),
                (n._dragStartId = _g(n._dragStarted.bind(n, e, t))),
                td(document, "selectstart", n),
                (qd = !0),
                Kf && ud(document.body, "user-select", "none"));
        },
        _onDragOver: function (t) {
          var e,
            n,
            r,
            o,
            i = this.el,
            l = t.target,
            a = this.options,
            u = a.group,
            s = gg.active,
            c = zd === u,
            h = a.sort,
            p = Bd || s,
            f = this,
            d = !1;
          if (!rg) {
            if (
              (void 0 !== t.preventDefault &&
                t.cancelable &&
                t.preventDefault(),
              (l = od(l, a.draggable, i, !0)),
              k("dragOver"),
              gg.eventCanceled)
            )
              return d;
            if (
              Id.contains(t.target) ||
              (l.animated && l.animatingX && l.animatingY) ||
              f._ignoreWhileAnimating === l
            )
              return I(!1);
            if (
              ((Xd = !1),
              s &&
                !a.disabled &&
                (c
                  ? h || (r = !Nd.contains(Id))
                  : Bd === this ||
                    ((this.lastPutMode = zd.checkPull(this, s, Id, t)) &&
                      u.checkPut(this, s, Id, t))))
            ) {
              if (
                ((o = "vertical" === this._getDirection(t, l)),
                (e = pd(Id)),
                k("dragOverValid"),
                gg.eventCanceled)
              )
                return d;
              if (r)
                return (
                  (Pd = Nd),
                  A(),
                  this._hideClone(),
                  k("revert"),
                  gg.eventCanceled ||
                    (Dd ? Nd.insertBefore(Id, Dd) : Nd.appendChild(Id)),
                  I(!0)
                );
              var g = gd(i, a.draggable);
              if (
                !g ||
                ((function (t, e, n) {
                  var r = pd(gd(n.el, n.options.draggable));
                  return e
                    ? t.clientX > r.right + 10 ||
                        (t.clientX <= r.right &&
                          t.clientY > r.bottom &&
                          t.clientX >= r.left)
                    : (t.clientX > r.right && t.clientY > r.top) ||
                        (t.clientX <= r.right && t.clientY > r.bottom + 10);
                })(t, o, this) &&
                  !g.animated)
              ) {
                if (g === Id) return I(!1);
                if (
                  (g && i === t.target && (l = g),
                  l && (n = pd(l)),
                  !1 !== vg(Nd, i, Id, e, l, n, t, !!l))
                )
                  return A(), i.appendChild(Id), (Pd = i), P(), I(!0);
              } else if (l.parentNode === i) {
                n = pd(l);
                var v,
                  m,
                  y,
                  b = Id.parentNode !== i,
                  _ = !(function (t, e, n) {
                    var r = n ? t.left : t.top,
                      o = n ? e.left : e.top;
                    return (
                      r === o ||
                      (n ? t.right : t.bottom) === (n ? e.right : e.bottom) ||
                      r + (n ? t.width : t.height) / 2 ===
                        o + (n ? e.width : e.height) / 2
                    );
                  })(
                    (Id.animated && Id.toRect) || e,
                    (l.animated && l.toRect) || n,
                    o
                  ),
                  w = o ? "top" : "left",
                  C = fd(l, null, "top", "top") || fd(Id, null, "top", "top"),
                  E = C ? C.scrollTop : void 0;
                if (
                  (Zd !== l &&
                    ((m = n[w]), (tg = !1), (eg = (!_ && a.invertSwap) || b)),
                  0 !==
                    (v = (function (t, e, n, r, o, i, l) {
                      var a = pd(e),
                        u = n ? t.clientY : t.clientX,
                        s = n ? a.height : a.width,
                        c = n ? a.top : a.left,
                        h = n ? a.bottom : a.right,
                        p = !1;
                      if (!i)
                        if (l && Yd < s * r) {
                          if (
                            (!tg &&
                              (1 === Qd
                                ? u > c + (s * o) / 2
                                : u < h - (s * o) / 2) &&
                              (tg = !0),
                            tg)
                          )
                            p = !0;
                          else if (1 === Qd ? u < c + Yd : u > h - Yd)
                            return -Qd;
                        } else if (
                          u > c + (s * (1 - r)) / 2 &&
                          u < h - (s * (1 - r)) / 2
                        )
                          return (function (t) {
                            return vd(Id) < vd(t) ? 1 : -1;
                          })(e);
                      return (p = p || i) &&
                        (u < c + (s * o) / 2 || u > h - (s * o) / 2)
                        ? u > c + s / 2
                          ? 1
                          : -1
                        : 0;
                    })(
                      t,
                      l,
                      o,
                      _ ? 1 : a.swapThreshold,
                      null == a.invertedSwapThreshold
                        ? a.swapThreshold
                        : a.invertedSwapThreshold,
                      eg,
                      Zd === l
                    )))
                ) {
                  var S = vd(Id);
                  do {
                    y = Pd.children[(S -= v)];
                  } while (y && ("none" === ud(y, "display") || y === Rd));
                }
                if (0 === v || y === l) return I(!1);
                (Zd = l), (Qd = v);
                var x = l.nextElementSibling,
                  O = !1,
                  T = vg(Nd, i, Id, e, l, n, t, (O = 1 === v));
                if (!1 !== T)
                  return (
                    (1 !== T && -1 !== T) || (O = 1 === T),
                    (rg = !0),
                    setTimeout(yg, 30),
                    A(),
                    O && !x
                      ? i.appendChild(Id)
                      : l.parentNode.insertBefore(Id, O ? x : l),
                    C && wd(C, 0, E - C.scrollTop),
                    (Pd = Id.parentNode),
                    void 0 === m || eg || (Yd = Math.abs(m - pd(l)[w])),
                    P(),
                    I(!0)
                  );
              }
              if (i.contains(Id)) return I(!1);
            }
            return !1;
          }
          function k(a, u) {
            kd(
              a,
              f,
              qf(
                {
                  evt: t,
                  isOwner: c,
                  axis: o ? "vertical" : "horizontal",
                  revert: r,
                  dragRect: e,
                  targetRect: n,
                  canSort: h,
                  fromSortable: p,
                  target: l,
                  completed: I,
                  onMove: function (n, r) {
                    return vg(Nd, i, Id, e, n, pd(n), t, r);
                  },
                  changed: P,
                },
                u
              )
            );
          }
          function A() {
            k("dragOverAnimationCapture"),
              f.captureAnimationState(),
              f !== p && p.captureAnimationState();
          }
          function I(e) {
            return (
              k("dragOverCompleted", { insertion: e }),
              e &&
                (c ? s._hideClone() : s._showClone(f),
                f !== p &&
                  (ad(
                    Id,
                    Bd ? Bd.options.ghostClass : s.options.ghostClass,
                    !1
                  ),
                  ad(Id, a.ghostClass, !0)),
                Bd !== f && f !== gg.active
                  ? (Bd = f)
                  : f === gg.active && Bd && (Bd = null),
                p === f && (f._ignoreWhileAnimating = l),
                f.animateAll(function () {
                  k("dragOverAnimationComplete"),
                    (f._ignoreWhileAnimating = null);
                }),
                f !== p && (p.animateAll(), (p._ignoreWhileAnimating = null))),
              ((l === Id && !Id.animated) || (l === i && !l.animated)) &&
                (Zd = null),
              a.dragoverBubble ||
                t.rootEl ||
                l === document ||
                (Id.parentNode[Ed]._isOutsideThisEl(t.target), !e && fg(t)),
              !a.dragoverBubble && t.stopPropagation && t.stopPropagation(),
              (d = !0)
            );
          }
          function P() {
            (Fd = vd(Id)),
              (Hd = vd(Id, a.draggable)),
              Ad({
                sortable: f,
                name: "change",
                toEl: i,
                newIndex: Fd,
                newDraggableIndex: Hd,
                originalEvent: t,
              });
          }
        },
        _ignoreWhileAnimating: null,
        _offMoveEvents: function () {
          ed(document, "mousemove", this._onTouchMove),
            ed(document, "touchmove", this._onTouchMove),
            ed(document, "pointermove", this._onTouchMove),
            ed(document, "dragover", fg),
            ed(document, "mousemove", fg),
            ed(document, "touchmove", fg);
        },
        _offUpEvents: function () {
          var t = this.el.ownerDocument;
          ed(t, "mouseup", this._onDrop),
            ed(t, "touchend", this._onDrop),
            ed(t, "pointerup", this._onDrop),
            ed(t, "touchcancel", this._onDrop),
            ed(document, "selectstart", this);
        },
        _onDrop: function (t) {
          var e = this.el,
            n = this.options;
          (Fd = vd(Id)),
            (Hd = vd(Id, n.draggable)),
            kd("drop", this, { evt: t }),
            (Fd = vd(Id)),
            (Hd = vd(Id, n.draggable)),
            gg.eventCanceled
              ? this._nulling()
              : ((Kd = !1),
                (eg = !1),
                (tg = !1),
                clearInterval(this._loopId),
                clearTimeout(this._dragStartTimer),
                wg(this.cloneId),
                wg(this._dragStartId),
                this.nativeDraggable &&
                  (ed(document, "drop", this),
                  ed(e, "dragstart", this._onDragStart)),
                this._offMoveEvents(),
                this._offUpEvents(),
                Kf && ud(document.body, "user-select", ""),
                t &&
                  (qd &&
                    (t.cancelable && t.preventDefault(),
                    !n.dropBubble && t.stopPropagation()),
                  Rd && Rd.parentNode && Rd.parentNode.removeChild(Rd),
                  (Nd === Pd || (Bd && "clone" !== Bd.lastPutMode)) &&
                    jd &&
                    jd.parentNode &&
                    jd.parentNode.removeChild(jd),
                  Id &&
                    (this.nativeDraggable && ed(Id, "dragend", this),
                    mg(Id),
                    (Id.style["will-change"] = ""),
                    qd &&
                      !Kd &&
                      ad(
                        Id,
                        Bd ? Bd.options.ghostClass : this.options.ghostClass,
                        !1
                      ),
                    ad(Id, this.options.chosenClass, !1),
                    Ad({
                      sortable: this,
                      name: "unchoose",
                      toEl: Pd,
                      newIndex: null,
                      newDraggableIndex: null,
                      originalEvent: t,
                    }),
                    Nd !== Pd
                      ? (Fd >= 0 &&
                          (Ad({
                            rootEl: Pd,
                            name: "add",
                            toEl: Pd,
                            fromEl: Nd,
                            originalEvent: t,
                          }),
                          Ad({
                            sortable: this,
                            name: "remove",
                            toEl: Pd,
                            originalEvent: t,
                          }),
                          Ad({
                            rootEl: Pd,
                            name: "sort",
                            toEl: Pd,
                            fromEl: Nd,
                            originalEvent: t,
                          }),
                          Ad({
                            sortable: this,
                            name: "sort",
                            toEl: Pd,
                            originalEvent: t,
                          })),
                        Bd && Bd.save())
                      : Fd !== Ld &&
                        Fd >= 0 &&
                        (Ad({
                          sortable: this,
                          name: "update",
                          toEl: Pd,
                          originalEvent: t,
                        }),
                        Ad({
                          sortable: this,
                          name: "sort",
                          toEl: Pd,
                          originalEvent: t,
                        })),
                    gg.active &&
                      ((null != Fd && -1 !== Fd) || ((Fd = Ld), (Hd = Ud)),
                      Ad({
                        sortable: this,
                        name: "end",
                        toEl: Pd,
                        originalEvent: t,
                      }),
                      this.save()))),
                this._nulling());
        },
        _nulling: function () {
          kd("nulling", this),
            (Nd =
              Id =
              Pd =
              Rd =
              Dd =
              jd =
              Md =
              Vd =
              Wd =
              Gd =
              qd =
              Fd =
              Hd =
              Ld =
              Ud =
              Zd =
              Qd =
              Bd =
              zd =
              gg.dragged =
              gg.ghost =
              gg.clone =
              gg.active =
                null),
            og.forEach(function (t) {
              t.checked = !0;
            }),
            (og.length = 0);
        },
        handleEvent: function (t) {
          switch (t.type) {
            case "drop":
            case "dragend":
              this._onDrop(t);
              break;
            case "dragenter":
            case "dragover":
              Id &&
                (this._onDragOver(t),
                (function (t) {
                  t.dataTransfer && (t.dataTransfer.dropEffect = "move"),
                    t.cancelable && t.preventDefault();
                })(t));
              break;
            case "selectstart":
              t.preventDefault();
          }
        },
        toArray: function () {
          for (
            var t,
              e = [],
              n = this.el.children,
              r = 0,
              o = n.length,
              i = this.options;
            r < o;
            r++
          )
            od((t = n[r]), i.draggable, this.el, !1) &&
              e.push(t.getAttribute(i.dataIdAttr) || bg(t));
          return e;
        },
        sort: function (t) {
          var e = {},
            n = this.el;
          this.toArray().forEach(function (t, r) {
            var o = n.children[r];
            od(o, this.options.draggable, n, !1) && (e[t] = o);
          }, this),
            t.forEach(function (t) {
              e[t] && (n.removeChild(e[t]), n.appendChild(e[t]));
            });
        },
        save: function () {
          var t = this.options.store;
          t && t.set && t.set(this);
        },
        closest: function (t, e) {
          return od(t, e || this.options.draggable, this.el, !1);
        },
        option: function (t, e) {
          var n = this.options;
          if (void 0 === e) return n[t];
          var r = Td.modifyOption(this, t, e);
          (n[t] = void 0 !== r ? r : e), "group" === t && cg(n);
        },
        destroy: function () {
          kd("destroy", this);
          var t = this.el;
          (t[Ed] = null),
            ed(t, "mousedown", this._onTapStart),
            ed(t, "touchstart", this._onTapStart),
            ed(t, "pointerdown", this._onTapStart),
            this.nativeDraggable &&
              (ed(t, "dragover", this), ed(t, "dragenter", this)),
            Array.prototype.forEach.call(
              t.querySelectorAll("[draggable]"),
              function (t) {
                t.removeAttribute("draggable");
              }
            ),
            this._onDrop(),
            Jd.splice(Jd.indexOf(this.el), 1),
            (this.el = t = null);
        },
        _hideClone: function () {
          if (!Vd) {
            if ((kd("hideClone", this), gg.eventCanceled)) return;
            ud(jd, "display", "none"),
              this.options.removeCloneOnHide &&
                jd.parentNode &&
                jd.parentNode.removeChild(jd),
              (Vd = !0);
          }
        },
        _showClone: function (t) {
          if ("clone" === t.lastPutMode) {
            if (Vd) {
              if ((kd("showClone", this), gg.eventCanceled)) return;
              Nd.contains(Id) && !this.options.group.revertClone
                ? Nd.insertBefore(jd, Id)
                : Dd
                ? Nd.insertBefore(jd, Dd)
                : Nd.appendChild(jd),
                this.options.group.revertClone && this._animate(Id, jd),
                ud(jd, "display", ""),
                (Vd = !1);
            }
          } else this._hideClone();
        },
      }),
        td(document, "touchmove", function (t) {
          (gg.active || Kd) && t.cancelable && t.preventDefault();
        }),
        (gg.utils = {
          on: td,
          off: ed,
          css: ud,
          find: cd,
          is: function (t, e) {
            return !!od(t, e, t, !1);
          },
          extend: function (t, e) {
            if (t && e) for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            return t;
          },
          throttle: _d,
          closest: od,
          toggleClass: ad,
          clone: Cd,
          index: vd,
          nextTick: _g,
          cancelNextTick: wg,
          detectDirection: sg,
          getChild: dd,
        }),
        (gg.mount = function () {
          for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
          for (var r in (e[0].constructor === Array && (e = e[0]), e)) {
            var o = e[r];
            if (!o.prototype || !o.prototype.constructor)
              throw "Sortable: Mounted plugin must be a constructor function, not ".concat(
                {}.toString.call(el)
              );
            o.utils && (gg.utils = qf({}, gg.utils, o.utils)), Td.mount(o);
          }
        }),
        (gg.create = function (t, e) {
          return new gg(t, e);
        }),
        (gg.version = "1.10.0-rc2");
      var Cg,
        Eg,
        Sg,
        xg,
        Og,
        Tg,
        kg = [],
        Ag = !1;
      function Ig() {
        kg.forEach(function (t) {
          clearInterval(t.pid);
        }),
          (kg = []);
      }
      function Pg() {
        clearInterval(Tg);
      }
      var Rg = _d(function (t, e, n, r) {
          if (e.scroll) {
            var o,
              i = e.scrollSensitivity,
              l = e.scrollSpeed,
              a = hd(),
              u = !1;
            Eg !== n &&
              ((Eg = n),
              Ig(),
              (o = e.scrollFn),
              !0 === (Cg = e.scroll) && (Cg = yd(n, !0)));
            var s = 0,
              c = Cg;
            do {
              var h = c,
                p = pd(h),
                f = p.top,
                d = p.bottom,
                g = p.left,
                v = p.right,
                m = p.width,
                y = p.height,
                b = void 0,
                _ = void 0,
                w = h.scrollWidth,
                C = h.scrollHeight,
                E = ud(h),
                S = h.scrollLeft,
                x = h.scrollTop;
              h === a
                ? ((b =
                    m < w &&
                    ("auto" === E.overflowX ||
                      "scroll" === E.overflowX ||
                      "visible" === E.overflowX)),
                  (_ =
                    y < C &&
                    ("auto" === E.overflowY ||
                      "scroll" === E.overflowY ||
                      "visible" === E.overflowY)))
                : ((b =
                    m < w &&
                    ("auto" === E.overflowX || "scroll" === E.overflowX)),
                  (_ =
                    y < C &&
                    ("auto" === E.overflowY || "scroll" === E.overflowY)));
              var O =
                  b &&
                  (Math.abs(v - t.clientX) <= i && S + m < w) -
                    (Math.abs(g - t.clientX) <= i && !!S),
                T =
                  _ &&
                  (Math.abs(d - t.clientY) <= i && x + y < C) -
                    (Math.abs(f - t.clientY) <= i && !!x);
              if (!kg[s]) for (var k = 0; k <= s; k++) kg[k] || (kg[k] = {});
              (kg[s].vx == O && kg[s].vy == T && kg[s].el === h) ||
                ((kg[s].el = h),
                (kg[s].vx = O),
                (kg[s].vy = T),
                clearInterval(kg[s].pid),
                (0 == O && 0 == T) ||
                  ((u = !0),
                  (kg[s].pid = setInterval(
                    function () {
                      r && 0 === this.layer && gg.active._onTouchMove(Og);
                      var e = kg[this.layer].vy ? kg[this.layer].vy * l : 0,
                        n = kg[this.layer].vx ? kg[this.layer].vx * l : 0;
                      ("function" == typeof o &&
                        "continue" !==
                          o.call(
                            gg.dragged.parentNode[Ed],
                            n,
                            e,
                            t,
                            Og,
                            kg[this.layer].el
                          )) ||
                        wd(kg[this.layer].el, n, e);
                    }.bind({ layer: s }),
                    24
                  )))),
                s++;
            } while (e.bubbleScroll && c !== a && (c = yd(c, !1)));
            Ag = u;
          }
        }, 30),
        Ng = function (t) {
          var e = t.originalEvent,
            n = t.dragEl,
            r = t.dispatchSortableEvent,
            o = t.unhideGhostForTarget,
            i = t.putSortable || t.activeSortable;
          (0, t.hideGhostForTarget)();
          var l = document.elementFromPoint(e.clientX, e.clientY);
          o(), i && !i.el.contains(l) && (r("spill"), this.onSpill(n));
        };
      function Dg() {}
      function Mg() {}
      (Dg.prototype = {
        startIndex: null,
        dragStart: function (t) {
          this.startIndex = t.oldDraggableIndex;
        },
        onSpill: function (t) {
          this.sortable.captureAnimationState();
          var e = dd(this.sortable.el, this.startIndex, this.sortable.options);
          e
            ? this.sortable.el.insertBefore(t, e)
            : this.sortable.el.appendChild(t),
            this.sortable.animateAll();
        },
        drop: Ng,
      }),
        Gf(Dg, { pluginName: "revertOnSpill" }),
        (Mg.prototype = {
          onSpill: function (t) {
            this.sortable.captureAnimationState(),
              t.parentNode && t.parentNode.removeChild(t),
              this.sortable.animateAll();
          },
          drop: Ng,
        }),
        Gf(Mg, { pluginName: "removeOnSpill" }),
        gg.mount(
          new (function () {
            function t() {
              for (var t in ((this.options = {
                scroll: !0,
                scrollSensitivity: 30,
                scrollSpeed: 10,
                bubbleScroll: !0,
              }),
              this))
                "_" === t.charAt(0) &&
                  "function" == typeof this[t] &&
                  (this[t] = this[t].bind(this));
            }
            return (
              (t.prototype = {
                dragStarted: function (t) {
                  var e = t.originalEvent;
                  this.sortable.nativeDraggable
                    ? td(document, "dragover", this._handleAutoScroll)
                    : td(
                        document,
                        this.sortable.options.supportPointer
                          ? "pointermove"
                          : e.touches
                          ? "touchmove"
                          : "mousemove",
                        this._handleFallbackAutoScroll
                      );
                },
                dragOverCompleted: function (t) {
                  var e = t.originalEvent;
                  this.sortable.options.dragOverBubble ||
                    e.rootEl ||
                    this._handleAutoScroll(e);
                },
                drop: function () {
                  this.sortable.nativeDraggable
                    ? ed(document, "dragover", this._handleAutoScroll)
                    : (ed(
                        document,
                        "pointermove",
                        this._handleFallbackAutoScroll
                      ),
                      ed(document, "touchmove", this._handleFallbackAutoScroll),
                      ed(
                        document,
                        "mousemove",
                        this._handleFallbackAutoScroll
                      )),
                    Pg(),
                    Ig(),
                    clearTimeout(id),
                    (id = void 0);
                },
                nulling: function () {
                  (Og = Eg = Cg = Ag = Tg = Sg = xg = null), (kg.length = 0);
                },
                _handleFallbackAutoScroll: function (t) {
                  this._handleAutoScroll(t, !0);
                },
                _handleAutoScroll: function (t, e) {
                  var n = this,
                    r = t.clientX,
                    o = t.clientY,
                    i = document.elementFromPoint(r, o);
                  if (((Og = t), e || Yf || Qf || Kf)) {
                    Rg(t, this.options, i, e);
                    var l = yd(i, !0);
                    !Ag ||
                      (Tg && r === Sg && o === xg) ||
                      (Tg && Pg(),
                      (Tg = setInterval(function () {
                        var i = yd(document.elementFromPoint(r, o), !0);
                        i !== l && ((l = i), Ig()), Rg(t, n.options, i, e);
                      }, 10)),
                      (Sg = r),
                      (xg = o));
                  } else {
                    if (
                      !this.sortable.options.bubbleScroll ||
                      yd(i, !0) === hd()
                    )
                      return void Ig();
                    Rg(t, this.options, yd(i, !1), !1);
                  }
                },
              }),
              Gf(t, { pluginName: "scroll", initializeByDefault: !0 })
            );
          })()
        ),
        gg.mount(Mg, Dg);
      var jg = gg,
        Vg = new Lt("Global config for sortablejs"),
        Lg = (function () {
          function t(t) {
            this.target = t;
          }
          return (
            (t.prototype.insert = function (t, e) {
              this.isFormArray
                ? this.target.insert(t, e)
                : this.target.splice(t, 0, e);
            }),
            (t.prototype.get = function (t) {
              return this.isFormArray ? this.target.at(t) : this.target[t];
            }),
            (t.prototype.remove = function (t) {
              var e;
              return (
                this.isFormArray
                  ? ((e = this.target.at(t)), this.target.removeAt(t))
                  : (e = this.target.splice(t, 1)[0]),
                e
              );
            }),
            Object.defineProperty(t.prototype, "isFormArray", {
              get: function () {
                return (
                  !!this.target.at &&
                  !!this.target.insert &&
                  !!this.target.reset
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(),
        Fg = (function () {
          function t(t) {
            this.bindings = t.map(function (t) {
              return new Lg(t);
            });
          }
          return (
            (t.prototype.injectIntoEvery = function (t, e) {
              this.bindings.forEach(function (n, r) {
                return n.insert(t, e[r]);
              });
            }),
            (t.prototype.getFromEvery = function (t) {
              return this.bindings.map(function (e) {
                return e.get(t);
              });
            }),
            (t.prototype.extractFromEvery = function (t) {
              return this.bindings.map(function (e) {
                return e.remove(t);
              });
            }),
            Object.defineProperty(t.prototype, "provided", {
              get: function () {
                return !!this.bindings.length;
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(),
        Ug = (function () {
          function t() {}
          return (
            (t.ngInjectableDef = xt({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Hg = (function () {
          function t(t, e, n, r, o) {
            (this.globalConfig = t),
              (this.service = e),
              (this.element = n),
              (this.zone = r),
              (this.renderer = o),
              (this.runInsideAngular = !1),
              (this.sortablejsInit = new Po());
          }
          return (
            (t.prototype.ngOnInit = function () {
              var t = this;
              jg &&
                jg.create &&
                (this.runInsideAngular
                  ? this.create()
                  : this.zone.runOutsideAngular(function () {
                      return t.create();
                    }));
            }),
            (t.prototype.ngOnChanges = function (t) {
              var e = this,
                n = t.sortablejsOptions;
              if (n && !n.isFirstChange()) {
                var r = n.previousValue,
                  o = n.currentValue;
                Object.keys(o).forEach(function (t) {
                  o[t] !== r[t] && e.sortableInstance.option(t, e.options[t]);
                });
              }
            }),
            (t.prototype.ngOnDestroy = function () {
              this.sortableInstance && this.sortableInstance.destroy();
            }),
            (t.prototype.create = function () {
              var t = this,
                e = this.sortablejsContainer
                  ? this.element.nativeElement.querySelector(
                      this.sortablejsContainer
                    )
                  : this.element.nativeElement;
              setTimeout(function () {
                (t.sortableInstance = jg.create(e, t.options)),
                  t.sortablejsInit.emit(t.sortableInstance);
              }, 0);
            }),
            (t.prototype.getBindings = function () {
              return this.sortablejs
                ? this.sortablejs instanceof Fg
                  ? this.sortablejs
                  : new Fg([this.sortablejs])
                : new Fg([]);
            }),
            Object.defineProperty(t.prototype, "options", {
              get: function () {
                return i({}, this.optionsWithoutEvents, this.overridenOptions);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "optionsWithoutEvents", {
              get: function () {
                return i(
                  {},
                  this.globalConfig || {},
                  this.sortablejsOptions || {}
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.proxyEvent = function (t) {
              for (var e = this, n = [], r = 1; r < arguments.length; r++)
                n[r - 1] = arguments[r];
              this.zone.run(function () {
                var r;
                e.optionsWithoutEvents &&
                  e.optionsWithoutEvents[t] &&
                  (r = e.optionsWithoutEvents)[t].apply(r, c(n));
              });
            }),
            Object.defineProperty(t.prototype, "isCloning", {
              get: function () {
                return (
                  "clone" ===
                  this.sortableInstance.options.group.checkPull(
                    this.sortableInstance,
                    this.sortableInstance
                  )
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.clone = function (t) {
              return (
                this.sortablejsCloneFunction ||
                function (t) {
                  return t;
                }
              )(t);
            }),
            Object.defineProperty(t.prototype, "overridenOptions", {
              get: function () {
                var t = this;
                return {
                  onAdd: function (e) {
                    (t.service.transfer = function (n) {
                      t.getBindings().injectIntoEvery(e.newIndex, n),
                        t.proxyEvent("onAdd", e);
                    }),
                      t.proxyEvent("onAddOriginal", e);
                  },
                  onRemove: function (e) {
                    var n = t.getBindings();
                    n.provided &&
                      (t.isCloning
                        ? (t.service.transfer(
                            n.getFromEvery(e.oldIndex).map(function (e) {
                              return t.clone(e);
                            })
                          ),
                          t.renderer.removeChild(e.item.parentNode, e.item),
                          t.renderer.insertBefore(
                            e.clone.parentNode,
                            e.item,
                            e.clone
                          ),
                          t.renderer.removeChild(e.clone.parentNode, e.clone))
                        : t.service.transfer(n.extractFromEvery(e.oldIndex)),
                      (t.service.transfer = null)),
                      t.proxyEvent("onRemove", e);
                  },
                  onUpdate: function (e) {
                    var n = t.getBindings();
                    n.injectIntoEvery(
                      e.newIndex,
                      n.extractFromEvery(e.oldIndex)
                    ),
                      t.proxyEvent("onUpdate", e);
                  },
                };
              },
              enumerable: !0,
              configurable: !0,
            }),
            t
          );
        })(),
        zg = (function () {
          function t() {}
          return (
            (t.forRoot = function (e) {
              return { ngModule: t, providers: [{ provide: Vg, useValue: e }] };
            }),
            t
          );
        })(),
        Bg = (function () {
          return function () {
            this.cities = ["Ankara", "Moscow", "Munich", "Paris", "Washington"];
          };
        })(),
        Wg = nr({ encapsulation: 0, styles: [[""]], data: {} });
      function Gg(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "button",
              [
                ["class", "btn btn-secondary"],
                ["type", "button"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, ["", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function qg(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "button",
              [
                ["class", "btn btn-secondary"],
                ["type", "button"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, ["", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function Zg(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              5,
              "div",
              [["class", "col-sm-4 my-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              1,
              0,
              null,
              null,
              4,
              "div",
              [["class", "card"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              2,
              0,
              null,
              null,
              1,
              "div",
              [["class", "card-header"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(3, null, ["", ""])),
            (t()(),
            Wi(
              4,
              0,
              null,
              null,
              1,
              "div",
              [["class", "card-body"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(5, null, ["", " description"])),
          ],
          null,
          function (t, e) {
            t(e, 3, 0, e.context.$implicit), t(e, 5, 0, e.context.$implicit);
          }
        );
      }
      function Qg(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              2,
              "li",
              [["class", "nav-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              1,
              0,
              null,
              null,
              1,
              "a",
              [["class", "nav-link active mr-1"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(2, null, ["", ""])),
          ],
          null,
          function (t, e) {
            t(e, 2, 0, e.context.$implicit);
          }
        );
      }
      function Yg(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "breadcrumb-item active"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, ["", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function $g(t) {
        return il(
          0,
          [
            (t()(),
            Wi(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["Sortable Array"])),
            (t()(),
            Wi(
              2,
              0,
              null,
              null,
              3,
              "p",
              [["class", "lead"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              3,
              0,
              null,
              null,
              2,
              "strong",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              4,
              0,
              null,
              null,
              1,
              "a",
              [
                [
                  "href",
                  "https://github.com/SortableJS/ngx-sortablejs/tree/master/src/app/examples/simple-sortable",
                ],
                ["target", "_blank"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["The source code"])),
            (t()(),
            nl(-1, null, [
              " The examples below shows various bootstrap.css elements that can be ",
            ])),
            (t()(),
            Wi(7, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["sortable"])),
            (t()(),
            nl(-1, null, [
              ". They share the same model that's why every time you drag / drop the element all others get updated. Actually everything can be sortable. ",
            ])),
            (t()(),
            Wi(
              10,
              0,
              null,
              null,
              1,
              "h2",
              [["class", "mt-4 mb-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["Button groups"])),
            (t()(),
            Wi(
              12,
              0,
              null,
              null,
              8,
              "div",
              [["class", "clearfix"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              13,
              0,
              null,
              null,
              3,
              "div",
              [["class", "btn-group-vertical float-left"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              14,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              { sortablejs: [0, "sortablejs"] },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, Gg)),
            po(
              16,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              17,
              0,
              null,
              null,
              3,
              "div",
              [["class", "btn-group ml-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              18,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              { sortablejs: [0, "sortablejs"] },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, qg)),
            po(
              20,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              21,
              0,
              null,
              null,
              1,
              "h2",
              [["class", "mt-4 mb-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["Cards"])),
            (t()(),
            Wi(
              23,
              0,
              null,
              null,
              3,
              "div",
              [["class", "row"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              24,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              { sortablejs: [0, "sortablejs"] },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, Zg)),
            po(
              26,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              27,
              0,
              null,
              null,
              1,
              "h2",
              [["class", "mt-4 mb-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["Navigation"])),
            (t()(),
            Wi(
              29,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "nav nav-pills mb-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              30,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              { sortablejs: [0, "sortablejs"] },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, Qg)),
            po(
              32,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              33,
              0,
              null,
              null,
              4,
              "nav",
              [
                ["aria-label", "breadcrumb"],
                ["role", "navigation"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              34,
              0,
              null,
              null,
              3,
              "ol",
              [["class", "breadcrumb"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              35,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              { sortablejs: [0, "sortablejs"] },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, Yg)),
            po(
              37,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              38,
              0,
              null,
              null,
              1,
              "h2",
              [["class", "mt-4 mb-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["The actual model"])),
            (t()(),
            Wi(
              40,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(41, null, [" > ", "\n"])),
            fo(0, Ma, []),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 14, 0, n.cities),
              t(e, 16, 0, n.cities),
              t(e, 18, 0, n.cities),
              t(e, 20, 0, n.cities),
              t(e, 24, 0, n.cities),
              t(e, 26, 0, n.cities),
              t(e, 30, 0, n.cities),
              t(e, 32, 0, n.cities),
              t(e, 35, 0, n.cities),
              t(e, 37, 0, n.cities);
          },
          function (t, e) {
            var n = e.component;
            t(e, 41, 0, Jn(e, 41, 0, Jr(e, 42).transform(n.cities)));
          }
        );
      }
      function Kg(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "app-simple-sortable",
              [],
              null,
              null,
              null,
              $g,
              Wg
            )),
            po(1, 49152, null, 0, Bg, [], null, null),
          ],
          null,
          null
        );
      }
      var Xg = zr("app-simple-sortable", Bg, Kg, {}, {}, []),
        Jg = (function (t) {
          function e(e, n) {
            var r = t.call(this, e) || this;
            (r.sources = n), (r.completed = 0), (r.haveValues = 0);
            var o = n.length;
            r.values = new Array(o);
            for (var i = 0; i < o; i++) {
              var l = Q(r, n[i], null, i);
              l && r.add(l);
            }
            return r;
          }
          return (
            o(e, t),
            (e.prototype.notifyNext = function (t, e, n, r, o) {
              (this.values[n] = e),
                o._hasValue || ((o._hasValue = !0), this.haveValues++);
            }),
            (e.prototype.notifyComplete = function (t) {
              var e = this.destination,
                n = this.haveValues,
                r = this.values,
                o = r.length;
              t._hasValue
                ? (this.completed++,
                  this.completed === o && (n === o && e.next(r), e.complete()))
                : e.complete();
            }),
            e
          );
        })(Y),
        tv = new Lt("NgValueAccessor"),
        ev = (function () {
          function t(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = function (t) {}),
              (this.onTouched = function () {});
          }
          return (
            (t.prototype.writeValue = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "checked",
                t
              );
            }),
            (t.prototype.registerOnChange = function (t) {
              this.onChange = t;
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            t
          );
        })(),
        nv = new Lt("CompositionEventMode"),
        rv = (function () {
          function t(t, e, n) {
            var r;
            (this._renderer = t),
              (this._elementRef = e),
              (this._compositionMode = n),
              (this.onChange = function (t) {}),
              (this.onTouched = function () {}),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode =
                  ((r = ju() ? ju().getUserAgent() : ""),
                  !/android (\d+)/.test(r.toLowerCase())));
          }
          return (
            (t.prototype.writeValue = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                null == t ? "" : t
              );
            }),
            (t.prototype.registerOnChange = function (t) {
              this.onChange = t;
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            (t.prototype._handleInput = function (t) {
              (!this._compositionMode ||
                (this._compositionMode && !this._composing)) &&
                this.onChange(t);
            }),
            (t.prototype._compositionStart = function () {
              this._composing = !0;
            }),
            (t.prototype._compositionEnd = function (t) {
              (this._composing = !1), this._compositionMode && this.onChange(t);
            }),
            t
          );
        })();
      function ov() {
        throw new Error("unimplemented");
      }
      var iv = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (
              (e._parent = null),
              (e.name = null),
              (e.valueAccessor = null),
              (e._rawValidators = []),
              (e._rawAsyncValidators = []),
              e
            );
          }
          return (
            o(e, t),
            Object.defineProperty(e.prototype, "validator", {
              get: function () {
                return ov();
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "asyncValidator", {
              get: function () {
                return ov();
              },
              enumerable: !0,
              configurable: !0,
            }),
            e
          );
        })(
          (function () {
            function t() {}
            return (
              Object.defineProperty(t.prototype, "value", {
                get: function () {
                  return this.control ? this.control.value : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "valid", {
                get: function () {
                  return this.control ? this.control.valid : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "invalid", {
                get: function () {
                  return this.control ? this.control.invalid : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "pending", {
                get: function () {
                  return this.control ? this.control.pending : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "disabled", {
                get: function () {
                  return this.control ? this.control.disabled : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "enabled", {
                get: function () {
                  return this.control ? this.control.enabled : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "errors", {
                get: function () {
                  return this.control ? this.control.errors : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "pristine", {
                get: function () {
                  return this.control ? this.control.pristine : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "dirty", {
                get: function () {
                  return this.control ? this.control.dirty : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "touched", {
                get: function () {
                  return this.control ? this.control.touched : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "status", {
                get: function () {
                  return this.control ? this.control.status : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "untouched", {
                get: function () {
                  return this.control ? this.control.untouched : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "statusChanges", {
                get: function () {
                  return this.control ? this.control.statusChanges : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "valueChanges", {
                get: function () {
                  return this.control ? this.control.valueChanges : null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "path", {
                get: function () {
                  return null;
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype.reset = function (t) {
                void 0 === t && (t = void 0),
                  this.control && this.control.reset(t);
              }),
              (t.prototype.hasError = function (t, e) {
                return !!this.control && this.control.hasError(t, e);
              }),
              (t.prototype.getError = function (t, e) {
                return this.control ? this.control.getError(t, e) : null;
              }),
              t
            );
          })()
        ),
        lv = (function (t) {
          function e(e) {
            return t.call(this, e) || this;
          }
          return o(e, t), e;
        })(
          (function () {
            function t(t) {
              this._cd = t;
            }
            return (
              Object.defineProperty(t.prototype, "ngClassUntouched", {
                get: function () {
                  return !!this._cd.control && this._cd.control.untouched;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "ngClassTouched", {
                get: function () {
                  return !!this._cd.control && this._cd.control.touched;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "ngClassPristine", {
                get: function () {
                  return !!this._cd.control && this._cd.control.pristine;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "ngClassDirty", {
                get: function () {
                  return !!this._cd.control && this._cd.control.dirty;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "ngClassValid", {
                get: function () {
                  return !!this._cd.control && this._cd.control.valid;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "ngClassInvalid", {
                get: function () {
                  return !!this._cd.control && this._cd.control.invalid;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "ngClassPending", {
                get: function () {
                  return !!this._cd.control && this._cd.control.pending;
                },
                enumerable: !0,
                configurable: !0,
              }),
              t
            );
          })()
        );
      function av(t) {
        return null == t || 0 === t.length;
      }
      var uv =
          /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
        sv = (function () {
          function t() {}
          return (
            (t.min = function (t) {
              return function (e) {
                if (av(e.value) || av(t)) return null;
                var n = parseFloat(e.value);
                return !isNaN(n) && n < t
                  ? { min: { min: t, actual: e.value } }
                  : null;
              };
            }),
            (t.max = function (t) {
              return function (e) {
                if (av(e.value) || av(t)) return null;
                var n = parseFloat(e.value);
                return !isNaN(n) && n > t
                  ? { max: { max: t, actual: e.value } }
                  : null;
              };
            }),
            (t.required = function (t) {
              return av(t.value) ? { required: !0 } : null;
            }),
            (t.requiredTrue = function (t) {
              return !0 === t.value ? null : { required: !0 };
            }),
            (t.email = function (t) {
              return av(t.value)
                ? null
                : uv.test(t.value)
                ? null
                : { email: !0 };
            }),
            (t.minLength = function (t) {
              return function (e) {
                if (av(e.value)) return null;
                var n = e.value ? e.value.length : 0;
                return n < t
                  ? { minlength: { requiredLength: t, actualLength: n } }
                  : null;
              };
            }),
            (t.maxLength = function (t) {
              return function (e) {
                var n = e.value ? e.value.length : 0;
                return n > t
                  ? { maxlength: { requiredLength: t, actualLength: n } }
                  : null;
              };
            }),
            (t.pattern = function (e) {
              return e
                ? ("string" == typeof e
                    ? ((r = ""),
                      "^" !== e.charAt(0) && (r += "^"),
                      (r += e),
                      "$" !== e.charAt(e.length - 1) && (r += "$"),
                      (n = new RegExp(r)))
                    : ((r = e.toString()), (n = e)),
                  function (t) {
                    if (av(t.value)) return null;
                    var e = t.value;
                    return n.test(e)
                      ? null
                      : { pattern: { requiredPattern: r, actualValue: e } };
                  })
                : t.nullValidator;
              var n, r;
            }),
            (t.nullValidator = function (t) {
              return null;
            }),
            (t.compose = function (t) {
              if (!t) return null;
              var e = t.filter(cv);
              return 0 == e.length
                ? null
                : function (t) {
                    return pv(
                      (function (t, n) {
                        return e.map(function (e) {
                          return e(t);
                        });
                      })(t)
                    );
                  };
            }),
            (t.composeAsync = function (t) {
              if (!t) return null;
              var e = t.filter(cv);
              return 0 == e.length
                ? null
                : function (t) {
                    return (function t() {
                      for (var e, n = [], r = 0; r < arguments.length; r++)
                        n[r] = arguments[r];
                      return (
                        "function" == typeof n[n.length - 1] && (e = n.pop()),
                        1 === n.length && h(n[0]) && (n = n[0]),
                        0 === n.length
                          ? za
                          : e
                          ? t(n).pipe(
                              $(function (t) {
                                return e.apply(void 0, t);
                              })
                            )
                          : new A(function (t) {
                              return new Jg(t, n);
                            })
                      );
                    })(
                      (function (t, n) {
                        return e.map(function (e) {
                          return e(t);
                        });
                      })(t).map(hv)
                    ).pipe($(pv));
                  };
            }),
            t
          );
        })();
      function cv(t) {
        return null != t;
      }
      function hv(t) {
        var e = He(t) ? tt(t) : t;
        if (!ze(e))
          throw new Error(
            "Expected validator to return Promise or Observable."
          );
        return e;
      }
      function pv(t) {
        var e = t.reduce(function (t, e) {
          return null != e ? i({}, t, e) : t;
        }, {});
        return 0 === Object.keys(e).length ? null : e;
      }
      function fv(t) {
        return t.validate
          ? function (e) {
              return t.validate(e);
            }
          : t;
      }
      function dv(t) {
        return t.validate
          ? function (e) {
              return t.validate(e);
            }
          : t;
      }
      var gv = (function () {
          function t(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = function (t) {}),
              (this.onTouched = function () {});
          }
          return (
            (t.prototype.writeValue = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                null == t ? "" : t
              );
            }),
            (t.prototype.registerOnChange = function (t) {
              this.onChange = function (e) {
                t("" == e ? null : parseFloat(e));
              };
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            t
          );
        })(),
        vv = (function () {
          function t() {
            this._accessors = [];
          }
          return (
            (t.prototype.add = function (t, e) {
              this._accessors.push([t, e]);
            }),
            (t.prototype.remove = function (t) {
              for (var e = this._accessors.length - 1; e >= 0; --e)
                if (this._accessors[e][1] === t)
                  return void this._accessors.splice(e, 1);
            }),
            (t.prototype.select = function (t) {
              var e = this;
              this._accessors.forEach(function (n) {
                e._isSameGroup(n, t) && n[1] !== t && n[1].fireUncheck(t.value);
              });
            }),
            (t.prototype._isSameGroup = function (t, e) {
              return (
                !!t[0].control &&
                t[0]._parent === e._control._parent &&
                t[1].name === e.name
              );
            }),
            t
          );
        })(),
        mv = (function () {
          function t(t, e, n, r) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._registry = n),
              (this._injector = r),
              (this.onChange = function () {}),
              (this.onTouched = function () {});
          }
          return (
            (t.prototype.ngOnInit = function () {
              (this._control = this._injector.get(iv)),
                this._checkName(),
                this._registry.add(this._control, this);
            }),
            (t.prototype.ngOnDestroy = function () {
              this._registry.remove(this);
            }),
            (t.prototype.writeValue = function (t) {
              (this._state = t === this.value),
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "checked",
                  this._state
                );
            }),
            (t.prototype.registerOnChange = function (t) {
              var e = this;
              (this._fn = t),
                (this.onChange = function () {
                  t(e.value), e._registry.select(e);
                });
            }),
            (t.prototype.fireUncheck = function (t) {
              this.writeValue(t);
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            (t.prototype._checkName = function () {
              this.name &&
                this.formControlName &&
                this.name !== this.formControlName &&
                this._throwNameError(),
                !this.name &&
                  this.formControlName &&
                  (this.name = this.formControlName);
            }),
            (t.prototype._throwNameError = function () {
              throw new Error(
                '\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    '
              );
            }),
            t
          );
        })(),
        yv = (function () {
          function t(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = function (t) {}),
              (this.onTouched = function () {});
          }
          return (
            (t.prototype.writeValue = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                parseFloat(t)
              );
            }),
            (t.prototype.registerOnChange = function (t) {
              this.onChange = function (e) {
                t("" == e ? null : parseFloat(e));
              };
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            t
          );
        })(),
        bv =
          '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });',
        _v =
          '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
        wv = (function () {
          function t() {}
          return (
            (t.controlParentException = function () {
              throw new Error(
                "formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " +
                  bv
              );
            }),
            (t.ngModelGroupException = function () {
              throw new Error(
                'formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        ' +
                  _v +
                  '\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        \n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>'
              );
            }),
            (t.missingFormException = function () {
              throw new Error(
                "formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       " +
                  bv
              );
            }),
            (t.groupParentException = function () {
              throw new Error(
                "formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      " +
                  _v
              );
            }),
            (t.arrayParentException = function () {
              throw new Error(
                'formArrayName must be used with a parent formGroup directive.  You\'ll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        \n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });'
              );
            }),
            (t.disabledAttrWarning = function () {
              console.warn(
                "\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    "
              );
            }),
            (t.ngModelWarning = function (t) {
              console.warn(
                "\n    It looks like you're using ngModel on the same form field as " +
                  t +
                  ". \n    Support for using the ngModel input property and ngModelChange event with \n    reactive form directives has been deprecated in Angular v6 and will be removed \n    in Angular v7.\n    \n    For more information on this, see our API docs here:\n    https://angular.io/api/forms/" +
                  ("formControl" === t
                    ? "FormControlDirective"
                    : "FormControlName") +
                  "#use-with-ngmodel\n    "
              );
            }),
            t
          );
        })();
      function Cv(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
      }
      function Ev(t, e) {
        var n;
        throw (
          ((n =
            t.path.length > 1
              ? "path: '" + t.path.join(" -> ") + "'"
              : t.path[0]
              ? "name: '" + t.path + "'"
              : "unspecified name attribute"),
          new Error(e + " " + n))
        );
      }
      function Sv(t) {
        return null != t ? sv.compose(t.map(fv)) : null;
      }
      function xv(t) {
        return null != t ? sv.composeAsync(t.map(dv)) : null;
      }
      var Ov = [
        ev,
        yv,
        gv,
        (function () {
          function t(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = function (t) {}),
              (this.onTouched = function () {}),
              (this._compareWith = Ge);
          }
          return (
            Object.defineProperty(t.prototype, "compareWith", {
              set: function (t) {
                if ("function" != typeof t)
                  throw new Error(
                    "compareWith must be a function, but received " +
                      JSON.stringify(t)
                  );
                this._compareWith = t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.writeValue = function (t) {
              this.value = t;
              var e = this._getOptionId(t);
              null == e &&
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "selectedIndex",
                  -1
                );
              var n = (function (t, e) {
                return null == t
                  ? "" + e
                  : (e && "object" == typeof e && (e = "Object"),
                    (t + ": " + e).slice(0, 50));
              })(e, t);
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                n
              );
            }),
            (t.prototype.registerOnChange = function (t) {
              var e = this;
              this.onChange = function (n) {
                (e.value = e._getOptionValue(n)), t(e.value);
              };
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            (t.prototype._registerOption = function () {
              return (this._idCounter++).toString();
            }),
            (t.prototype._getOptionId = function (t) {
              var e, n;
              try {
                for (
                  var r = u(Array.from(this._optionMap.keys())), o = r.next();
                  !o.done;
                  o = r.next()
                ) {
                  var i = o.value;
                  if (this._compareWith(this._optionMap.get(i), t)) return i;
                }
              } catch (l) {
                e = { error: l };
              } finally {
                try {
                  o && !o.done && (n = r.return) && n.call(r);
                } finally {
                  if (e) throw e.error;
                }
              }
              return null;
            }),
            (t.prototype._getOptionValue = function (t) {
              var e = (function (t) {
                return t.split(":")[0];
              })(t);
              return this._optionMap.has(e) ? this._optionMap.get(e) : t;
            }),
            t
          );
        })(),
        (function () {
          function t(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = function (t) {}),
              (this.onTouched = function () {}),
              (this._compareWith = Ge);
          }
          return (
            Object.defineProperty(t.prototype, "compareWith", {
              set: function (t) {
                if ("function" != typeof t)
                  throw new Error(
                    "compareWith must be a function, but received " +
                      JSON.stringify(t)
                  );
                this._compareWith = t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.writeValue = function (t) {
              var e,
                n = this;
              if (((this.value = t), Array.isArray(t))) {
                var r = t.map(function (t) {
                  return n._getOptionId(t);
                });
                e = function (t, e) {
                  t._setSelected(r.indexOf(e.toString()) > -1);
                };
              } else
                e = function (t, e) {
                  t._setSelected(!1);
                };
              this._optionMap.forEach(e);
            }),
            (t.prototype.registerOnChange = function (t) {
              var e = this;
              this.onChange = function (n) {
                var r = [];
                if (n.hasOwnProperty("selectedOptions"))
                  for (var o = n.selectedOptions, i = 0; i < o.length; i++) {
                    var l = o.item(i),
                      a = e._getOptionValue(l.value);
                    r.push(a);
                  }
                else
                  for (o = n.options, i = 0; i < o.length; i++)
                    (l = o.item(i)).selected &&
                      ((a = e._getOptionValue(l.value)), r.push(a));
                (e.value = r), t(r);
              };
            }),
            (t.prototype.registerOnTouched = function (t) {
              this.onTouched = t;
            }),
            (t.prototype.setDisabledState = function (t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }),
            (t.prototype._registerOption = function (t) {
              var e = (this._idCounter++).toString();
              return this._optionMap.set(e, t), e;
            }),
            (t.prototype._getOptionId = function (t) {
              var e, n;
              try {
                for (
                  var r = u(Array.from(this._optionMap.keys())), o = r.next();
                  !o.done;
                  o = r.next()
                ) {
                  var i = o.value;
                  if (this._compareWith(this._optionMap.get(i)._value, t))
                    return i;
                }
              } catch (l) {
                e = { error: l };
              } finally {
                try {
                  o && !o.done && (n = r.return) && n.call(r);
                } finally {
                  if (e) throw e.error;
                }
              }
              return null;
            }),
            (t.prototype._getOptionValue = function (t) {
              var e = (function (t) {
                return t.split(":")[0];
              })(t);
              return this._optionMap.has(e) ? this._optionMap.get(e)._value : t;
            }),
            t
          );
        })(),
        mv,
      ];
      function Tv(t) {
        var e = Av(t) ? t.validators : t;
        return Array.isArray(e) ? Sv(e) : e || null;
      }
      function kv(t, e) {
        var n = Av(e) ? e.asyncValidators : t;
        return Array.isArray(n) ? xv(n) : n || null;
      }
      function Av(t) {
        return null != t && !Array.isArray(t) && "object" == typeof t;
      }
      var Iv = (function () {
          function t(t, e) {
            (this.validator = t),
              (this.asyncValidator = e),
              (this._onCollectionChange = function () {}),
              (this.pristine = !0),
              (this.touched = !1),
              (this._onDisabledChange = []);
          }
          return (
            Object.defineProperty(t.prototype, "parent", {
              get: function () {
                return this._parent;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "valid", {
              get: function () {
                return "VALID" === this.status;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "invalid", {
              get: function () {
                return "INVALID" === this.status;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "pending", {
              get: function () {
                return "PENDING" == this.status;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "disabled", {
              get: function () {
                return "DISABLED" === this.status;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "enabled", {
              get: function () {
                return "DISABLED" !== this.status;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "dirty", {
              get: function () {
                return !this.pristine;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "untouched", {
              get: function () {
                return !this.touched;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "updateOn", {
              get: function () {
                return this._updateOn
                  ? this._updateOn
                  : this.parent
                  ? this.parent.updateOn
                  : "change";
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.setValidators = function (t) {
              this.validator = Tv(t);
            }),
            (t.prototype.setAsyncValidators = function (t) {
              this.asyncValidator = kv(t);
            }),
            (t.prototype.clearValidators = function () {
              this.validator = null;
            }),
            (t.prototype.clearAsyncValidators = function () {
              this.asyncValidator = null;
            }),
            (t.prototype.markAsTouched = function (t) {
              void 0 === t && (t = {}),
                (this.touched = !0),
                this._parent && !t.onlySelf && this._parent.markAsTouched(t);
            }),
            (t.prototype.markAllAsTouched = function () {
              this.markAsTouched({ onlySelf: !0 }),
                this._forEachChild(function (t) {
                  return t.markAllAsTouched();
                });
            }),
            (t.prototype.markAsUntouched = function (t) {
              void 0 === t && (t = {}),
                (this.touched = !1),
                (this._pendingTouched = !1),
                this._forEachChild(function (t) {
                  t.markAsUntouched({ onlySelf: !0 });
                }),
                this._parent && !t.onlySelf && this._parent._updateTouched(t);
            }),
            (t.prototype.markAsDirty = function (t) {
              void 0 === t && (t = {}),
                (this.pristine = !1),
                this._parent && !t.onlySelf && this._parent.markAsDirty(t);
            }),
            (t.prototype.markAsPristine = function (t) {
              void 0 === t && (t = {}),
                (this.pristine = !0),
                (this._pendingDirty = !1),
                this._forEachChild(function (t) {
                  t.markAsPristine({ onlySelf: !0 });
                }),
                this._parent && !t.onlySelf && this._parent._updatePristine(t);
            }),
            (t.prototype.markAsPending = function (t) {
              void 0 === t && (t = {}),
                (this.status = "PENDING"),
                !1 !== t.emitEvent && this.statusChanges.emit(this.status),
                this._parent && !t.onlySelf && this._parent.markAsPending(t);
            }),
            (t.prototype.disable = function (t) {
              void 0 === t && (t = {});
              var e = this._parentMarkedDirty(t.onlySelf);
              (this.status = "DISABLED"),
                (this.errors = null),
                this._forEachChild(function (e) {
                  e.disable(i({}, t, { onlySelf: !0 }));
                }),
                this._updateValue(),
                !1 !== t.emitEvent &&
                  (this.valueChanges.emit(this.value),
                  this.statusChanges.emit(this.status)),
                this._updateAncestors(i({}, t, { skipPristineCheck: e })),
                this._onDisabledChange.forEach(function (t) {
                  return t(!0);
                });
            }),
            (t.prototype.enable = function (t) {
              void 0 === t && (t = {});
              var e = this._parentMarkedDirty(t.onlySelf);
              (this.status = "VALID"),
                this._forEachChild(function (e) {
                  e.enable(i({}, t, { onlySelf: !0 }));
                }),
                this.updateValueAndValidity({
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                }),
                this._updateAncestors(i({}, t, { skipPristineCheck: e })),
                this._onDisabledChange.forEach(function (t) {
                  return t(!1);
                });
            }),
            (t.prototype._updateAncestors = function (t) {
              this._parent &&
                !t.onlySelf &&
                (this._parent.updateValueAndValidity(t),
                t.skipPristineCheck || this._parent._updatePristine(),
                this._parent._updateTouched());
            }),
            (t.prototype.setParent = function (t) {
              this._parent = t;
            }),
            (t.prototype.updateValueAndValidity = function (t) {
              void 0 === t && (t = {}),
                this._setInitialStatus(),
                this._updateValue(),
                this.enabled &&
                  (this._cancelExistingSubscription(),
                  (this.errors = this._runValidator()),
                  (this.status = this._calculateStatus()),
                  ("VALID" !== this.status && "PENDING" !== this.status) ||
                    this._runAsyncValidator(t.emitEvent)),
                !1 !== t.emitEvent &&
                  (this.valueChanges.emit(this.value),
                  this.statusChanges.emit(this.status)),
                this._parent &&
                  !t.onlySelf &&
                  this._parent.updateValueAndValidity(t);
            }),
            (t.prototype._updateTreeValidity = function (t) {
              void 0 === t && (t = { emitEvent: !0 }),
                this._forEachChild(function (e) {
                  return e._updateTreeValidity(t);
                }),
                this.updateValueAndValidity({
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                });
            }),
            (t.prototype._setInitialStatus = function () {
              this.status = this._allControlsDisabled() ? "DISABLED" : "VALID";
            }),
            (t.prototype._runValidator = function () {
              return this.validator ? this.validator(this) : null;
            }),
            (t.prototype._runAsyncValidator = function (t) {
              var e = this;
              if (this.asyncValidator) {
                this.status = "PENDING";
                var n = hv(this.asyncValidator(this));
                this._asyncValidationSubscription = n.subscribe(function (n) {
                  return e.setErrors(n, { emitEvent: t });
                });
              }
            }),
            (t.prototype._cancelExistingSubscription = function () {
              this._asyncValidationSubscription &&
                this._asyncValidationSubscription.unsubscribe();
            }),
            (t.prototype.setErrors = function (t, e) {
              void 0 === e && (e = {}),
                (this.errors = t),
                this._updateControlsErrors(!1 !== e.emitEvent);
            }),
            (t.prototype.get = function (t) {
              return (function (t, e, n) {
                return null == e
                  ? null
                  : (e instanceof Array || (e = e.split(".")),
                    e instanceof Array && 0 === e.length
                      ? null
                      : e.reduce(function (t, e) {
                          return t instanceof Rv
                            ? t.controls.hasOwnProperty(e)
                              ? t.controls[e]
                              : null
                            : (t instanceof Nv && t.at(e)) || null;
                        }, t));
              })(this, t);
            }),
            (t.prototype.getError = function (t, e) {
              var n = e ? this.get(e) : this;
              return n && n.errors ? n.errors[t] : null;
            }),
            (t.prototype.hasError = function (t, e) {
              return !!this.getError(t, e);
            }),
            Object.defineProperty(t.prototype, "root", {
              get: function () {
                for (var t = this; t._parent; ) t = t._parent;
                return t;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype._updateControlsErrors = function (t) {
              (this.status = this._calculateStatus()),
                t && this.statusChanges.emit(this.status),
                this._parent && this._parent._updateControlsErrors(t);
            }),
            (t.prototype._initObservables = function () {
              (this.valueChanges = new Po()), (this.statusChanges = new Po());
            }),
            (t.prototype._calculateStatus = function () {
              return this._allControlsDisabled()
                ? "DISABLED"
                : this.errors
                ? "INVALID"
                : this._anyControlsHaveStatus("PENDING")
                ? "PENDING"
                : this._anyControlsHaveStatus("INVALID")
                ? "INVALID"
                : "VALID";
            }),
            (t.prototype._anyControlsHaveStatus = function (t) {
              return this._anyControls(function (e) {
                return e.status === t;
              });
            }),
            (t.prototype._anyControlsDirty = function () {
              return this._anyControls(function (t) {
                return t.dirty;
              });
            }),
            (t.prototype._anyControlsTouched = function () {
              return this._anyControls(function (t) {
                return t.touched;
              });
            }),
            (t.prototype._updatePristine = function (t) {
              void 0 === t && (t = {}),
                (this.pristine = !this._anyControlsDirty()),
                this._parent && !t.onlySelf && this._parent._updatePristine(t);
            }),
            (t.prototype._updateTouched = function (t) {
              void 0 === t && (t = {}),
                (this.touched = this._anyControlsTouched()),
                this._parent && !t.onlySelf && this._parent._updateTouched(t);
            }),
            (t.prototype._isBoxedValue = function (t) {
              return (
                "object" == typeof t &&
                null !== t &&
                2 === Object.keys(t).length &&
                "value" in t &&
                "disabled" in t
              );
            }),
            (t.prototype._registerOnCollectionChange = function (t) {
              this._onCollectionChange = t;
            }),
            (t.prototype._setUpdateStrategy = function (t) {
              Av(t) && null != t.updateOn && (this._updateOn = t.updateOn);
            }),
            (t.prototype._parentMarkedDirty = function (t) {
              return (
                !t &&
                this._parent &&
                this._parent.dirty &&
                !this._parent._anyControlsDirty()
              );
            }),
            t
          );
        })(),
        Pv = (function (t) {
          function e(e, n, r) {
            void 0 === e && (e = null);
            var o = t.call(this, Tv(n), kv(r, n)) || this;
            return (
              (o._onChange = []),
              o._applyFormState(e),
              o._setUpdateStrategy(n),
              o.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
              o._initObservables(),
              o
            );
          }
          return (
            o(e, t),
            (e.prototype.setValue = function (t, e) {
              var n = this;
              void 0 === e && (e = {}),
                (this.value = this._pendingValue = t),
                this._onChange.length &&
                  !1 !== e.emitModelToViewChange &&
                  this._onChange.forEach(function (t) {
                    return t(n.value, !1 !== e.emitViewToModelChange);
                  }),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.patchValue = function (t, e) {
              void 0 === e && (e = {}), this.setValue(t, e);
            }),
            (e.prototype.reset = function (t, e) {
              void 0 === t && (t = null),
                void 0 === e && (e = {}),
                this._applyFormState(t),
                this.markAsPristine(e),
                this.markAsUntouched(e),
                this.setValue(this.value, e),
                (this._pendingChange = !1);
            }),
            (e.prototype._updateValue = function () {}),
            (e.prototype._anyControls = function (t) {
              return !1;
            }),
            (e.prototype._allControlsDisabled = function () {
              return this.disabled;
            }),
            (e.prototype.registerOnChange = function (t) {
              this._onChange.push(t);
            }),
            (e.prototype._clearChangeFns = function () {
              (this._onChange = []),
                (this._onDisabledChange = []),
                (this._onCollectionChange = function () {});
            }),
            (e.prototype.registerOnDisabledChange = function (t) {
              this._onDisabledChange.push(t);
            }),
            (e.prototype._forEachChild = function (t) {}),
            (e.prototype._syncPendingControls = function () {
              return !(
                "submit" !== this.updateOn ||
                (this._pendingDirty && this.markAsDirty(),
                this._pendingTouched && this.markAsTouched(),
                !this._pendingChange) ||
                (this.setValue(this._pendingValue, {
                  onlySelf: !0,
                  emitModelToViewChange: !1,
                }),
                0)
              );
            }),
            (e.prototype._applyFormState = function (t) {
              this._isBoxedValue(t)
                ? ((this.value = this._pendingValue = t.value),
                  t.disabled
                    ? this.disable({ onlySelf: !0, emitEvent: !1 })
                    : this.enable({ onlySelf: !0, emitEvent: !1 }))
                : (this.value = this._pendingValue = t);
            }),
            e
          );
        })(Iv),
        Rv = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, Tv(n), kv(r, n)) || this;
            return (
              (o.controls = e),
              o._initObservables(),
              o._setUpdateStrategy(n),
              o._setUpControls(),
              o.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
              o
            );
          }
          return (
            o(e, t),
            (e.prototype.registerControl = function (t, e) {
              return this.controls[t]
                ? this.controls[t]
                : ((this.controls[t] = e),
                  e.setParent(this),
                  e._registerOnCollectionChange(this._onCollectionChange),
                  e);
            }),
            (e.prototype.addControl = function (t, e) {
              this.registerControl(t, e),
                this.updateValueAndValidity(),
                this._onCollectionChange();
            }),
            (e.prototype.removeControl = function (t) {
              this.controls[t] &&
                this.controls[t]._registerOnCollectionChange(function () {}),
                delete this.controls[t],
                this.updateValueAndValidity(),
                this._onCollectionChange();
            }),
            (e.prototype.setControl = function (t, e) {
              this.controls[t] &&
                this.controls[t]._registerOnCollectionChange(function () {}),
                delete this.controls[t],
                e && this.registerControl(t, e),
                this.updateValueAndValidity(),
                this._onCollectionChange();
            }),
            (e.prototype.contains = function (t) {
              return (
                this.controls.hasOwnProperty(t) && this.controls[t].enabled
              );
            }),
            (e.prototype.setValue = function (t, e) {
              var n = this;
              void 0 === e && (e = {}),
                this._checkAllValuesPresent(t),
                Object.keys(t).forEach(function (r) {
                  n._throwIfControlMissing(r),
                    n.controls[r].setValue(t[r], {
                      onlySelf: !0,
                      emitEvent: e.emitEvent,
                    });
                }),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.patchValue = function (t, e) {
              var n = this;
              void 0 === e && (e = {}),
                Object.keys(t).forEach(function (r) {
                  n.controls[r] &&
                    n.controls[r].patchValue(t[r], {
                      onlySelf: !0,
                      emitEvent: e.emitEvent,
                    });
                }),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.reset = function (t, e) {
              void 0 === t && (t = {}),
                void 0 === e && (e = {}),
                this._forEachChild(function (n, r) {
                  n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
                }),
                this._updatePristine(e),
                this._updateTouched(e),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.getRawValue = function () {
              return this._reduceChildren({}, function (t, e, n) {
                return (t[n] = e instanceof Pv ? e.value : e.getRawValue()), t;
              });
            }),
            (e.prototype._syncPendingControls = function () {
              var t = this._reduceChildren(!1, function (t, e) {
                return !!e._syncPendingControls() || t;
              });
              return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
            }),
            (e.prototype._throwIfControlMissing = function (t) {
              if (!Object.keys(this.controls).length)
                throw new Error(
                  "\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
                );
              if (!this.controls[t])
                throw new Error(
                  "Cannot find form control with name: " + t + "."
                );
            }),
            (e.prototype._forEachChild = function (t) {
              var e = this;
              Object.keys(this.controls).forEach(function (n) {
                return t(e.controls[n], n);
              });
            }),
            (e.prototype._setUpControls = function () {
              var t = this;
              this._forEachChild(function (e) {
                e.setParent(t),
                  e._registerOnCollectionChange(t._onCollectionChange);
              });
            }),
            (e.prototype._updateValue = function () {
              this.value = this._reduceValue();
            }),
            (e.prototype._anyControls = function (t) {
              var e = this,
                n = !1;
              return (
                this._forEachChild(function (r, o) {
                  n = n || (e.contains(o) && t(r));
                }),
                n
              );
            }),
            (e.prototype._reduceValue = function () {
              var t = this;
              return this._reduceChildren({}, function (e, n, r) {
                return (n.enabled || t.disabled) && (e[r] = n.value), e;
              });
            }),
            (e.prototype._reduceChildren = function (t, e) {
              var n = t;
              return (
                this._forEachChild(function (t, r) {
                  n = e(n, t, r);
                }),
                n
              );
            }),
            (e.prototype._allControlsDisabled = function () {
              var t, e;
              try {
                for (
                  var n = u(Object.keys(this.controls)), r = n.next();
                  !r.done;
                  r = n.next()
                )
                  if (this.controls[r.value].enabled) return !1;
              } catch (o) {
                t = { error: o };
              } finally {
                try {
                  r && !r.done && (e = n.return) && e.call(n);
                } finally {
                  if (t) throw t.error;
                }
              }
              return Object.keys(this.controls).length > 0 || this.disabled;
            }),
            (e.prototype._checkAllValuesPresent = function (t) {
              this._forEachChild(function (e, n) {
                if (void 0 === t[n])
                  throw new Error(
                    "Must supply a value for form control with name: '" +
                      n +
                      "'."
                  );
              });
            }),
            e
          );
        })(Iv),
        Nv = (function (t) {
          function e(e, n, r) {
            var o = t.call(this, Tv(n), kv(r, n)) || this;
            return (
              (o.controls = e),
              o._initObservables(),
              o._setUpdateStrategy(n),
              o._setUpControls(),
              o.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
              o
            );
          }
          return (
            o(e, t),
            (e.prototype.at = function (t) {
              return this.controls[t];
            }),
            (e.prototype.push = function (t) {
              this.controls.push(t),
                this._registerControl(t),
                this.updateValueAndValidity(),
                this._onCollectionChange();
            }),
            (e.prototype.insert = function (t, e) {
              this.controls.splice(t, 0, e),
                this._registerControl(e),
                this.updateValueAndValidity();
            }),
            (e.prototype.removeAt = function (t) {
              this.controls[t] &&
                this.controls[t]._registerOnCollectionChange(function () {}),
                this.controls.splice(t, 1),
                this.updateValueAndValidity();
            }),
            (e.prototype.setControl = function (t, e) {
              this.controls[t] &&
                this.controls[t]._registerOnCollectionChange(function () {}),
                this.controls.splice(t, 1),
                e && (this.controls.splice(t, 0, e), this._registerControl(e)),
                this.updateValueAndValidity(),
                this._onCollectionChange();
            }),
            Object.defineProperty(e.prototype, "length", {
              get: function () {
                return this.controls.length;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.setValue = function (t, e) {
              var n = this;
              void 0 === e && (e = {}),
                this._checkAllValuesPresent(t),
                t.forEach(function (t, r) {
                  n._throwIfControlMissing(r),
                    n
                      .at(r)
                      .setValue(t, { onlySelf: !0, emitEvent: e.emitEvent });
                }),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.patchValue = function (t, e) {
              var n = this;
              void 0 === e && (e = {}),
                t.forEach(function (t, r) {
                  n.at(r) &&
                    n
                      .at(r)
                      .patchValue(t, { onlySelf: !0, emitEvent: e.emitEvent });
                }),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.reset = function (t, e) {
              void 0 === t && (t = []),
                void 0 === e && (e = {}),
                this._forEachChild(function (n, r) {
                  n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
                }),
                this._updatePristine(e),
                this._updateTouched(e),
                this.updateValueAndValidity(e);
            }),
            (e.prototype.getRawValue = function () {
              return this.controls.map(function (t) {
                return t instanceof Pv ? t.value : t.getRawValue();
              });
            }),
            (e.prototype.clear = function () {
              this.controls.length < 1 ||
                (this._forEachChild(function (t) {
                  return t._registerOnCollectionChange(function () {});
                }),
                this.controls.splice(0),
                this.updateValueAndValidity());
            }),
            (e.prototype._syncPendingControls = function () {
              var t = this.controls.reduce(function (t, e) {
                return !!e._syncPendingControls() || t;
              }, !1);
              return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
            }),
            (e.prototype._throwIfControlMissing = function (t) {
              if (!this.controls.length)
                throw new Error(
                  "\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
                );
              if (!this.at(t))
                throw new Error("Cannot find form control at index " + t);
            }),
            (e.prototype._forEachChild = function (t) {
              this.controls.forEach(function (e, n) {
                t(e, n);
              });
            }),
            (e.prototype._updateValue = function () {
              var t = this;
              this.value = this.controls
                .filter(function (e) {
                  return e.enabled || t.disabled;
                })
                .map(function (t) {
                  return t.value;
                });
            }),
            (e.prototype._anyControls = function (t) {
              return this.controls.some(function (e) {
                return e.enabled && t(e);
              });
            }),
            (e.prototype._setUpControls = function () {
              var t = this;
              this._forEachChild(function (e) {
                return t._registerControl(e);
              });
            }),
            (e.prototype._checkAllValuesPresent = function (t) {
              this._forEachChild(function (e, n) {
                if (void 0 === t[n])
                  throw new Error(
                    "Must supply a value for form control at index: " + n + "."
                  );
              });
            }),
            (e.prototype._allControlsDisabled = function () {
              var t, e;
              try {
                for (
                  var n = u(this.controls), r = n.next();
                  !r.done;
                  r = n.next()
                )
                  if (r.value.enabled) return !1;
              } catch (o) {
                t = { error: o };
              } finally {
                try {
                  r && !r.done && (e = n.return) && e.call(n);
                } finally {
                  if (t) throw t.error;
                }
              }
              return this.controls.length > 0 || this.disabled;
            }),
            (e.prototype._registerControl = function (t) {
              t.setParent(this),
                t._registerOnCollectionChange(this._onCollectionChange);
            }),
            e
          );
        })(Iv),
        Dv = new Lt("NgModelWithFormControlWarning"),
        Mv = (function (t) {
          function e(e, n, r, o) {
            var i = t.call(this) || this;
            return (
              (i._ngModelWarningConfig = o),
              (i.update = new Po()),
              (i._ngModelWarningSent = !1),
              (i._rawValidators = e || []),
              (i._rawAsyncValidators = n || []),
              (i.valueAccessor = (function (t, e) {
                if (!e) return null;
                Array.isArray(e) ||
                  Ev(
                    t,
                    "Value accessor was not provided as an array for form control with"
                  );
                var n = void 0,
                  r = void 0,
                  o = void 0;
                return (
                  e.forEach(function (e) {
                    var i;
                    e.constructor === rv
                      ? (n = e)
                      : ((i = e),
                        Ov.some(function (t) {
                          return i.constructor === t;
                        })
                          ? (r &&
                              Ev(
                                t,
                                "More than one built-in value accessor matches form control with"
                              ),
                            (r = e))
                          : (o &&
                              Ev(
                                t,
                                "More than one custom value accessor matches form control with"
                              ),
                            (o = e)));
                  }),
                  o ||
                    r ||
                    n ||
                    (Ev(t, "No valid value accessor for form control with"),
                    null)
                );
              })(i, r)),
              i
            );
          }
          var n;
          return (
            o(e, t),
            (n = e),
            Object.defineProperty(e.prototype, "isDisabled", {
              set: function (t) {
                wv.disabledAttrWarning();
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.ngOnChanges = function (t) {
              var e, r, o, i;
              this._isControlChanged(t) &&
                ((i = this),
                (o = this.form) || Ev(i, "Cannot find control with"),
                i.valueAccessor ||
                  Ev(i, "No value accessor for form control with"),
                (o.validator = sv.compose([o.validator, i.validator])),
                (o.asyncValidator = sv.composeAsync([
                  o.asyncValidator,
                  i.asyncValidator,
                ])),
                i.valueAccessor.writeValue(o.value),
                (function (t, e) {
                  e.valueAccessor.registerOnChange(function (n) {
                    (t._pendingValue = n),
                      (t._pendingChange = !0),
                      (t._pendingDirty = !0),
                      "change" === t.updateOn && Cv(t, e);
                  });
                })(o, i),
                (function (t, e) {
                  t.registerOnChange(function (t, n) {
                    e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t);
                  });
                })(o, i),
                (function (t, e) {
                  e.valueAccessor.registerOnTouched(function () {
                    (t._pendingTouched = !0),
                      "blur" === t.updateOn && t._pendingChange && Cv(t, e),
                      "submit" !== t.updateOn && t.markAsTouched();
                  });
                })(o, i),
                i.valueAccessor.setDisabledState &&
                  o.registerOnDisabledChange(function (t) {
                    i.valueAccessor.setDisabledState(t);
                  }),
                i._rawValidators.forEach(function (t) {
                  t.registerOnValidatorChange &&
                    t.registerOnValidatorChange(function () {
                      return o.updateValueAndValidity();
                    });
                }),
                i._rawAsyncValidators.forEach(function (t) {
                  t.registerOnValidatorChange &&
                    t.registerOnValidatorChange(function () {
                      return o.updateValueAndValidity();
                    });
                }),
                this.control.disabled &&
                  this.valueAccessor.setDisabledState &&
                  this.valueAccessor.setDisabledState(!0),
                this.form.updateValueAndValidity({ emitEvent: !1 })),
                (function (t, e) {
                  if (!t.hasOwnProperty("model")) return !1;
                  var n = t.model;
                  return !!n.isFirstChange() || !Ge(e, n.currentValue);
                })(t, this.viewModel) &&
                  ("formControl",
                  (e = n),
                  this,
                  (r = this._ngModelWarningConfig),
                  fe() &&
                    "never" !== r &&
                    ((((null !== r && "once" !== r) ||
                      e._ngModelWarningSentOnce) &&
                      ("always" !== r || this._ngModelWarningSent)) ||
                      (wv.ngModelWarning("formControl"),
                      (e._ngModelWarningSentOnce = !0),
                      (this._ngModelWarningSent = !0))),
                  this.form.setValue(this.model),
                  (this.viewModel = this.model));
            }),
            Object.defineProperty(e.prototype, "path", {
              get: function () {
                return [];
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "validator", {
              get: function () {
                return Sv(this._rawValidators);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "asyncValidator", {
              get: function () {
                return xv(this._rawAsyncValidators);
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(e.prototype, "control", {
              get: function () {
                return this.form;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (e.prototype.viewToModelUpdate = function (t) {
              (this.viewModel = t), this.update.emit(t);
            }),
            (e.prototype._isControlChanged = function (t) {
              return t.hasOwnProperty("form");
            }),
            (e._ngModelWarningSentOnce = !1),
            e
          );
        })(iv),
        jv = (function () {
          return function () {};
        })(),
        Vv = (function () {
          function t() {}
          return (
            (t.prototype.group = function (t, e) {
              void 0 === e && (e = null);
              var n = this._reduceControls(t),
                r = null,
                o = null,
                i = void 0;
              return (
                null != e &&
                  ((function (t) {
                    return (
                      void 0 !== t.asyncValidators ||
                      void 0 !== t.validators ||
                      void 0 !== t.updateOn
                    );
                  })(e)
                    ? ((r = null != e.validators ? e.validators : null),
                      (o =
                        null != e.asyncValidators ? e.asyncValidators : null),
                      (i = null != e.updateOn ? e.updateOn : void 0))
                    : ((r = null != e.validator ? e.validator : null),
                      (o =
                        null != e.asyncValidator ? e.asyncValidator : null))),
                new Rv(n, { asyncValidators: o, updateOn: i, validators: r })
              );
            }),
            (t.prototype.control = function (t, e, n) {
              return new Pv(t, e, n);
            }),
            (t.prototype.array = function (t, e, n) {
              var r = this,
                o = t.map(function (t) {
                  return r._createControl(t);
                });
              return new Nv(o, e, n);
            }),
            (t.prototype._reduceControls = function (t) {
              var e = this,
                n = {};
              return (
                Object.keys(t).forEach(function (r) {
                  n[r] = e._createControl(t[r]);
                }),
                n
              );
            }),
            (t.prototype._createControl = function (t) {
              return t instanceof Pv || t instanceof Rv || t instanceof Nv
                ? t
                : Array.isArray(t)
                ? this.control(
                    t[0],
                    t.length > 1 ? t[1] : null,
                    t.length > 2 ? t[2] : null
                  )
                : this.control(t);
            }),
            t
          );
        })(),
        Lv = (function () {
          function t() {}
          var e;
          return (
            (e = t),
            (t.withConfig = function (t) {
              return {
                ngModule: e,
                providers: [
                  { provide: Dv, useValue: t.warnOnNgModelWithFormControl },
                ],
              };
            }),
            t
          );
        })(),
        Fv = (function () {
          return function () {
            this.citiesControls = new Nv(
              ["Ankara", "Moscow", "Munich", "Paris", "Washington"].map(
                function (t) {
                  return new Pv(t);
                }
              )
            );
          };
        })(),
        Uv = nr({ encapsulation: 0, styles: [[""]], data: {} });
      function Hv(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              6,
              "li",
              [["class", "list-group-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              1,
              0,
              null,
              null,
              5,
              "input",
              [["class", "form-control"]],
              [
                [2, "ng-untouched", null],
                [2, "ng-touched", null],
                [2, "ng-pristine", null],
                [2, "ng-dirty", null],
                [2, "ng-valid", null],
                [2, "ng-invalid", null],
                [2, "ng-pending", null],
              ],
              [
                [null, "input"],
                [null, "blur"],
                [null, "compositionstart"],
                [null, "compositionend"],
              ],
              function (t, e, n) {
                var r = !0;
                return (
                  "input" === e &&
                    (r = !1 !== Jr(t, 2)._handleInput(n.target.value) && r),
                  "blur" === e && (r = !1 !== Jr(t, 2).onTouched() && r),
                  "compositionstart" === e &&
                    (r = !1 !== Jr(t, 2)._compositionStart() && r),
                  "compositionend" === e &&
                    (r = !1 !== Jr(t, 2)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            po(2, 16384, null, 0, rv, [gn, cn, [2, nv]], null, null),
            go(
              1024,
              null,
              tv,
              function (t) {
                return [t];
              },
              [rv]
            ),
            po(
              4,
              540672,
              null,
              0,
              Mv,
              [
                [8, null],
                [8, null],
                [6, tv],
                [2, Dv],
              ],
              { form: [0, "form"] },
              null
            ),
            go(2048, null, iv, null, [Mv]),
            po(6, 16384, null, 0, lv, [[4, iv]], null, null),
          ],
          function (t, e) {
            t(e, 4, 0, e.context.$implicit);
          },
          function (t, e) {
            t(
              e,
              1,
              0,
              Jr(e, 6).ngClassUntouched,
              Jr(e, 6).ngClassTouched,
              Jr(e, 6).ngClassPristine,
              Jr(e, 6).ngClassDirty,
              Jr(e, 6).ngClassValid,
              Jr(e, 6).ngClassInvalid,
              Jr(e, 6).ngClassPending
            );
          }
        );
      }
      function zv(t) {
        return il(
          0,
          [
            (t()(),
            Wi(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["Sortable Array"])),
            (t()(),
            Wi(
              2,
              0,
              null,
              null,
              3,
              "p",
              [["class", "lead"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              3,
              0,
              null,
              null,
              2,
              "strong",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              4,
              0,
              null,
              null,
              1,
              "a",
              [
                [
                  "href",
                  "https://github.com/SortableJS/ngx-sortablejs/tree/master/src/app/examples/sortable-form-array",
                ],
                ["target", "_blank"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["The source code"])),
            (t()(),
            Wi(6, 0, null, null, 4, "p", [], null, null, null, null, null)),
            (t()(),
            nl(-1, null, [
              " Most of the time one wants to sort something more than just data. Complex forms with ",
            ])),
            (t()(),
            Wi(8, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["FormArray"])),
            (t()(), nl(-1, null, [" controls are also supported.\n"])),
            (t()(),
            Wi(11, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (t()(),
            nl(-1, null, ["Try to change the text and reorder the inputs"])),
            (t()(),
            Wi(
              13,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "list-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              14,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              { sortablejs: [0, "sortablejs"] },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, Hv)),
            po(
              16,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              17,
              0,
              null,
              null,
              1,
              "p",
              [["class", "my-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["The actual value of the array"])),
            (t()(),
            Wi(
              19,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(20, null, [" > ", "\n"])),
            fo(0, Ma, []),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 14, 0, n.citiesControls),
              t(e, 16, 0, n.citiesControls.controls);
          },
          function (t, e) {
            var n = e.component;
            t(
              e,
              20,
              0,
              Jn(e, 20, 0, Jr(e, 21).transform(n.citiesControls.value))
            );
          }
        );
      }
      function Bv(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "app-sortable-form-array",
              [],
              null,
              null,
              null,
              zv,
              Uv
            )),
            po(1, 49152, null, 0, Fv, [], null, null),
          ],
          null,
          null
        );
      }
      var Wv = zr("app-sortable-form-array", Fv, Bv, {}, {}, []),
        Gv = (function () {
          return function () {
            var t = this;
            (this.draggableItems = [
              { draggable: !0, text: "1" },
              { draggable: !0, text: "2" },
              { draggable: !1, text: "3" },
              { draggable: !0, text: "4" },
              { draggable: !0, text: "5" },
            ]),
              (this.eventItems = ["1", "2", "3", "4", "5"]),
              (this.eventUpdateCounter = 0),
              (this.scrollableItems = Array.from({ length: 30 }).map(function (
                t,
                e
              ) {
                return e + 1;
              })),
              (this.draggableOptions = { draggable: ".draggable" }),
              (this.eventOptions = {
                onUpdate: function () {
                  return t.eventUpdateCounter++;
                },
              }),
              (this.scrollableOptions = { scroll: !0, scrollSensitivity: 100 });
          };
        })(),
        qv = nr({ encapsulation: 0, styles: [[""]], data: {} });
      function Zv(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "list-group-item"]],
              [
                [2, "draggable", null],
                [2, "disabled", null],
              ],
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, [" Element ", " "])),
          ],
          null,
          function (t, e) {
            t(
              e,
              0,
              0,
              e.context.$implicit.draggable,
              !e.context.$implicit.draggable
            ),
              t(e, 1, 0, e.context.$implicit.text);
          }
        );
      }
      function Qv(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "list-group-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, [" Element ", " "])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function Yv(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "list-group-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, [" Element ", " "])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function $v(t) {
        return il(
          0,
          [
            (t()(),
            Wi(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["Custom options"])),
            (t()(),
            Wi(
              2,
              0,
              null,
              null,
              3,
              "p",
              [["class", "lead"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              3,
              0,
              null,
              null,
              2,
              "strong",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              4,
              0,
              null,
              null,
              1,
              "a",
              [
                [
                  "href",
                  "https://github.com/SortableJS/ngx-sortablejs/tree/master/src/app/examples/sortable-with-options",
                ],
                ["target", "_blank"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["The source code"])),
            (t()(),
            nl(-1, null, [
              " This example shows how the various options could be used in order to configure ",
            ])),
            (t()(),
            Wi(7, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["Sortablejs"])),
            (t()(), nl(-1, null, [". "])),
            (t()(),
            Wi(
              10,
              0,
              null,
              null,
              1,
              "h2",
              [["class", "mt-4 mb-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["Disabled options"])),
            (t()(),
            Wi(
              12,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "list-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              13,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, Zv)),
            po(
              15,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              16,
              0,
              null,
              null,
              1,
              "p",
              [["class", "my-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["and the actual model is"])),
            (t()(),
            Wi(
              18,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(19, null, [" > ", "\n"])),
            fo(0, Ma, []),
            (t()(),
            Wi(
              21,
              0,
              null,
              null,
              1,
              "h2",
              [["class", "mt-4 mb-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["Events"])),
            (t()(),
            Wi(
              23,
              0,
              null,
              null,
              7,
              "p",
              [["class", "my-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            nl(-1, null, [
              " Binding to the events is easy. Any even could be attached as a property of ",
            ])),
            (t()(),
            Wi(25, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["Sortablejs"])),
            (t()(), nl(-1, null, [". The example below binds to the "])),
            (t()(),
            Wi(28, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["onUpdate"])),
            (t()(),
            nl(-1, null, [
              " event. Drag the items and track the amount of updates.\n",
            ])),
            (t()(),
            Wi(
              31,
              0,
              null,
              null,
              1,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(32, null, [" > Updated ", " times\n"])),
            (t()(),
            Wi(
              33,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "list-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              34,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, Qv)),
            po(
              36,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              37,
              0,
              null,
              null,
              10,
              "div",
              [["class", "alert alert-info my-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, [" Hint: for the "])),
            (t()(),
            Wi(39, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["FormArray"])),
            (t()(), nl(-1, null, [" using "])),
            (t()(),
            Wi(42, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["onUpdate"])),
            (t()(), nl(-1, null, [" is kinda overhead because the "])),
            (t()(),
            Wi(45, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["FormArray.valueChanges"])),
            (t()(), nl(-1, null, [" provides an event on every change.\n"])),
            (t()(),
            Wi(
              48,
              0,
              null,
              null,
              1,
              "h2",
              [["class", "mt-4 mb-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["Autoscroll with fixed navbar"])),
            (t()(),
            Wi(50, 0, null, null, 4, "p", [], null, null, null, null, null)),
            (t()(),
            nl(-1, null, [" Normally the scrolling that is performed by "])),
            (t()(),
            Wi(52, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["Sortablejs"])),
            (t()(),
            nl(-1, null, [
              " is working fine. However with a fixed navbar it may cause problems.\n",
            ])),
            (t()(),
            Wi(55, 0, null, null, 4, "p", [], null, null, null, null, null)),
            (t()(), nl(-1, null, [" Setting the "])),
            (t()(),
            Wi(57, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["scrollSensitivity"])),
            (t()(),
            nl(-1, null, [
              " to the proper value will solve the problem. Try it on the long list below\n",
            ])),
            (t()(),
            Wi(
              60,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "list-group"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              61,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, Yv)),
            po(
              63,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 13, 0, n.draggableItems, n.draggableOptions),
              t(e, 15, 0, n.draggableItems),
              t(e, 34, 0, n.eventItems, n.eventOptions),
              t(e, 36, 0, n.eventItems),
              t(e, 61, 0, n.scrollableItems, n.scrollableOptions),
              t(e, 63, 0, n.scrollableItems);
          },
          function (t, e) {
            var n = e.component;
            t(e, 19, 0, Jn(e, 19, 0, Jr(e, 20).transform(n.draggableItems))),
              t(e, 32, 0, n.eventUpdateCounter);
          }
        );
      }
      function Kv(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "app-sortable-with-options",
              [],
              null,
              null,
              null,
              $v,
              qv
            )),
            po(1, 49152, null, 0, Gv, [], null, null),
          ],
          null,
          null
        );
      }
      var Xv = zr("app-sortable-with-options", Gv, Kv, {}, {}, []),
        Jv = (function () {
          return function () {
            (this.normalList1 = ["1", "2", "3", "4", "5"]),
              (this.normalList2 = ["6", "7", "8", "9", "10"]),
              (this.normalOptions = { group: "normal-group" }),
              (this.cloneList1 = ["1", "2", "3", "4", "5"]),
              (this.cloneList2 = ["6", "7", "8", "9", "10"]),
              (this.clone1Options = {
                group: { name: "clone-group", pull: "clone", put: !1 },
              }),
              (this.clone2Options = { group: "clone-group" }),
              (this.list1 = ["1", "2", "3", "4", "5"]),
              (this.list2 = ["6", "7", "8", "9", "10"]),
              (this.list3 = ["11", "12"]),
              (this.list4 = ["13"]),
              (this.list1Options = { group: { name: "group1", put: !1 } }),
              (this.list2Options = {
                group: { name: "group2", put: ["group1", "group2"] },
              }),
              (this.list3Options = {
                group: {
                  name: "group2",
                  pull: "clone",
                  put: ["group1", "group2"],
                  revertClone: !0,
                },
              }),
              (this.list4Options = {
                group: { name: "group2", put: ["group1"] },
              });
          };
        })(),
        tm = nr({
          encapsulation: 0,
          styles: [
            [
              ".sortable[_ngcontent-%COMP%]{background:#eee;border-radius:.25rem;min-height:40px}",
            ],
          ],
          data: {},
        });
      function em(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "list-group-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function nm(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "list-group-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function rm(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "list-group-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function om(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "list-group-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function im(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "list-group-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function lm(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "list-group-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function am(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "list-group-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function um(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "list-group-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function sm(t) {
        return il(
          0,
          [
            (t()(),
            Wi(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["Connecting multiple sortable lists"])),
            (t()(),
            Wi(
              2,
              0,
              null,
              null,
              3,
              "p",
              [["class", "lead"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              3,
              0,
              null,
              null,
              2,
              "strong",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              4,
              0,
              null,
              null,
              1,
              "a",
              [
                [
                  "href",
                  "https://github.com/SortableJS/ngx-sortablejs/tree/master/src/app/examples/multiple-lists",
                ],
                ["target", "_blank"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["The source code"])),
            (t()(), nl(-1, null, [" This shows how the "])),
            (t()(),
            Wi(7, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["sortable"])),
            (t()(),
            nl(-1, null, [
              " lists can be connected together. Pay attention to the ",
            ])),
            (t()(),
            Wi(10, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["sortable"])),
            (t()(), nl(-1, null, [" CSS class\n(gives a "])),
            (t()(),
            Wi(13, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["min-height"])),
            (t()(),
            nl(-1, null, [
              ") that does not allow lists to become invisible when all items are gone ",
            ])),
            (t()(),
            Wi(
              16,
              0,
              null,
              null,
              1,
              "h2",
              [["class", "mt-4 mb-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["Transfer between lists"])),
            (t()(),
            Wi(18, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (t()(),
            nl(-1, null, [
              " These lists are connected together. You can drag / drop elements across the lists.\n",
            ])),
            (t()(),
            Wi(
              20,
              0,
              null,
              null,
              10,
              "div",
              [["class", "row"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              21,
              0,
              null,
              null,
              4,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              22,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "list-group sortable"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              23,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, em)),
            po(
              25,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              26,
              0,
              null,
              null,
              4,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              27,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "list-group sortable"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              28,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, nm)),
            po(
              30,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              31,
              0,
              null,
              null,
              1,
              "p",
              [["class", "my-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["and the actual state is"])),
            (t()(),
            Wi(
              33,
              0,
              null,
              null,
              8,
              "div",
              [["class", "row"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              34,
              0,
              null,
              null,
              3,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              35,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(36, null, ["> ", ""])),
            fo(0, Ma, []),
            (t()(),
            Wi(
              38,
              0,
              null,
              null,
              3,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              39,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(40, null, ["> ", ""])),
            fo(0, Ma, []),
            (t()(),
            Wi(
              42,
              0,
              null,
              null,
              1,
              "h2",
              [["class", "mt-4 mb-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["Clone items"])),
            (t()(),
            Wi(44, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (t()(),
            nl(-1, null, [
              "The list 1 is a clone factory and list 2 can be its target.",
            ])),
            (t()(),
            Wi(
              46,
              0,
              null,
              null,
              10,
              "div",
              [["class", "row"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              47,
              0,
              null,
              null,
              4,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              48,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "list-group sortable"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              49,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, rm)),
            po(
              51,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              52,
              0,
              null,
              null,
              4,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              53,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "list-group sortable"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              54,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, om)),
            po(
              56,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              57,
              0,
              null,
              null,
              1,
              "p",
              [["class", "my-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["and the actual state is"])),
            (t()(),
            Wi(
              59,
              0,
              null,
              null,
              8,
              "div",
              [["class", "row"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              60,
              0,
              null,
              null,
              3,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              61,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(62, null, ["> ", ""])),
            fo(0, Ma, []),
            (t()(),
            Wi(
              64,
              0,
              null,
              null,
              3,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              65,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(66, null, ["> ", ""])),
            fo(0, Ma, []),
            (t()(),
            Wi(
              68,
              0,
              null,
              null,
              1,
              "h2",
              [["class", "mt-4 mb-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["Super complicated example"])),
            (t()(),
            Wi(70, 0, null, null, 7, "p", [], null, null, null, null, null)),
            (t()(),
            nl(-1, null, [
              " These lists are connected together. You can drag / drop elements across the lists. Pay attention to the ",
            ])),
            (t()(),
            Wi(72, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["sortable"])),
            (t()(), nl(-1, null, [" CSS class (gives a "])),
            (t()(),
            Wi(75, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["min-height"])),
            (t()(),
            nl(-1, null, [
              ") that does not allow list to become invisible when all items are gone\n",
            ])),
            (t()(),
            Wi(
              78,
              0,
              null,
              null,
              31,
              "div",
              [["class", "row"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              79,
              0,
              null,
              null,
              6,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              80,
              0,
              null,
              null,
              1,
              "strong",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["1. This list cannot accept items"])),
            (t()(),
            Wi(
              82,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "mt-2 list-group sortable"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              83,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, im)),
            po(
              85,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              86,
              0,
              null,
              null,
              9,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              87,
              0,
              null,
              null,
              4,
              "strong",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["2. This is a "])),
            (t()(),
            Wi(89, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), nl(-1, null, ["normal"])),
            (t()(), nl(-1, null, [" list"])),
            (t()(),
            Wi(
              92,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "mt-2 list-group sortable"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              93,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, lm)),
            po(
              95,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              96,
              0,
              null,
              null,
              6,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              97,
              0,
              null,
              null,
              1,
              "strong",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["3. This list clones its children"])),
            (t()(),
            Wi(
              99,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "mt-2 list-group sortable"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              100,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, am)),
            po(
              102,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              103,
              0,
              null,
              null,
              6,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              104,
              0,
              null,
              null,
              1,
              "strong",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["4. Only #1 can put here"])),
            (t()(),
            Wi(
              106,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "mt-2 list-group sortable"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              107,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, um)),
            po(
              109,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Wi(
              110,
              0,
              null,
              null,
              1,
              "p",
              [["class", "my-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["and the actual state is"])),
            (t()(),
            Wi(
              112,
              0,
              null,
              null,
              16,
              "div",
              [["class", "row"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              113,
              0,
              null,
              null,
              3,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              114,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(115, null, ["> ", ""])),
            fo(0, Ma, []),
            (t()(),
            Wi(
              117,
              0,
              null,
              null,
              3,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              118,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(119, null, ["> ", ""])),
            fo(0, Ma, []),
            (t()(),
            Wi(
              121,
              0,
              null,
              null,
              3,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              122,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(123, null, ["> ", ""])),
            fo(0, Ma, []),
            (t()(),
            Wi(
              125,
              0,
              null,
              null,
              3,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              126,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(127, null, ["> ", ""])),
            fo(0, Ma, []),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 23, 0, n.normalList1, n.normalOptions),
              t(e, 25, 0, n.normalList1),
              t(e, 28, 0, n.normalList2, n.normalOptions),
              t(e, 30, 0, n.normalList2),
              t(e, 49, 0, n.cloneList1, n.clone1Options),
              t(e, 51, 0, n.cloneList1),
              t(e, 54, 0, n.cloneList2, n.clone2Options),
              t(e, 56, 0, n.cloneList2),
              t(e, 83, 0, n.list1, n.list1Options),
              t(e, 85, 0, n.list1),
              t(e, 93, 0, n.list2, n.list2Options),
              t(e, 95, 0, n.list2),
              t(e, 100, 0, n.list3, n.list3Options),
              t(e, 102, 0, n.list3),
              t(e, 107, 0, n.list4, n.list4Options),
              t(e, 109, 0, n.list4);
          },
          function (t, e) {
            var n = e.component;
            t(e, 36, 0, Jn(e, 36, 0, Jr(e, 37).transform(n.normalList1))),
              t(e, 40, 0, Jn(e, 40, 0, Jr(e, 41).transform(n.normalList2))),
              t(e, 62, 0, Jn(e, 62, 0, Jr(e, 63).transform(n.cloneList1))),
              t(e, 66, 0, Jn(e, 66, 0, Jr(e, 67).transform(n.cloneList2))),
              t(e, 115, 0, Jn(e, 115, 0, Jr(e, 116).transform(n.list1))),
              t(e, 119, 0, Jn(e, 119, 0, Jr(e, 120).transform(n.list2))),
              t(e, 123, 0, Jn(e, 123, 0, Jr(e, 124).transform(n.list3))),
              t(e, 127, 0, Jn(e, 127, 0, Jr(e, 128).transform(n.list4)));
          }
        );
      }
      function cm(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "app-multiple-lists",
              [],
              null,
              null,
              null,
              sm,
              tm
            )),
            po(1, 49152, null, 0, Jv, [], null, null),
          ],
          null,
          null
        );
      }
      var hm = zr("app-multiple-lists", Jv, cm, {}, {}, []),
        pm = (function () {
          return function () {
            this.options = { group: "test" };
          };
        })(),
        fm = nr({ encapsulation: 0, styles: [[""]], data: {} });
      function dm(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "li",
              [["class", "list-group-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function gm(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "list-group sortable"]],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              1,
              737280,
              null,
              0,
              Hg,
              [[2, Vg], Ug, cn, ai, gn],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), Bi(16777216, null, null, 1, null, dm)),
            po(
              3,
              278528,
              null,
              0,
              Ia,
              [Vn, Mn, kn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 1, 0, n.list, n.options), t(e, 3, 0, n.list);
          },
          null
        );
      }
      var vm = (function () {
          return function () {
            (this.list1 = ["1", "2", "3", "4", "5"]),
              (this.list2 = ["6", "7", "8", "9", "10"]);
          };
        })(),
        mm = nr({ encapsulation: 0, styles: [[""]], data: {} });
      function ym(t) {
        return il(
          0,
          [
            (t()(),
            Wi(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (t()(),
            nl(-1, null, [
              "Connecting multiple sortable lists in different components",
            ])),
            (t()(),
            Wi(
              2,
              0,
              null,
              null,
              6,
              "div",
              [["class", "row"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              3,
              0,
              null,
              null,
              2,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              4,
              0,
              null,
              null,
              1,
              "app-child-component",
              [],
              null,
              null,
              null,
              gm,
              fm
            )),
            po(5, 49152, null, 0, pm, [], { list: [0, "list"] }, null),
            (t()(),
            Wi(
              6,
              0,
              null,
              null,
              2,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              7,
              0,
              null,
              null,
              1,
              "app-child-component",
              [],
              null,
              null,
              null,
              gm,
              fm
            )),
            po(8, 49152, null, 0, pm, [], { list: [0, "list"] }, null),
            (t()(),
            Wi(
              9,
              0,
              null,
              null,
              1,
              "p",
              [["class", "my-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["and the actual state is"])),
            (t()(),
            Wi(
              11,
              0,
              null,
              null,
              8,
              "div",
              [["class", "row"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              12,
              0,
              null,
              null,
              3,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              13,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(14, null, ["> ", ""])),
            fo(0, Ma, []),
            (t()(),
            Wi(
              16,
              0,
              null,
              null,
              3,
              "div",
              [["class", "col-sm-3"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              17,
              0,
              null,
              null,
              2,
              "div",
              [["class", "alert alert-dark"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(18, null, ["> ", ""])),
            fo(0, Ma, []),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 5, 0, n.list1), t(e, 8, 0, n.list2);
          },
          function (t, e) {
            var n = e.component;
            t(e, 14, 0, Jn(e, 14, 0, Jr(e, 15).transform(n.list1))),
              t(e, 18, 0, Jn(e, 18, 0, Jr(e, 19).transform(n.list2)));
          }
        );
      }
      function bm(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              1,
              "app-cross-components-multiple-lists",
              [],
              null,
              null,
              null,
              ym,
              mm
            )),
            po(1, 49152, null, 0, vm, [], null, null),
          ],
          null,
          null
        );
      }
      var _m = zr("app-cross-components-multiple-lists", vm, bm, {}, {}, []),
        wm = nr({ encapsulation: 0, styles: [[""]], data: {} });
      function Cm(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              6,
              "div",
              [["class", "dropdown-menu"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              1,
              0,
              null,
              null,
              5,
              "a",
              [
                ["class", "dropdown-item"],
                ["routerLink", "tests/cross-components-multiple-list"],
                ["routerLinkActive", "active"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e &&
                    (r =
                      !1 !==
                        Jr(t, 2).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            po(
              2,
              671744,
              [[10, 4]],
              0,
              cp,
              [up, Xc, va],
              { routerLink: [0, "routerLink"] },
              null
            ),
            po(
              3,
              1720320,
              null,
              2,
              pp,
              [up, cn, gn, [2, sp], [2, cp]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            Yi(603979776, 9, { links: 1 }),
            Yi(603979776, 10, { linksWithHrefs: 1 }),
            (t()(), nl(-1, null, [" Cross-component multiple lists "])),
          ],
          function (t, e) {
            t(e, 2, 0, "tests/cross-components-multiple-list"),
              t(e, 3, 0, "active");
          },
          function (t, e) {
            t(e, 1, 0, Jr(e, 2).target, Jr(e, 2).href);
          }
        );
      }
      function Em(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              16777216,
              null,
              null,
              7,
              "li",
              [
                ["class", "nav-item dropdown"],
                ["dropdown", ""],
              ],
              [
                [2, "dropup", null],
                [2, "open", null],
                [2, "show", null],
              ],
              null,
              null,
              null,
              null
            )),
            go(512, null, Nf, Nf, []),
            po(2, 212992, null, 0, Mf, [cn, gn, Vn, Qp, Rf, Nf], null, null),
            (t()(),
            Wi(
              3,
              0,
              null,
              null,
              2,
              "a",
              [
                ["class", "nav-link dropdown-toggle"],
                ["dropdownToggle", ""],
              ],
              [
                [1, "aria-haspopup", 0],
                [1, "disabled", 0],
                [1, "aria-expanded", 0],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return "click" === e && (r = !1 !== Jr(t, 4).onClick() && r), r;
              },
              null,
              null
            )),
            po(4, 147456, null, 0, Vf, [In, Mf, cn, gn, Nf], null, null),
            (t()(), nl(-1, null, ["Test cases"])),
            (t()(), Bi(16777216, null, null, 1, null, Cm)),
            po(7, 16384, null, 0, jf, [Nf, Vn, Mn], null, null),
            (t()(), Bi(0, null, null, 0)),
          ],
          function (t, e) {
            t(e, 2, 0);
          },
          function (t, e) {
            t(
              e,
              0,
              0,
              Jr(e, 2).dropup,
              Jr(e, 2).isOpen,
              Jr(e, 2).isOpen && Jr(e, 2).isBs4
            ),
              t(e, 3, 0, !0, Jr(e, 4).isDisabled, Jr(e, 4).isOpen);
          }
        );
      }
      function Sm(t) {
        return il(
          0,
          [
            (t()(),
            Wi(
              0,
              0,
              null,
              null,
              43,
              "nav",
              [
                [
                  "class",
                  "navbar navbar-expand-lg navbar-dark bg-dark fixed-top",
                ],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              1,
              0,
              null,
              null,
              4,
              "a",
              [
                ["class", "navbar-brand"],
                ["href", "https://github.com/sortablejs/ngx-sortablejs"],
                ["target", "_blank"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              2,
              0,
              null,
              null,
              0,
              "img",
              [
                ["height", "30"],
                [
                  "src",
                  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==",
                ],
                ["width", "30"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, [" + "])),
            (t()(),
            Wi(
              4,
              0,
              null,
              null,
              0,
              "img",
              [
                ["height", "30"],
                ["src", "assets/sortable-logo.png"],
                ["width", "30"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, [" = ngx-sortablejs "])),
            (t()(),
            Wi(
              6,
              0,
              null,
              null,
              1,
              "button",
              [
                ["class", "navbar-toggler"],
                ["type", "button"],
              ],
              null,
              [[null, "click"]],
              function (t, e, n) {
                var r = !0,
                  o = t.component;
                return (
                  "click" === e &&
                    (r = 0 != (o.navbarCollapsed = !o.navbarCollapsed) && r),
                  r
                );
              },
              null,
              null
            )),
            (t()(),
            Wi(
              7,
              0,
              null,
              null,
              0,
              "span",
              [["class", "navbar-toggler-icon"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              8,
              0,
              null,
              null,
              35,
              "div",
              [["class", "navbar-collapse"]],
              [[2, "collapse", null]],
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              9,
              0,
              null,
              null,
              30,
              "ul",
              [["class", "navbar-nav mr-auto"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              10,
              0,
              null,
              null,
              6,
              "li",
              [
                ["class", "nav-item"],
                ["routerLinkActive", "active"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              11,
              1720320,
              null,
              2,
              pp,
              [up, cn, gn, [2, sp], [2, cp]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            Yi(603979776, 1, { links: 1 }),
            Yi(603979776, 2, { linksWithHrefs: 1 }),
            (t()(),
            Wi(
              14,
              0,
              null,
              null,
              2,
              "a",
              [
                ["class", "nav-link"],
                ["routerLink", "sortable-array"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e &&
                    (r =
                      !1 !==
                        Jr(t, 15).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            po(
              15,
              671744,
              [[2, 4]],
              0,
              cp,
              [up, Xc, va],
              { routerLink: [0, "routerLink"] },
              null
            ),
            (t()(), nl(-1, null, ["Simple sortable"])),
            (t()(),
            Wi(
              17,
              0,
              null,
              null,
              6,
              "li",
              [
                ["class", "nav-item"],
                ["routerLinkActive", "active"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              18,
              1720320,
              null,
              2,
              pp,
              [up, cn, gn, [2, sp], [2, cp]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            Yi(603979776, 3, { links: 1 }),
            Yi(603979776, 4, { linksWithHrefs: 1 }),
            (t()(),
            Wi(
              21,
              0,
              null,
              null,
              2,
              "a",
              [
                ["class", "nav-link"],
                ["routerLink", "sortable-form-array"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e &&
                    (r =
                      !1 !==
                        Jr(t, 22).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            po(
              22,
              671744,
              [[4, 4]],
              0,
              cp,
              [up, Xc, va],
              { routerLink: [0, "routerLink"] },
              null
            ),
            (t()(), nl(-1, null, ["FormArray"])),
            (t()(),
            Wi(
              24,
              0,
              null,
              null,
              6,
              "li",
              [
                ["class", "nav-item"],
                ["routerLinkActive", "active"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              25,
              1720320,
              null,
              2,
              pp,
              [up, cn, gn, [2, sp], [2, cp]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            Yi(603979776, 5, { links: 1 }),
            Yi(603979776, 6, { linksWithHrefs: 1 }),
            (t()(),
            Wi(
              28,
              0,
              null,
              null,
              2,
              "a",
              [
                ["class", "nav-link"],
                ["routerLink", "custom-options"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e &&
                    (r =
                      !1 !==
                        Jr(t, 29).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            po(
              29,
              671744,
              [[6, 4]],
              0,
              cp,
              [up, Xc, va],
              { routerLink: [0, "routerLink"] },
              null
            ),
            (t()(), nl(-1, null, ["Custom options"])),
            (t()(),
            Wi(
              31,
              0,
              null,
              null,
              6,
              "li",
              [
                ["class", "nav-item"],
                ["routerLinkActive", "active"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              32,
              1720320,
              null,
              2,
              pp,
              [up, cn, gn, [2, sp], [2, cp]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            Yi(603979776, 7, { links: 1 }),
            Yi(603979776, 8, { linksWithHrefs: 1 }),
            (t()(),
            Wi(
              35,
              0,
              null,
              null,
              2,
              "a",
              [
                ["class", "nav-link"],
                ["routerLink", "multiple-lists"],
              ],
              [
                [1, "target", 0],
                [8, "href", 4],
              ],
              [[null, "click"]],
              function (t, e, n) {
                var r = !0;
                return (
                  "click" === e &&
                    (r =
                      !1 !==
                        Jr(t, 36).onClick(
                          n.button,
                          n.ctrlKey,
                          n.metaKey,
                          n.shiftKey
                        ) && r),
                  r
                );
              },
              null,
              null
            )),
            po(
              36,
              671744,
              [[8, 4]],
              0,
              cp,
              [up, Xc, va],
              { routerLink: [0, "routerLink"] },
              null
            ),
            (t()(), nl(-1, null, ["Multiple lists"])),
            (t()(), Bi(16777216, null, null, 1, null, Em)),
            po(39, 16384, null, 0, Ra, [Vn, Mn], { ngIf: [0, "ngIf"] }, null),
            (t()(),
            Wi(
              40,
              0,
              null,
              null,
              3,
              "ul",
              [["class", "navbar-nav ml-auto"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              41,
              0,
              null,
              null,
              2,
              "li",
              [["class", "nav-item"]],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              42,
              0,
              null,
              null,
              1,
              "a",
              [
                ["class", "nav-link"],
                ["href", "https://github.com/sortablejs/ngx-sortablejs"],
                ["target", "_blank"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(), nl(-1, null, ["Github"])),
            (t()(),
            Wi(
              44,
              0,
              null,
              null,
              2,
              "div",
              [
                ["class", "container-fluid my-4"],
                ["style", "padding-top: 58px"],
              ],
              null,
              null,
              null,
              null,
              null
            )),
            (t()(),
            Wi(
              45,
              16777216,
              null,
              null,
              1,
              "router-outlet",
              [],
              null,
              null,
              null,
              null,
              null
            )),
            po(
              46,
              212992,
              null,
              0,
              gp,
              [dp, Vn, rn, [8, null], In],
              null,
              null
            ),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 11, 0, "active"),
              t(e, 15, 0, "sortable-array"),
              t(e, 18, 0, "active"),
              t(e, 22, 0, "sortable-form-array"),
              t(e, 25, 0, "active"),
              t(e, 29, 0, "custom-options"),
              t(e, 32, 0, "active"),
              t(e, 36, 0, "multiple-lists"),
              t(e, 39, 0, n.showTestCases),
              t(e, 46, 0);
          },
          function (t, e) {
            t(e, 8, 0, e.component.navbarCollapsed),
              t(e, 14, 0, Jr(e, 15).target, Jr(e, 15).href),
              t(e, 21, 0, Jr(e, 22).target, Jr(e, 22).href),
              t(e, 28, 0, Jr(e, 29).target, Jr(e, 29).href),
              t(e, 35, 0, Jr(e, 36).target, Jr(e, 36).href);
          }
        );
      }
      function xm(t) {
        return il(
          0,
          [
            (t()(),
            Wi(0, 0, null, null, 1, "app-root", [], null, null, null, Sm, wm)),
            po(1, 49152, null, 0, fa, [], null, null),
          ],
          null,
          null
        );
      }
      var Om = zr("app-root", fa, xm, {}, {}, []),
        Tm = (function () {
          return function () {};
        })(),
        km = (function () {
          return function () {};
        })(),
        Am = ca(pa, [fa], function (t) {
          return (function (t) {
            for (var e = {}, n = [], r = !1, o = 0; o < t.length; o++) {
              var i = t[o];
              i.token === Ke && !0 === i.value && (r = !0),
                1073741824 & i.flags && n.push(i.token),
                (i.index = o),
                (e[Xn(i.token)] = i);
            }
            return {
              factory: null,
              providersByKey: e,
              providers: t,
              modules: n,
              isRoot: r,
            };
          })([
            Nr(512, rn, on, [
              [8, [Hp, zf, Xg, Wv, Xv, hm, _m, Om]],
              [3, rn],
              an,
            ]),
            Nr(5120, Vi, Ui, [[3, Vi]]),
            Nr(4608, Ta, ka, [Vi, [2, Oa]]),
            Nr(5120, Io, Hi, [ai]),
            Nr(5120, Lo, Fo, []),
            Nr(5120, kn, Li, []),
            Nr(5120, An, Fi, []),
            Nr(4608, Ns, Ds, [Va]),
            Nr(6144, je, null, [Ns]),
            Nr(4608, Os, ks, []),
            Nr(
              5120,
              Ju,
              function (t, e, n, r, o, i, l, a) {
                return [new Ss(t, e, n), new Rs(r), new As(o, i, l, a)];
              },
              [Va, ai, zo, Va, Va, Os, Wo, [2, Ts]]
            ),
            Nr(4608, ts, ts, [Ju, ai]),
            Nr(135680, rs, rs, [Va]),
            Nr(4608, cs, cs, [ts, rs, Lo]),
            Nr(6144, fn, null, [cs]),
            Nr(6144, ns, null, [rs]),
            Nr(4608, gi, gi, [ai]),
            Nr(4608, Vv, Vv, []),
            Nr(4608, vv, vv, []),
            Nr(5120, Xc, Rp, [up]),
            Nr(4608, bp, bp, []),
            Nr(6144, mp, null, [bp]),
            Nr(135680, _p, _p, [up, No, Xo, Bt, mp]),
            Nr(4608, yp, yp, []),
            Nr(5120, wp, Tp, [up, Ua, Cp]),
            Nr(5120, jp, Mp, [Np]),
            Nr(
              5120,
              Bo,
              function (t) {
                return [t];
              },
              [jp]
            ),
            Nr(4608, If, If, [fn, zo]),
            Nr(4608, Qp, Qp, [rn, ai, Bt, If, Si]),
            Nr(4608, Nf, Nf, []),
            Nr(1073742336, ja, ja, []),
            Nr(1024, ce, zs, []),
            Nr(
              1024,
              bi,
              function () {
                return [xp()];
              },
              []
            ),
            Nr(512, Np, Np, [Bt]),
            Nr(
              1024,
              jo,
              function (t, e) {
                return [
                  ((n = t),
                  $u("probe", Xu),
                  $u(
                    "coreTokens",
                    i(
                      {},
                      Ku,
                      (n || []).reduce(function (t, e) {
                        return (t[e.name] = e.token), t;
                      }, {})
                    )
                  ),
                  function () {
                    return Xu;
                  }),
                  Dp(e),
                ];
                var n;
              },
              [[2, bi], Np]
            ),
            Nr(512, Vo, Vo, [[2, jo]]),
            Nr(131584, Si, Si, [ai, Wo, Bt, ce, rn, Vo]),
            Nr(1073742336, zi, zi, [Si]),
            Nr(1073742336, Bs, Bs, [[3, Bs]]),
            Nr(1024, Ep, Ap, [[3, up]]),
            Nr(512, Ic, Pc, []),
            Nr(512, dp, dp, []),
            Nr(256, Cp, {}, []),
            Nr(1024, va, kp, [da, [2, ma], Cp]),
            Nr(512, ya, ya, [va, da]),
            Nr(512, Xo, Xo, []),
            Nr(512, No, ki, [Xo, [2, Oi]]),
            Nr(
              1024,
              ep,
              function () {
                return [
                  [
                    {
                      path: "",
                      pathMatch: "full",
                      redirectTo: "sortable-array",
                    },
                    { path: "sortable-array", component: Bg },
                    { path: "sortable-form-array", component: Fv },
                    { path: "custom-options", component: Gv },
                    { path: "multiple-lists", component: Jv },
                    {
                      path: "tests/cross-components-multiple-list",
                      component: vm,
                    },
                  ],
                ];
              },
              []
            ),
            Nr(1024, up, Pp, [
              Si,
              Ic,
              dp,
              ya,
              Bt,
              No,
              Xo,
              ep,
              Cp,
              [2, rp],
              [2, Jh],
            ]),
            Nr(1073742336, Op, Op, [
              [2, Ep],
              [2, up],
            ]),
            Nr(1073742336, zg, zg, []),
            Nr(1073742336, Lf, Lf, []),
            Nr(1073742336, jv, jv, []),
            Nr(1073742336, Lv, Lv, []),
            Nr(1073742336, Tm, Tm, []),
            Nr(1073742336, km, km, []),
            Nr(1073742336, pa, pa, []),
            Nr(256, Ke, !0, []),
            Nr(256, Vg, { animation: 200 }, []),
            Nr(256, Rf, { autoClose: !0, insideClick: !1 }, []),
          ]);
        });
      (function () {
        if (pe)
          throw new Error("Cannot enable prod mode after platform setup.");
        he = !1;
      })(),
        Hs()
          .bootstrapModuleFactory(Am)
          .catch(function (t) {
            return console.error(t);
          });
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);
