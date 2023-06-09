(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    zUnb: function (t, e, n) {
      "use strict";
      function r(t) {
        return "function" == typeof t;
      }
      n.r(e);
      let s = !1;
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          s = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        },
      };
      function o(t) {
        setTimeout(() => {
          throw t;
        });
      }
      const l = {
          closed: !0,
          next(t) {},
          error(t) {
            if (i.useDeprecatedSynchronousErrorHandling) throw t;
            o(t);
          },
          complete() {},
        },
        a = Array.isArray || ((t) => t && "number" == typeof t.length);
      function u(t) {
        return null !== t && "object" == typeof t;
      }
      function c(t) {
        return (
          Error.call(this),
          (this.message = t
            ? `${t.length} errors occurred during unsubscription:\n${t
                .map((t, e) => `${e + 1}) ${t.toString()}`)
                .join("\n  ")}`
            : ""),
          (this.name = "UnsubscriptionError"),
          (this.errors = t),
          this
        );
      }
      c.prototype = Object.create(Error.prototype);
      const h = c,
        d = (function () {
          class t {
            constructor(t) {
              (this.closed = !1),
                (this._parent = null),
                (this._parents = null),
                (this._subscriptions = null),
                t && (this._unsubscribe = t);
            }
            unsubscribe() {
              let t,
                e = !1;
              if (this.closed) return;
              let {
                _parent: n,
                _parents: s,
                _unsubscribe: i,
                _subscriptions: o,
              } = this;
              (this.closed = !0),
                (this._parent = null),
                (this._parents = null),
                (this._subscriptions = null);
              let l = -1,
                c = s ? s.length : 0;
              for (; n; ) n.remove(this), (n = (++l < c && s[l]) || null);
              if (r(i))
                try {
                  i.call(this);
                } catch (d) {
                  (e = !0), (t = d instanceof h ? p(d.errors) : [d]);
                }
              if (a(o))
                for (l = -1, c = o.length; ++l < c; ) {
                  const n = o[l];
                  if (u(n))
                    try {
                      n.unsubscribe();
                    } catch (d) {
                      (e = !0),
                        (t = t || []),
                        d instanceof h
                          ? (t = t.concat(p(d.errors)))
                          : t.push(d);
                    }
                }
              if (e) throw new h(t);
            }
            add(e) {
              let n = e;
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
                    const e = n;
                    (n = new t())._subscriptions = [e];
                  }
                  break;
                default:
                  if (!e) return t.EMPTY;
                  throw new Error(
                    "unrecognized teardown " + e + " added to Subscription."
                  );
              }
              if (n._addParent(this)) {
                const t = this._subscriptions;
                t ? t.push(n) : (this._subscriptions = [n]);
              }
              return n;
            }
            remove(t) {
              const e = this._subscriptions;
              if (e) {
                const n = e.indexOf(t);
                -1 !== n && e.splice(n, 1);
              }
            }
            _addParent(t) {
              let { _parent: e, _parents: n } = this;
              return (
                e !== t &&
                (e
                  ? n
                    ? -1 === n.indexOf(t) && (n.push(t), !0)
                    : ((this._parents = [t]), !0)
                  : ((this._parent = t), !0))
              );
            }
          }
          var e;
          return (t.EMPTY = (((e = new t()).closed = !0), e)), t;
        })();
      function p(t) {
        return t.reduce((t, e) => t.concat(e instanceof h ? e.errors : e), []);
      }
      const f =
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random();
      class g extends d {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = l;
              break;
            case 1:
              if (!t) {
                this.destination = l;
                break;
              }
              if ("object" == typeof t) {
                t instanceof g
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new m(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new m(this, t, e, n));
          }
        }
        [f]() {
          return this;
        }
        static create(t, e, n) {
          const r = new g(t, e, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parent: t, _parents: e } = this;
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
        }
      }
      class m extends g {
        constructor(t, e, n, s) {
          let i;
          super(), (this._parentSubscriber = t);
          let o = this;
          r(e)
            ? (i = e)
            : e &&
              ((i = e.next),
              (n = e.error),
              (s = e.complete),
              e !== l &&
                (r((o = Object.create(e)).unsubscribe) &&
                  this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = s);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              o(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!i.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (r) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (o(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const v =
        ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function _() {}
      function b(...t) {
        return w(t);
      }
      function w(t) {
        return t
          ? 1 === t.length
            ? t[0]
            : function (e) {
                return t.reduce((t, e) => e(t), e);
              }
          : _;
      }
      const y = (function () {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: r } = this,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof g) return t;
                  if (t[f]) return t[f]();
                }
                return t || e || n ? new g(t, e, n) : new g(l);
              })(t, e, n);
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source ||
                    (i.useDeprecatedSynchronousErrorHandling &&
                      !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              i.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t;
                    if (e || r) return !1;
                    t = n && n instanceof g ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = C(e))((e, n) => {
              let r;
              r = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (s) {
                    n(s), r && r.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [v]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length ? this : w(t)(this);
          }
          toPromise(t) {
            return new (t = C(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function C(t) {
        if ((t || (t = i.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      function E() {
        return (
          Error.call(this),
          (this.message = "object unsubscribed"),
          (this.name = "ObjectUnsubscribedError"),
          this
        );
      }
      E.prototype = Object.create(Error.prototype);
      const S = E;
      class x extends d {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class T extends g {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      const k = (function () {
        class t extends y {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [f]() {
            return new T(this);
          }
          lift(t) {
            const e = new A(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new S();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                r = e.slice();
              for (let s = 0; s < n; s++) r[s].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new S();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              r = e.slice();
            for (let s = 0; s < n; s++) r[s].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new S();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new S();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new S();
            return this.hasError
              ? (t.error(this.thrownError), d.EMPTY)
              : this.isStopped
              ? (t.complete(), d.EMPTY)
              : (this.observers.push(t), new x(this, t));
          }
          asObservable() {
            const t = new y();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new A(t, e)), t;
      })();
      class A extends k {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : d.EMPTY;
        }
      }
      function O(t) {
        return t && "function" == typeof t.schedule;
      }
      class I extends g {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      const R = (t) => (e) => {
          for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
          e.closed || e.complete();
        },
        N = (t) => (e) => (
          t
            .then(
              (t) => {
                e.closed || (e.next(t), e.complete());
              },
              (t) => e.error(t)
            )
            .then(null, o),
          e
        );
      function D() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const M = D(),
        P = (t) => (e) => {
          const n = t[M]();
          for (;;) {
            const t = n.next();
            if (t.done) {
              e.complete();
              break;
            }
            if ((e.next(t.value), e.closed)) break;
          }
          return (
            "function" == typeof n.return &&
              e.add(() => {
                n.return && n.return();
              }),
            e
          );
        },
        V = (t) => (e) => {
          const n = t[v]();
          if ("function" != typeof n.subscribe)
            throw new TypeError(
              "Provided object does not correctly implement Symbol.observable"
            );
          return n.subscribe(e);
        },
        j = (t) => t && "number" == typeof t.length && "function" != typeof t;
      function L(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const F = (t) => {
        if (t instanceof y)
          return (e) =>
            t._isScalar ? (e.next(t.value), void e.complete()) : t.subscribe(e);
        if (t && "function" == typeof t[v]) return V(t);
        if (j(t)) return R(t);
        if (L(t)) return N(t);
        if (t && "function" == typeof t[M]) return P(t);
        {
          const e = u(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected.` +
              " You can provide an Observable, Promise, Array, or Iterable."
          );
        }
      };
      function U(t, e, n, r, s = new I(t, n, r)) {
        if (!s.closed) return F(e)(s);
      }
      class $ extends g {
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      function H(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new z(t, e));
        };
      }
      class z {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new B(t, this.project, this.thisArg));
        }
      }
      class B extends g {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      function W(t, e) {
        return new y(
          e
            ? (n) => {
                const r = new d();
                let s = 0;
                return (
                  r.add(
                    e.schedule(function () {
                      s !== t.length
                        ? (n.next(t[s++]), n.closed || r.add(this.schedule()))
                        : n.complete();
                    })
                  ),
                  r
                );
              }
            : R(t)
        );
      }
      function G(t, e) {
        if (!e) return t instanceof y ? t : new y(F(t));
        if (null != t) {
          if (
            (function (t) {
              return t && "function" == typeof t[v];
            })(t)
          )
            return (function (t, e) {
              return new y(
                e
                  ? (n) => {
                      const r = new d();
                      return (
                        r.add(
                          e.schedule(() => {
                            const s = t[v]();
                            r.add(
                              s.subscribe({
                                next(t) {
                                  r.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  r.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    }
                  : V(t)
              );
            })(t, e);
          if (L(t))
            return (function (t, e) {
              return new y(
                e
                  ? (n) => {
                      const r = new d();
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      r.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                r.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    }
                  : N(t)
              );
            })(t, e);
          if (j(t)) return W(t, e);
          if (
            (function (t) {
              return t && "function" == typeof t[M];
            })(t) ||
            "string" == typeof t
          )
            return (function (t, e) {
              if (!t) throw new Error("Iterable cannot be null");
              return new y(
                e
                  ? (n) => {
                      const r = new d();
                      let s;
                      return (
                        r.add(() => {
                          s && "function" == typeof s.return && s.return();
                        }),
                        r.add(
                          e.schedule(() => {
                            (s = t[M]()),
                              r.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const i = s.next();
                                    (t = i.value), (e = i.done);
                                  } catch (r) {
                                    return void n.error(r);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    }
                  : P(t)
              );
            })(t, e);
        }
        throw new TypeError(
          ((null !== t && typeof t) || t) + " is not observable"
        );
      }
      function q(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (r) =>
              r.pipe(
                q((n, r) => G(t(n, r)).pipe(H((t, s) => e(n, t, r, s))), n)
              )
          : ("number" == typeof e && (n = e), (e) => e.lift(new Z(t, n)));
      }
      class Z {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new Q(t, this.project, this.concurrent));
        }
      }
      class Q extends $ {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const r = new I(this, void 0, void 0);
          this.destination.add(r), U(this, t, e, n, r);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyComplete(t) {
          const e = this.buffer;
          this.remove(t),
            this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function Y(t) {
        return t;
      }
      function K(t = Number.POSITIVE_INFINITY) {
        return q(Y, t);
      }
      function X(...t) {
        let e = Number.POSITIVE_INFINITY,
          n = null,
          r = t[t.length - 1];
        return (
          O(r)
            ? ((n = t.pop()),
              t.length > 1 &&
                "number" == typeof t[t.length - 1] &&
                (e = t.pop()))
            : "number" == typeof r && (e = t.pop()),
          null === n && 1 === t.length && t[0] instanceof y
            ? t[0]
            : K(e)(W(t, n))
        );
      }
      function J() {
        return function (t) {
          return t.lift(new tt(t));
        };
      }
      class tt {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const r = new et(t, n),
            s = e.subscribe(r);
          return r.closed || (r.connection = n.connect()), s;
        }
      }
      class et extends g {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            r = t._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      const nt = class extends y {
          constructor(t, e) {
            super(),
              (this.source = t),
              (this.subjectFactory = e),
              (this._refCount = 0),
              (this._isComplete = !1);
          }
          _subscribe(t) {
            return this.getSubject().subscribe(t);
          }
          getSubject() {
            const t = this._subject;
            return (
              (t && !t.isStopped) || (this._subject = this.subjectFactory()),
              this._subject
            );
          }
          connect() {
            let t = this._connection;
            return (
              t ||
                ((this._isComplete = !1),
                (t = this._connection = new d()).add(
                  this.source.subscribe(new st(this.getSubject(), this))
                ),
                t.closed
                  ? ((this._connection = null), (t = d.EMPTY))
                  : (this._connection = t)),
              t
            );
          }
          refCount() {
            return J()(this);
          }
        }.prototype,
        rt = {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: nt._subscribe },
          _isComplete: { value: nt._isComplete, writable: !0 },
          getSubject: { value: nt.getSubject },
          connect: { value: nt.connect },
          refCount: { value: nt.refCount },
        };
      class st extends T {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function it() {
        return new k();
      }
      const ot = "__parameters__";
      function lt(t, e, n) {
        const r = (function (t) {
          return function (...e) {
            if (t) {
              const n = t(...e);
              for (const t in n) this[t] = n[t];
            }
          };
        })(e);
        function s(...t) {
          if (this instanceof s) return r.apply(this, t), this;
          const e = new s(...t);
          return (n.annotation = e), n;
          function n(t, n, r) {
            const s = t.hasOwnProperty(ot)
              ? t[ot]
              : Object.defineProperty(t, ot, { value: [] })[ot];
            for (; s.length <= r; ) s.push(null);
            return (s[r] = s[r] || []).push(e), t;
          }
        }
        return (
          n && (s.prototype = Object.create(n.prototype)),
          (s.prototype.ngMetadataName = t),
          (s.annotationCls = s),
          s
        );
      }
      const at = lt("Inject", (t) => ({ token: t })),
        ut = lt("Optional"),
        ct = lt("Self"),
        ht = lt("SkipSelf");
      var dt = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      function pt(t) {
        for (let e in t) if (t[e] === pt) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function ft(t) {
        return {
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function gt(t) {
        return t && t.hasOwnProperty(mt) ? t[mt] : null;
      }
      const mt = pt({ ngInjectableDef: pt });
      function vt(t) {
        if ("string" == typeof t) return t;
        if (t instanceof Array) return "[" + t.map(vt).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      const _t = pt({ __forward_ref__: pt });
      function bt(t) {
        return (
          (t.__forward_ref__ = bt),
          (t.toString = function () {
            return vt(this());
          }),
          t
        );
      }
      function wt(t) {
        const e = t;
        return "function" == typeof e &&
          e.hasOwnProperty(_t) &&
          e.__forward_ref__ === bt
          ? e()
          : t;
      }
      function yt() {
        const t = "undefined" != typeof globalThis && globalThis,
          e = "undefined" != typeof window && window,
          n =
            "undefined" != typeof self &&
            "undefined" != typeof WorkerGlobalScope &&
            self instanceof WorkerGlobalScope &&
            self,
          r = "undefined" != typeof global && global;
        return t || r || e || n;
      }
      const Ct = yt();
      let Et,
        St = void 0;
      function xt(t) {
        const e = St;
        return (St = t), e;
      }
      function Tt(t, e = dt.Default) {
        return (
          Et ||
          function (t, e = dt.Default) {
            if (void 0 === St)
              throw new Error(
                "inject() must be called from an injection context"
              );
            return null === St
              ? (function (t, e, n) {
                  const r = gt(t);
                  if (r && "root" == r.providedIn)
                    return void 0 === r.value
                      ? (r.value = r.factory())
                      : r.value;
                  if (n & dt.Optional) return null;
                  throw new Error(`Injector: NOT_FOUND [${vt(t)}]`);
                })(t, 0, e)
              : St.get(t, e & dt.Optional ? null : void 0, e);
          }
        )(t, e);
      }
      class kt {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ngInjectableDef = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ngInjectableDef = ft({
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const At = "__source",
        Ot = new Object(),
        It = new kt("INJECTOR", -1);
      class Rt {
        get(t, e = Ot) {
          if (e === Ot) {
            const e = new Error(`NullInjectorError: No provider for ${vt(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      const Nt = (function () {
          class t {
            static create(t, e) {
              return Array.isArray(t)
                ? new Ht(t, e)
                : new Ht(t.providers, t.parent, t.name || null);
            }
          }
          return (
            (t.THROW_IF_NOT_FOUND = Ot),
            (t.NULL = new Rt()),
            (t.ngInjectableDef = ft({
              providedIn: "any",
              factory: () => Tt(It),
            })),
            (t.__NG_ELEMENT_ID__ = -1),
            t
          );
        })(),
        Dt = function (t) {
          return t;
        },
        Mt = [],
        Pt = Dt,
        Vt = function () {
          return Array.prototype.slice.call(arguments);
        },
        jt = pt({ provide: String, useValue: pt }),
        Lt = "ngTokenPath",
        Ft = "ngTempTokenPath",
        Ut = /\n/gm,
        $t = "\u0275";
      class Ht {
        constructor(t, e = Nt.NULL, n = null) {
          (this.parent = e), (this.source = n);
          const r = (this._records = new Map());
          r.set(Nt, { token: Nt, fn: Dt, deps: Mt, value: this, useNew: !1 }),
            r.set(It, { token: It, fn: Dt, deps: Mt, value: this, useNew: !1 }),
            (function t(e, n) {
              if (n)
                if ((n = wt(n)) instanceof Array)
                  for (let r = 0; r < n.length; r++) t(e, n[r]);
                else {
                  if ("function" == typeof n)
                    throw Wt("Function/Class not supported", n);
                  if (!n || "object" != typeof n || !n.provide)
                    throw Wt("Unexpected provider", n);
                  {
                    let t = wt(n.provide);
                    const r = (function (t) {
                      const e = (function (t) {
                        let e = Mt;
                        const n = t.deps;
                        if (n && n.length) {
                          e = [];
                          for (let t = 0; t < n.length; t++) {
                            let r = 6,
                              s = wt(n[t]);
                            if (s instanceof Array)
                              for (let t = 0, e = s; t < e.length; t++) {
                                const n = e[t];
                                n instanceof ut || n == ut
                                  ? (r |= 1)
                                  : n instanceof ht || n == ht
                                  ? (r &= -3)
                                  : n instanceof ct || n == ct
                                  ? (r &= -5)
                                  : (s = n instanceof at ? n.token : wt(n));
                              }
                            e.push({ token: s, options: r });
                          }
                        } else if (t.useExisting)
                          e = [{ token: wt(t.useExisting), options: 6 }];
                        else if (!(n || jt in t))
                          throw Wt("'deps' required", t);
                        return e;
                      })(t);
                      let n = Dt,
                        r = Mt,
                        s = !1,
                        i = wt(t.provide);
                      if (jt in t) r = t.useValue;
                      else if (t.useFactory) n = t.useFactory;
                      else if (t.useExisting);
                      else if (t.useClass) (s = !0), (n = wt(t.useClass));
                      else {
                        if ("function" != typeof i)
                          throw Wt(
                            "StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable",
                            t
                          );
                        (s = !0), (n = i);
                      }
                      return { deps: e, fn: n, useNew: s, value: r };
                    })(n);
                    if (!0 === n.multi) {
                      let r = e.get(t);
                      if (r) {
                        if (r.fn !== Vt) throw zt(t);
                      } else
                        e.set(
                          t,
                          (r = {
                            token: n.provide,
                            deps: [],
                            useNew: !1,
                            fn: Vt,
                            value: Mt,
                          })
                        );
                      r.deps.push({ token: (t = n), options: 6 });
                    }
                    const s = e.get(t);
                    if (s && s.fn == Vt) throw zt(t);
                    e.set(t, r);
                  }
                }
            })(r, t);
        }
        get(t, e, n = dt.Default) {
          const r = this._records.get(t);
          try {
            return (function t(e, n, r, s, i, o) {
              try {
                return (function (e, n, r, s, i, o) {
                  let l;
                  if (!n || o & dt.SkipSelf)
                    o & dt.Self || (l = s.get(e, i, dt.Default));
                  else {
                    if ((l = n.value) == Pt)
                      throw Error($t + "Circular dependency");
                    if (l === Mt) {
                      n.value = Pt;
                      let e = void 0,
                        i = n.useNew,
                        o = n.fn,
                        a = n.deps,
                        u = Mt;
                      if (a.length) {
                        u = [];
                        for (let e = 0; e < a.length; e++) {
                          const n = a[e],
                            i = n.options,
                            o = 2 & i ? r.get(n.token) : void 0;
                          u.push(
                            t(
                              n.token,
                              o,
                              r,
                              o || 4 & i ? s : Nt.NULL,
                              1 & i ? null : Nt.THROW_IF_NOT_FOUND,
                              dt.Default
                            )
                          );
                        }
                      }
                      n.value = l = i ? new o(...u) : o.apply(e, u);
                    }
                  }
                  return l;
                })(e, n, r, s, i, o);
              } catch (l) {
                throw (
                  (l instanceof Error || (l = new Error(l)),
                  (l[Ft] = l[Ft] || []).unshift(e),
                  n && n.value == Pt && (n.value = Mt),
                  l)
                );
              }
            })(t, r, this._records, this.parent, e, n);
          } catch (s) {
            return (function (t, e, n, r) {
              const s = t[Ft];
              throw (
                (e[At] && s.unshift(e[At]),
                (t.message = Bt("\n" + t.message, s, "StaticInjectorError", r)),
                (t[Lt] = s),
                (t[Ft] = null),
                t)
              );
            })(s, t, 0, this.source);
          }
        }
        toString() {
          const t = [];
          return (
            this._records.forEach((e, n) => t.push(vt(n))),
            `StaticInjector[${t.join(", ")}]`
          );
        }
      }
      function zt(t) {
        return Wt("Cannot mix multi providers and regular providers", t);
      }
      function Bt(t, e, n, r = null) {
        t = t && "\n" === t.charAt(0) && t.charAt(1) == $t ? t.substr(2) : t;
        let s = vt(e);
        if (e instanceof Array) s = e.map(vt).join(" -> ");
        else if ("object" == typeof e) {
          let t = [];
          for (let n in e)
            if (e.hasOwnProperty(n)) {
              let r = e[n];
              t.push(
                n + ":" + ("string" == typeof r ? JSON.stringify(r) : vt(r))
              );
            }
          s = `{${t.join(", ")}}`;
        }
        return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${t.replace(Ut, "\n  ")}`;
      }
      function Wt(t, e) {
        return new Error(Bt(t, e, "StaticInjectorError"));
      }
      const Gt = "ngDebugContext",
        qt = "ngOriginalError",
        Zt = "ngErrorLogger",
        Qt = new kt("AnalyzeForEntryComponents"),
        Yt = (function () {
          var t = { Emulated: 0, Native: 1, None: 2, ShadowDom: 3 };
          return (
            (t[t.Emulated] = "Emulated"),
            (t[t.Native] = "Native"),
            (t[t.None] = "None"),
            (t[t.ShadowDom] = "ShadowDom"),
            t
          );
        })(),
        Kt = (() =>
          (
            ("undefined" != typeof requestAnimationFrame &&
              requestAnimationFrame) ||
            setTimeout
          ).bind(Ct))();
      function Xt(t) {
        return t[Gt];
      }
      function Jt(t) {
        return t[qt];
      }
      function te(t, ...e) {
        t.error(...e);
      }
      class ee {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function (t) {
              return t[Zt] || te;
            })(t);
          r(this._console, "ERROR", t),
            e && r(this._console, "ORIGINAL ERROR", e),
            n && r(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (Xt(t) ? Xt(t) : this._findContext(Jt(t))) : null;
        }
        _findOriginalError(t) {
          let e = Jt(t);
          for (; e && Jt(e); ) e = Jt(e);
          return e;
        }
      }
      let ne = !0,
        re = !1;
      function se() {
        return (re = !0), ne;
      }
      class ie {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert"
              )),
            (this.inertBodyElement = this.inertDocument.body),
            null == this.inertBodyElement)
          ) {
            const t = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(t),
              (this.inertBodyElement =
                this.inertDocument.createElement("body")),
              t.appendChild(this.inertBodyElement);
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
        getInertBodyElement_XHR(t) {
          t = "<body><remove></remove>" + t + "</body>";
          try {
            t = encodeURI(t);
          } catch (r) {
            return null;
          }
          const e = new XMLHttpRequest();
          (e.responseType = "document"),
            e.open("GET", "data:text/html;charset=utf-8," + t, !1),
            e.send(void 0);
          const n = e.response.body;
          return n.removeChild(n.firstChild), n;
        }
        getInertBodyElement_DOMParser(t) {
          t = "<body><remove></remove>" + t + "</body>";
          try {
            const n = new window.DOMParser().parseFromString(
              t,
              "text/html"
            ).body;
            return n.removeChild(n.firstChild), n;
          } catch (e) {
            return null;
          }
        }
        getInertBodyElement_InertDocument(t) {
          const e = this.inertDocument.createElement("template");
          return "content" in e
            ? ((e.innerHTML = t), e)
            : ((this.inertBodyElement.innerHTML = t),
              this.defaultDoc.documentMode &&
                this.stripCustomNsAttrs(this.inertBodyElement),
              this.inertBodyElement);
        }
        stripCustomNsAttrs(t) {
          const e = t.attributes;
          for (let r = e.length - 1; 0 < r; r--) {
            const n = e.item(r).name;
            ("xmlns:ns1" !== n && 0 !== n.indexOf("ns1:")) ||
              t.removeAttribute(n);
          }
          let n = t.firstChild;
          for (; n; )
            n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
              (n = n.nextSibling);
        }
      }
      const oe =
          /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,
        le =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function ae(t) {
        return (t = String(t)).match(oe) || t.match(le)
          ? t
          : (se() &&
              console.warn(
                `WARNING: sanitizing unsafe URL value ${t} (see http://g.co/ng/security#xss)`
              ),
            "unsafe:" + t);
      }
      function ue(t) {
        const e = {};
        for (const n of t.split(",")) e[n] = !0;
        return e;
      }
      function ce(...t) {
        const e = {};
        for (const n of t)
          for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
        return e;
      }
      const he = ue("area,br,col,hr,img,wbr"),
        de = ue("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        pe = ue("rp,rt"),
        fe = ce(pe, de),
        ge = ce(
          he,
          ce(
            de,
            ue(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          ce(
            pe,
            ue(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          fe
        ),
        me = ue("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        ve = ue("srcset"),
        _e = ce(
          me,
          ve,
          ue(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          ue(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        be = ue("script,style,template");
      class we {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let e = t.firstChild,
            n = !0;
          for (; e; )
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
                let t = this.checkClobberedElement(e, e.nextSibling);
                if (t) {
                  e = t;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const e = t.nodeName.toLowerCase();
          if (!ge.hasOwnProperty(e))
            return (this.sanitizedSomething = !0), !be.hasOwnProperty(e);
          this.buf.push("<"), this.buf.push(e);
          const n = t.attributes;
          for (let s = 0; s < n.length; s++) {
            const t = n.item(s),
              e = t.name,
              i = e.toLowerCase();
            if (!_e.hasOwnProperty(i)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let o = t.value;
            me[i] && (o = ae(o)),
              ve[i] &&
                ((r = o),
                (o = (r = String(r))
                  .split(",")
                  .map((t) => ae(t.trim()))
                  .join(", "))),
              this.buf.push(" ", e, '="', Ee(o), '"');
          }
          var r;
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const e = t.nodeName.toLowerCase();
          ge.hasOwnProperty(e) &&
            !he.hasOwnProperty(e) &&
            (this.buf.push("</"), this.buf.push(e), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(Ee(t));
        }
        checkClobberedElement(t, e) {
          if (
            e &&
            (t.compareDocumentPosition(e) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return e;
        }
      }
      const ye = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        Ce = /([^\#-~ |!])/g;
      function Ee(t) {
        return t
          .replace(/&/g, "&amp;")
          .replace(ye, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(Ce, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let Se;
      function xe(t) {
        return "content" in t &&
          (function (t) {
            return (
              t.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === t.nodeName
            );
          })(t)
          ? t.content
          : null;
      }
      const Te = (function () {
        var t = {
          NONE: 0,
          HTML: 1,
          STYLE: 2,
          SCRIPT: 3,
          URL: 4,
          RESOURCE_URL: 5,
        };
        return (
          (t[t.NONE] = "NONE"),
          (t[t.HTML] = "HTML"),
          (t[t.STYLE] = "STYLE"),
          (t[t.SCRIPT] = "SCRIPT"),
          (t[t.URL] = "URL"),
          (t[t.RESOURCE_URL] = "RESOURCE_URL"),
          t
        );
      })();
      class ke {}
      const Ae = new RegExp(
          "^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$",
          "g"
        ),
        Oe = /^url\(([^)]+)\)$/,
        Ie = /([A-Z])/g;
      function Re(t) {
        try {
          return null != t ? t.toString().slice(0, 30) : t;
        } catch (e) {
          return "[ERROR] Exception while trying to serialize the value";
        }
      }
      function Ne(t) {
        return !!t && "function" == typeof t.then;
      }
      function De(t) {
        return !!t && "function" == typeof t.subscribe;
      }
      let Me = null;
      function Pe() {
        if (!Me) {
          const t = Ct.Symbol;
          if (t && t.iterator) Me = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (Me = n);
            }
          }
        }
        return Me;
      }
      function Ve(t, e) {
        return (
          t === e ||
          ("number" == typeof t && "number" == typeof e && isNaN(t) && isNaN(e))
        );
      }
      function je(t, e) {
        const n = Fe(t),
          r = Fe(e);
        if (n && r)
          return (function (t, e, n) {
            const r = t[Pe()](),
              s = e[Pe()]();
            for (;;) {
              const t = r.next(),
                e = s.next();
              if (t.done && e.done) return !0;
              if (t.done || e.done) return !1;
              if (!n(t.value, e.value)) return !1;
            }
          })(t, e, je);
        {
          const s = t && ("object" == typeof t || "function" == typeof t),
            i = e && ("object" == typeof e || "function" == typeof e);
          return !(n || !s || r || !i) || Ve(t, e);
        }
      }
      class Le {
        constructor(t) {
          this.wrapped = t;
        }
        static wrap(t) {
          return new Le(t);
        }
        static unwrap(t) {
          return Le.isWrapped(t) ? t.wrapped : t;
        }
        static isWrapped(t) {
          return t instanceof Le;
        }
      }
      function Fe(t) {
        return (
          !!Ue(t) && (Array.isArray(t) || (!(t instanceof Map) && Pe() in t))
        );
      }
      function Ue(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      class $e {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      const He = new kt(
        "The presence of this token marks an injector as being the root injector."
      );
      class ze {}
      class Be {}
      function We(t) {
        const e = Error(
          `No component factory found for ${vt(
            t
          )}. Did you add it to @NgModule.entryComponents?`
        );
        return (e[Ge] = t), e;
      }
      const Ge = "ngComponent";
      class qe {
        resolveComponentFactory(t) {
          throw We(t);
        }
      }
      const Ze = (function () {
        class t {}
        return (t.NULL = new qe()), t;
      })();
      class Qe {
        constructor(t, e, n) {
          (this._parent = e),
            (this._ngModule = n),
            (this._factories = new Map());
          for (let r = 0; r < t.length; r++) {
            const e = t[r];
            this._factories.set(e.componentType, e);
          }
        }
        resolveComponentFactory(t) {
          let e = this._factories.get(t);
          if (
            (!e &&
              this._parent &&
              (e = this._parent.resolveComponentFactory(t)),
            !e)
          )
            throw We(t);
          return new Ye(e, this._ngModule);
        }
      }
      class Ye extends Be {
        constructor(t, e) {
          super(),
            (this.factory = t),
            (this.ngModule = e),
            (this.selector = t.selector),
            (this.componentType = t.componentType),
            (this.ngContentSelectors = t.ngContentSelectors),
            (this.inputs = t.inputs),
            (this.outputs = t.outputs);
        }
        create(t, e, n, r) {
          return this.factory.create(t, e, n, r || this.ngModule);
        }
      }
      class Ke {}
      class Xe {}
      function Je(...t) {}
      const tn = (function () {
          class t {
            constructor(t) {
              this.nativeElement = t;
            }
          }
          return (t.__NG_ELEMENT_ID__ = () => en(t)), t;
        })(),
        en = Je;
      class nn {}
      class rn {}
      const sn = (function () {
          var t = { Important: 1, DashCase: 2 };
          return (
            (t[t.Important] = "Important"), (t[t.DashCase] = "DashCase"), t
          );
        })(),
        on = (function () {
          class t {}
          return (t.__NG_ELEMENT_ID__ = () => ln()), t;
        })(),
        ln = Je;
      class an {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const un = new an("8.0.0");
      class cn {
        constructor() {}
        supports(t) {
          return Fe(t);
        }
        create(t) {
          return new dn(t);
        }
      }
      const hn = (t, e) => e;
      class dn {
        constructor(t) {
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
            (this._trackByFn = t || hn);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null;
          for (; e || n; ) {
            const i = !n || (e && e.currentIndex < mn(n, r, s)) ? e : n,
              o = mn(i, r, s),
              l = i.currentIndex;
            if (i === n) r--, (n = n._nextRemoved);
            else if (((e = e._next), null == i.previousIndex)) r++;
            else {
              s || (s = []);
              const t = o - r,
                e = l - r;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    i = r + n;
                  e <= i && i < t && (s[n] = r + 1);
                }
                s[i.previousIndex] = e - t;
              }
            }
            o !== l && t(i, o, l);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !Fe(t)))
            throw new Error(
              `Error trying to diff '${vt(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            r,
            s = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (r = this._trackByFn(e, (n = t[e]))),
                null !== s && Ve(s.trackById, r)
                  ? (i && (s = this._verifyReinsertion(s, n, r, e)),
                    Ve(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, e)), (i = !0)),
                (s = s._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[Pe()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(t, (t) => {
                (r = this._trackByFn(e, t)),
                  null !== s && Ve(s.trackById, r)
                    ? (i && (s = this._verifyReinsertion(s, t, r, e)),
                      Ve(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, r, e)), (i = !0)),
                  (s = s._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(s), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t, e;
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
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, r) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, r))
              ? (Ve(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, s, r))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Ve(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, s, r))
              : (t = this._addAfter(new pn(e, n), s, r)),
            t
          );
        }
        _verifyReinsertion(t, e, n, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
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
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new gn()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return t.previousIndex === e
            ? t
            : ((this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
              t);
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new gn()),
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
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class pn {
        constructor(t, e) {
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
        }
      }
      class fn {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === e || e <= n.currentIndex) && Ve(n.trackById, t))
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class gn {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new fn()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function mn(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + e + s;
      }
      class vn {
        constructor() {}
        supports(t) {
          return t instanceof Map || Ue(t);
        }
        create() {
          return new _n();
        }
      }
      class _n {
        constructor() {
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
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Ue(t)))
              throw new Error(
                `Error trying to diff '${vt(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
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
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev,
              s = n._next;
            return (
              r && (r._next = s),
              s && (s._prev = r),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new bn(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
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
        }
        _maybeAddToChanges(t, e) {
          Ve(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class bn {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      const wn = (function () {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (null != n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new ht(), new ut()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (null != e) return e;
              throw new Error(
                `Cannot find a differ supporting object '${t}' of type '${
                  ((n = t), n.name || typeof n)
                }'`
              );
              var n;
            }
          }
          return (
            (t.ngInjectableDef = ft({
              providedIn: "root",
              factory: () => new t([new cn()]),
            })),
            t
          );
        })(),
        yn = (function () {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new ht(), new ut()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (e) return e;
              throw new Error(`Cannot find a differ supporting object '${t}'`);
            }
          }
          return (
            (t.ngInjectableDef = ft({
              providedIn: "root",
              factory: () => new t([new vn()]),
            })),
            t
          );
        })(),
        Cn = (function () {
          class t {}
          return (t.__NG_ELEMENT_ID__ = () => En()), t;
        })(),
        En = (...t) => {},
        Sn = [new vn()],
        xn = new wn([new cn()]),
        Tn = new yn(Sn),
        kn = (function () {
          class t {}
          return (t.__NG_ELEMENT_ID__ = () => An(t, tn)), t;
        })(),
        An = Je,
        On = (function () {
          class t {}
          return (t.__NG_ELEMENT_ID__ = () => In(t, tn)), t;
        })(),
        In = Je;
      function Rn(t, e, n, r) {
        let s = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '${e}'. Current value: '${n}'.`;
        return (
          r &&
            (s +=
              " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"),
          (function (t, e) {
            const n = new Error(t);
            return Nn(n, e), n;
          })(s, t)
        );
      }
      function Nn(t, e) {
        (t[Gt] = e), (t[Zt] = e.logError.bind(e));
      }
      function Dn(t) {
        return new Error(
          `ViewDestroyedError: Attempt to use a destroyed view: ${t}`
        );
      }
      function Mn(t, e, n) {
        const r = t.state,
          s = 1792 & r;
        return s === e
          ? ((t.state = (-1793 & r) | n), (t.initIndex = -1), !0)
          : s === n;
      }
      function Pn(t, e, n) {
        return (
          (1792 & t.state) === e &&
          t.initIndex <= n &&
          ((t.initIndex = n + 1), !0)
        );
      }
      function Vn(t, e) {
        return t.nodes[e];
      }
      function jn(t, e) {
        return t.nodes[e];
      }
      function Ln(t, e) {
        return t.nodes[e];
      }
      function Fn(t, e) {
        return t.nodes[e];
      }
      function Un(t, e) {
        return t.nodes[e];
      }
      const $n = {
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
        Hn = () => {},
        zn = new Map();
      function Bn(t) {
        let e = zn.get(t);
        return e || ((e = vt(t) + "_" + zn.size), zn.set(t, e)), e;
      }
      function Wn(t, e, n, r) {
        if (Le.isWrapped(r)) {
          r = Le.unwrap(r);
          const s = t.def.nodes[e].bindingIndex + n,
            i = Le.unwrap(t.oldValues[s]);
          t.oldValues[s] = new Le(i);
        }
        return r;
      }
      const Gn = "$$undefined",
        qn = "$$empty";
      function Zn(t) {
        return {
          id: Gn,
          styles: t.styles,
          encapsulation: t.encapsulation,
          data: t.data,
        };
      }
      let Qn = 0;
      function Yn(t, e, n, r) {
        return !(!(2 & t.state) && Ve(t.oldValues[e.bindingIndex + n], r));
      }
      function Kn(t, e, n, r) {
        return !!Yn(t, e, n, r) && ((t.oldValues[e.bindingIndex + n] = r), !0);
      }
      function Xn(t, e, n, r) {
        const s = t.oldValues[e.bindingIndex + n];
        if (1 & t.state || !je(s, r)) {
          const i = e.bindings[n].name;
          throw Rn(
            $n.createDebugContext(t, e.nodeIndex),
            `${i}: ${s}`,
            `${i}: ${r}`,
            0 != (1 & t.state)
          );
        }
      }
      function Jn(t) {
        let e = t;
        for (; e; )
          2 & e.def.flags && (e.state |= 8),
            (e = e.viewContainerParent || e.parent);
      }
      function tr(t, e) {
        let n = t;
        for (; n && n !== e; )
          (n.state |= 64), (n = n.viewContainerParent || n.parent);
      }
      function er(t, e, n, r) {
        try {
          return (
            Jn(33554432 & t.def.nodes[e].flags ? jn(t, e).componentView : t),
            $n.handleEvent(t, e, n, r)
          );
        } catch (s) {
          t.root.errorHandler.handleError(s);
        }
      }
      function nr(t) {
        return t.parent ? jn(t.parent, t.parentNodeDef.nodeIndex) : null;
      }
      function rr(t) {
        return t.parent ? t.parentNodeDef.parent : null;
      }
      function sr(t, e) {
        switch (201347067 & e.flags) {
          case 1:
            return jn(t, e.nodeIndex).renderElement;
          case 2:
            return Vn(t, e.nodeIndex).renderText;
        }
      }
      function ir(t) {
        return !!t.parent && !!(32768 & t.parentNodeDef.flags);
      }
      function or(t) {
        return !(!t.parent || 32768 & t.parentNodeDef.flags);
      }
      function lr(t) {
        return 1 << t % 32;
      }
      function ar(t) {
        const e = {};
        let n = 0;
        const r = {};
        return (
          t &&
            t.forEach(([t, s]) => {
              "number" == typeof t ? ((e[t] = s), (n |= lr(t))) : (r[t] = s);
            }),
          { matchedQueries: e, references: r, matchedQueryIds: n }
        );
      }
      function ur(t, e) {
        return t.map((t) => {
          let n, r;
          return (
            Array.isArray(t) ? ([r, n] = t) : ((r = 0), (n = t)),
            n &&
              ("function" == typeof n || "object" == typeof n) &&
              e &&
              Object.defineProperty(n, At, { value: e, configurable: !0 }),
            { flags: r, token: n, tokenKey: Bn(n) }
          );
        });
      }
      function cr(t, e, n) {
        let r = n.renderParent;
        return r
          ? 0 == (1 & r.flags) ||
            0 == (33554432 & r.flags) ||
            (r.element.componentRendererType &&
              r.element.componentRendererType.encapsulation === Yt.Native)
            ? jn(t, n.renderParent.nodeIndex).renderElement
            : void 0
          : e;
      }
      const hr = new WeakMap();
      function dr(t) {
        let e = hr.get(t);
        return e || (((e = t(() => Hn)).factory = t), hr.set(t, e)), e;
      }
      function pr(t, e, n, r, s) {
        3 === e && (n = t.renderer.parentNode(sr(t, t.def.lastRenderRootNode))),
          fr(t, e, 0, t.def.nodes.length - 1, n, r, s);
      }
      function fr(t, e, n, r, s, i, o) {
        for (let l = n; l <= r; l++) {
          const n = t.def.nodes[l];
          11 & n.flags && mr(t, n, e, s, i, o), (l += n.childCount);
        }
      }
      function gr(t, e, n, r, s, i) {
        let o = t;
        for (; o && !ir(o); ) o = o.parent;
        const l = o.parent,
          a = rr(o),
          u = a.nodeIndex + a.childCount;
        for (let c = a.nodeIndex + 1; c <= u; c++) {
          const t = l.def.nodes[c];
          t.ngContentIndex === e && mr(l, t, n, r, s, i), (c += t.childCount);
        }
        if (!l.parent) {
          const o = t.root.projectableNodes[e];
          if (o) for (let e = 0; e < o.length; e++) vr(t, o[e], n, r, s, i);
        }
      }
      function mr(t, e, n, r, s, i) {
        if (8 & e.flags) gr(t, e.ngContent.index, n, r, s, i);
        else {
          const o = sr(t, e);
          if (
            (3 === n && 33554432 & e.flags && 48 & e.bindingFlags
              ? (16 & e.bindingFlags && vr(t, o, n, r, s, i),
                32 & e.bindingFlags &&
                  vr(jn(t, e.nodeIndex).componentView, o, n, r, s, i))
              : vr(t, o, n, r, s, i),
            16777216 & e.flags)
          ) {
            const o = jn(t, e.nodeIndex).viewContainer._embeddedViews;
            for (let t = 0; t < o.length; t++) pr(o[t], n, r, s, i);
          }
          1 & e.flags &&
            !e.element.name &&
            fr(t, n, e.nodeIndex + 1, e.nodeIndex + e.childCount, r, s, i);
        }
      }
      function vr(t, e, n, r, s, i) {
        const o = t.renderer;
        switch (n) {
          case 1:
            o.appendChild(r, e);
            break;
          case 2:
            o.insertBefore(r, e, s);
            break;
          case 3:
            o.removeChild(r, e);
            break;
          case 0:
            i.push(e);
        }
      }
      const _r = /^:([^:]+):(.+)$/;
      function br(t) {
        if (":" === t[0]) {
          const e = t.match(_r);
          return [e[1], e[2]];
        }
        return ["", t];
      }
      function wr(t) {
        let e = 0;
        for (let n = 0; n < t.length; n++) e |= t[n].flags;
        return e;
      }
      const yr = new Object(),
        Cr = Bn(Nt),
        Er = Bn(It),
        Sr = Bn(Ke);
      function xr(t, e, n, r) {
        return (
          (n = wt(n)),
          { index: -1, deps: ur(r, vt(e)), flags: t, token: e, value: n }
        );
      }
      function Tr(t, e, n = Nt.THROW_IF_NOT_FOUND) {
        const r = xt(t);
        try {
          if (8 & e.flags) return e.token;
          if ((2 & e.flags && (n = null), 1 & e.flags))
            return t._parent.get(e.token, n);
          const o = e.tokenKey;
          switch (o) {
            case Cr:
            case Er:
            case Sr:
              return t;
          }
          const l = t._def.providersByKey[o];
          let a;
          if (l) {
            let e = t._providers[l.index];
            return (
              void 0 === e && (e = t._providers[l.index] = kr(t, l)),
              e === yr ? void 0 : e
            );
          }
          if (
            (a = gt(e.token)) &&
            ((s = t),
            null != (i = a).providedIn &&
              ((function (t, e) {
                return t._def.modules.indexOf(i.providedIn) > -1;
              })(s) ||
                ("root" === i.providedIn && s._def.isRoot)))
          ) {
            const n = t._providers.length;
            return (
              (t._def.providers[n] = t._def.providersByKey[e.tokenKey] =
                {
                  flags: 5120,
                  value: a.factory,
                  deps: [],
                  index: n,
                  token: e.token,
                }),
              (t._providers[n] = yr),
              (t._providers[n] = kr(t, t._def.providersByKey[e.tokenKey]))
            );
          }
          return 4 & e.flags ? n : t._parent.get(e.token, n);
        } finally {
          xt(r);
        }
        var s, i;
      }
      function kr(t, e) {
        let n;
        switch (201347067 & e.flags) {
          case 512:
            n = (function (t, e, n) {
              const r = n.length;
              switch (r) {
                case 0:
                  return new e();
                case 1:
                  return new e(Tr(t, n[0]));
                case 2:
                  return new e(Tr(t, n[0]), Tr(t, n[1]));
                case 3:
                  return new e(Tr(t, n[0]), Tr(t, n[1]), Tr(t, n[2]));
                default:
                  const s = new Array(r);
                  for (let e = 0; e < r; e++) s[e] = Tr(t, n[e]);
                  return new e(...s);
              }
            })(t, e.value, e.deps);
            break;
          case 1024:
            n = (function (t, e, n) {
              const r = n.length;
              switch (r) {
                case 0:
                  return e();
                case 1:
                  return e(Tr(t, n[0]));
                case 2:
                  return e(Tr(t, n[0]), Tr(t, n[1]));
                case 3:
                  return e(Tr(t, n[0]), Tr(t, n[1]), Tr(t, n[2]));
                default:
                  const s = Array(r);
                  for (let e = 0; e < r; e++) s[e] = Tr(t, n[e]);
                  return e(...s);
              }
            })(t, e.value, e.deps);
            break;
          case 2048:
            n = Tr(t, e.deps[0]);
            break;
          case 256:
            n = e.value;
        }
        return (
          n === yr ||
            null === n ||
            "object" != typeof n ||
            131072 & e.flags ||
            "function" != typeof n.ngOnDestroy ||
            (e.flags |= 131072),
          void 0 === n ? yr : n
        );
      }
      function Ar(t, e) {
        const n = t.viewContainer._embeddedViews;
        if (((null == e || e >= n.length) && (e = n.length - 1), e < 0))
          return null;
        const r = n[e];
        return (
          (r.viewContainerParent = null),
          Nr(n, e),
          $n.dirtyParentQueries(r),
          Ir(r),
          r
        );
      }
      function Or(t, e, n) {
        const r = e ? sr(e, e.def.lastRenderRootNode) : t.renderElement,
          s = n.renderer.parentNode(r),
          i = n.renderer.nextSibling(r);
        pr(n, 2, s, i, void 0);
      }
      function Ir(t) {
        pr(t, 3, null, null, void 0);
      }
      function Rr(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function Nr(t, e) {
        e >= t.length - 1 ? t.pop() : t.splice(e, 1);
      }
      const Dr = new Object();
      function Mr(t, e, n, r, s, i) {
        return new Pr(t, e, n, r, s, i);
      }
      class Pr extends Be {
        constructor(t, e, n, r, s, i) {
          super(),
            (this.selector = t),
            (this.componentType = e),
            (this._inputs = r),
            (this._outputs = s),
            (this.ngContentSelectors = i),
            (this.viewDefFactory = n);
        }
        get inputs() {
          const t = [],
            e = this._inputs;
          for (let n in e) t.push({ propName: n, templateName: e[n] });
          return t;
        }
        get outputs() {
          const t = [];
          for (let e in this._outputs)
            t.push({ propName: e, templateName: this._outputs[e] });
          return t;
        }
        create(t, e, n, r) {
          if (!r) throw new Error("ngModule should be provided");
          const s = dr(this.viewDefFactory),
            i = s.nodes[0].element.componentProvider.nodeIndex,
            o = $n.createRootView(t, e || [], n, s, r, Dr),
            l = Ln(o, i).instance;
          return (
            n &&
              o.renderer.setAttribute(
                jn(o, 0).renderElement,
                "ng-version",
                un.full
              ),
            new Vr(o, new Ur(o), l)
          );
        }
      }
      class Vr extends ze {
        constructor(t, e, n) {
          super(),
            (this._view = t),
            (this._viewRef = e),
            (this._component = n),
            (this._elDef = this._view.def.nodes[0]),
            (this.hostView = e),
            (this.changeDetectorRef = e),
            (this.instance = n);
        }
        get location() {
          return new tn(jn(this._view, this._elDef.nodeIndex).renderElement);
        }
        get injector() {
          return new Br(this._view, this._elDef);
        }
        get componentType() {
          return this._component.constructor;
        }
        destroy() {
          this._viewRef.destroy();
        }
        onDestroy(t) {
          this._viewRef.onDestroy(t);
        }
      }
      function jr(t, e, n) {
        return new Lr(t, e, n);
      }
      class Lr {
        constructor(t, e, n) {
          (this._view = t),
            (this._elDef = e),
            (this._data = n),
            (this._embeddedViews = []);
        }
        get element() {
          return new tn(this._data.renderElement);
        }
        get injector() {
          return new Br(this._view, this._elDef);
        }
        get parentInjector() {
          let t = this._view,
            e = this._elDef.parent;
          for (; !e && t; ) (e = rr(t)), (t = t.parent);
          return t ? new Br(t, e) : new Br(this._view, null);
        }
        clear() {
          for (let t = this._embeddedViews.length - 1; t >= 0; t--) {
            const e = Ar(this._data, t);
            $n.destroyView(e);
          }
        }
        get(t) {
          const e = this._embeddedViews[t];
          if (e) {
            const t = new Ur(e);
            return t.attachToViewContainerRef(this), t;
          }
          return null;
        }
        get length() {
          return this._embeddedViews.length;
        }
        createEmbeddedView(t, e, n) {
          const r = t.createEmbeddedView(e || {});
          return this.insert(r, n), r;
        }
        createComponent(t, e, n, r, s) {
          const i = n || this.parentInjector;
          s || t instanceof Ye || (s = i.get(Ke));
          const o = t.create(i, r, void 0, s);
          return this.insert(o.hostView, e), o;
        }
        insert(t, e) {
          if (t.destroyed)
            throw new Error(
              "Cannot insert a destroyed View in a ViewContainer!"
            );
          const n = t;
          return (
            (function (t, e, n, r) {
              let s = e.viewContainer._embeddedViews;
              null == n && (n = s.length),
                (r.viewContainerParent = t),
                Rr(s, n, r),
                (function (t, e) {
                  const n = nr(e);
                  if (!n || n === t || 16 & e.state) return;
                  e.state |= 16;
                  let r = n.template._projectedViews;
                  r || (r = n.template._projectedViews = []),
                    r.push(e),
                    (function (t, n) {
                      if (4 & n.flags) return;
                      (e.parent.def.nodeFlags |= 4), (n.flags |= 4);
                      let r = n.parent;
                      for (; r; ) (r.childFlags |= 4), (r = r.parent);
                    })(0, e.parentNodeDef);
                })(e, r),
                $n.dirtyParentQueries(r),
                Or(e, n > 0 ? s[n - 1] : null, r);
            })(this._view, this._data, e, n._view),
            n.attachToViewContainerRef(this),
            t
          );
        }
        move(t, e) {
          if (t.destroyed)
            throw new Error("Cannot move a destroyed View in a ViewContainer!");
          const n = this._embeddedViews.indexOf(t._view);
          return (
            (function (t, e, r) {
              const s = t.viewContainer._embeddedViews,
                i = s[n];
              Nr(s, n),
                null == r && (r = s.length),
                Rr(s, r, i),
                $n.dirtyParentQueries(i),
                Ir(i),
                Or(t, r > 0 ? s[r - 1] : null, i);
            })(this._data, 0, e),
            t
          );
        }
        indexOf(t) {
          return this._embeddedViews.indexOf(t._view);
        }
        remove(t) {
          const e = Ar(this._data, t);
          e && $n.destroyView(e);
        }
        detach(t) {
          const e = Ar(this._data, t);
          return e ? new Ur(e) : null;
        }
      }
      function Fr(t) {
        return new Ur(t);
      }
      class Ur {
        constructor(t) {
          (this._view = t),
            (this._viewContainerRef = null),
            (this._appRef = null);
        }
        get rootNodes() {
          return (function (t) {
            const e = [];
            return pr(t, 0, void 0, void 0, e), e;
          })(this._view);
        }
        get context() {
          return this._view.context;
        }
        get destroyed() {
          return 0 != (128 & this._view.state);
        }
        markForCheck() {
          Jn(this._view);
        }
        detach() {
          this._view.state &= -5;
        }
        detectChanges() {
          const t = this._view.root.rendererFactory;
          t.begin && t.begin();
          try {
            $n.checkAndUpdateView(this._view);
          } finally {
            t.end && t.end();
          }
        }
        checkNoChanges() {
          $n.checkNoChangesView(this._view);
        }
        reattach() {
          this._view.state |= 4;
        }
        onDestroy(t) {
          this._view.disposables || (this._view.disposables = []),
            this._view.disposables.push(t);
        }
        destroy() {
          this._appRef
            ? this._appRef.detachView(this)
            : this._viewContainerRef &&
              this._viewContainerRef.detach(
                this._viewContainerRef.indexOf(this)
              ),
            $n.destroyView(this._view);
        }
        detachFromAppRef() {
          (this._appRef = null),
            Ir(this._view),
            $n.dirtyParentQueries(this._view);
        }
        attachToAppRef(t) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
        attachToViewContainerRef(t) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = t;
        }
      }
      function $r(t, e) {
        return new Hr(t, e);
      }
      class Hr extends kn {
        constructor(t, e) {
          super(), (this._parentView = t), (this._def = e);
        }
        createEmbeddedView(t) {
          return new Ur(
            $n.createEmbeddedView(
              this._parentView,
              this._def,
              this._def.element.template,
              t
            )
          );
        }
        get elementRef() {
          return new tn(
            jn(this._parentView, this._def.nodeIndex).renderElement
          );
        }
      }
      function zr(t, e) {
        return new Br(t, e);
      }
      class Br {
        constructor(t, e) {
          (this.view = t), (this.elDef = e);
        }
        get(t, e = Nt.THROW_IF_NOT_FOUND) {
          return $n.resolveDep(
            this.view,
            this.elDef,
            !!this.elDef && 0 != (33554432 & this.elDef.flags),
            { flags: 0, token: t, tokenKey: Bn(t) },
            e
          );
        }
      }
      function Wr(t, e) {
        const n = t.def.nodes[e];
        if (1 & n.flags) {
          const e = jn(t, n.nodeIndex);
          return n.element.template ? e.template : e.renderElement;
        }
        if (2 & n.flags) return Vn(t, n.nodeIndex).renderText;
        if (20240 & n.flags) return Ln(t, n.nodeIndex).instance;
        throw new Error(`Illegal state: read nodeValue for node index ${e}`);
      }
      function Gr(t) {
        return new qr(t.renderer);
      }
      class qr {
        constructor(t) {
          this.delegate = t;
        }
        selectRootElement(t) {
          return this.delegate.selectRootElement(t);
        }
        createElement(t, e) {
          const [n, r] = br(e),
            s = this.delegate.createElement(r, n);
          return t && this.delegate.appendChild(t, s), s;
        }
        createViewRoot(t) {
          return t;
        }
        createTemplateAnchor(t) {
          const e = this.delegate.createComment("");
          return t && this.delegate.appendChild(t, e), e;
        }
        createText(t, e) {
          const n = this.delegate.createText(e);
          return t && this.delegate.appendChild(t, n), n;
        }
        projectNodes(t, e) {
          for (let n = 0; n < e.length; n++) this.delegate.appendChild(t, e[n]);
        }
        attachViewAfter(t, e) {
          const n = this.delegate.parentNode(t),
            r = this.delegate.nextSibling(t);
          for (let s = 0; s < e.length; s++)
            this.delegate.insertBefore(n, e[s], r);
        }
        detachView(t) {
          for (let e = 0; e < t.length; e++) {
            const n = t[e],
              r = this.delegate.parentNode(n);
            this.delegate.removeChild(r, n);
          }
        }
        destroyView(t, e) {
          for (let n = 0; n < e.length; n++) this.delegate.destroyNode(e[n]);
        }
        listen(t, e, n) {
          return this.delegate.listen(t, e, n);
        }
        listenGlobal(t, e, n) {
          return this.delegate.listen(t, e, n);
        }
        setElementProperty(t, e, n) {
          this.delegate.setProperty(t, e, n);
        }
        setElementAttribute(t, e, n) {
          const [r, s] = br(e);
          null != n
            ? this.delegate.setAttribute(t, s, n, r)
            : this.delegate.removeAttribute(t, s, r);
        }
        setBindingDebugInfo(t, e, n) {}
        setElementClass(t, e, n) {
          n ? this.delegate.addClass(t, e) : this.delegate.removeClass(t, e);
        }
        setElementStyle(t, e, n) {
          null != n
            ? this.delegate.setStyle(t, e, n)
            : this.delegate.removeStyle(t, e);
        }
        invokeElementMethod(t, e, n) {
          t[e].apply(t, n);
        }
        setText(t, e) {
          this.delegate.setValue(t, e);
        }
        animate() {
          throw new Error("Renderer.animate is no longer supported!");
        }
      }
      function Zr(t, e, n, r) {
        return new Qr(t, e, n, r);
      }
      class Qr {
        constructor(t, e, n, r) {
          (this._moduleType = t),
            (this._parent = e),
            (this._bootstrapComponents = n),
            (this._def = r),
            (this._destroyListeners = []),
            (this._destroyed = !1),
            (this.injector = this),
            (function (t) {
              const e = t._def,
                n = (t._providers = new Array(e.providers.length));
              for (let r = 0; r < e.providers.length; r++) {
                const s = e.providers[r];
                4096 & s.flags || (void 0 === n[r] && (n[r] = kr(t, s)));
              }
            })(this);
        }
        get(t, e = Nt.THROW_IF_NOT_FOUND, n = dt.Default) {
          let r = 0;
          return (
            n & dt.SkipSelf ? (r |= 1) : n & dt.Self && (r |= 4),
            Tr(this, { token: t, tokenKey: Bn(t), flags: r }, e)
          );
        }
        get instance() {
          return this.get(this._moduleType);
        }
        get componentFactoryResolver() {
          return this.get(Ze);
        }
        destroy() {
          if (this._destroyed)
            throw new Error(
              `The ng module ${vt(
                this.instance.constructor
              )} has already been destroyed.`
            );
          (this._destroyed = !0),
            (function (t, e) {
              const n = t._def,
                r = new Set();
              for (let s = 0; s < n.providers.length; s++)
                if (131072 & n.providers[s].flags) {
                  const e = t._providers[s];
                  if (e && e !== yr) {
                    const t = e.ngOnDestroy;
                    "function" != typeof t ||
                      r.has(e) ||
                      (t.apply(e), r.add(e));
                  }
                }
            })(this),
            this._destroyListeners.forEach((t) => t());
        }
        onDestroy(t) {
          this._destroyListeners.push(t);
        }
      }
      const Yr = Bn(nn),
        Kr = Bn(on),
        Xr = Bn(tn),
        Jr = Bn(On),
        ts = Bn(kn),
        es = Bn(Cn),
        ns = Bn(Nt),
        rs = Bn(It);
      function ss(t, e, n, r, s, i, o, l) {
        const a = [];
        if (o)
          for (let c in o) {
            const [t, e] = o[c];
            a[t] = {
              flags: 8,
              name: c,
              nonMinifiedName: e,
              ns: null,
              securityContext: null,
              suffix: null,
            };
          }
        const u = [];
        if (l)
          for (let c in l)
            u.push({ type: 1, propName: c, target: null, eventName: l[c] });
        return ls(t, (e |= 16384), n, r, s, s, i, a, u);
      }
      function is(t, e, n) {
        return ls(-1, (t |= 16), null, 0, e, e, n);
      }
      function os(t, e, n, r, s) {
        return ls(-1, t, e, 0, n, r, s);
      }
      function ls(t, e, n, r, s, i, o, l, a) {
        const { matchedQueries: u, references: c, matchedQueryIds: h } = ar(n);
        a || (a = []), l || (l = []), (i = wt(i));
        const d = ur(o, vt(s));
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
          matchedQueries: u,
          matchedQueryIds: h,
          references: c,
          ngContentIndex: -1,
          childCount: r,
          bindings: l,
          bindingFlags: wr(l),
          outputs: a,
          element: null,
          provider: { token: s, value: i, deps: d },
          text: null,
          query: null,
          ngContent: null,
        };
      }
      function as(t, e) {
        return ds(t, e);
      }
      function us(t, e) {
        let n = t;
        for (; n.parent && !ir(n); ) n = n.parent;
        return ps(n.parent, rr(n), !0, e.provider.value, e.provider.deps);
      }
      function cs(t, e) {
        const n = ps(
          t,
          e.parent,
          (32768 & e.flags) > 0,
          e.provider.value,
          e.provider.deps
        );
        if (e.outputs.length)
          for (let r = 0; r < e.outputs.length; r++) {
            const s = e.outputs[r],
              i = n[s.propName];
            if (!De(i))
              throw new Error(
                `@Output ${s.propName} not initialized in '${n.constructor.name}'.`
              );
            {
              const n = i.subscribe(hs(t, e.parent.nodeIndex, s.eventName));
              t.disposables[e.outputIndex + r] = n.unsubscribe.bind(n);
            }
          }
        return n;
      }
      function hs(t, e, n) {
        return (r) => er(t, e, n, r);
      }
      function ds(t, e) {
        const n = (8192 & e.flags) > 0,
          r = e.provider;
        switch (201347067 & e.flags) {
          case 512:
            return ps(t, e.parent, n, r.value, r.deps);
          case 1024:
            return (function (t, e, n, r, s) {
              const i = s.length;
              switch (i) {
                case 0:
                  return r();
                case 1:
                  return r(gs(t, e, n, s[0]));
                case 2:
                  return r(gs(t, e, n, s[0]), gs(t, e, n, s[1]));
                case 3:
                  return r(
                    gs(t, e, n, s[0]),
                    gs(t, e, n, s[1]),
                    gs(t, e, n, s[2])
                  );
                default:
                  const o = Array(i);
                  for (let r = 0; r < i; r++) o[r] = gs(t, e, n, s[r]);
                  return r(...o);
              }
            })(t, e.parent, n, r.value, r.deps);
          case 2048:
            return gs(t, e.parent, n, r.deps[0]);
          case 256:
            return r.value;
        }
      }
      function ps(t, e, n, r, s) {
        const i = s.length;
        switch (i) {
          case 0:
            return new r();
          case 1:
            return new r(gs(t, e, n, s[0]));
          case 2:
            return new r(gs(t, e, n, s[0]), gs(t, e, n, s[1]));
          case 3:
            return new r(
              gs(t, e, n, s[0]),
              gs(t, e, n, s[1]),
              gs(t, e, n, s[2])
            );
          default:
            const o = new Array(i);
            for (let r = 0; r < i; r++) o[r] = gs(t, e, n, s[r]);
            return new r(...o);
        }
      }
      const fs = {};
      function gs(t, e, n, r, s = Nt.THROW_IF_NOT_FOUND) {
        if (8 & r.flags) return r.token;
        const i = t;
        2 & r.flags && (s = null);
        const o = r.tokenKey;
        o === es && (n = !(!e || !e.element.componentView)),
          e && 1 & r.flags && ((n = !1), (e = e.parent));
        let l = t;
        for (; l; ) {
          if (e)
            switch (o) {
              case Yr:
                return Gr(ms(l, e, n));
              case Kr:
                return ms(l, e, n).renderer;
              case Xr:
                return new tn(jn(l, e.nodeIndex).renderElement);
              case Jr:
                return jn(l, e.nodeIndex).viewContainer;
              case ts:
                if (e.element.template) return jn(l, e.nodeIndex).template;
                break;
              case es:
                return Fr(ms(l, e, n));
              case ns:
              case rs:
                return zr(l, e);
              default:
                const t = (
                  n ? e.element.allProviders : e.element.publicProviders
                )[o];
                if (t) {
                  let e = Ln(l, t.nodeIndex);
                  return (
                    e ||
                      ((e = { instance: ds(l, t) }),
                      (l.nodes[t.nodeIndex] = e)),
                    e.instance
                  );
                }
            }
          (n = ir(l)), (e = rr(l)), (l = l.parent), 4 & r.flags && (l = null);
        }
        const a = i.root.injector.get(r.token, fs);
        return a !== fs || s === fs
          ? a
          : i.root.ngModule.injector.get(r.token, s);
      }
      function ms(t, e, n) {
        let r;
        if (n) r = jn(t, e.nodeIndex).componentView;
        else for (r = t; r.parent && !ir(r); ) r = r.parent;
        return r;
      }
      function vs(t, e, n, r, s, i) {
        if (32768 & n.flags) {
          const e = jn(t, n.parent.nodeIndex).componentView;
          2 & e.def.flags && (e.state |= 8);
        }
        if (((e.instance[n.bindings[r].name] = s), 524288 & n.flags)) {
          i = i || {};
          const e = Le.unwrap(t.oldValues[n.bindingIndex + r]);
          i[n.bindings[r].nonMinifiedName] = new $e(e, s, 0 != (2 & t.state));
        }
        return (t.oldValues[n.bindingIndex + r] = s), i;
      }
      function _s(t, e) {
        if (!(t.def.nodeFlags & e)) return;
        const n = t.def.nodes;
        let r = 0;
        for (let s = 0; s < n.length; s++) {
          const i = n[s];
          let o = i.parent;
          for (
            !o && i.flags & e && ws(t, s, i.flags & e, r++),
              0 == (i.childFlags & e) && (s += i.childCount);
            o && 1 & o.flags && s === o.nodeIndex + o.childCount;

          )
            o.directChildFlags & e && (r = bs(t, o, e, r)), (o = o.parent);
        }
      }
      function bs(t, e, n, r) {
        for (let s = e.nodeIndex + 1; s <= e.nodeIndex + e.childCount; s++) {
          const e = t.def.nodes[s];
          e.flags & n && ws(t, s, e.flags & n, r++), (s += e.childCount);
        }
        return r;
      }
      function ws(t, e, n, r) {
        const s = Ln(t, e);
        if (!s) return;
        const i = s.instance;
        i &&
          ($n.setCurrentNode(t, e),
          1048576 & n && Pn(t, 512, r) && i.ngAfterContentInit(),
          2097152 & n && i.ngAfterContentChecked(),
          4194304 & n && Pn(t, 768, r) && i.ngAfterViewInit(),
          8388608 & n && i.ngAfterViewChecked(),
          131072 & n && i.ngOnDestroy());
      }
      const ys = new kt("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Kt,
      });
      class Cs extends k {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          let r,
            s = (t) => null,
            i = () => null;
          t && "object" == typeof t
            ? ((r = this.__isAsync
                ? (e) => {
                    setTimeout(() => t.next(e));
                  }
                : (e) => {
                    t.next(e);
                  }),
              t.error &&
                (s = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t.error(e));
                    }
                  : (e) => {
                      t.error(e);
                    }),
              t.complete &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => t.complete());
                    }
                  : () => {
                      t.complete();
                    }))
            : ((r = this.__isAsync
                ? (e) => {
                    setTimeout(() => t(e));
                  }
                : (e) => {
                    t(e);
                  }),
              e &&
                (s = this.__isAsync
                  ? (t) => {
                      setTimeout(() => e(t));
                    }
                  : (t) => {
                      e(t);
                    }),
              n &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const o = super.subscribe(r, s, i);
          return t instanceof d && t.add(o), o;
        }
      }
      class Es {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new Cs()),
            (this.length = 0);
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        [Pe()]() {
          return this._results[Pe()]();
        }
        toString() {
          return this._results.toString();
        }
        reset(t) {
          (this._results = (function t(e, n) {
            void 0 === n && (n = e);
            for (let r = 0; r < e.length; r++) {
              let s = e[r];
              Array.isArray(s)
                ? (n === e && (n = e.slice(0, r)), t(s, n))
                : n !== e && n.push(s);
            }
            return n;
          })(t)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      class Ss {}
      const xs = new kt("Application Initializer");
      class Ts {
        constructor(t) {
          (this.appInits = t),
            (this.initialized = !1),
            (this.done = !1),
            (this.donePromise = new Promise((t, e) => {
              (this.resolve = t), (this.reject = e);
            }));
        }
        runInitializers() {
          if (this.initialized) return;
          const t = [],
            e = () => {
              (this.done = !0), this.resolve();
            };
          if (this.appInits)
            for (let n = 0; n < this.appInits.length; n++) {
              const e = this.appInits[n]();
              Ne(e) && t.push(e);
            }
          Promise.all(t)
            .then(() => {
              e();
            })
            .catch((t) => {
              this.reject(t);
            }),
            0 === t.length && e(),
            (this.initialized = !0);
        }
      }
      const ks = new kt("AppId");
      function As() {
        return `${Os()}${Os()}${Os()}`;
      }
      function Os() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Is = new kt("Platform Initializer"),
        Rs = new kt("Platform ID"),
        Ns = new kt("appBootstrapListener");
      class Ds {
        log(t) {
          console.log(t);
        }
        warn(t) {
          console.warn(t);
        }
      }
      function Ms() {
        throw new Error("Runtime compiler is not loaded");
      }
      const Ps = Ms,
        Vs = Ms,
        js = Ms,
        Ls = Ms;
      class Fs {
        constructor() {
          (this.compileModuleSync = Ps),
            (this.compileModuleAsync = Vs),
            (this.compileModuleAndAllComponentsSync = js),
            (this.compileModuleAndAllComponentsAsync = Ls);
        }
        clearCache() {}
        clearCacheFor(t) {}
        getModuleId(t) {}
      }
      class Us {}
      let $s, Hs;
      function zs() {
        const t = Ct.wtf;
        return !(!t || !($s = t.trace) || ((Hs = $s.events), 0));
      }
      const Bs = zs(),
        Ws = Bs
          ? function (t, e = null) {
              return Hs.createScope(t, e);
            }
          : (t, e) =>
              function (t, e) {
                return null;
              },
        Gs = Bs
          ? function (t, e) {
              return $s.leaveScope(t, e), e;
            }
          : (t, e) => e,
        qs = (() => Promise.resolve(0))();
      function Zs(t) {
        "undefined" == typeof Zone
          ? qs.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class Qs {
        constructor({ enableLongStackTrace: t = !1 }) {
          if (
            ((this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Cs(!1)),
            (this.onMicrotaskEmpty = new Cs(!1)),
            (this.onStable = new Cs(!1)),
            (this.onError = new Cs(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          var e;
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            ((e = this)._inner = e._inner.fork({
              name: "angular",
              properties: { isAngularZone: !0 },
              onInvokeTask: (t, n, r, s, i, o) => {
                try {
                  return Js(e), t.invokeTask(r, s, i, o);
                } finally {
                  ti(e);
                }
              },
              onInvoke: (t, n, r, s, i, o, l) => {
                try {
                  return Js(e), t.invoke(r, s, i, o, l);
                } finally {
                  ti(e);
                }
              },
              onHasTask: (t, n, r, s) => {
                t.hasTask(r, s),
                  n === r &&
                    ("microTask" == s.change
                      ? ((e.hasPendingMicrotasks = s.microTask), Xs(e))
                      : "macroTask" == s.change &&
                        (e.hasPendingMacrotasks = s.macroTask));
              },
              onHandleError: (t, n, r, s) => (
                t.handleError(r, s),
                e.runOutsideAngular(() => e.onError.emit(s)),
                !1
              ),
            }));
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Qs.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Qs.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, r) {
          const s = this._inner,
            i = s.scheduleEventTask("NgZoneEvent: " + r, t, Ks, Ys, Ys);
          try {
            return s.runTask(i, e, n);
          } finally {
            s.cancelTask(i);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      function Ys() {}
      const Ks = {};
      function Xs(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function Js(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function ti(t) {
        t._nesting--, Xs(t);
      }
      class ei {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Cs()),
            (this.onMicrotaskEmpty = new Cs()),
            (this.onStable = new Cs()),
            (this.onError = new Cs());
        }
        run(t) {
          return t();
        }
        runGuarded(t) {
          return t();
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t) {
          return t();
        }
      }
      class ni {
        constructor(t) {
          (this._ngZone = t),
            (this._pendingCount = 0),
            (this._isZoneStable = !0),
            (this._didWork = !1),
            (this._callbacks = []),
            (this.taskTrackingZone = null),
            this._watchAngularEvents(),
            t.run(() => {
              this.taskTrackingZone =
                "undefined" == typeof Zone
                  ? null
                  : Zone.current.get("TaskTrackingZone");
            });
        }
        _watchAngularEvents() {
          this._ngZone.onUnstable.subscribe({
            next: () => {
              (this._didWork = !0), (this._isZoneStable = !1);
            },
          }),
            this._ngZone.runOutsideAngular(() => {
              this._ngZone.onStable.subscribe({
                next: () => {
                  Qs.assertNotInAngularZone(),
                    Zs(() => {
                      (this._isZoneStable = !0), this._runCallbacksIfReady();
                    });
                },
              });
            });
        }
        increasePendingRequestCount() {
          return (
            (this._pendingCount += 1), (this._didWork = !0), this._pendingCount
          );
        }
        decreasePendingRequestCount() {
          if (((this._pendingCount -= 1), this._pendingCount < 0))
            throw new Error("pending async requests below zero");
          return this._runCallbacksIfReady(), this._pendingCount;
        }
        isStable() {
          return (
            this._isZoneStable &&
            0 === this._pendingCount &&
            !this._ngZone.hasPendingMacrotasks
          );
        }
        _runCallbacksIfReady() {
          if (this.isStable())
            Zs(() => {
              for (; 0 !== this._callbacks.length; ) {
                let t = this._callbacks.pop();
                clearTimeout(t.timeoutId), t.doneCb(this._didWork);
              }
              this._didWork = !1;
            });
          else {
            let t = this.getPendingTasks();
            (this._callbacks = this._callbacks.filter(
              (e) =>
                !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1)
            )),
              (this._didWork = !0);
          }
        }
        getPendingTasks() {
          return this.taskTrackingZone
            ? this.taskTrackingZone.macroTasks.map((t) => ({
                source: t.source,
                creationLocation: t.creationLocation,
                data: t.data,
              }))
            : [];
        }
        addCallback(t, e, n) {
          let r = -1;
          e &&
            e > 0 &&
            (r = setTimeout(() => {
              (this._callbacks = this._callbacks.filter(
                (t) => t.timeoutId !== r
              )),
                t(this._didWork, this.getPendingTasks());
            }, e)),
            this._callbacks.push({ doneCb: t, timeoutId: r, updateCb: n });
        }
        whenStable(t, e, n) {
          if (n && !this.taskTrackingZone)
            throw new Error(
              'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
            );
          this.addCallback(t, e, n), this._runCallbacksIfReady();
        }
        getPendingRequestCount() {
          return this._pendingCount;
        }
        findProviders(t, e, n) {
          return [];
        }
      }
      const ri = (function () {
        class t {
          constructor() {
            (this._applications = new Map()), oi.addToWindow(this);
          }
          registerApplication(t, e) {
            this._applications.set(t, e);
          }
          unregisterApplication(t) {
            this._applications.delete(t);
          }
          unregisterAllApplications() {
            this._applications.clear();
          }
          getTestability(t) {
            return this._applications.get(t) || null;
          }
          getAllTestabilities() {
            return Array.from(this._applications.values());
          }
          getAllRootElements() {
            return Array.from(this._applications.keys());
          }
          findTestabilityInTree(t, e = !0) {
            return oi.findTestabilityInTree(this, t, e);
          }
        }
        return (t.ctorParameters = () => []), t;
      })();
      class si {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let ii,
        oi = new si(),
        li = function (t, e, n) {
          return t.get(Us).createCompiler([e]).compileModuleAsync(n);
        },
        ai = function (t) {
          return t instanceof Ye;
        };
      const ui = new kt("AllowMultipleToken");
      class ci {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function hi(t, e, n = []) {
        const r = `Platform: ${e}`,
          s = new kt(r);
        return (e = []) => {
          let i = di();
          if (!i || i.injector.get(ui, !1))
            if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }));
            else {
              const t = n.concat(e).concat({ provide: s, useValue: !0 });
              !(function (t) {
                if (ii && !ii.destroyed && !ii.injector.get(ui, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                ii = t.get(pi);
                const e = t.get(Is, null);
                e && e.forEach((t) => t());
              })(Nt.create({ providers: t, name: r }));
            }
          return (function (t) {
            const e = di();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(s);
        };
      }
      function di() {
        return ii && !ii.destroyed ? ii : null;
      }
      class pi {
        constructor(t) {
          (this._injector = t),
            (this._modules = []),
            (this._destroyListeners = []),
            (this._destroyed = !1);
        }
        bootstrapModuleFactory(t, e) {
          const n =
              "noop" === (s = e ? e.ngZone : void 0)
                ? new ei()
                : ("zone.js" === s ? void 0 : s) ||
                  new Qs({ enableLongStackTrace: se() }),
            r = [{ provide: Qs, useValue: n }];
          var s;
          return n.run(() => {
            const e = Nt.create({
                providers: r,
                parent: this.injector,
                name: t.moduleType.name,
              }),
              s = t.create(e),
              i = s.injector.get(ee, null);
            if (!i)
              throw new Error(
                "No ErrorHandler. Is platform module (BrowserModule) included?"
              );
            return (
              s.onDestroy(() => mi(this._modules, s)),
              n.runOutsideAngular(() =>
                n.onError.subscribe({
                  next: (t) => {
                    i.handleError(t);
                  },
                })
              ),
              (function (t, e, n) {
                try {
                  const s = n();
                  return Ne(s)
                    ? s.catch((n) => {
                        throw (e.runOutsideAngular(() => t.handleError(n)), n);
                      })
                    : s;
                } catch (r) {
                  throw (e.runOutsideAngular(() => t.handleError(r)), r);
                }
              })(i, n, () => {
                const t = s.injector.get(Ts);
                return (
                  t.runInitializers(),
                  t.donePromise.then(() => (this._moduleDoBootstrap(s), s))
                );
              })
            );
          });
        }
        bootstrapModule(t, e = []) {
          const n = fi({}, e);
          return li(this.injector, n, t).then((t) =>
            this.bootstrapModuleFactory(t, n)
          );
        }
        _moduleDoBootstrap(t) {
          const e = t.injector.get(gi);
          if (t._bootstrapComponents.length > 0)
            t._bootstrapComponents.forEach((t) => e.bootstrap(t));
          else {
            if (!t.instance.ngDoBootstrap)
              throw new Error(
                `The module ${vt(
                  t.instance.constructor
                )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                  "Please define one of these."
              );
            t.instance.ngDoBootstrap(e);
          }
          this._modules.push(t);
        }
        onDestroy(t) {
          this._destroyListeners.push(t);
        }
        get injector() {
          return this._injector;
        }
        destroy() {
          if (this._destroyed)
            throw new Error("The platform has already been destroyed!");
          this._modules.slice().forEach((t) => t.destroy()),
            this._destroyListeners.forEach((t) => t()),
            (this._destroyed = !0);
        }
        get destroyed() {
          return this._destroyed;
        }
      }
      function fi(t, e) {
        return Array.isArray(e) ? e.reduce(fi, t) : Object.assign({}, t, e);
      }
      const gi = (function () {
        class t {
          constructor(t, e, n, r, s, i) {
            (this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = se()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              });
            const o = new y((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              l = new y((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    Qs.assertNotInAngularZone(),
                      Zs(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  Qs.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = X(
              o,
              l.pipe((t) =>
                J()(
                  (function (t, e) {
                    return function (e) {
                      let n;
                      n =
                        "function" == typeof t
                          ? t
                          : function () {
                              return t;
                            };
                      const r = Object.create(e, rt);
                      return (r.source = e), (r.subjectFactory = n), r;
                    };
                  })(it)(t)
                )
              )
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof Be
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const r = ai(n) ? null : this._injector.get(Ke),
              s = n.create(Nt.NULL, [], e || n.selector, r);
            s.onDestroy(() => {
              this._unloadComponent(s);
            });
            const i = s.injector.get(ni, null);
            return (
              i &&
                s.injector
                  .get(ri)
                  .registerApplication(s.location.nativeElement, i),
              this._loadComponent(s),
              se() &&
                this._console.log(
                  "Angular is running in the development mode. Call enableProdMode() to enable the production mode."
                ),
              s
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            const e = t._tickScope();
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
              if (this._enforceNoNewChanges)
                for (let t of this._views) t.checkNoChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              (this._runningTick = !1), Gs(e);
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            mi(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(Ns, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          _unloadComponent(t) {
            this.detachView(t.hostView), mi(this.components, t);
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (t._tickScope = Ws("ApplicationRef#tick()")), t;
      })();
      function mi(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      const vi = !1,
        _i = "#",
        bi = "NgFactory";
      class wi {}
      const yi = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      class Ci {
        constructor(t, e) {
          (this._compiler = t), (this._config = e || yi);
        }
        load(t) {
          return !vi && this._compiler instanceof Fs
            ? this.loadFactory(t)
            : this.loadAndCompile(t);
        }
        loadAndCompile(t) {
          let [e, r] = t.split(_i);
          return (
            void 0 === r && (r = "default"),
            n("zn8P")(e)
              .then((t) => t[r])
              .then((t) => Ei(t, e, r))
              .then((t) => this._compiler.compileModuleAsync(t))
          );
        }
        loadFactory(t) {
          let [e, r] = t.split(_i),
            s = bi;
          return (
            void 0 === r && ((r = "default"), (s = "")),
            n("zn8P")(
              this._config.factoryPathPrefix +
                e +
                this._config.factoryPathSuffix
            )
              .then((t) => t[r + s])
              .then((t) => Ei(t, e, r))
          );
        }
      }
      function Ei(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      class Si {
        constructor(t, e) {
          (this.name = t), (this.callback = e);
        }
      }
      class xi {
        constructor(t, e, n) {
          (this.listeners = []),
            (this.parent = null),
            (this._debugContext = n),
            (this.nativeNode = t),
            e && e instanceof Ti && e.addChild(this);
        }
        get injector() {
          return this._debugContext.injector;
        }
        get componentInstance() {
          return this._debugContext.component;
        }
        get context() {
          return this._debugContext.context;
        }
        get references() {
          return this._debugContext.references;
        }
        get providerTokens() {
          return this._debugContext.providerTokens;
        }
      }
      class Ti extends xi {
        constructor(t, e, n) {
          super(t, e, n),
            (this.properties = {}),
            (this.attributes = {}),
            (this.classes = {}),
            (this.styles = {}),
            (this.childNodes = []),
            (this.nativeElement = t);
        }
        addChild(t) {
          t && (this.childNodes.push(t), (t.parent = this));
        }
        removeChild(t) {
          const e = this.childNodes.indexOf(t);
          -1 !== e && ((t.parent = null), this.childNodes.splice(e, 1));
        }
        insertChildrenAfter(t, e) {
          const n = this.childNodes.indexOf(t);
          -1 !== n &&
            (this.childNodes.splice(n + 1, 0, ...e),
            e.forEach((e) => {
              e.parent && e.parent.removeChild(e), (t.parent = this);
            }));
        }
        insertBefore(t, e) {
          const n = this.childNodes.indexOf(t);
          -1 === n
            ? this.addChild(e)
            : (e.parent && e.parent.removeChild(e),
              (e.parent = this),
              this.childNodes.splice(n, 0, e));
        }
        query(t) {
          return this.queryAll(t)[0] || null;
        }
        queryAll(t) {
          const e = [];
          return (
            (function t(e, n, r) {
              e.childNodes.forEach((e) => {
                e instanceof Ti && (n(e) && r.push(e), t(e, n, r));
              });
            })(this, t, e),
            e
          );
        }
        queryAllNodes(t) {
          const e = [];
          return (
            (function t(e, n, r) {
              e instanceof Ti &&
                e.childNodes.forEach((e) => {
                  n(e) && r.push(e), e instanceof Ti && t(e, n, r);
                });
            })(this, t, e),
            e
          );
        }
        get children() {
          return this.childNodes.filter((t) => t instanceof Ti);
        }
        triggerEventHandler(t, e) {
          this.listeners.forEach((n) => {
            n.name == t && n.callback(e);
          });
        }
      }
      const ki = new Map(),
        Ai = function (t) {
          return ki.get(t) || null;
        };
      function Oi(t) {
        ki.set(t.nativeNode, t);
      }
      const Ii = hi(null, "core", [
          { provide: Rs, useValue: "unknown" },
          { provide: pi, deps: [Nt] },
          { provide: ri, deps: [] },
          { provide: Ds, deps: [] },
        ]),
        Ri = new kt("LocaleId");
      function Ni() {
        return xn;
      }
      function Di() {
        return Tn;
      }
      function Mi(t) {
        return t || "en-US";
      }
      function Pi(t) {
        let e = [];
        return (
          t.onStable.subscribe(() => {
            for (; e.length; ) e.pop()();
          }),
          function (t) {
            e.push(t);
          }
        );
      }
      class Vi {
        constructor(t) {}
      }
      function ji(t, e, n, r, s, i) {
        t |= 1;
        const { matchedQueries: o, references: l, matchedQueryIds: a } = ar(e);
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
          matchedQueries: o,
          matchedQueryIds: a,
          references: l,
          ngContentIndex: n,
          childCount: r,
          bindings: [],
          bindingFlags: 0,
          outputs: [],
          element: {
            ns: null,
            name: null,
            attrs: null,
            template: i ? dr(i) : null,
            componentProvider: null,
            componentView: null,
            componentRendererType: null,
            publicProviders: null,
            allProviders: null,
            handleEvent: s || Hn,
          },
          provider: null,
          text: null,
          query: null,
          ngContent: null,
        };
      }
      function Li(t, e, n, r, s, i, o = [], l, a, u, c, h) {
        u || (u = Hn);
        const { matchedQueries: d, references: p, matchedQueryIds: f } = ar(n);
        let g = null,
          m = null;
        i && ([g, m] = br(i)), (l = l || []);
        const v = new Array(l.length);
        for (let w = 0; w < l.length; w++) {
          const [t, e, n] = l[w],
            [r, s] = br(e);
          let i = void 0,
            o = void 0;
          switch (15 & t) {
            case 4:
              o = n;
              break;
            case 1:
            case 8:
              i = n;
          }
          v[w] = {
            flags: t,
            ns: r,
            name: s,
            nonMinifiedName: s,
            securityContext: i,
            suffix: o,
          };
        }
        a = a || [];
        const _ = new Array(a.length);
        for (let w = 0; w < a.length; w++) {
          const [t, e] = a[w];
          _[w] = { type: 0, target: t, eventName: e, propName: null };
        }
        const b = (o = o || []).map(([t, e]) => {
          const [n, r] = br(t);
          return [n, r, e];
        });
        return (
          (h = (function (t) {
            if (t && t.id === Gn) {
              const e =
                (null != t.encapsulation && t.encapsulation !== Yt.None) ||
                t.styles.length ||
                Object.keys(t.data).length;
              t.id = e ? `c${Qn++}` : qn;
            }
            return t && t.id === qn && (t = null), t || null;
          })(h)),
          c && (e |= 33554432),
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
            matchedQueries: d,
            matchedQueryIds: f,
            references: p,
            ngContentIndex: r,
            childCount: s,
            bindings: v,
            bindingFlags: wr(v),
            outputs: _,
            element: {
              ns: g,
              name: m,
              attrs: b,
              template: null,
              componentProvider: null,
              componentView: c || null,
              componentRendererType: h,
              publicProviders: null,
              allProviders: null,
              handleEvent: u || Hn,
            },
            provider: null,
            text: null,
            query: null,
            ngContent: null,
          }
        );
      }
      function Fi(t, e, n) {
        const r = n.element,
          s = t.root.selectorOrNode,
          i = t.renderer;
        let o;
        if (t.parent || !s) {
          o = r.name ? i.createElement(r.name, r.ns) : i.createComment("");
          const s = cr(t, e, n);
          s && i.appendChild(s, o);
        } else
          o = i.selectRootElement(
            s,
            !!r.componentRendererType &&
              r.componentRendererType.encapsulation === Yt.ShadowDom
          );
        if (r.attrs)
          for (let l = 0; l < r.attrs.length; l++) {
            const [t, e, n] = r.attrs[l];
            i.setAttribute(o, e, n, t);
          }
        return o;
      }
      function Ui(t, e, n, r) {
        for (let o = 0; o < n.outputs.length; o++) {
          const l = n.outputs[o],
            a = $i(
              t,
              n.nodeIndex,
              ((i = l.eventName), (s = l.target) ? `${s}:${i}` : i)
            );
          let u = l.target,
            c = t;
          "component" === l.target && ((u = null), (c = e));
          const h = c.renderer.listen(u || r, l.eventName, a);
          t.disposables[n.outputIndex + o] = h;
        }
        var s, i;
      }
      function $i(t, e, n) {
        return (r) => er(t, e, n, r);
      }
      function Hi(t, e, n, r) {
        if (!Kn(t, e, n, r)) return !1;
        const s = e.bindings[n],
          i = jn(t, e.nodeIndex),
          o = i.renderElement,
          l = s.name;
        switch (15 & s.flags) {
          case 1:
            !(function (t, e, n, r, s, i) {
              const o = e.securityContext;
              let l = o ? t.root.sanitizer.sanitize(o, i) : i;
              l = null != l ? l.toString() : null;
              const a = t.renderer;
              null != i
                ? a.setAttribute(n, s, l, r)
                : a.removeAttribute(n, s, r);
            })(t, s, o, s.ns, l, r);
            break;
          case 2:
            !(function (t, e, n, r) {
              const s = t.renderer;
              r ? s.addClass(e, n) : s.removeClass(e, n);
            })(t, o, l, r);
            break;
          case 4:
            !(function (t, e, n, r, s) {
              let i = t.root.sanitizer.sanitize(Te.STYLE, s);
              if (null != i) {
                i = i.toString();
                const t = e.suffix;
                null != t && (i += t);
              } else i = null;
              const o = t.renderer;
              null != i ? o.setStyle(n, r, i) : o.removeStyle(n, r);
            })(t, s, o, l, r);
            break;
          case 8:
            !(function (t, e, n, r, s) {
              const i = e.securityContext;
              let o = i ? t.root.sanitizer.sanitize(i, s) : s;
              t.renderer.setProperty(n, r, o);
            })(
              33554432 & e.flags && 32 & s.flags ? i.componentView : t,
              s,
              o,
              l,
              r
            );
        }
        return !0;
      }
      function zi(t, e, n) {
        let r = [];
        for (let s in n) r.push({ propName: s, bindingType: n[s] });
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
          query: { id: e, filterId: lr(e), bindings: r },
          ngContent: null,
        };
      }
      function Bi(t) {
        const e = t.def.nodeMatchedQueries;
        for (; t.parent && or(t); ) {
          let n = t.parentNodeDef;
          t = t.parent;
          const r = n.nodeIndex + n.childCount;
          for (let s = 0; s <= r; s++) {
            const r = t.def.nodes[s];
            67108864 & r.flags &&
              536870912 & r.flags &&
              (r.query.filterId & e) === r.query.filterId &&
              Un(t, s).setDirty(),
              (!(1 & r.flags && s + r.childCount < n.nodeIndex) &&
                67108864 & r.childFlags &&
                536870912 & r.childFlags) ||
                (s += r.childCount);
          }
        }
        if (134217728 & t.def.nodeFlags)
          for (let n = 0; n < t.def.nodes.length; n++) {
            const e = t.def.nodes[n];
            134217728 & e.flags && 536870912 & e.flags && Un(t, n).setDirty(),
              (n += e.childCount);
          }
      }
      function Wi(t, e) {
        const n = Un(t, e.nodeIndex);
        if (!n.dirty) return;
        let r,
          s = void 0;
        if (67108864 & e.flags) {
          const n = e.parent.parent;
          (s = Gi(t, n.nodeIndex, n.nodeIndex + n.childCount, e.query, [])),
            (r = Ln(t, e.parent.nodeIndex).instance);
        } else
          134217728 & e.flags &&
            ((s = Gi(t, 0, t.def.nodes.length - 1, e.query, [])),
            (r = t.component));
        n.reset(s);
        const i = e.query.bindings;
        let o = !1;
        for (let l = 0; l < i.length; l++) {
          const t = i[l];
          let e;
          switch (t.bindingType) {
            case 0:
              e = n.first;
              break;
            case 1:
              (e = n), (o = !0);
          }
          r[t.propName] = e;
        }
        o && n.notifyOnChanges();
      }
      function Gi(t, e, n, r, s) {
        for (let i = e; i <= n; i++) {
          const e = t.def.nodes[i],
            n = e.matchedQueries[r.id];
          if (
            (null != n && s.push(qi(t, e, n)),
            1 & e.flags &&
              e.element.template &&
              (e.element.template.nodeMatchedQueries & r.filterId) ===
                r.filterId)
          ) {
            const n = jn(t, i);
            if (
              ((e.childMatchedQueries & r.filterId) === r.filterId &&
                (Gi(t, i + 1, i + e.childCount, r, s), (i += e.childCount)),
              16777216 & e.flags)
            ) {
              const t = n.viewContainer._embeddedViews;
              for (let e = 0; e < t.length; e++) {
                const i = t[e],
                  o = nr(i);
                o && o === n && Gi(i, 0, i.def.nodes.length - 1, r, s);
              }
            }
            const o = n.template._projectedViews;
            if (o)
              for (let t = 0; t < o.length; t++) {
                const e = o[t];
                Gi(e, 0, e.def.nodes.length - 1, r, s);
              }
          }
          (e.childMatchedQueries & r.filterId) !== r.filterId &&
            (i += e.childCount);
        }
        return s;
      }
      function qi(t, e, n) {
        if (null != n)
          switch (n) {
            case 1:
              return jn(t, e.nodeIndex).renderElement;
            case 0:
              return new tn(jn(t, e.nodeIndex).renderElement);
            case 2:
              return jn(t, e.nodeIndex).template;
            case 3:
              return jn(t, e.nodeIndex).viewContainer;
            case 4:
              return Ln(t, e.nodeIndex).instance;
          }
      }
      function Zi(t, e, n) {
        const r = cr(t, e, n);
        r && gr(t, n.ngContent.index, 1, r, null, void 0);
      }
      function Qi(t, e, n) {
        const r = new Array(n.length - 1);
        for (let s = 1; s < n.length; s++)
          r[s - 1] = {
            flags: 8,
            name: null,
            ns: null,
            nonMinifiedName: null,
            securityContext: null,
            suffix: n[s],
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
      function Yi(t, e, n) {
        let r;
        const s = t.renderer;
        r = s.createText(n.text.prefix);
        const i = cr(t, e, n);
        return i && s.appendChild(i, r), { renderText: r };
      }
      function Ki(t, e) {
        return (null != t ? t.toString() : "") + e.suffix;
      }
      function Xi(t, e, n, r) {
        let s = 0,
          i = 0,
          o = 0,
          l = 0,
          a = 0,
          u = null,
          c = null,
          h = !1,
          d = !1,
          p = null;
        for (let f = 0; f < e.length; f++) {
          const t = e[f];
          if (
            ((t.nodeIndex = f),
            (t.parent = u),
            (t.bindingIndex = s),
            (t.outputIndex = i),
            (t.renderParent = c),
            (o |= t.flags),
            (a |= t.matchedQueryIds),
            t.element)
          ) {
            const e = t.element;
            (e.publicProviders = u
              ? u.element.publicProviders
              : Object.create(null)),
              (e.allProviders = e.publicProviders),
              (h = !1),
              (d = !1),
              t.element.template &&
                (a |= t.element.template.nodeMatchedQueries);
          }
          if (
            (to(u, t, e.length),
            (s += t.bindings.length),
            (i += t.outputs.length),
            !c && 3 & t.flags && (p = t),
            20224 & t.flags)
          ) {
            h ||
              ((h = !0),
              (u.element.publicProviders = Object.create(
                u.element.publicProviders
              )),
              (u.element.allProviders = u.element.publicProviders));
            const e = 0 != (32768 & t.flags);
            0 == (8192 & t.flags) || e
              ? (u.element.publicProviders[Bn(t.provider.token)] = t)
              : (d ||
                  ((d = !0),
                  (u.element.allProviders = Object.create(
                    u.element.publicProviders
                  ))),
                (u.element.allProviders[Bn(t.provider.token)] = t)),
              e && (u.element.componentProvider = t);
          }
          if (
            (u
              ? ((u.childFlags |= t.flags),
                (u.directChildFlags |= t.flags),
                (u.childMatchedQueries |= t.matchedQueryIds),
                t.element &&
                  t.element.template &&
                  (u.childMatchedQueries |=
                    t.element.template.nodeMatchedQueries))
              : (l |= t.flags),
            t.childCount > 0)
          )
            (u = t), Ji(t) || (c = t);
          else
            for (; u && f === u.nodeIndex + u.childCount; ) {
              const t = u.parent;
              t &&
                ((t.childFlags |= u.childFlags),
                (t.childMatchedQueries |= u.childMatchedQueries)),
                (c = (u = t) && Ji(u) ? u.renderParent : u);
            }
        }
        return {
          factory: null,
          nodeFlags: o,
          rootNodeFlags: l,
          nodeMatchedQueries: a,
          flags: t,
          nodes: e,
          updateDirectives: n || Hn,
          updateRenderer: r || Hn,
          handleEvent: (t, n, r, s) => e[n].element.handleEvent(t, r, s),
          bindingCount: s,
          outputCount: i,
          lastRenderRootNode: p,
        };
      }
      function Ji(t) {
        return 0 != (1 & t.flags) && null === t.element.name;
      }
      function to(t, e, n) {
        const r = e.element && e.element.template;
        if (r) {
          if (!r.lastRenderRootNode)
            throw new Error(
              "Illegal State: Embedded templates without nodes are not allowed!"
            );
          if (r.lastRenderRootNode && 16777216 & r.lastRenderRootNode.flags)
            throw new Error(
              `Illegal State: Last root node of a template can't have embedded views, at index ${e.nodeIndex}!`
            );
        }
        if (20224 & e.flags && 0 == (1 & (t ? t.flags : 0)))
          throw new Error(
            `Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index ${e.nodeIndex}!`
          );
        if (e.query) {
          if (67108864 & e.flags && (!t || 0 == (16384 & t.flags)))
            throw new Error(
              `Illegal State: Content Query nodes need to be children of directives, at index ${e.nodeIndex}!`
            );
          if (134217728 & e.flags && t)
            throw new Error(
              `Illegal State: View Query nodes have to be top level nodes, at index ${e.nodeIndex}!`
            );
        }
        if (e.childCount) {
          const r = t ? t.nodeIndex + t.childCount : n - 1;
          if (e.nodeIndex <= r && e.nodeIndex + e.childCount > r)
            throw new Error(
              `Illegal State: childCount of node leads outside of parent, at index ${e.nodeIndex}!`
            );
        }
      }
      function eo(t, e, n, r) {
        const s = so(t.root, t.renderer, t, e, n);
        return io(s, t.component, r), oo(s), s;
      }
      function no(t, e, n) {
        const r = so(t, t.renderer, null, null, e);
        return io(r, n, n), oo(r), r;
      }
      function ro(t, e, n, r) {
        const s = e.element.componentRendererType;
        let i;
        return (
          (i = s
            ? t.root.rendererFactory.createRenderer(r, s)
            : t.root.renderer),
          so(t.root, i, t, e.element.componentProvider, n)
        );
      }
      function so(t, e, n, r, s) {
        const i = new Array(s.nodes.length),
          o = s.outputCount ? new Array(s.outputCount) : null;
        return {
          def: s,
          parent: n,
          viewContainerParent: null,
          parentNodeDef: r,
          context: null,
          component: null,
          nodes: i,
          state: 13,
          root: t,
          renderer: e,
          oldValues: new Array(s.bindingCount),
          disposables: o,
          initIndex: -1,
        };
      }
      function io(t, e, n) {
        (t.component = e), (t.context = n);
      }
      function oo(t) {
        let e;
        ir(t) &&
          (e = jn(t.parent, t.parentNodeDef.parent.nodeIndex).renderElement);
        const n = t.def,
          r = t.nodes;
        for (let s = 0; s < n.nodes.length; s++) {
          const i = n.nodes[s];
          let o;
          switch (($n.setCurrentNode(t, s), 201347067 & i.flags)) {
            case 1:
              const n = Fi(t, e, i);
              let l = void 0;
              if (33554432 & i.flags) {
                const e = dr(i.element.componentView);
                l = $n.createComponentView(t, i, e, n);
              }
              Ui(t, l, i, n),
                (o = {
                  renderElement: n,
                  componentView: l,
                  viewContainer: null,
                  template: i.element.template ? $r(t, i) : void 0,
                }),
                16777216 & i.flags && (o.viewContainer = jr(t, i, o));
              break;
            case 2:
              o = Yi(t, e, i);
              break;
            case 512:
            case 1024:
            case 2048:
            case 256:
              (o = r[s]) || 4096 & i.flags || (o = { instance: as(t, i) });
              break;
            case 16:
              o = { instance: us(t, i) };
              break;
            case 16384:
              (o = r[s]) || (o = { instance: cs(t, i) }),
                32768 & i.flags &&
                  io(
                    jn(t, i.parent.nodeIndex).componentView,
                    o.instance,
                    o.instance
                  );
              break;
            case 32:
            case 64:
            case 128:
              o = { value: void 0 };
              break;
            case 67108864:
            case 134217728:
              o = new Es();
              break;
            case 8:
              Zi(t, e, i), (o = void 0);
          }
          r[s] = o;
        }
        mo(t, go.CreateViewNodes), wo(t, 201326592, 268435456, 0);
      }
      function lo(t) {
        co(t),
          $n.updateDirectives(t, 1),
          vo(t, go.CheckNoChanges),
          $n.updateRenderer(t, 1),
          mo(t, go.CheckNoChanges),
          (t.state &= -97);
      }
      function ao(t) {
        1 & t.state ? ((t.state &= -2), (t.state |= 2)) : (t.state &= -3),
          Mn(t, 0, 256),
          co(t),
          $n.updateDirectives(t, 0),
          vo(t, go.CheckAndUpdate),
          wo(t, 67108864, 536870912, 0);
        let e = Mn(t, 256, 512);
        _s(t, 2097152 | (e ? 1048576 : 0)),
          $n.updateRenderer(t, 0),
          mo(t, go.CheckAndUpdate),
          wo(t, 134217728, 536870912, 0),
          _s(t, 8388608 | ((e = Mn(t, 512, 768)) ? 4194304 : 0)),
          2 & t.def.flags && (t.state &= -9),
          (t.state &= -97),
          Mn(t, 768, 1024);
      }
      function uo(t, e, n, r, s, i, o, l, a, u, c, h, d) {
        return 0 === n
          ? (function (t, e, n, r, s, i, o, l, a, u, c, h) {
              switch (201347067 & e.flags) {
                case 1:
                  return (function (t, e, n, r, s, i, o, l, a, u, c, h) {
                    const d = e.bindings.length;
                    let p = !1;
                    return (
                      d > 0 && Hi(t, e, 0, n) && (p = !0),
                      d > 1 && Hi(t, e, 1, r) && (p = !0),
                      d > 2 && Hi(t, e, 2, s) && (p = !0),
                      d > 3 && Hi(t, e, 3, i) && (p = !0),
                      d > 4 && Hi(t, e, 4, o) && (p = !0),
                      d > 5 && Hi(t, e, 5, l) && (p = !0),
                      d > 6 && Hi(t, e, 6, a) && (p = !0),
                      d > 7 && Hi(t, e, 7, u) && (p = !0),
                      d > 8 && Hi(t, e, 8, c) && (p = !0),
                      d > 9 && Hi(t, e, 9, h) && (p = !0),
                      p
                    );
                  })(t, e, n, r, s, i, o, l, a, u, c, h);
                case 2:
                  return (function (t, e, n, r, s, i, o, l, a, u, c, h) {
                    let d = !1;
                    const p = e.bindings,
                      f = p.length;
                    if (
                      (f > 0 && Kn(t, e, 0, n) && (d = !0),
                      f > 1 && Kn(t, e, 1, r) && (d = !0),
                      f > 2 && Kn(t, e, 2, s) && (d = !0),
                      f > 3 && Kn(t, e, 3, i) && (d = !0),
                      f > 4 && Kn(t, e, 4, o) && (d = !0),
                      f > 5 && Kn(t, e, 5, l) && (d = !0),
                      f > 6 && Kn(t, e, 6, a) && (d = !0),
                      f > 7 && Kn(t, e, 7, u) && (d = !0),
                      f > 8 && Kn(t, e, 8, c) && (d = !0),
                      f > 9 && Kn(t, e, 9, h) && (d = !0),
                      d)
                    ) {
                      let d = e.text.prefix;
                      f > 0 && (d += Ki(n, p[0])),
                        f > 1 && (d += Ki(r, p[1])),
                        f > 2 && (d += Ki(s, p[2])),
                        f > 3 && (d += Ki(i, p[3])),
                        f > 4 && (d += Ki(o, p[4])),
                        f > 5 && (d += Ki(l, p[5])),
                        f > 6 && (d += Ki(a, p[6])),
                        f > 7 && (d += Ki(u, p[7])),
                        f > 8 && (d += Ki(c, p[8])),
                        f > 9 && (d += Ki(h, p[9]));
                      const g = Vn(t, e.nodeIndex).renderText;
                      t.renderer.setValue(g, d);
                    }
                    return d;
                  })(t, e, n, r, s, i, o, l, a, u, c, h);
                case 16384:
                  return (function (t, e, n, r, s, i, o, l, a, u, c, h) {
                    const d = Ln(t, e.nodeIndex),
                      p = d.instance;
                    let f = !1,
                      g = void 0;
                    const m = e.bindings.length;
                    return (
                      m > 0 &&
                        Yn(t, e, 0, n) &&
                        ((f = !0), (g = vs(t, d, e, 0, n, g))),
                      m > 1 &&
                        Yn(t, e, 1, r) &&
                        ((f = !0), (g = vs(t, d, e, 1, r, g))),
                      m > 2 &&
                        Yn(t, e, 2, s) &&
                        ((f = !0), (g = vs(t, d, e, 2, s, g))),
                      m > 3 &&
                        Yn(t, e, 3, i) &&
                        ((f = !0), (g = vs(t, d, e, 3, i, g))),
                      m > 4 &&
                        Yn(t, e, 4, o) &&
                        ((f = !0), (g = vs(t, d, e, 4, o, g))),
                      m > 5 &&
                        Yn(t, e, 5, l) &&
                        ((f = !0), (g = vs(t, d, e, 5, l, g))),
                      m > 6 &&
                        Yn(t, e, 6, a) &&
                        ((f = !0), (g = vs(t, d, e, 6, a, g))),
                      m > 7 &&
                        Yn(t, e, 7, u) &&
                        ((f = !0), (g = vs(t, d, e, 7, u, g))),
                      m > 8 &&
                        Yn(t, e, 8, c) &&
                        ((f = !0), (g = vs(t, d, e, 8, c, g))),
                      m > 9 &&
                        Yn(t, e, 9, h) &&
                        ((f = !0), (g = vs(t, d, e, 9, h, g))),
                      g && p.ngOnChanges(g),
                      65536 & e.flags &&
                        Pn(t, 256, e.nodeIndex) &&
                        p.ngOnInit(),
                      262144 & e.flags && p.ngDoCheck(),
                      f
                    );
                  })(t, e, n, r, s, i, o, l, a, u, c, h);
                case 32:
                case 64:
                case 128:
                  return (function (t, e, n, r, s, i, o, l, a, u, c, h) {
                    const d = e.bindings;
                    let p = !1;
                    const f = d.length;
                    if (
                      (f > 0 && Kn(t, e, 0, n) && (p = !0),
                      f > 1 && Kn(t, e, 1, r) && (p = !0),
                      f > 2 && Kn(t, e, 2, s) && (p = !0),
                      f > 3 && Kn(t, e, 3, i) && (p = !0),
                      f > 4 && Kn(t, e, 4, o) && (p = !0),
                      f > 5 && Kn(t, e, 5, l) && (p = !0),
                      f > 6 && Kn(t, e, 6, a) && (p = !0),
                      f > 7 && Kn(t, e, 7, u) && (p = !0),
                      f > 8 && Kn(t, e, 8, c) && (p = !0),
                      f > 9 && Kn(t, e, 9, h) && (p = !0),
                      p)
                    ) {
                      const p = Fn(t, e.nodeIndex);
                      let g;
                      switch (201347067 & e.flags) {
                        case 32:
                          (g = new Array(d.length)),
                            f > 0 && (g[0] = n),
                            f > 1 && (g[1] = r),
                            f > 2 && (g[2] = s),
                            f > 3 && (g[3] = i),
                            f > 4 && (g[4] = o),
                            f > 5 && (g[5] = l),
                            f > 6 && (g[6] = a),
                            f > 7 && (g[7] = u),
                            f > 8 && (g[8] = c),
                            f > 9 && (g[9] = h);
                          break;
                        case 64:
                          (g = {}),
                            f > 0 && (g[d[0].name] = n),
                            f > 1 && (g[d[1].name] = r),
                            f > 2 && (g[d[2].name] = s),
                            f > 3 && (g[d[3].name] = i),
                            f > 4 && (g[d[4].name] = o),
                            f > 5 && (g[d[5].name] = l),
                            f > 6 && (g[d[6].name] = a),
                            f > 7 && (g[d[7].name] = u),
                            f > 8 && (g[d[8].name] = c),
                            f > 9 && (g[d[9].name] = h);
                          break;
                        case 128:
                          const t = n;
                          switch (f) {
                            case 1:
                              g = t.transform(n);
                              break;
                            case 2:
                              g = t.transform(r);
                              break;
                            case 3:
                              g = t.transform(r, s);
                              break;
                            case 4:
                              g = t.transform(r, s, i);
                              break;
                            case 5:
                              g = t.transform(r, s, i, o);
                              break;
                            case 6:
                              g = t.transform(r, s, i, o, l);
                              break;
                            case 7:
                              g = t.transform(r, s, i, o, l, a);
                              break;
                            case 8:
                              g = t.transform(r, s, i, o, l, a, u);
                              break;
                            case 9:
                              g = t.transform(r, s, i, o, l, a, u, c);
                              break;
                            case 10:
                              g = t.transform(r, s, i, o, l, a, u, c, h);
                          }
                      }
                      p.value = g;
                    }
                    return p;
                  })(t, e, n, r, s, i, o, l, a, u, c, h);
                default:
                  throw "unreachable";
              }
            })(t, e, r, s, i, o, l, a, u, c, h, d)
          : (function (t, e, n) {
              switch (201347067 & e.flags) {
                case 1:
                  return (function (t, e, n) {
                    let r = !1;
                    for (let s = 0; s < n.length; s++)
                      Hi(t, e, s, n[s]) && (r = !0);
                    return r;
                  })(t, e, n);
                case 2:
                  return (function (t, e, n) {
                    const r = e.bindings;
                    let s = !1;
                    for (let i = 0; i < n.length; i++)
                      Kn(t, e, i, n[i]) && (s = !0);
                    if (s) {
                      let s = "";
                      for (let t = 0; t < n.length; t++) s += Ki(n[t], r[t]);
                      s = e.text.prefix + s;
                      const i = Vn(t, e.nodeIndex).renderText;
                      t.renderer.setValue(i, s);
                    }
                    return s;
                  })(t, e, n);
                case 16384:
                  return (function (t, e, n) {
                    const r = Ln(t, e.nodeIndex),
                      s = r.instance;
                    let i = !1,
                      o = void 0;
                    for (let l = 0; l < n.length; l++)
                      Yn(t, e, l, n[l]) &&
                        ((i = !0), (o = vs(t, r, e, l, n[l], o)));
                    return (
                      o && s.ngOnChanges(o),
                      65536 & e.flags &&
                        Pn(t, 256, e.nodeIndex) &&
                        s.ngOnInit(),
                      262144 & e.flags && s.ngDoCheck(),
                      i
                    );
                  })(t, e, n);
                case 32:
                case 64:
                case 128:
                  return (function (t, e, n) {
                    const r = e.bindings;
                    let s = !1;
                    for (let i = 0; i < n.length; i++)
                      Kn(t, e, i, n[i]) && (s = !0);
                    if (s) {
                      const s = Fn(t, e.nodeIndex);
                      let i;
                      switch (201347067 & e.flags) {
                        case 32:
                          i = n;
                          break;
                        case 64:
                          i = {};
                          for (let e = 0; e < n.length; e++)
                            i[r[e].name] = n[e];
                          break;
                        case 128:
                          const t = n[0],
                            s = n.slice(1);
                          i = t.transform(...s);
                      }
                      s.value = i;
                    }
                    return s;
                  })(t, e, n);
                default:
                  throw "unreachable";
              }
            })(t, e, r);
      }
      function co(t) {
        const e = t.def;
        if (4 & e.nodeFlags)
          for (let n = 0; n < e.nodes.length; n++) {
            const r = e.nodes[n];
            if (4 & r.flags) {
              const e = jn(t, n).template._projectedViews;
              if (e)
                for (let n = 0; n < e.length; n++) {
                  const r = e[n];
                  (r.state |= 32), tr(r, t);
                }
            } else 0 == (4 & r.childFlags) && (n += r.childCount);
          }
      }
      function ho(t, e, n, r, s, i, o, l, a, u, c, h, d) {
        return (
          0 === n
            ? (function (t, e, n, r, s, i, o, l, a, u, c, h) {
                const d = e.bindings.length;
                d > 0 && Xn(t, e, 0, n),
                  d > 1 && Xn(t, e, 1, r),
                  d > 2 && Xn(t, e, 2, s),
                  d > 3 && Xn(t, e, 3, i),
                  d > 4 && Xn(t, e, 4, o),
                  d > 5 && Xn(t, e, 5, l),
                  d > 6 && Xn(t, e, 6, a),
                  d > 7 && Xn(t, e, 7, u),
                  d > 8 && Xn(t, e, 8, c),
                  d > 9 && Xn(t, e, 9, h);
              })(t, e, r, s, i, o, l, a, u, c, h, d)
            : (function (t, e, n) {
                for (let r = 0; r < n.length; r++) Xn(t, e, r, n[r]);
              })(t, e, r),
          !1
        );
      }
      function po(t, e) {
        if (Un(t, e.nodeIndex).dirty)
          throw Rn(
            $n.createDebugContext(t, e.nodeIndex),
            `Query ${e.query.id} not dirty`,
            `Query ${e.query.id} dirty`,
            0 != (1 & t.state)
          );
      }
      function fo(t) {
        if (!(128 & t.state)) {
          if (
            (vo(t, go.Destroy), mo(t, go.Destroy), _s(t, 131072), t.disposables)
          )
            for (let e = 0; e < t.disposables.length; e++) t.disposables[e]();
          !(function (t) {
            if (!(16 & t.state)) return;
            const e = nr(t);
            if (e) {
              const n = e.template._projectedViews;
              n && (Nr(n, n.indexOf(t)), $n.dirtyParentQueries(t));
            }
          })(t),
            t.renderer.destroyNode &&
              (function (t) {
                const e = t.def.nodes.length;
                for (let n = 0; n < e; n++) {
                  const e = t.def.nodes[n];
                  1 & e.flags
                    ? t.renderer.destroyNode(jn(t, n).renderElement)
                    : 2 & e.flags
                    ? t.renderer.destroyNode(Vn(t, n).renderText)
                    : (67108864 & e.flags || 134217728 & e.flags) &&
                      Un(t, n).destroy();
                }
              })(t),
            ir(t) && t.renderer.destroy(),
            (t.state |= 128);
        }
      }
      const go = (function () {
        var t = {
          CreateViewNodes: 0,
          CheckNoChanges: 1,
          CheckNoChangesProjectedViews: 2,
          CheckAndUpdate: 3,
          CheckAndUpdateProjectedViews: 4,
          Destroy: 5,
        };
        return (
          (t[t.CreateViewNodes] = "CreateViewNodes"),
          (t[t.CheckNoChanges] = "CheckNoChanges"),
          (t[t.CheckNoChangesProjectedViews] = "CheckNoChangesProjectedViews"),
          (t[t.CheckAndUpdate] = "CheckAndUpdate"),
          (t[t.CheckAndUpdateProjectedViews] = "CheckAndUpdateProjectedViews"),
          (t[t.Destroy] = "Destroy"),
          t
        );
      })();
      function mo(t, e) {
        const n = t.def;
        if (33554432 & n.nodeFlags)
          for (let r = 0; r < n.nodes.length; r++) {
            const s = n.nodes[r];
            33554432 & s.flags
              ? _o(jn(t, r).componentView, e)
              : 0 == (33554432 & s.childFlags) && (r += s.childCount);
          }
      }
      function vo(t, e) {
        const n = t.def;
        if (16777216 & n.nodeFlags)
          for (let r = 0; r < n.nodes.length; r++) {
            const s = n.nodes[r];
            if (16777216 & s.flags) {
              const n = jn(t, r).viewContainer._embeddedViews;
              for (let t = 0; t < n.length; t++) _o(n[t], e);
            } else 0 == (16777216 & s.childFlags) && (r += s.childCount);
          }
      }
      function _o(t, e) {
        const n = t.state;
        switch (e) {
          case go.CheckNoChanges:
            0 == (128 & n) &&
              (12 == (12 & n)
                ? lo(t)
                : 64 & n && bo(t, go.CheckNoChangesProjectedViews));
            break;
          case go.CheckNoChangesProjectedViews:
            0 == (128 & n) && (32 & n ? lo(t) : 64 & n && bo(t, e));
            break;
          case go.CheckAndUpdate:
            0 == (128 & n) &&
              (12 == (12 & n)
                ? ao(t)
                : 64 & n && bo(t, go.CheckAndUpdateProjectedViews));
            break;
          case go.CheckAndUpdateProjectedViews:
            0 == (128 & n) && (32 & n ? ao(t) : 64 & n && bo(t, e));
            break;
          case go.Destroy:
            fo(t);
            break;
          case go.CreateViewNodes:
            oo(t);
        }
      }
      function bo(t, e) {
        vo(t, e), mo(t, e);
      }
      function wo(t, e, n, r) {
        if (!(t.def.nodeFlags & e && t.def.nodeFlags & n)) return;
        const s = t.def.nodes.length;
        for (let i = 0; i < s; i++) {
          const s = t.def.nodes[i];
          if (s.flags & e && s.flags & n)
            switch (($n.setCurrentNode(t, s.nodeIndex), r)) {
              case 0:
                Wi(t, s);
                break;
              case 1:
                po(t, s);
            }
          (s.childFlags & e && s.childFlags & n) || (i += s.childCount);
        }
      }
      let yo = !1;
      function Co(t, e, n, r, s, i) {
        const o = s.injector.get(rn);
        return no(So(t, s, o, e, n), r, i);
      }
      function Eo(t, e, n, r, s, i) {
        const o = s.injector.get(rn),
          l = So(t, s, new rl(o), e, n),
          a = Mo(r);
        return tl(Uo.create, no, null, [l, a, i]);
      }
      function So(t, e, n, r, s) {
        const i = e.injector.get(ke),
          o = e.injector.get(ee),
          l = n.createRenderer(null, null);
        return {
          ngModule: e,
          injector: t,
          projectableNodes: r,
          selectorOrNode: s,
          sanitizer: i,
          rendererFactory: n,
          renderer: l,
          errorHandler: o,
        };
      }
      function xo(t, e, n, r) {
        const s = Mo(n);
        return tl(Uo.create, eo, null, [t, e, s, r]);
      }
      function To(t, e, n, r) {
        return (
          (n = Io.get(e.element.componentProvider.provider.token) || Mo(n)),
          tl(Uo.create, ro, null, [t, e, n, r])
        );
      }
      function ko(t, e, n, r) {
        return Zr(
          t,
          e,
          n,
          (function (t) {
            const { hasOverrides: e, hasDeprecatedOverrides: n } = (function (
              t
            ) {
              let e = !1,
                n = !1;
              return 0 === Ao.size
                ? { hasOverrides: e, hasDeprecatedOverrides: n }
                : (t.providers.forEach((t) => {
                    const r = Ao.get(t.token);
                    3840 & t.flags &&
                      r &&
                      ((e = !0), (n = n || r.deprecatedBehavior));
                  }),
                  t.modules.forEach((t) => {
                    Oo.forEach((r, s) => {
                      gt(s).providedIn === t &&
                        ((e = !0), (n = n || r.deprecatedBehavior));
                    });
                  }),
                  { hasOverrides: e, hasDeprecatedOverrides: n });
            })(t);
            return e
              ? ((function (t) {
                  for (let e = 0; e < t.providers.length; e++) {
                    const r = t.providers[e];
                    n && (r.flags |= 4096);
                    const s = Ao.get(r.token);
                    s &&
                      ((r.flags = (-3841 & r.flags) | s.flags),
                      (r.deps = ur(s.deps)),
                      (r.value = s.value));
                  }
                  if (Oo.size > 0) {
                    let e = new Set(t.modules);
                    Oo.forEach((r, s) => {
                      if (e.has(gt(s).providedIn)) {
                        let e = {
                          token: s,
                          flags: r.flags | (n ? 4096 : 0),
                          deps: ur(r.deps),
                          value: r.value,
                          index: t.providers.length,
                        };
                        t.providers.push(e), (t.providersByKey[Bn(s)] = e);
                      }
                    });
                  }
                })((t = t.factory(() => Hn))),
                t)
              : t;
          })(r)
        );
      }
      const Ao = new Map(),
        Oo = new Map(),
        Io = new Map();
      function Ro(t) {
        let e;
        Ao.set(t.token, t),
          "function" == typeof t.token &&
            (e = gt(t.token)) &&
            "function" == typeof e.providedIn &&
            Oo.set(t.token, t);
      }
      function No(t, e) {
        const n = dr(e.viewDefFactory),
          r = dr(n.nodes[0].element.componentView);
        Io.set(t, r);
      }
      function Do() {
        Ao.clear(), Oo.clear(), Io.clear();
      }
      function Mo(t) {
        if (0 === Ao.size) return t;
        const e = (function (t) {
          const e = [];
          let n = null;
          for (let r = 0; r < t.nodes.length; r++) {
            const s = t.nodes[r];
            1 & s.flags && (n = s),
              n &&
                3840 & s.flags &&
                Ao.has(s.provider.token) &&
                (e.push(n.nodeIndex), (n = null));
          }
          return e;
        })(t);
        if (0 === e.length) return t;
        t = t.factory(() => Hn);
        for (let r = 0; r < e.length; r++) n(t, e[r]);
        return t;
        function n(t, e) {
          for (let n = e + 1; n < t.nodes.length; n++) {
            const e = t.nodes[n];
            if (1 & e.flags) return;
            if (3840 & e.flags) {
              const t = e.provider,
                n = Ao.get(t.token);
              n &&
                ((e.flags = (-3841 & e.flags) | n.flags),
                (t.deps = ur(n.deps)),
                (t.value = n.value));
            }
          }
        }
      }
      function Po(t, e, n, r, s, i, o, l, a, u, c, h, d) {
        const p = t.def.nodes[e];
        return (
          uo(t, p, n, r, s, i, o, l, a, u, c, h, d),
          224 & p.flags ? Fn(t, e).value : void 0
        );
      }
      function Vo(t, e, n, r, s, i, o, l, a, u, c, h, d) {
        const p = t.def.nodes[e];
        return (
          ho(t, p, n, r, s, i, o, l, a, u, c, h, d),
          224 & p.flags ? Fn(t, e).value : void 0
        );
      }
      function jo(t) {
        return tl(Uo.detectChanges, ao, null, [t]);
      }
      function Lo(t) {
        return tl(Uo.checkNoChanges, lo, null, [t]);
      }
      function Fo(t) {
        return tl(Uo.destroy, fo, null, [t]);
      }
      const Uo = (function () {
        var t = {
          create: 0,
          detectChanges: 1,
          checkNoChanges: 2,
          destroy: 3,
          handleEvent: 4,
        };
        return (
          (t[t.create] = "create"),
          (t[t.detectChanges] = "detectChanges"),
          (t[t.checkNoChanges] = "checkNoChanges"),
          (t[t.destroy] = "destroy"),
          (t[t.handleEvent] = "handleEvent"),
          t
        );
      })();
      let $o, Ho, zo;
      function Bo(t, e) {
        (Ho = t), (zo = e);
      }
      function Wo(t, e, n, r) {
        return (
          Bo(t, e), tl(Uo.handleEvent, t.def.handleEvent, null, [t, e, n, r])
        );
      }
      function Go(t, e) {
        if (128 & t.state) throw Dn(Uo[$o]);
        return (
          Bo(t, Yo(t, 0)),
          t.def.updateDirectives(function (t, n, r, ...s) {
            const i = t.def.nodes[n];
            return (
              0 === e ? Zo(t, i, r, s) : Qo(t, i, r, s),
              16384 & i.flags && Bo(t, Yo(t, n)),
              224 & i.flags ? Fn(t, i.nodeIndex).value : void 0
            );
          }, t)
        );
      }
      function qo(t, e) {
        if (128 & t.state) throw Dn(Uo[$o]);
        return (
          Bo(t, Ko(t, 0)),
          t.def.updateRenderer(function (t, n, r, ...s) {
            const i = t.def.nodes[n];
            return (
              0 === e ? Zo(t, i, r, s) : Qo(t, i, r, s),
              3 & i.flags && Bo(t, Ko(t, n)),
              224 & i.flags ? Fn(t, i.nodeIndex).value : void 0
            );
          }, t)
        );
      }
      function Zo(t, e, n, r) {
        if (uo(t, e, n, ...r)) {
          const o = 1 === n ? r[0] : r;
          if (16384 & e.flags) {
            const n = {};
            for (let t = 0; t < e.bindings.length; t++) {
              const r = e.bindings[t],
                l = o[t];
              8 & r.flags &&
                (n[
                  ((s = r.nonMinifiedName),
                  (i = void 0),
                  (i = s.replace(/[$@]/g, "_")),
                  `ng-reflect-${(s = i.replace(
                    Ie,
                    (...t) => "-" + t[1].toLowerCase()
                  ))}`)
                ] = Re(l));
            }
            const r = e.parent,
              l = jn(t, r.nodeIndex).renderElement;
            if (r.element.name)
              for (let e in n) {
                const r = n[e];
                null != r
                  ? t.renderer.setAttribute(l, e, r)
                  : t.renderer.removeAttribute(l, e);
              }
            else
              t.renderer.setValue(l, `bindings=${JSON.stringify(n, null, 2)}`);
          }
        }
        var s, i;
      }
      function Qo(t, e, n, r) {
        ho(t, e, n, ...r);
      }
      function Yo(t, e) {
        for (let n = e; n < t.def.nodes.length; n++) {
          const e = t.def.nodes[n];
          if (16384 & e.flags && e.bindings && e.bindings.length) return n;
        }
        return null;
      }
      function Ko(t, e) {
        for (let n = e; n < t.def.nodes.length; n++) {
          const e = t.def.nodes[n];
          if (3 & e.flags && e.bindings && e.bindings.length) return n;
        }
        return null;
      }
      class Xo {
        constructor(t, e) {
          (this.view = t),
            (this.nodeIndex = e),
            null == e && (this.nodeIndex = e = 0),
            (this.nodeDef = t.def.nodes[e]);
          let n = this.nodeDef,
            r = t;
          for (; n && 0 == (1 & n.flags); ) n = n.parent;
          if (!n) for (; !n && r; ) (n = rr(r)), (r = r.parent);
          (this.elDef = n), (this.elView = r);
        }
        get elOrCompView() {
          return (
            jn(this.elView, this.elDef.nodeIndex).componentView || this.view
          );
        }
        get injector() {
          return zr(this.elView, this.elDef);
        }
        get component() {
          return this.elOrCompView.component;
        }
        get context() {
          return this.elOrCompView.context;
        }
        get providerTokens() {
          const t = [];
          if (this.elDef)
            for (
              let e = this.elDef.nodeIndex + 1;
              e <= this.elDef.nodeIndex + this.elDef.childCount;
              e++
            ) {
              const n = this.elView.def.nodes[e];
              20224 & n.flags && t.push(n.provider.token), (e += n.childCount);
            }
          return t;
        }
        get references() {
          const t = {};
          if (this.elDef) {
            Jo(this.elView, this.elDef, t);
            for (
              let e = this.elDef.nodeIndex + 1;
              e <= this.elDef.nodeIndex + this.elDef.childCount;
              e++
            ) {
              const n = this.elView.def.nodes[e];
              20224 & n.flags && Jo(this.elView, n, t), (e += n.childCount);
            }
          }
          return t;
        }
        get componentRenderElement() {
          const t = (function (t) {
            for (; t && !ir(t); ) t = t.parent;
            return t.parent ? jn(t.parent, rr(t).nodeIndex) : null;
          })(this.elOrCompView);
          return t ? t.renderElement : void 0;
        }
        get renderNode() {
          return 2 & this.nodeDef.flags
            ? sr(this.view, this.nodeDef)
            : sr(this.elView, this.elDef);
        }
        logError(t, ...e) {
          let n, r;
          2 & this.nodeDef.flags
            ? ((n = this.view.def), (r = this.nodeDef.nodeIndex))
            : ((n = this.elView.def), (r = this.elDef.nodeIndex));
          const s = (function (t, e) {
            let n = -1;
            for (let r = 0; r <= e; r++) 3 & t.nodes[r].flags && n++;
            return n;
          })(n, r);
          let i = -1;
          n.factory(() => (++i === s ? t.error.bind(t, ...e) : Hn)),
            i < s &&
              (t.error(
                "Illegal state: the ViewDefinitionFactory did not call the logger!"
              ),
              t.error(...e));
        }
      }
      function Jo(t, e, n) {
        for (let r in e.references) n[r] = qi(t, e, e.references[r]);
      }
      function tl(t, e, n, r) {
        const s = $o,
          i = Ho,
          o = zo;
        try {
          $o = t;
          const a = e.apply(n, r);
          return (Ho = i), (zo = o), ($o = s), a;
        } catch (l) {
          if (Xt(l) || !Ho) throw l;
          throw (function (t, e) {
            return (
              t instanceof Error || (t = new Error(t.toString())), Nn(t, e), t
            );
          })(l, nl());
        }
      }
      function nl() {
        return Ho ? new Xo(Ho, zo) : null;
      }
      class rl {
        constructor(t) {
          this.delegate = t;
        }
        createRenderer(t, e) {
          return new sl(this.delegate.createRenderer(t, e));
        }
        begin() {
          this.delegate.begin && this.delegate.begin();
        }
        end() {
          this.delegate.end && this.delegate.end();
        }
        whenRenderingDone() {
          return this.delegate.whenRenderingDone
            ? this.delegate.whenRenderingDone()
            : Promise.resolve(null);
        }
      }
      class sl {
        constructor(t) {
          (this.delegate = t),
            (this.debugContextFactory = nl),
            (this.data = this.delegate.data);
        }
        createDebugContext(t) {
          return this.debugContextFactory(t);
        }
        destroyNode(t) {
          !(function (t) {
            ki.delete(t.nativeNode);
          })(Ai(t)),
            this.delegate.destroyNode && this.delegate.destroyNode(t);
        }
        destroy() {
          this.delegate.destroy();
        }
        createElement(t, e) {
          const n = this.delegate.createElement(t, e),
            r = this.createDebugContext(n);
          if (r) {
            const e = new Ti(n, null, r);
            (e.name = t), Oi(e);
          }
          return n;
        }
        createComment(t) {
          const e = this.delegate.createComment(t),
            n = this.createDebugContext(e);
          return n && Oi(new xi(e, null, n)), e;
        }
        createText(t) {
          const e = this.delegate.createText(t),
            n = this.createDebugContext(e);
          return n && Oi(new xi(e, null, n)), e;
        }
        appendChild(t, e) {
          const n = Ai(t),
            r = Ai(e);
          n && r && n instanceof Ti && n.addChild(r),
            this.delegate.appendChild(t, e);
        }
        insertBefore(t, e, n) {
          const r = Ai(t),
            s = Ai(e),
            i = Ai(n);
          r && s && r instanceof Ti && r.insertBefore(i, s),
            this.delegate.insertBefore(t, e, n);
        }
        removeChild(t, e) {
          const n = Ai(t),
            r = Ai(e);
          n && r && n instanceof Ti && n.removeChild(r),
            this.delegate.removeChild(t, e);
        }
        selectRootElement(t, e) {
          const n = this.delegate.selectRootElement(t, e),
            r = nl();
          return r && Oi(new Ti(n, null, r)), n;
        }
        setAttribute(t, e, n, r) {
          const s = Ai(t);
          s && s instanceof Ti && (s.attributes[r ? r + ":" + e : e] = n),
            this.delegate.setAttribute(t, e, n, r);
        }
        removeAttribute(t, e, n) {
          const r = Ai(t);
          r && r instanceof Ti && (r.attributes[n ? n + ":" + e : e] = null),
            this.delegate.removeAttribute(t, e, n);
        }
        addClass(t, e) {
          const n = Ai(t);
          n && n instanceof Ti && (n.classes[e] = !0),
            this.delegate.addClass(t, e);
        }
        removeClass(t, e) {
          const n = Ai(t);
          n && n instanceof Ti && (n.classes[e] = !1),
            this.delegate.removeClass(t, e);
        }
        setStyle(t, e, n, r) {
          const s = Ai(t);
          s && s instanceof Ti && (s.styles[e] = n),
            this.delegate.setStyle(t, e, n, r);
        }
        removeStyle(t, e, n) {
          const r = Ai(t);
          r && r instanceof Ti && (r.styles[e] = null),
            this.delegate.removeStyle(t, e, n);
        }
        setProperty(t, e, n) {
          const r = Ai(t);
          r && r instanceof Ti && (r.properties[e] = n),
            this.delegate.setProperty(t, e, n);
        }
        listen(t, e, n) {
          if ("string" != typeof t) {
            const r = Ai(t);
            r && r.listeners.push(new Si(e, n));
          }
          return this.delegate.listen(t, e, n);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setValue(t, e) {
          return this.delegate.setValue(t, e);
        }
      }
      function il(t, e, n) {
        return new ol(t, e, n);
      }
      class ol extends Xe {
        constructor(t, e, n) {
          super(),
            (this.moduleType = t),
            (this._bootstrapComponents = e),
            (this._ngModuleDefFactory = n);
        }
        create(t) {
          !(function () {
            if (yo) return;
            yo = !0;
            const t = se()
              ? {
                  setCurrentNode: Bo,
                  createRootView: Eo,
                  createEmbeddedView: xo,
                  createComponentView: To,
                  createNgModuleRef: ko,
                  overrideProvider: Ro,
                  overrideComponentView: No,
                  clearOverrides: Do,
                  checkAndUpdateView: jo,
                  checkNoChangesView: Lo,
                  destroyView: Fo,
                  createDebugContext: (t, e) => new Xo(t, e),
                  handleEvent: Wo,
                  updateDirectives: Go,
                  updateRenderer: qo,
                }
              : {
                  setCurrentNode: () => {},
                  createRootView: Co,
                  createEmbeddedView: eo,
                  createComponentView: ro,
                  createNgModuleRef: Zr,
                  overrideProvider: Hn,
                  overrideComponentView: Hn,
                  clearOverrides: Hn,
                  checkAndUpdateView: ao,
                  checkNoChangesView: lo,
                  destroyView: fo,
                  createDebugContext: (t, e) => new Xo(t, e),
                  handleEvent: (t, e, n, r) => t.def.handleEvent(t, e, n, r),
                  updateDirectives: (t, e) =>
                    t.def.updateDirectives(0 === e ? Po : Vo, t),
                  updateRenderer: (t, e) =>
                    t.def.updateRenderer(0 === e ? Po : Vo, t),
                };
            ($n.setCurrentNode = t.setCurrentNode),
              ($n.createRootView = t.createRootView),
              ($n.createEmbeddedView = t.createEmbeddedView),
              ($n.createComponentView = t.createComponentView),
              ($n.createNgModuleRef = t.createNgModuleRef),
              ($n.overrideProvider = t.overrideProvider),
              ($n.overrideComponentView = t.overrideComponentView),
              ($n.clearOverrides = t.clearOverrides),
              ($n.checkAndUpdateView = t.checkAndUpdateView),
              ($n.checkNoChangesView = t.checkNoChangesView),
              ($n.destroyView = t.destroyView),
              ($n.resolveDep = gs),
              ($n.createDebugContext = t.createDebugContext),
              ($n.handleEvent = t.handleEvent),
              ($n.updateDirectives = t.updateDirectives),
              ($n.updateRenderer = t.updateRenderer),
              ($n.dirtyParentQueries = Bi);
          })();
          const e = (function (t) {
            const e = Array.from(t.providers),
              n = Array.from(t.modules),
              r = {};
            for (const s in t.providersByKey) r[s] = t.providersByKey[s];
            return {
              factory: t.factory,
              isRoot: t.isRoot,
              providers: e,
              modules: n,
              providersByKey: r,
            };
          })(dr(this._ngModuleDefFactory));
          return $n.createNgModuleRef(
            this.moduleType,
            t || Nt.NULL,
            this._bootstrapComponents,
            e
          );
        }
      }
      class ll {}
      class al {
        constructor() {
          this.navbarCollapsed = !0;
        }
        get showTestCases() {
          return "true" === localStorage.getItem("showTestCases");
        }
      }
      class ul {}
      const cl = new kt("Location Initialized");
      class hl {}
      const dl = new kt("appBaseHref");
      class pl {
        constructor(t, e) {
          (this._subject = new Cs()),
            (this._urlChangeListeners = []),
            (this._platformStrategy = t);
          const n = this._platformStrategy.getBaseHref();
          (this._platformLocation = e),
            (this._baseHref = pl.stripTrailingSlash(fl(n))),
            this._platformStrategy.onPopState((t) => {
              this._subject.emit({
                url: this.path(!0),
                pop: !0,
                state: t.state,
                type: t.type,
              });
            });
        }
        path(t = !1) {
          return this.normalize(this._platformStrategy.path(t));
        }
        getState() {
          return this._platformLocation.getState();
        }
        isCurrentPathEqualTo(t, e = "") {
          return this.path() == this.normalize(t + pl.normalizeQueryParams(e));
        }
        normalize(t) {
          return pl.stripTrailingSlash(
            (function (t, e) {
              return t && e.startsWith(t) ? e.substring(t.length) : e;
            })(this._baseHref, fl(t))
          );
        }
        prepareExternalUrl(t) {
          return (
            t && "/" !== t[0] && (t = "/" + t),
            this._platformStrategy.prepareExternalUrl(t)
          );
        }
        go(t, e = "", n = null) {
          this._platformStrategy.pushState(n, "", t, e),
            this._notifyUrlChangeListeners(
              this.prepareExternalUrl(t + pl.normalizeQueryParams(e)),
              n
            );
        }
        replaceState(t, e = "", n = null) {
          this._platformStrategy.replaceState(n, "", t, e),
            this._notifyUrlChangeListeners(
              this.prepareExternalUrl(t + pl.normalizeQueryParams(e)),
              n
            );
        }
        forward() {
          this._platformStrategy.forward();
        }
        back() {
          this._platformStrategy.back();
        }
        onUrlChange(t) {
          this._urlChangeListeners.push(t),
            this.subscribe((t) => {
              this._notifyUrlChangeListeners(t.url, t.state);
            });
        }
        _notifyUrlChangeListeners(t = "", e) {
          this._urlChangeListeners.forEach((n) => n(t, e));
        }
        subscribe(t, e, n) {
          return this._subject.subscribe({ next: t, error: e, complete: n });
        }
        static normalizeQueryParams(t) {
          return t && "?" !== t[0] ? "?" + t : t;
        }
        static joinWithSlash(t, e) {
          if (0 == t.length) return e;
          if (0 == e.length) return t;
          let n = 0;
          return (
            t.endsWith("/") && n++,
            e.startsWith("/") && n++,
            2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
          );
        }
        static stripTrailingSlash(t) {
          const e = t.match(/#|\?|$/),
            n = (e && e.index) || t.length;
          return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
        }
      }
      function fl(t) {
        return t.replace(/\/index.html$/, "");
      }
      class gl extends hl {
        constructor(t, e) {
          super(),
            (this._platformLocation = t),
            (this._baseHref = ""),
            null != e && (this._baseHref = e);
        }
        onPopState(t) {
          this._platformLocation.onPopState(t),
            this._platformLocation.onHashChange(t);
        }
        getBaseHref() {
          return this._baseHref;
        }
        path(t = !1) {
          let e = this._platformLocation.hash;
          return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e;
        }
        prepareExternalUrl(t) {
          const e = pl.joinWithSlash(this._baseHref, t);
          return e.length > 0 ? "#" + e : e;
        }
        pushState(t, e, n, r) {
          let s = this.prepareExternalUrl(n + pl.normalizeQueryParams(r));
          0 == s.length && (s = this._platformLocation.pathname),
            this._platformLocation.pushState(t, e, s);
        }
        replaceState(t, e, n, r) {
          let s = this.prepareExternalUrl(n + pl.normalizeQueryParams(r));
          0 == s.length && (s = this._platformLocation.pathname),
            this._platformLocation.replaceState(t, e, s);
        }
        forward() {
          this._platformLocation.forward();
        }
        back() {
          this._platformLocation.back();
        }
      }
      class ml extends hl {
        constructor(t, e) {
          if (
            (super(),
            (this._platformLocation = t),
            null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
            null == e)
          )
            throw new Error(
              "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
            );
          this._baseHref = e;
        }
        onPopState(t) {
          this._platformLocation.onPopState(t),
            this._platformLocation.onHashChange(t);
        }
        getBaseHref() {
          return this._baseHref;
        }
        prepareExternalUrl(t) {
          return pl.joinWithSlash(this._baseHref, t);
        }
        path(t = !1) {
          const e =
              this._platformLocation.pathname +
              pl.normalizeQueryParams(this._platformLocation.search),
            n = this._platformLocation.hash;
          return n && t ? `${e}${n}` : e;
        }
        pushState(t, e, n, r) {
          const s = this.prepareExternalUrl(n + pl.normalizeQueryParams(r));
          this._platformLocation.pushState(t, e, s);
        }
        replaceState(t, e, n, r) {
          const s = this.prepareExternalUrl(n + pl.normalizeQueryParams(r));
          this._platformLocation.replaceState(t, e, s);
        }
        forward() {
          this._platformLocation.forward();
        }
        back() {
          this._platformLocation.back();
        }
      }
      const vl = void 0;
      var _l = [
        "en",
        [["a", "p"], ["AM", "PM"], vl],
        [["AM", "PM"], vl, vl],
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
        vl,
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
        vl,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", vl, "{1} 'at' {0}", vl],
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
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      const bl = {},
        wl = (function () {
          var t = { Zero: 0, One: 1, Two: 2, Few: 3, Many: 4, Other: 5 };
          return (
            (t[t.Zero] = "Zero"),
            (t[t.One] = "One"),
            (t[t.Two] = "Two"),
            (t[t.Few] = "Few"),
            (t[t.Many] = "Many"),
            (t[t.Other] = "Other"),
            t
          );
        })(),
        yl = new kt("UseV4Plurals");
      class Cl {}
      class El extends Cl {
        constructor(t, e) {
          super(), (this.locale = t), (this.deprecatedPluralFn = e);
        }
        getPluralCategory(t, e) {
          switch (
            this.deprecatedPluralFn
              ? this.deprecatedPluralFn(e || this.locale, t)
              : (function (t) {
                  return (function (t) {
                    const e = t.toLowerCase().replace(/_/g, "-");
                    let n = bl[e];
                    if (n) return n;
                    const r = e.split("-")[0];
                    if ((n = bl[r])) return n;
                    if ("en" === r) return _l;
                    throw new Error(
                      `Missing locale data for the locale "${t}".`
                    );
                  })(t)[18];
                })(e || this.locale)(t)
          ) {
            case wl.Zero:
              return "zero";
            case wl.One:
              return "one";
            case wl.Two:
              return "two";
            case wl.Few:
              return "few";
            case wl.Many:
              return "many";
            default:
              return "other";
          }
        }
      }
      class Sl {
        constructor(t, e, n, r) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = n),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      class xl {
        constructor(t, e, n) {
          (this._viewContainer = t),
            (this._template = e),
            (this._differs = n),
            (this._ngForOfDirty = !0),
            (this._differ = null);
        }
        set ngForOf(t) {
          (this._ngForOf = t), (this._ngForOfDirty = !0);
        }
        set ngForTrackBy(t) {
          se() &&
            null != t &&
            "function" != typeof t &&
            console &&
            console.warn &&
            console.warn(
              `trackBy must be a function, but received ${JSON.stringify(
                t
              )}. ` +
                "See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information."
            ),
            (this._trackByFn = t);
        }
        get ngForTrackBy() {
          return this._trackByFn;
        }
        set ngForTemplate(t) {
          t && (this._template = t);
        }
        ngDoCheck() {
          if (this._ngForOfDirty) {
            this._ngForOfDirty = !1;
            const n = this._ngForOf;
            if (!this._differ && n)
              try {
                this._differ = this._differs.find(n).create(this.ngForTrackBy);
              } catch (e) {
                throw new Error(
                  `Cannot find a differ supporting object '${n}' of type '${
                    ((t = n), t.name || typeof t)
                  }'. NgFor only supports binding to Iterables such as Arrays.`
                );
              }
          }
          var t;
          if (this._differ) {
            const t = this._differ.diff(this._ngForOf);
            t && this._applyChanges(t);
          }
        }
        _applyChanges(t) {
          const e = [];
          t.forEachOperation((t, n, r) => {
            if (null == t.previousIndex) {
              const n = this._viewContainer.createEmbeddedView(
                  this._template,
                  new Sl(null, this._ngForOf, -1, -1),
                  r
                ),
                s = new Tl(t, n);
              e.push(s);
            } else if (null == r) this._viewContainer.remove(n);
            else {
              const s = this._viewContainer.get(n);
              this._viewContainer.move(s, r);
              const i = new Tl(t, s);
              e.push(i);
            }
          });
          for (let n = 0; n < e.length; n++)
            this._perViewChange(e[n].view, e[n].record);
          for (let n = 0, r = this._viewContainer.length; n < r; n++) {
            const t = this._viewContainer.get(n);
            (t.context.index = n),
              (t.context.count = r),
              (t.context.ngForOf = this._ngForOf);
          }
          t.forEachIdentityChange((t) => {
            this._viewContainer.get(t.currentIndex).context.$implicit = t.item;
          });
        }
        _perViewChange(t, e) {
          t.context.$implicit = e.item;
        }
        static ngTemplateContextGuard(t, e) {
          return !0;
        }
      }
      class Tl {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      class kl {
        constructor(t, e) {
          (this._viewContainer = t),
            (this._context = new Al()),
            (this._thenTemplateRef = null),
            (this._elseTemplateRef = null),
            (this._thenViewRef = null),
            (this._elseViewRef = null),
            (this._thenTemplateRef = e);
        }
        set ngIf(t) {
          (this._context.$implicit = this._context.ngIf = t),
            this._updateView();
        }
        set ngIfThen(t) {
          Ol("ngIfThen", t),
            (this._thenTemplateRef = t),
            (this._thenViewRef = null),
            this._updateView();
        }
        set ngIfElse(t) {
          Ol("ngIfElse", t),
            (this._elseTemplateRef = t),
            (this._elseViewRef = null),
            this._updateView();
        }
        _updateView() {
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
        }
        static ngTemplateGuard_ngIf(t, e) {
          return !0;
        }
      }
      class Al {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Ol(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${vt(e)}'.`
          );
      }
      class Il {
        transform(t) {
          return JSON.stringify(t, null, 2);
        }
      }
      class Rl {}
      const Nl = new kt("DocumentToken"),
        Dl = "browser",
        Ml = "server",
        Pl = (function () {
          class t {}
          return (
            (t.ngInjectableDef = ft({
              providedIn: "root",
              factory: () => new Vl(Tt(Nl), window, Tt(ee)),
            })),
            t
          );
        })();
      class Vl {
        constructor(t, e, n) {
          (this.document = t),
            (this.window = e),
            (this.errorHandler = n),
            (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportScrollRestoration()
            ? [this.window.scrollX, this.window.scrollY]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportScrollRestoration() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (this.supportScrollRestoration()) {
            t =
              this.window.CSS && this.window.CSS.escape
                ? this.window.CSS.escape(t)
                : t.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
            try {
              const n = this.document.querySelector(`#${t}`);
              if (n) return void this.scrollToElement(n);
              const r = this.document.querySelector(`[name='${t}']`);
              if (r) return void this.scrollToElement(r);
            } catch (e) {
              this.errorHandler.handleError(e);
            }
          }
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(n - s[0], r - s[1]);
        }
        supportScrollRestoration() {
          try {
            return !!this.window && !!this.window.scrollTo;
          } catch (t) {
            return !1;
          }
        }
      }
      const jl = new y((t) => t.complete());
      function Ll(t) {
        return t
          ? (function (t) {
              return new y((e) => t.schedule(() => e.complete()));
            })(t)
          : jl;
      }
      function Fl(t) {
        const e = new y((e) => {
          e.next(t), e.complete();
        });
        return (e._isScalar = !0), (e.value = t), e;
      }
      function Ul(...t) {
        let e = t[t.length - 1];
        switch ((O(e) ? t.pop() : (e = void 0), t.length)) {
          case 0:
            return Ll(e);
          case 1:
            return e ? W(t, e) : Fl(t[0]);
          default:
            return W(t, e);
        }
      }
      class $l extends k {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new S();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function Hl() {
        return (
          Error.call(this),
          (this.message = "no elements in sequence"),
          (this.name = "EmptyError"),
          this
        );
      }
      Hl.prototype = Object.create(Error.prototype);
      const zl = Hl,
        Bl = {};
      class Wl {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new Gl(t, this.resultSelector));
        }
      }
      class Gl extends $ {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(Bl), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) {
              const e = t[n];
              this.add(U(this, e, e, n));
            }
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n, r, s) {
          const i = this.values,
            o = this.toRespond
              ? i[n] === Bl
                ? --this.toRespond
                : this.toRespond
              : 0;
          (i[n] = e),
            0 === o &&
              (this.resultSelector
                ? this._tryResultSelector(i)
                : this.destination.next(i.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      function ql(t) {
        return new y((e) => {
          let n;
          try {
            n = t();
          } catch (r) {
            return void e.error(r);
          }
          return (n ? G(n) : Ll()).subscribe(e);
        });
      }
      function Zl() {
        return K(1);
      }
      function Ql(t, e) {
        return function (n) {
          return n.lift(new Yl(t, e));
        };
      }
      class Yl {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new Kl(t, this.predicate, this.thisArg));
        }
      }
      class Kl extends g {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      function Xl() {
        return (
          Error.call(this),
          (this.message = "argument out of range"),
          (this.name = "ArgumentOutOfRangeError"),
          this
        );
      }
      Xl.prototype = Object.create(Error.prototype);
      const Jl = Xl;
      function ta(t) {
        return function (e) {
          return 0 === t ? Ll() : e.lift(new ea(t));
        };
      }
      class ea {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Jl();
        }
        call(t, e) {
          return e.subscribe(new na(t, this.total));
        }
      }
      class na extends g {
        constructor(t, e) {
          super(t),
            (this.total = e),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            r = this.count++;
          e.length < n ? e.push(t) : (e[r % n] = t);
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring;
            for (let s = 0; s < n; s++) {
              const s = e++ % n;
              t.next(r[s]);
            }
          }
          t.complete();
        }
      }
      function ra(t, e, n) {
        return function (r) {
          return r.lift(new sa(t, e, n));
        };
      }
      class sa {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new ia(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class ia extends g {
        constructor(t, e, n, s) {
          super(t),
            (this._tapNext = _),
            (this._tapError = _),
            (this._tapComplete = _),
            (this._tapError = n || _),
            (this._tapComplete = s || _),
            r(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || _),
                (this._tapError = e.error || _),
                (this._tapComplete = e.complete || _));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      const oa = (
        t = function () {
          return new zl();
        }
      ) =>
        ra({
          hasValue: !1,
          next() {
            this.hasValue = !0;
          },
          complete() {
            if (!this.hasValue) throw t();
          },
        });
      function la(t = null) {
        return (e) => e.lift(new aa(t));
      }
      class aa {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new ua(t, this.defaultValue));
        }
      }
      class ua extends g {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function ca(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? Ql((e, n) => t(e, n, r)) : Y,
            ta(1),
            n ? la(e) : oa(() => new zl())
          );
      }
      function ha(t) {
        return function (e) {
          const n = new da(t),
            r = e.lift(n);
          return (n.caught = r);
        };
      }
      class da {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new pa(t, this.selector, this.caught));
        }
      }
      class pa extends $ {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const r = new I(this, void 0, void 0);
            this.add(r), U(this, n, void 0, void 0, r);
          }
        }
      }
      function fa(t) {
        return (e) => (0 === t ? Ll() : e.lift(new ga(t)));
      }
      class ga {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Jl();
        }
        call(t, e) {
          return e.subscribe(new ma(t, this.total));
        }
      }
      class ma extends g {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function va(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? Ql((e, n) => t(e, n, r)) : Y,
            fa(1),
            n ? la(e) : oa(() => new zl())
          );
      }
      class _a {
        constructor(t, e, n) {
          (this.predicate = t), (this.thisArg = e), (this.source = n);
        }
        call(t, e) {
          return e.subscribe(
            new ba(t, this.predicate, this.thisArg, this.source)
          );
        }
      }
      class ba extends g {
        constructor(t, e, n, r) {
          super(t),
            (this.predicate = e),
            (this.thisArg = n),
            (this.source = r),
            (this.index = 0),
            (this.thisArg = n || this);
        }
        notifyComplete(t) {
          this.destination.next(t), this.destination.complete();
        }
        _next(t) {
          let e = !1;
          try {
            e = this.predicate.call(this.thisArg, t, this.index++, this.source);
          } catch (n) {
            return void this.destination.error(n);
          }
          e || this.notifyComplete(!1);
        }
        _complete() {
          this.notifyComplete(!0);
        }
      }
      function wa(t, e) {
        return "function" == typeof e
          ? (n) =>
              n.pipe(wa((n, r) => G(t(n, r)).pipe(H((t, s) => e(n, t, r, s)))))
          : (e) => e.lift(new ya(t));
      }
      class ya {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new Ca(t, this.project));
        }
      }
      class Ca extends $ {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const r = this.innerSubscription;
          r && r.unsubscribe();
          const s = new I(this, void 0, void 0);
          this.destination.add(s),
            (this.innerSubscription = U(this, t, e, n, s));
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = null;
        }
        notifyComplete(t) {
          this.destination.remove(t),
            (this.innerSubscription = null),
            this.isStopped && super._complete();
        }
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
      }
      function Ea(t, e) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (r) {
            return r.lift(new Sa(t, e, n));
          }
        );
      }
      class Sa {
        constructor(t, e, n = !1) {
          (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
        }
        call(t, e) {
          return e.subscribe(
            new xa(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class xa extends g {
        constructor(t, e, n, r) {
          super(t),
            (this.accumulator = e),
            (this._seed = n),
            (this.hasSeed = r),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e);
          } catch (r) {
            this.destination.error(r);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      function Ta(t, e) {
        return q(t, e, 1);
      }
      class ka {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new Aa(t, this.callback));
        }
      }
      class Aa extends g {
        constructor(t, e) {
          super(t), this.add(new d(e));
        }
      }
      let Oa = null;
      function Ia() {
        return Oa;
      }
      class Ra {
        constructor() {
          this.resourceLoaderType = null;
        }
        get attrToPropMap() {
          return this._attrToPropMap;
        }
        set attrToPropMap(t) {
          this._attrToPropMap = t;
        }
      }
      class Na extends Ra {
        constructor() {
          super(), (this._animationPrefix = null), (this._transitionEnd = null);
          try {
            const e = this.createElement("div", document);
            if (null != this.getStyle(e, "animationName"))
              this._animationPrefix = "";
            else {
              const t = ["Webkit", "Moz", "O", "ms"];
              for (let n = 0; n < t.length; n++)
                if (null != this.getStyle(e, t[n] + "AnimationName")) {
                  this._animationPrefix = "-" + t[n].toLowerCase() + "-";
                  break;
                }
            }
            const n = {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd otransitionend",
              transition: "transitionend",
            };
            Object.keys(n).forEach((t) => {
              null != this.getStyle(e, t) && (this._transitionEnd = n[t]);
            });
          } catch (t) {
            (this._animationPrefix = null), (this._transitionEnd = null);
          }
        }
        getDistributedNodes(t) {
          return t.getDistributedNodes();
        }
        resolveAndSetHref(t, e, n) {
          t.href = null == n ? e : e + "/../" + n;
        }
        supportsDOMEvents() {
          return !0;
        }
        supportsNativeShadowDOM() {
          return "function" == typeof document.body.createShadowRoot;
        }
        getAnimationPrefix() {
          return this._animationPrefix ? this._animationPrefix : "";
        }
        getTransitionEnd() {
          return this._transitionEnd ? this._transitionEnd : "";
        }
        supportsAnimation() {
          return null != this._animationPrefix && null != this._transitionEnd;
        }
      }
      const Da = {
          class: "className",
          innerHtml: "innerHTML",
          readonly: "readOnly",
          tabindex: "tabIndex",
        },
        Ma = 3,
        Pa = {
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
        Va = {
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
        ja = (() => {
          if (Ct.Node)
            return (
              Ct.Node.prototype.contains ||
              function (t) {
                return !!(16 & this.compareDocumentPosition(t));
              }
            );
        })();
      class La extends Na {
        parse(t) {
          throw new Error("parse not implemented");
        }
        static makeCurrent() {
          var t;
          (t = new La()), Oa || (Oa = t);
        }
        hasProperty(t, e) {
          return e in t;
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        getProperty(t, e) {
          return t[e];
        }
        invoke(t, e, n) {
          t[e](...n);
        }
        logError(t) {
          window.console && (console.error ? console.error(t) : console.log(t));
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        get attrToPropMap() {
          return Da;
        }
        contains(t, e) {
          return ja.call(t, e);
        }
        querySelector(t, e) {
          return t.querySelector(e);
        }
        querySelectorAll(t, e) {
          return t.querySelectorAll(e);
        }
        on(t, e, n) {
          t.addEventListener(e, n, !1);
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        createMouseEvent(t) {
          const e = this.getDefaultDocument().createEvent("MouseEvent");
          return e.initEvent(t, !0, !0), e;
        }
        createEvent(t) {
          const e = this.getDefaultDocument().createEvent("Event");
          return e.initEvent(t, !0, !0), e;
        }
        preventDefault(t) {
          t.preventDefault(), (t.returnValue = !1);
        }
        isPrevented(t) {
          return (
            t.defaultPrevented || (null != t.returnValue && !t.returnValue)
          );
        }
        getInnerHTML(t) {
          return t.innerHTML;
        }
        getTemplateContent(t) {
          return "content" in t && this.isTemplateElement(t) ? t.content : null;
        }
        getOuterHTML(t) {
          return t.outerHTML;
        }
        nodeName(t) {
          return t.nodeName;
        }
        nodeValue(t) {
          return t.nodeValue;
        }
        type(t) {
          return t.type;
        }
        content(t) {
          return this.hasProperty(t, "content") ? t.content : t;
        }
        firstChild(t) {
          return t.firstChild;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        parentElement(t) {
          return t.parentNode;
        }
        childNodes(t) {
          return t.childNodes;
        }
        childNodesAsList(t) {
          const e = t.childNodes,
            n = new Array(e.length);
          for (let r = 0; r < e.length; r++) n[r] = e[r];
          return n;
        }
        clearNodes(t) {
          for (; t.firstChild; ) t.removeChild(t.firstChild);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        removeChild(t, e) {
          t.removeChild(e);
        }
        replaceChild(t, e, n) {
          t.replaceChild(e, n);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        insertBefore(t, e, n) {
          t.insertBefore(n, e);
        }
        insertAllBefore(t, e, n) {
          n.forEach((n) => t.insertBefore(n, e));
        }
        insertAfter(t, e, n) {
          t.insertBefore(n, e.nextSibling);
        }
        setInnerHTML(t, e) {
          t.innerHTML = e;
        }
        getText(t) {
          return t.textContent;
        }
        setText(t, e) {
          t.textContent = e;
        }
        getValue(t) {
          return t.value;
        }
        setValue(t, e) {
          t.value = e;
        }
        getChecked(t) {
          return t.checked;
        }
        setChecked(t, e) {
          t.checked = e;
        }
        createComment(t) {
          return this.getDefaultDocument().createComment(t);
        }
        createTemplate(t) {
          const e = this.getDefaultDocument().createElement("template");
          return (e.innerHTML = t), e;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createElementNS(t, e, n) {
          return (n = n || this.getDefaultDocument()).createElementNS(t, e);
        }
        createTextNode(t, e) {
          return (e = e || this.getDefaultDocument()).createTextNode(t);
        }
        createScriptTag(t, e, n) {
          const r = (n = n || this.getDefaultDocument()).createElement(
            "SCRIPT"
          );
          return r.setAttribute(t, e), r;
        }
        createStyleElement(t, e) {
          const n = (e = e || this.getDefaultDocument()).createElement("style");
          return this.appendChild(n, this.createTextNode(t, e)), n;
        }
        createShadowRoot(t) {
          return t.createShadowRoot();
        }
        getShadowRoot(t) {
          return t.shadowRoot;
        }
        getHost(t) {
          return t.host;
        }
        clone(t) {
          return t.cloneNode(!0);
        }
        getElementsByClassName(t, e) {
          return t.getElementsByClassName(e);
        }
        getElementsByTagName(t, e) {
          return t.getElementsByTagName(e);
        }
        classList(t) {
          return Array.prototype.slice.call(t.classList, 0);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        hasClass(t, e) {
          return t.classList.contains(e);
        }
        setStyle(t, e, n) {
          t.style[e] = n;
        }
        removeStyle(t, e) {
          t.style[e] = "";
        }
        getStyle(t, e) {
          return t.style[e];
        }
        hasStyle(t, e, n) {
          const r = this.getStyle(t, e) || "";
          return n ? r == n : r.length > 0;
        }
        tagName(t) {
          return t.tagName;
        }
        attributeMap(t) {
          const e = new Map(),
            n = t.attributes;
          for (let r = 0; r < n.length; r++) {
            const t = n.item(r);
            e.set(t.name, t.value);
          }
          return e;
        }
        hasAttribute(t, e) {
          return t.hasAttribute(e);
        }
        hasAttributeNS(t, e, n) {
          return t.hasAttributeNS(e, n);
        }
        getAttribute(t, e) {
          return t.getAttribute(e);
        }
        getAttributeNS(t, e, n) {
          return t.getAttributeNS(e, n);
        }
        setAttribute(t, e, n) {
          t.setAttribute(e, n);
        }
        setAttributeNS(t, e, n, r) {
          t.setAttributeNS(e, n, r);
        }
        removeAttribute(t, e) {
          t.removeAttribute(e);
        }
        removeAttributeNS(t, e, n) {
          t.removeAttributeNS(e, n);
        }
        templateAwareRoot(t) {
          return this.isTemplateElement(t) ? this.content(t) : t;
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        getBoundingClientRect(t) {
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
        }
        getTitle(t) {
          return t.title;
        }
        setTitle(t, e) {
          t.title = e || "";
        }
        elementMatches(t, e) {
          return (
            !!this.isElementNode(t) &&
            ((t.matches && t.matches(e)) ||
              (t.msMatchesSelector && t.msMatchesSelector(e)) ||
              (t.webkitMatchesSelector && t.webkitMatchesSelector(e)))
          );
        }
        isTemplateElement(t) {
          return this.isElementNode(t) && "TEMPLATE" === t.nodeName;
        }
        isTextNode(t) {
          return t.nodeType === Node.TEXT_NODE;
        }
        isCommentNode(t) {
          return t.nodeType === Node.COMMENT_NODE;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        hasShadowRoot(t) {
          return null != t.shadowRoot && t instanceof HTMLElement;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        importIntoDoc(t) {
          return document.importNode(this.templateAwareRoot(t), !0);
        }
        adoptNode(t) {
          return document.adoptNode(t);
        }
        getHref(t) {
          return t.getAttribute("href");
        }
        getEventKey(t) {
          let e = t.key;
          if (null == e) {
            if (null == (e = t.keyIdentifier)) return "Unidentified";
            e.startsWith("U+") &&
              ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
              t.location === Ma && Va.hasOwnProperty(e) && (e = Va[e]));
          }
          return Pa[e] || e;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            Ua || (Ua = document.querySelector("base"))
              ? Ua.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              Fa || (Fa = document.createElement("a")),
              Fa.setAttribute("href", n),
              "/" === Fa.pathname.charAt(0) ? Fa.pathname : "/" + Fa.pathname);
          var n;
        }
        resetBaseElement() {
          Ua = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        setData(t, e, n) {
          this.setAttribute(t, "data-" + e, n);
        }
        getData(t, e) {
          return this.getAttribute(t, "data-" + e);
        }
        getComputedStyle(t) {
          return getComputedStyle(t);
        }
        supportsWebAnimation() {
          return "function" == typeof Element.prototype.animate;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return (function (t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
              const t = n.indexOf("="),
                [r, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
              if (r.trim() === e) return decodeURIComponent(s);
            }
            return null;
          })(document.cookie, t);
        }
        setCookie(t, e) {
          document.cookie = encodeURIComponent(t) + "=" + encodeURIComponent(e);
        }
      }
      let Fa,
        Ua = null;
      function $a() {
        return !!window.history.pushState;
      }
      const Ha = (function () {
          class t extends ul {
            constructor(t) {
              super(), (this._doc = t), this._init();
            }
            _init() {
              (this.location = Ia().getLocation()),
                (this._history = Ia().getHistory());
            }
            getBaseHrefFromDOM() {
              return Ia().getBaseHref(this._doc);
            }
            onPopState(t) {
              Ia()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("popstate", t, !1);
            }
            onHashChange(t) {
              Ia()
                .getGlobalEventTarget(this._doc, "window")
                .addEventListener("hashchange", t, !1);
            }
            get href() {
              return this.location.href;
            }
            get protocol() {
              return this.location.protocol;
            }
            get hostname() {
              return this.location.hostname;
            }
            get port() {
              return this.location.port;
            }
            get pathname() {
              return this.location.pathname;
            }
            get search() {
              return this.location.search;
            }
            get hash() {
              return this.location.hash;
            }
            set pathname(t) {
              this.location.pathname = t;
            }
            pushState(t, e, n) {
              $a()
                ? this._history.pushState(t, e, n)
                : (this.location.hash = n);
            }
            replaceState(t, e, n) {
              $a()
                ? this._history.replaceState(t, e, n)
                : (this.location.hash = n);
            }
            forward() {
              this._history.forward();
            }
            back() {
              this._history.back();
            }
            getState() {
              return this._history.state;
            }
          }
          return (
            (t.ctorParameters = () => [
              { type: void 0, decorators: [{ type: at, args: [Nl] }] },
            ]),
            t
          );
        })(),
        za = new kt("TRANSITION_ID"),
        Ba = [
          {
            provide: xs,
            useFactory: function (t, e, n) {
              return () => {
                n.get(Ts).donePromise.then(() => {
                  const n = Ia();
                  Array.prototype.slice
                    .apply(n.querySelectorAll(e, "style[ng-transition]"))
                    .filter((e) => n.getAttribute(e, "ng-transition") === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [za, Nl, Nt],
            multi: !0,
          },
        ];
      class Wa {
        static init() {
          var t;
          (t = new Wa()), (oi = t);
        }
        addToWindow(t) {
          (Ct.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r)
              throw new Error("Could not find testability for element.");
            return r;
          }),
            (Ct.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Ct.getAllAngularRootElements = () => t.getAllRootElements()),
            Ct.frameworkStabilizers || (Ct.frameworkStabilizers = []),
            Ct.frameworkStabilizers.push((t) => {
              const e = Ct.getAllAngularTestabilities();
              let n = e.length,
                r = !1;
              const s = function (e) {
                (r = r || e), 0 == --n && t(r);
              };
              e.forEach(function (t) {
                t.whenStable(s);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : n
            ? Ia().isShadowRoot(e)
              ? this.findTestabilityInTree(t, Ia().getHost(e), !0)
              : this.findTestabilityInTree(t, Ia().parentElement(e), !0)
            : null;
        }
      }
      function Ga(t, e) {
        ("undefined" != typeof COMPILED && COMPILED) ||
          ((Ct.ng = Ct.ng || {})[t] = e);
      }
      const qa = (() => ({ ApplicationRef: gi, NgZone: Qs }))();
      function Za(t) {
        return Ai(t);
      }
      const Qa = new kt("EventManagerPlugins");
      class Ya {
        constructor(t, e) {
          (this._zone = e),
            (this._eventNameToPlugin = new Map()),
            t.forEach((t) => (t.manager = this)),
            (this._plugins = t.slice().reverse());
        }
        addEventListener(t, e, n) {
          return this._findPluginFor(e).addEventListener(t, e, n);
        }
        addGlobalEventListener(t, e, n) {
          return this._findPluginFor(e).addGlobalEventListener(t, e, n);
        }
        getZone() {
          return this._zone;
        }
        _findPluginFor(t) {
          const e = this._eventNameToPlugin.get(t);
          if (e) return e;
          const n = this._plugins;
          for (let r = 0; r < n.length; r++) {
            const e = n[r];
            if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
          }
          throw new Error(`No event manager plugin found for event ${t}`);
        }
      }
      class Ka {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const r = Ia().getGlobalEventTarget(this._doc, t);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n);
        }
      }
      class Xa {
        constructor() {
          this._stylesSet = new Set();
        }
        addStyles(t) {
          const e = new Set();
          t.forEach((t) => {
            this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
          }),
            this.onStylesAdded(e);
        }
        onStylesAdded(t) {}
        getAllStyles() {
          return Array.from(this._stylesSet);
        }
      }
      class Ja extends Xa {
        constructor(t) {
          super(),
            (this._doc = t),
            (this._hostNodes = new Set()),
            (this._styleNodes = new Set()),
            this._hostNodes.add(t.head);
        }
        _addStylesToHost(t, e) {
          t.forEach((t) => {
            const n = this._doc.createElement("style");
            (n.textContent = t), this._styleNodes.add(e.appendChild(n));
          });
        }
        addHost(t) {
          this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
        }
        removeHost(t) {
          this._hostNodes.delete(t);
        }
        onStylesAdded(t) {
          this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
        }
        ngOnDestroy() {
          this._styleNodes.forEach((t) => Ia().remove(t));
        }
      }
      const tu = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        eu = /%COMP%/g,
        nu = "_nghost-%COMP%",
        ru = "_ngcontent-%COMP%";
      function su(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r];
          Array.isArray(s) ? su(t, s, n) : ((s = s.replace(eu, t)), n.push(s));
        }
        return n;
      }
      function iu(t) {
        return (e) => {
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      class ou {
        constructor(t, e, n) {
          (this.eventManager = t),
            (this.sharedStylesHost = e),
            (this.appId = n),
            (this.rendererByCompId = new Map()),
            (this.defaultRenderer = new lu(t));
        }
        createRenderer(t, e) {
          if (!t || !e) return this.defaultRenderer;
          switch (e.encapsulation) {
            case Yt.Emulated: {
              let n = this.rendererByCompId.get(e.id);
              return (
                n ||
                  ((n = new cu(
                    this.eventManager,
                    this.sharedStylesHost,
                    e,
                    this.appId
                  )),
                  this.rendererByCompId.set(e.id, n)),
                n.applyToHost(t),
                n
              );
            }
            case Yt.Native:
            case Yt.ShadowDom:
              return new hu(this.eventManager, this.sharedStylesHost, t, e);
            default:
              if (!this.rendererByCompId.has(e.id)) {
                const t = su(e.id, e.styles, []);
                this.sharedStylesHost.addStyles(t),
                  this.rendererByCompId.set(e.id, this.defaultRenderer);
              }
              return this.defaultRenderer;
          }
        }
        begin() {}
        end() {}
      }
      class lu {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(tu[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = `${r}:${e}`;
            const s = tu[r];
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = tu[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, r) {
          r & sn.DashCase
            ? t.style.setProperty(e, n, r & sn.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & sn.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          uu(e, "property"), (t[e] = n);
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return (
            uu(e, "listener"),
            "string" == typeof t
              ? this.eventManager.addGlobalEventListener(t, e, iu(n))
              : this.eventManager.addEventListener(t, e, iu(n))
          );
        }
      }
      const au = (() => "@".charCodeAt(0))();
      function uu(t, e) {
        if (t.charCodeAt(0) === au)
          throw new Error(
            `Found the synthetic ${e} ${t}. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.`
          );
      }
      class cu extends lu {
        constructor(t, e, n, r) {
          super(t), (this.component = n);
          const s = su(r + "-" + n.id, n.styles, []);
          e.addStyles(s),
            (this.contentAttr = ru.replace(eu, r + "-" + n.id)),
            (this.hostAttr = nu.replace(eu, r + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class hu extends lu {
        constructor(t, e, n, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.component = r),
            (this.shadowRoot =
              r.encapsulation === Yt.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = su(r.id, r.styles, []);
          for (let i = 0; i < s.length; i++) {
            const t = document.createElement("style");
            (t.textContent = s[i]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      const du = (() =>
          ("undefined" != typeof Zone && Zone.__symbol__) ||
          function (t) {
            return "__zone_symbol__" + t;
          })(),
        pu = du("addEventListener"),
        fu = du("removeEventListener"),
        gu = {},
        mu = "FALSE",
        vu = "ANGULAR",
        _u = "addEventListener",
        bu = "removeEventListener",
        wu = "__zone_symbol__propagationStopped",
        yu = "__zone_symbol__stopImmediatePropagation",
        Cu = (() => {
          const t =
            "undefined" != typeof Zone && Zone[du("BLACK_LISTED_EVENTS")];
          if (t) {
            const e = {};
            return (
              t.forEach((t) => {
                e[t] = t;
              }),
              e
            );
          }
        })(),
        Eu = function (t) {
          return !!Cu && Cu.hasOwnProperty(t);
        },
        Su = function (t) {
          const e = gu[t.type];
          if (!e) return;
          const n = this[e];
          if (!n) return;
          const r = [t];
          if (1 === n.length) {
            const t = n[0];
            return t.zone !== Zone.current
              ? t.zone.run(t.handler, this, r)
              : t.handler.apply(this, r);
          }
          {
            const e = n.slice();
            for (let n = 0; n < e.length && !0 !== t[wu]; n++) {
              const t = e[n];
              t.zone !== Zone.current
                ? t.zone.run(t.handler, this, r)
                : t.handler.apply(this, r);
            }
          }
        };
      class xu extends Ka {
        constructor(t, e, n) {
          super(t),
            (this.ngZone = e),
            (n &&
              (function (t) {
                return t === Ml;
              })(n)) ||
              this.patchEvent();
        }
        patchEvent() {
          if ("undefined" == typeof Event || !Event || !Event.prototype) return;
          if (Event.prototype[yu]) return;
          const t = (Event.prototype[yu] =
            Event.prototype.stopImmediatePropagation);
          Event.prototype.stopImmediatePropagation = function () {
            this && (this[wu] = !0), t && t.apply(this, arguments);
          };
        }
        supports(t) {
          return !0;
        }
        addEventListener(t, e, n) {
          let r = n;
          if (!t[pu] || (Qs.isInAngularZone() && !Eu(e))) t[_u](e, r, !1);
          else {
            let n = gu[e];
            n || (n = gu[e] = du(vu + e + mu));
            let s = t[n];
            const i = s && s.length > 0;
            s || (s = t[n] = []);
            const o = Eu(e) ? Zone.root : Zone.current;
            if (0 === s.length) s.push({ zone: o, handler: r });
            else {
              let t = !1;
              for (let e = 0; e < s.length; e++)
                if (s[e].handler === r) {
                  t = !0;
                  break;
                }
              t || s.push({ zone: o, handler: r });
            }
            i || t[pu](e, Su, !1);
          }
          return () => this.removeEventListener(t, e, r);
        }
        removeEventListener(t, e, n) {
          let r = t[fu];
          if (!r) return t[bu].apply(t, [e, n, !1]);
          let s = gu[e],
            i = s && t[s];
          if (!i) return t[bu].apply(t, [e, n, !1]);
          let o = !1;
          for (let l = 0; l < i.length; l++)
            if (i[l].handler === n) {
              (o = !0), i.splice(l, 1);
              break;
            }
          o
            ? 0 === i.length && r.apply(t, [e, Su, !1])
            : t[bu].apply(t, [e, n, !1]);
        }
      }
      const Tu = {
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
        ku = new kt("HammerGestureConfig"),
        Au = new kt("HammerLoader");
      class Ou {
        constructor() {
          (this.events = []), (this.overrides = {});
        }
        buildHammer(t) {
          const e = new Hammer(t, this.options);
          e.get("pinch").set({ enable: !0 }),
            e.get("rotate").set({ enable: !0 });
          for (const n in this.overrides) e.get(n).set(this.overrides[n]);
          return e;
        }
      }
      class Iu extends Ka {
        constructor(t, e, n, r) {
          super(t), (this._config = e), (this.console = n), (this.loader = r);
        }
        supports(t) {
          return !(
            (!Tu.hasOwnProperty(t.toLowerCase()) && !this.isCustomEvent(t)) ||
            (!window.Hammer &&
              !this.loader &&
              (this.console.warn(
                `The "${t}" event cannot be bound because Hammer.JS is not ` +
                  "loaded and no custom loader has been specified."
              ),
              1))
          );
        }
        addEventListener(t, e, n) {
          const r = this.manager.getZone();
          if (((e = e.toLowerCase()), !window.Hammer && this.loader)) {
            let r = !1,
              s = () => {
                r = !0;
              };
            return (
              this.loader()
                .then(() => {
                  if (!window.Hammer)
                    return (
                      this.console.warn(
                        "The custom HAMMER_LOADER completed, but Hammer.JS is not present."
                      ),
                      void (s = () => {})
                    );
                  r || (s = this.addEventListener(t, e, n));
                })
                .catch(() => {
                  this.console.warn(
                    `The "${e}" event cannot be bound because the custom ` +
                      "Hammer.JS loader failed."
                  ),
                    (s = () => {});
                }),
              () => {
                s();
              }
            );
          }
          return r.runOutsideAngular(() => {
            const s = this._config.buildHammer(t),
              i = function (t) {
                r.runGuarded(function () {
                  n(t);
                });
              };
            return (
              s.on(e, i),
              () => {
                s.off(e, i), "function" == typeof s.destroy && s.destroy();
              }
            );
          });
        }
        isCustomEvent(t) {
          return this._config.events.indexOf(t) > -1;
        }
      }
      const Ru = ["alt", "control", "meta", "shift"],
        Nu = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      class Du extends Ka {
        constructor(t) {
          super(t);
        }
        supports(t) {
          return null != Du.parseEventName(t);
        }
        addEventListener(t, e, n) {
          const r = Du.parseEventName(e),
            s = Du.eventCallback(r.fullKey, n, this.manager.getZone());
          return this.manager
            .getZone()
            .runOutsideAngular(() => Ia().onAndCancel(t, r.domEventName, s));
        }
        static parseEventName(t) {
          const e = t.toLowerCase().split("."),
            n = e.shift();
          if (0 === e.length || ("keydown" !== n && "keyup" !== n)) return null;
          const r = Du._normalizeKey(e.pop());
          let s = "";
          if (
            (Ru.forEach((t) => {
              const n = e.indexOf(t);
              n > -1 && (e.splice(n, 1), (s += t + "."));
            }),
            (s += r),
            0 != e.length || 0 === r.length)
          )
            return null;
          const i = {};
          return (i.domEventName = n), (i.fullKey = s), i;
        }
        static getEventFullKey(t) {
          let e = "",
            n = Ia().getEventKey(t);
          return (
            " " === (n = n.toLowerCase())
              ? (n = "space")
              : "." === n && (n = "dot"),
            Ru.forEach((r) => {
              r != n && (0, Nu[r])(t) && (e += r + ".");
            }),
            (e += n)
          );
        }
        static eventCallback(t, e, n) {
          return (r) => {
            Du.getEventFullKey(r) === t && n.runGuarded(() => e(r));
          };
        }
        static _normalizeKey(t) {
          switch (t) {
            case "esc":
              return "escape";
            default:
              return t;
          }
        }
      }
      class Mu {}
      class Pu extends Mu {
        constructor(t) {
          super(), (this._doc = t);
        }
        sanitize(t, e) {
          if (null == e) return null;
          switch (t) {
            case Te.NONE:
              return e;
            case Te.HTML:
              return e instanceof ju
                ? e.changingThisBreaksApplicationSecurity
                : (this.checkNotSafeValue(e, "HTML"),
                  (function (t, e) {
                    let n = null;
                    try {
                      Se = Se || new ie(t);
                      let r = e ? String(e) : "";
                      n = Se.getInertBodyElement(r);
                      let s = 5,
                        i = r;
                      do {
                        if (0 === s)
                          throw new Error(
                            "Failed to sanitize html because the input is unstable"
                          );
                        s--,
                          (r = i),
                          (i = n.innerHTML),
                          (n = Se.getInertBodyElement(r));
                      } while (r !== i);
                      const o = new we(),
                        l = o.sanitizeChildren(xe(n) || n);
                      return (
                        se() &&
                          o.sanitizedSomething &&
                          console.warn(
                            "WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"
                          ),
                        l
                      );
                    } finally {
                      if (n) {
                        const t = xe(n) || n;
                        for (; t.firstChild; ) t.removeChild(t.firstChild);
                      }
                    }
                  })(this._doc, String(e)));
            case Te.STYLE:
              return e instanceof Lu
                ? e.changingThisBreaksApplicationSecurity
                : (this.checkNotSafeValue(e, "Style"),
                  (function (t) {
                    if (!(t = String(t).trim())) return "";
                    const e = t.match(Oe);
                    return (e && ae(e[1]) === e[1]) ||
                      (t.match(Ae) &&
                        (function (t) {
                          let e = !0,
                            n = !0;
                          for (let r = 0; r < t.length; r++) {
                            const s = t.charAt(r);
                            "'" === s && n
                              ? (e = !e)
                              : '"' === s && e && (n = !n);
                          }
                          return e && n;
                        })(t))
                      ? t
                      : (se() &&
                          console.warn(
                            `WARNING: sanitizing unsafe style value ${t} (see http://g.co/ng/security#xss).`
                          ),
                        "unsafe");
                  })(e));
            case Te.SCRIPT:
              if (e instanceof Fu)
                return e.changingThisBreaksApplicationSecurity;
              throw (
                (this.checkNotSafeValue(e, "Script"),
                new Error("unsafe value used in a script context"))
              );
            case Te.URL:
              return e instanceof $u || e instanceof Uu
                ? e.changingThisBreaksApplicationSecurity
                : (this.checkNotSafeValue(e, "URL"), ae(String(e)));
            case Te.RESOURCE_URL:
              if (e instanceof $u)
                return e.changingThisBreaksApplicationSecurity;
              throw (
                (this.checkNotSafeValue(e, "ResourceURL"),
                new Error(
                  "unsafe value used in a resource URL context (see http://g.co/ng/security#xss)"
                ))
              );
            default:
              throw new Error(
                `Unexpected SecurityContext ${t} (see http://g.co/ng/security#xss)`
              );
          }
        }
        checkNotSafeValue(t, e) {
          if (t instanceof Vu)
            throw new Error(
              `Required a safe ${e}, got a ${t.getTypeName()} ` +
                "(see http://g.co/ng/security#xss)"
            );
        }
        bypassSecurityTrustHtml(t) {
          return new ju(t);
        }
        bypassSecurityTrustStyle(t) {
          return new Lu(t);
        }
        bypassSecurityTrustScript(t) {
          return new Fu(t);
        }
        bypassSecurityTrustUrl(t) {
          return new Uu(t);
        }
        bypassSecurityTrustResourceUrl(t) {
          return new $u(t);
        }
      }
      class Vu {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return (
            `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
            " (see http://g.co/ng/security#xss)"
          );
        }
      }
      class ju extends Vu {
        getTypeName() {
          return "HTML";
        }
      }
      class Lu extends Vu {
        getTypeName() {
          return "Style";
        }
      }
      class Fu extends Vu {
        getTypeName() {
          return "Script";
        }
      }
      class Uu extends Vu {
        getTypeName() {
          return "URL";
        }
      }
      class $u extends Vu {
        getTypeName() {
          return "ResourceURL";
        }
      }
      const Hu = hi(Ii, "browser", [
        { provide: Rs, useValue: Dl },
        {
          provide: Is,
          useValue: function () {
            La.makeCurrent(), Wa.init();
          },
          multi: !0,
        },
        { provide: ul, useClass: Ha, deps: [Nl] },
        {
          provide: Nl,
          useFactory: function () {
            return document;
          },
          deps: [],
        },
      ]);
      function zu() {
        return new ee();
      }
      class Bu {
        constructor(t) {
          if (t)
            throw new Error(
              "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
            );
        }
        static withServerTransition(t) {
          return {
            ngModule: Bu,
            providers: [
              { provide: ks, useValue: t.appId },
              { provide: za, useExisting: ks },
              Ba,
            ],
          };
        }
      }
      "undefined" != typeof window && window;
      class Wu {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class Gu extends Wu {
        constructor(t, e, n = "imperative", r = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class qu extends Wu {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Zu extends Wu {
        constructor(t, e, n) {
          super(t, e), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Qu extends Wu {
        constructor(t, e, n) {
          super(t, e), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class Yu extends Wu {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Ku extends Wu {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Xu extends Wu {
        constructor(t, e, n, r, s) {
          super(t, e),
            (this.urlAfterRedirects = n),
            (this.state = r),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Ju extends Wu {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class tc extends Wu {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class ec {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class nc {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class rc {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class sc {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class ic {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class oc {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class lc {
        constructor(t, e, n) {
          (this.routerEvent = t), (this.position = e), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class ac {}
      const uc = "primary";
      class cc {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return this.params.hasOwnProperty(t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function hc(t) {
        return new cc(t);
      }
      const dc = "ngNavigationCancelingError";
      function pc(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e[dc] = !0), e;
      }
      function fc(t, e, n) {
        const r = n.path.split("/");
        if (r.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
          return null;
        const s = {};
        for (let i = 0; i < r.length; i++) {
          const e = r[i],
            n = t[i];
          if (e.startsWith(":")) s[e.substring(1)] = n;
          else if (e !== n.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: s };
      }
      class gc {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function mc(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          vc(r, _c(e, r));
        }
      }
      function vc(t, e) {
        if (!t)
          throw new Error(
            `\n      Invalid configuration of route '${e}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `
          );
        if (Array.isArray(t))
          throw new Error(
            `Invalid configuration of route '${e}': Array cannot be specified`
          );
        if (
          !t.component &&
          !t.children &&
          !t.loadChildren &&
          t.outlet &&
          t.outlet !== uc
        )
          throw new Error(
            `Invalid configuration of route '${e}': a componentless route without children or loadChildren cannot have a named outlet set`
          );
        if (t.redirectTo && t.children)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and children cannot be used together`
          );
        if (t.redirectTo && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and loadChildren cannot be used together`
          );
        if (t.children && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': children and loadChildren cannot be used together`
          );
        if (t.redirectTo && t.component)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and component cannot be used together`
          );
        if (t.path && t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': path and matcher cannot be used together`
          );
        if (
          void 0 === t.redirectTo &&
          !t.component &&
          !t.children &&
          !t.loadChildren
        )
          throw new Error(
            `Invalid configuration of route '${e}'. One of the following must be provided: component, redirectTo, children or loadChildren`
          );
        if (void 0 === t.path && void 0 === t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': routes must have either a path or a matcher specified`
          );
        if ("string" == typeof t.path && "/" === t.path.charAt(0))
          throw new Error(
            `Invalid configuration of route '${e}': path cannot start with a slash`
          );
        if ("" === t.path && void 0 !== t.redirectTo && void 0 === t.pathMatch)
          throw new Error(
            `Invalid configuration of route '{path: "${e}", redirectTo: "${t.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`
          );
        if (
          void 0 !== t.pathMatch &&
          "full" !== t.pathMatch &&
          "prefix" !== t.pathMatch
        )
          throw new Error(
            `Invalid configuration of route '${e}': pathMatch can only be set to 'prefix' or 'full'`
          );
        t.children && mc(t.children, e);
      }
      function _c(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? `${t}/`
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function bc(t) {
        const e = t.children && t.children.map(bc),
          n = e ? Object.assign({}, t, { children: e }) : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            n.outlet !== uc &&
            (n.component = ac),
          n
        );
      }
      function wc(t, e) {
        const n = Object.keys(t),
          r = Object.keys(e);
        if (!n || !r || n.length != r.length) return !1;
        let s;
        for (let i = 0; i < n.length; i++)
          if (t[(s = n[i])] !== e[s]) return !1;
        return !0;
      }
      function yc(t) {
        return Array.prototype.concat.apply([], t);
      }
      function Cc(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Ec(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function Sc(t) {
        return De(t) ? t : Ne(t) ? G(Promise.resolve(t)) : Ul(t);
      }
      function xc(t, e, n) {
        return n
          ? (function (t, e) {
              return wc(t, e);
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                if (!Oc(e.segments, n.segments)) return !1;
                if (e.numberOfChildren !== n.numberOfChildren) return !1;
                for (const r in n.children) {
                  if (!e.children[r]) return !1;
                  if (!t(e.children[r], n.children[r])) return !1;
                }
                return !0;
              })(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every((n) => e[n] === t[n])
              );
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                return (function e(n, r, s) {
                  if (n.segments.length > s.length) {
                    return (
                      !!Oc(n.segments.slice(0, s.length), s) && !r.hasChildren()
                    );
                  }
                  if (n.segments.length === s.length) {
                    if (!Oc(n.segments, s)) return !1;
                    for (const e in r.children) {
                      if (!n.children[e]) return !1;
                      if (!t(n.children[e], r.children[e])) return !1;
                    }
                    return !0;
                  }
                  {
                    const t = s.slice(0, n.segments.length),
                      i = s.slice(n.segments.length);
                    return (
                      !!Oc(n.segments, t) &&
                      !!n.children[uc] &&
                      e(n.children[uc], r, i)
                    );
                  }
                })(e, n, n.segments);
              })(t.root, e.root);
      }
      class Tc {
        constructor(t, e, n) {
          (this.root = t), (this.queryParams = e), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = hc(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Dc.serialize(this);
        }
      }
      class kc {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            Ec(e, (t, e) => (t.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Mc(this);
        }
      }
      class Ac {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = hc(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Uc(this);
        }
      }
      function Oc(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path);
      }
      function Ic(t, e) {
        let n = [];
        return (
          Ec(t.children, (t, r) => {
            r === uc && (n = n.concat(e(t, r)));
          }),
          Ec(t.children, (t, r) => {
            r !== uc && (n = n.concat(e(t, r)));
          }),
          n
        );
      }
      class Rc {}
      class Nc {
        parse(t) {
          const e = new Wc(t);
          return new Tc(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          var e;
          return `${`/${(function t(e, n) {
            if (!e.hasChildren()) return Mc(e);
            if (n) {
              const n = e.children[uc] ? t(e.children[uc], !1) : "",
                r = [];
              return (
                Ec(e.children, (e, n) => {
                  n !== uc && r.push(`${n}:${t(e, !1)}`);
                }),
                r.length > 0 ? `${n}(${r.join("//")})` : n
              );
            }
            {
              const n = Ic(e, (n, r) =>
                r === uc ? [t(e.children[uc], !1)] : [`${r}:${t(n, !1)}`]
              );
              return `${Mc(e)}/(${n.join("//")})`;
            }
          })(t.root, !0)}`}${(function (t) {
            const e = Object.keys(t).map((e) => {
              const n = t[e];
              return Array.isArray(n)
                ? n.map((t) => `${Vc(e)}=${Vc(t)}`).join("&")
                : `${Vc(e)}=${Vc(n)}`;
            });
            return e.length ? `?${e.join("&")}` : "";
          })(t.queryParams)}${
            "string" == typeof t.fragment
              ? `#${((e = t.fragment), encodeURI(e))}`
              : ""
          }`;
        }
      }
      const Dc = new Nc();
      function Mc(t) {
        return t.segments.map((t) => Uc(t)).join("/");
      }
      function Pc(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Vc(t) {
        return Pc(t).replace(/%3B/gi, ";");
      }
      function jc(t) {
        return Pc(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Lc(t) {
        return decodeURIComponent(t);
      }
      function Fc(t) {
        return Lc(t.replace(/\+/g, "%20"));
      }
      function Uc(t) {
        return `${jc(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map((t) => `;${jc(t)}=${jc(e[t])}`)
            .join(""))
        }`;
        var e;
      }
      const $c = /^[^\/()?;=#]+/;
      function Hc(t) {
        const e = t.match($c);
        return e ? e[0] : "";
      }
      const zc = /^[^=?&#]+/,
        Bc = /^[^?&#]+/;
      class Wc {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new kc([], {})
              : new kc([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (n[uc] = new kc(t, e)),
            n
          );
        }
        parseSegment() {
          const t = Hc(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new Ac(Lc(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = Hc(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = Hc(this.remaining);
            t && this.capture((n = t));
          }
          t[Lc(e)] = Lc(n);
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(zc);
            return e ? e[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = (function (t) {
              const e = t.match(Bc);
              return e ? e[0] : "";
            })(this.remaining);
            t && this.capture((n = t));
          }
          const r = Fc(e),
            s = Fc(n);
          if (t.hasOwnProperty(r)) {
            let e = t[r];
            Array.isArray(e) || (t[r] = e = [e]), e.push(s);
          } else t[r] = s;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = Hc(this.remaining),
              r = this.remaining[n.length];
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s = void 0;
            n.indexOf(":") > -1
              ? ((s = n.substr(0, n.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = uc);
            const i = this.parseChildren();
            (e[s] = 1 === Object.keys(i).length ? i[uc] : new kc([], i)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class Gc {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = qc(t, this._root);
          return e ? e.children.map((t) => t.value) : [];
        }
        firstChild(t) {
          const e = qc(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = Zc(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((t) => t.value)
                .filter((e) => e !== t);
        }
        pathFromRoot(t) {
          return Zc(t, this._root).map((t) => t.value);
        }
      }
      function qc(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = qc(t, n);
          if (e) return e;
        }
        return null;
      }
      function Zc(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = Zc(t, n);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class Qc {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Yc(t) {
        const e = {};
        return t && t.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class Kc extends Gc {
        constructor(t, e) {
          super(t), (this.snapshot = e), rh(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Xc(t, e) {
        const n = (function (t, e) {
            const n = new eh([], {}, {}, "", {}, uc, e, null, t.root, -1, {});
            return new nh("", new Qc(n, []));
          })(t, e),
          r = new $l([new Ac("", {})]),
          s = new $l({}),
          i = new $l({}),
          o = new $l({}),
          l = new $l(""),
          a = new Jc(r, s, o, l, i, uc, e, n.root);
        return (a.snapshot = n.root), new Kc(new Qc(a, []), n);
      }
      class Jc {
        constructor(t, e, n, r, s, i, o, l) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(H((t) => hc(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(H((t) => hc(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function th(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            const t = n[r],
              e = n[r - 1];
            if (t.routeConfig && "" === t.routeConfig.path) r--;
            else {
              if (e.component) break;
              r--;
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign({}, t.params, e.params),
              data: Object.assign({}, t.data, e.data),
              resolve: Object.assign({}, t.resolve, e._resolvedData),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class eh {
        constructor(t, e, n, r, s, i, o, l, a, u, c) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this.routeConfig = l),
            (this._urlSegment = a),
            (this._lastPathIndex = u),
            (this._resolve = c);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = hc(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = hc(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((t) => t.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class nh extends Gc {
        constructor(t, e) {
          super(e), (this.url = t), rh(this, e);
        }
        toString() {
          return sh(this._root);
        }
      }
      function rh(t, e) {
        (e.value._routerState = t), e.children.forEach((e) => rh(t, e));
      }
      function sh(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(sh).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function ih(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            wc(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            wc(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!wc(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            wc(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function oh(t, e) {
        var n, r;
        return (
          wc(t.params, e.params) &&
          Oc((n = t.url), (r = e.url)) &&
          n.every((t, e) => wc(t.parameters, r[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || oh(t.parent, e.parent))
        );
      }
      function lh(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function ah(t, e, n, r, s) {
        let i = {};
        return (
          r &&
            Ec(r, (t, e) => {
              i[e] = Array.isArray(t) ? t.map((t) => `${t}`) : `${t}`;
            }),
          new Tc(
            n.root === t
              ? e
              : (function t(e, n, r) {
                  const s = {};
                  return (
                    Ec(e.children, (e, i) => {
                      s[i] = e === n ? r : t(e, n, r);
                    }),
                    new kc(e.segments, s)
                  );
                })(n.root, t, e),
            i,
            s
          )
        );
      }
      class uh {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = n),
            t && n.length > 0 && lh(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const r = n.find(
            (t) => "object" == typeof t && null != t && t.outlets
          );
          if (r && r !== Cc(n))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class ch {
        constructor(t, e, n) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = n);
        }
      }
      function hh(t) {
        return "object" == typeof t && null != t && t.outlets
          ? t.outlets[uc]
          : `${t}`;
      }
      function dh(t, e, n) {
        if (
          (t || (t = new kc([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return ph(t, e, n);
        const r = (function (t, e, n) {
            let r = 0,
              s = e;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < t.segments.length; ) {
              if (r >= n.length) return i;
              const e = t.segments[s],
                o = hh(n[r]),
                l = r < n.length - 1 ? n[r + 1] : null;
              if (s > 0 && void 0 === o) break;
              if (o && l && "object" == typeof l && void 0 === l.outlets) {
                if (!vh(o, l, e)) return i;
                r += 2;
              } else {
                if (!vh(o, {}, e)) return i;
                r++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: r };
          })(t, e, n),
          s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const e = new kc(t.segments.slice(0, r.pathIndex), {});
          return (
            (e.children[uc] = new kc(
              t.segments.slice(r.pathIndex),
              t.children
            )),
            ph(e, 0, s)
          );
        }
        return r.match && 0 === s.length
          ? new kc(t.segments, {})
          : r.match && !t.hasChildren()
          ? fh(t, e, n)
          : r.match
          ? ph(t, 0, s)
          : fh(t, e, n);
      }
      function ph(t, e, n) {
        if (0 === n.length) return new kc(t.segments, {});
        {
          const r = (function (t) {
              return "object" != typeof t[0]
                ? { [uc]: t }
                : void 0 === t[0].outlets
                ? { [uc]: t }
                : t[0].outlets;
            })(n),
            s = {};
          return (
            Ec(r, (n, r) => {
              null !== n && (s[r] = dh(t.children[r], e, n));
            }),
            Ec(t.children, (t, e) => {
              void 0 === r[e] && (s[e] = t);
            }),
            new kc(t.segments, s)
          );
        }
      }
      function fh(t, e, n) {
        const r = t.segments.slice(0, e);
        let s = 0;
        for (; s < n.length; ) {
          if ("object" == typeof n[s] && void 0 !== n[s].outlets) {
            const t = gh(n[s].outlets);
            return new kc(r, t);
          }
          if (0 === s && lh(n[0])) {
            r.push(new Ac(t.segments[e].path, n[0])), s++;
            continue;
          }
          const i = hh(n[s]),
            o = s < n.length - 1 ? n[s + 1] : null;
          i && o && lh(o)
            ? (r.push(new Ac(i, mh(o))), (s += 2))
            : (r.push(new Ac(i, {})), s++);
        }
        return new kc(r, {});
      }
      function gh(t) {
        const e = {};
        return (
          Ec(t, (t, n) => {
            null !== t && (e[n] = fh(new kc([], {}), 0, t));
          }),
          e
        );
      }
      function mh(t) {
        const e = {};
        return Ec(t, (t, n) => (e[n] = `${t}`)), e;
      }
      function vh(t, e, n) {
        return t == n.path && wc(e, n.parameters);
      }
      const _h = (t, e, n) =>
        H(
          (r) => (
            new bh(e, r.targetRouterState, r.currentRouterState, n).activate(t),
            r
          )
        );
      class bh {
        constructor(t, e, n, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = r);
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t),
            ih(this.futureState.root),
            this.activateChildRoutes(e, n, t);
        }
        deactivateChildRoutes(t, e, n) {
          const r = Yc(e);
          t.children.forEach((t) => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, r[e], n), delete r[e];
          }),
            Ec(r, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n);
            });
        }
        deactivateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet);
              s && this.deactivateChildRoutes(t, e, s.children);
            } else this.deactivateChildRoutes(t, e, n);
          else s && this.deactivateRouteAndItsChildren(e, n);
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: r,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n) {
            const r = Yc(t),
              s = t.value.component ? n.children : e;
            Ec(r, (t, e) => this.deactivateRouteAndItsChildren(t, s)),
              n.outlet &&
                (n.outlet.deactivate(), n.children.onOutletDeactivated());
          }
        }
        activateChildRoutes(t, e, n) {
          const r = Yc(e);
          t.children.forEach((t) => {
            this.activateRoutes(t, r[t.value.outlet], n),
              this.forwardEvent(new oc(t.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new sc(t.value.snapshot));
        }
        activateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if ((ih(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, s.children);
            } else this.activateChildRoutes(t, e, n);
          else if (r.component) {
            const e = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                wh(t.route);
            } else {
              const n = (function (t) {
                  for (let e = r.snapshot.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(),
                s = n ? n.module.componentFactoryResolver : null;
              (e.attachRef = null),
                (e.route = r),
                (e.resolver = s),
                e.outlet && e.outlet.activateWith(r, s),
                this.activateChildRoutes(t, null, e.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      function wh(t) {
        ih(t.value), t.children.forEach(wh);
      }
      function yh(t) {
        return "function" == typeof t;
      }
      function Ch(t) {
        return t instanceof Tc;
      }
      class Eh {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Sh {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function xh(t) {
        return new y((e) => e.error(new Eh(t)));
      }
      function Th(t) {
        return new y((e) => e.error(new Sh(t)));
      }
      function kh(t) {
        return new y((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class Ah {
        constructor(t, e, n, r, s) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(Ke));
        }
        apply() {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            this.urlTree.root,
            uc
          )
            .pipe(
              H((t) =>
                this.createUrlTree(
                  t,
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              ha((t) => {
                if (t instanceof Sh)
                  return (this.allowRedirects = !1), this.match(t.urlTree);
                if (t instanceof Eh) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, uc)
            .pipe(H((e) => this.createUrlTree(e, t.queryParams, t.fragment)))
            .pipe(
              ha((t) => {
                if (t instanceof Eh) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, e, n) {
          const r = t.segments.length > 0 ? new kc([], { [uc]: t }) : t;
          return new Tc(r, e, n);
        }
        expandSegmentGroup(t, e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(H((t) => new kc([], t)))
            : this.expandSegment(t, n, e, n.segments, r, !0);
        }
        expandChildren(t, e, n) {
          return (function (t, e) {
            if (0 === Object.keys(t).length) return Ul({});
            const n = [],
              r = [],
              s = {};
            return (
              Ec(t, (t, i) => {
                const o = e(i, t).pipe(H((t) => (s[i] = t)));
                i === uc ? n.push(o) : r.push(o);
              }),
              Ul.apply(null, n.concat(r)).pipe(
                Zl(),
                ca(),
                H(() => s)
              )
            );
          })(n.children, (n, r) => this.expandSegmentGroup(t, e, r, n));
        }
        expandSegment(t, e, n, r, s, i) {
          return Ul(...n).pipe(
            H((o) =>
              this.expandSegmentAgainstRoute(t, e, n, o, r, s, i).pipe(
                ha((t) => {
                  if (t instanceof Eh) return Ul(null);
                  throw t;
                })
              )
            ),
            Zl(),
            va((t) => !!t),
            ha((t, n) => {
              if (t instanceof zl || "EmptyError" === t.name) {
                if (this.noLeftoversInUrl(e, r, s)) return Ul(new kc([], {}));
                throw new Eh(e);
              }
              throw t;
            })
          );
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
          return Nh(r) !== i
            ? xh(e)
            : void 0 === r.redirectTo
            ? this.matchSegmentAgainstRoute(t, e, r, s)
            : o && this.allowRedirects
            ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i)
            : xh(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                n,
                r,
                s,
                i
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/")
            ? Th(s)
            : this.lineralizeSegments(n, s).pipe(
                q((n) => {
                  const s = new kc(n, {});
                  return this.expandSegment(t, s, e, n, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          const {
            matched: o,
            consumedSegments: l,
            lastChild: a,
            positionalParamSegments: u,
          } = Oh(e, r, s);
          if (!o) return xh(e);
          const c = this.applyRedirectCommands(l, r.redirectTo, u);
          return r.redirectTo.startsWith("/")
            ? Th(c)
            : this.lineralizeSegments(r, c).pipe(
                q((r) =>
                  this.expandSegment(t, e, n, r.concat(s.slice(a)), i, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, n, r) {
          if ("**" === n.path)
            return n.loadChildren
              ? this.configLoader
                  .load(t.injector, n)
                  .pipe(H((t) => ((n._loadedConfig = t), new kc(r, {}))))
              : Ul(new kc(r, {}));
          const { matched: s, consumedSegments: i, lastChild: o } = Oh(e, n, r);
          if (!s) return xh(e);
          const l = r.slice(o);
          return this.getChildConfig(t, n, r).pipe(
            q((t) => {
              const n = t.module,
                r = t.routes,
                { segmentGroup: s, slicedSegments: o } = (function (
                  t,
                  e,
                  n,
                  r
                ) {
                  return n.length > 0 &&
                    (function (t, e, n) {
                      return r.some((n) => Rh(t, e, n) && Nh(n) !== uc);
                    })(t, n)
                    ? {
                        segmentGroup: Ih(
                          new kc(
                            e,
                            (function (t, e) {
                              const n = {};
                              n[uc] = e;
                              for (const r of t)
                                "" === r.path &&
                                  Nh(r) !== uc &&
                                  (n[Nh(r)] = new kc([], {}));
                              return n;
                            })(r, new kc(n, t.children))
                          )
                        ),
                        slicedSegments: [],
                      }
                    : 0 === n.length &&
                      (function (t, e, n) {
                        return r.some((n) => Rh(t, e, n));
                      })(t, n)
                    ? {
                        segmentGroup: Ih(
                          new kc(
                            t.segments,
                            (function (t, e, n, r) {
                              const s = {};
                              for (const i of n)
                                Rh(t, e, i) &&
                                  !r[Nh(i)] &&
                                  (s[Nh(i)] = new kc([], {}));
                              return Object.assign({}, r, s);
                            })(t, n, r, t.children)
                          )
                        ),
                        slicedSegments: n,
                      }
                    : { segmentGroup: t, slicedSegments: n };
                })(e, i, l, r);
              return 0 === o.length && s.hasChildren()
                ? this.expandChildren(n, r, s).pipe(H((t) => new kc(i, t)))
                : 0 === r.length && 0 === o.length
                ? Ul(new kc(i, {}))
                : this.expandSegment(n, s, r, o, uc, !0).pipe(
                    H((t) => new kc(i.concat(t.segments), t.children))
                  );
            })
          );
        }
        getChildConfig(t, e, n) {
          return e.children
            ? Ul(new gc(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? Ul(e._loadedConfig)
              : (function (t, e, n) {
                  const r = e.canLoad;
                  return r && 0 !== r.length
                    ? G(r)
                        .pipe(
                          H((r) => {
                            const s = t.get(r);
                            let i;
                            if (
                              (function (t) {
                                return t && yh(t.canLoad);
                              })(s)
                            )
                              i = s.canLoad(e, n);
                            else {
                              if (!yh(s))
                                throw new Error("Invalid CanLoad guard");
                              i = s(e, n);
                            }
                            return Sc(i);
                          })
                        )
                        .pipe(
                          Zl(),
                          ((s = (t) => !0 === t),
                          (t) => t.lift(new _a(s, void 0, t)))
                        )
                    : Ul(!0);
                  var s;
                })(t.injector, e, n).pipe(
                  q((n) =>
                    n
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(H((t) => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new y((e) =>
                            e.error(
                              pc(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : Ul(new gc([], t));
        }
        lineralizeSegments(t, e) {
          let n = [],
            r = e.root;
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
              return Ul(n);
            if (r.numberOfChildren > 1 || !r.children[uc])
              return kh(t.redirectTo);
            r = r.children[uc];
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            n
          );
        }
        applyRedirectCreatreUrlTree(t, e, n, r) {
          const s = this.createSegmentGroup(t, e.root, n, r);
          return new Tc(
            s,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const n = {};
          return (
            Ec(t, (t, r) => {
              if ("string" == typeof t && t.startsWith(":")) {
                const s = t.substring(1);
                n[r] = e[s];
              } else n[r] = t;
            }),
            n
          );
        }
        createSegmentGroup(t, e, n, r) {
          const s = this.createSegments(t, e.segments, n, r);
          let i = {};
          return (
            Ec(e.children, (e, s) => {
              i[s] = this.createSegmentGroup(t, e, n, r);
            }),
            new kc(s, i)
          );
        }
        createSegments(t, e, n, r) {
          return e.map((e) =>
            e.path.startsWith(":")
              ? this.findPosParam(t, e, r)
              : this.findOrReturn(e, n)
          );
        }
        findPosParam(t, e, n) {
          const r = n[e.path.substring(1)];
          if (!r)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
            );
          return r;
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(n), r;
            n++;
          }
          return t;
        }
      }
      function Oh(t, e, n) {
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
        const r = (e.matcher || fc)(n, t, e);
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
      function Ih(t) {
        if (1 === t.numberOfChildren && t.children[uc]) {
          const e = t.children[uc];
          return new kc(t.segments.concat(e.segments), e.children);
        }
        return t;
      }
      function Rh(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      function Nh(t) {
        return t.outlet || uc;
      }
      class Dh {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Mh {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function Ph(t, e, n) {
        const r = t._root;
        return (function t(
          e,
          n,
          r,
          s,
          i = { canDeactivateChecks: [], canActivateChecks: [] }
        ) {
          const o = Yc(n);
          return (
            e.children.forEach((e) => {
              !(function (
                e,
                n,
                r,
                s,
                i = { canDeactivateChecks: [], canActivateChecks: [] }
              ) {
                const o = e.value,
                  l = n ? n.value : null,
                  a = r ? r.getContext(e.value.outlet) : null;
                if (l && o.routeConfig === l.routeConfig) {
                  const u = (function (t, e, n) {
                    if ("function" == typeof n) return n(t, e);
                    switch (n) {
                      case "pathParamsChange":
                        return !Oc(t.url, e.url);
                      case "pathParamsOrQueryParamsChange":
                        return (
                          !Oc(t.url, e.url) || !wc(t.queryParams, e.queryParams)
                        );
                      case "always":
                        return !0;
                      case "paramsOrQueryParamsChange":
                        return !oh(t, e) || !wc(t.queryParams, e.queryParams);
                      case "paramsChange":
                      default:
                        return !oh(t, e);
                    }
                  })(l, o, o.routeConfig.runGuardsAndResolvers);
                  if (
                    (u
                      ? i.canActivateChecks.push(new Dh(s))
                      : ((o.data = l.data),
                        (o._resolvedData = l._resolvedData)),
                    t(e, n, o.component ? (a ? a.children : null) : r, s, i),
                    u)
                  ) {
                    i.canDeactivateChecks.push(
                      new Mh((a && a.outlet && a.outlet.component) || null, l)
                    );
                  }
                } else
                  l && jh(n, a, i),
                    i.canActivateChecks.push(new Dh(s)),
                    t(e, null, o.component ? (a ? a.children : null) : r, s, i);
              })(e, o[e.value.outlet], r, s.concat([e.value]), i),
                delete o[e.value.outlet];
            }),
            Ec(o, (t, e) => jh(t, r.getContext(e), i)),
            i
          );
        })(r, e ? e._root : null, n, [r.value]);
      }
      function Vh(t, e, n) {
        const r = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function jh(t, e, n) {
        const r = Yc(t),
          s = t.value;
        Ec(r, (t, r) => {
          jh(t, s.component ? (e ? e.children.getContext(r) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new Mh(
              s.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              s
            )
          );
      }
      const Lh = Symbol("INITIAL_VALUE");
      function Fh() {
        return wa((t) =>
          (function (...t) {
            let e = null,
              n = null;
            return (
              O(t[t.length - 1]) && (n = t.pop()),
              "function" == typeof t[t.length - 1] && (e = t.pop()),
              1 === t.length && a(t[0]) && (t = t[0]),
              W(t, n).lift(new Wl(e))
            );
          })(
            ...t.map((t) =>
              t.pipe(
                fa(1),
                (function (...t) {
                  return (e) => {
                    let n = t[t.length - 1];
                    O(n) ? t.pop() : (n = null);
                    const r = t.length;
                    return (function (...t) {
                      return Zl()(Ul(...t));
                    })(1 !== r || n ? (r > 0 ? W(t, n) : Ll(n)) : Fl(t[0]), e);
                  };
                })(Lh)
              )
            )
          ).pipe(
            Ea((t, e) => {
              let n = !1;
              return e.reduce((t, r, s) => {
                if (t !== Lh) return t;
                if ((r === Lh && (n = !0), !n)) {
                  if (!1 === r) return r;
                  if (s === e.length - 1 || Ch(r)) return r;
                }
                return t;
              }, t);
            }, Lh),
            Ql((t) => t !== Lh),
            H((t) => (Ch(t) ? t : !0 === t)),
            fa(1)
          )
        );
      }
      function Uh(t, e) {
        return null !== t && e && e(new ic(t)), Ul(!0);
      }
      function $h(t, e) {
        return null !== t && e && e(new rc(t)), Ul(!0);
      }
      function Hh(t, e, n) {
        const r = e.routeConfig ? e.routeConfig.canActivate : null;
        return r && 0 !== r.length
          ? Ul(
              r.map((r) =>
                ql(() => {
                  const s = Vh(r, e, n);
                  let i;
                  if (
                    (function (t) {
                      return t && yh(t.canActivate);
                    })(s)
                  )
                    i = Sc(s.canActivate(e, t));
                  else {
                    if (!yh(s)) throw new Error("Invalid CanActivate guard");
                    i = Sc(s(e, t));
                  }
                  return i.pipe(va());
                })
              )
            ).pipe(Fh())
          : Ul(!0);
      }
      function zh(t, e, n) {
        const r = e[e.length - 1],
          s = e
            .slice(0, e.length - 1)
            .reverse()
            .map((t) =>
              (function (t) {
                const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                return e && 0 !== e.length ? { node: t, guards: e } : null;
              })(t)
            )
            .filter((t) => null !== t)
            .map((e) =>
              ql(() =>
                Ul(
                  e.guards.map((s) => {
                    const i = Vh(s, e.node, n);
                    let o;
                    if (
                      (function (t) {
                        return t && yh(t.canActivateChild);
                      })(i)
                    )
                      o = Sc(i.canActivateChild(r, t));
                    else {
                      if (!yh(i))
                        throw new Error("Invalid CanActivateChild guard");
                      o = Sc(i(r, t));
                    }
                    return o.pipe(va());
                  })
                ).pipe(Fh())
              )
            );
        return Ul(s).pipe(Fh());
      }
      class Bh {}
      class Wh {
        constructor(t, e, n, r, s, i) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = i);
        }
        recognize() {
          try {
            const e = Zh(
                this.urlTree.root,
                [],
                [],
                this.config,
                this.relativeLinkResolution
              ).segmentGroup,
              n = this.processSegmentGroup(this.config, e, uc),
              r = new eh(
                [],
                Object.freeze({}),
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                {},
                uc,
                this.rootComponentType,
                null,
                this.urlTree.root,
                -1,
                {}
              ),
              s = new Qc(r, n),
              i = new nh(this.url, s);
            return this.inheritParamsAndData(i._root), Ul(i);
          } catch (t) {
            return new y((e) => e.error(t));
          }
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = th(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach((t) => this.inheritParamsAndData(t));
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n);
        }
        processChildren(t, e) {
          const n = Ic(e, (e, n) => this.processSegmentGroup(t, e, n));
          return (
            (function (t) {
              const e = {};
              n.forEach((t) => {
                const n = e[t.value.outlet];
                if (n) {
                  const e = n.url.map((t) => t.toString()).join("/"),
                    r = t.value.url.map((t) => t.toString()).join("/");
                  throw new Error(
                    `Two segments cannot have the same outlet name: '${e}' and '${r}'.`
                  );
                }
                e[t.value.outlet] = t.value;
              });
            })(),
            n.sort((t, e) =>
              t.value.outlet === uc
                ? -1
                : e.value.outlet === uc
                ? 1
                : t.value.outlet.localeCompare(e.value.outlet)
            ),
            n
          );
        }
        processSegment(t, e, n, r) {
          for (const i of t)
            try {
              return this.processSegmentAgainstRoute(i, e, n, r);
            } catch (s) {
              if (!(s instanceof Bh)) throw s;
            }
          if (this.noLeftoversInUrl(e, n, r)) return [];
          throw new Bh();
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        processSegmentAgainstRoute(t, e, n, r) {
          if (t.redirectTo) throw new Bh();
          if ((t.outlet || uc) !== r) throw new Bh();
          let s,
            i = [],
            o = [];
          if ("**" === t.path) {
            const i = n.length > 0 ? Cc(n).parameters : {};
            s = new eh(
              n,
              i,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              Kh(t),
              r,
              t.component,
              t,
              Gh(e),
              qh(e) + n.length,
              Xh(t)
            );
          } else {
            const l = (function (t, e, n) {
              if ("" === e.path) {
                if ("full" === e.pathMatch && (t.hasChildren() || n.length > 0))
                  throw new Bh();
                return { consumedSegments: [], lastChild: 0, parameters: {} };
              }
              const r = (e.matcher || fc)(n, t, e);
              if (!r) throw new Bh();
              const s = {};
              Ec(r.posParams, (t, e) => {
                s[e] = t.path;
              });
              const i =
                r.consumed.length > 0
                  ? Object.assign(
                      {},
                      s,
                      r.consumed[r.consumed.length - 1].parameters
                    )
                  : s;
              return {
                consumedSegments: r.consumed,
                lastChild: r.consumed.length,
                parameters: i,
              };
            })(e, t, n);
            (i = l.consumedSegments),
              (o = n.slice(l.lastChild)),
              (s = new eh(
                i,
                l.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                Kh(t),
                r,
                t.component,
                t,
                Gh(e),
                qh(e) + i.length,
                Xh(t)
              ));
          }
          const l = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: a, slicedSegments: u } = Zh(
              e,
              i,
              o,
              l,
              this.relativeLinkResolution
            );
          if (0 === u.length && a.hasChildren()) {
            const t = this.processChildren(l, a);
            return [new Qc(s, t)];
          }
          if (0 === l.length && 0 === u.length) return [new Qc(s, [])];
          const c = this.processSegment(l, a, u, uc);
          return [new Qc(s, c)];
        }
      }
      function Gh(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function qh(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          n += (e = e._sourceSegment)._segmentIndexShift
            ? e._segmentIndexShift
            : 0;
        return n - 1;
      }
      function Zh(t, e, n, r, s) {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return r.some((n) => Qh(t, e, n) && Yh(n) !== uc);
          })(t, n)
        ) {
          const s = new kc(
            e,
            (function (t, e, n, r) {
              const s = {};
              (s[uc] = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length);
              for (const i of n)
                if ("" === i.path && Yh(i) !== uc) {
                  const n = new kc([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift = e.length),
                    (s[Yh(i)] = n);
                }
              return s;
            })(t, e, r, new kc(n, t.children))
          );
          return (
            (s._sourceSegment = t),
            (s._segmentIndexShift = e.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return r.some((n) => Qh(t, e, n));
          })(t, n)
        ) {
          const i = new kc(
            t.segments,
            (function (t, e, n, r, s, i) {
              const o = {};
              for (const l of r)
                if (Qh(t, n, l) && !s[Yh(l)]) {
                  const n = new kc([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift =
                      "legacy" === i ? t.segments.length : e.length),
                    (o[Yh(l)] = n);
                }
              return Object.assign({}, s, o);
            })(t, e, n, r, t.children, s)
          );
          return (
            (i._sourceSegment = t),
            (i._segmentIndexShift = e.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const i = new kc(t.segments, t.children);
        return (
          (i._sourceSegment = t),
          (i._segmentIndexShift = e.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function Qh(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function Yh(t) {
        return t.outlet || uc;
      }
      function Kh(t) {
        return t.data || {};
      }
      function Xh(t) {
        return t.resolve || {};
      }
      function Jh(t, e, n, r) {
        const s = Vh(t, e, r);
        return Sc(s.resolve ? s.resolve(e, n) : s(e, n));
      }
      function td(t) {
        return function (e) {
          return e.pipe(
            wa((e) => {
              const n = t(e);
              return n ? G(n).pipe(H(() => e)) : G([e]);
            })
          );
        };
      }
      class ed {}
      class nd {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      }
      const rd = new kt("ROUTES");
      class sd {
        constructor(t, e, n, r) {
          (this.loader = t),
            (this.compiler = e),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = r);
        }
        load(t, e) {
          return (
            this.onLoadStartListener && this.onLoadStartListener(e),
            this.loadModuleFactory(e.loadChildren).pipe(
              H((n) => {
                this.onLoadEndListener && this.onLoadEndListener(e);
                const r = n.create(t);
                return new gc(yc(r.injector.get(rd)).map(bc), r);
              })
            )
          );
        }
        loadModuleFactory(t) {
          return "string" == typeof t
            ? G(this.loader.load(t))
            : Sc(t()).pipe(
                q((t) =>
                  t instanceof Xe
                    ? Ul(t)
                    : G(this.compiler.compileModuleAsync(t))
                )
              );
        }
      }
      class id {}
      class od {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function ld(t) {
        throw t;
      }
      function ad(t, e, n) {
        return e.parse("/");
      }
      function ud(t, e) {
        return Ul(null);
      }
      class cd {
        constructor(t, e, n, r, s, i, o, l) {
          (this.rootComponentType = t),
            (this.urlSerializer = e),
            (this.rootContexts = n),
            (this.location = r),
            (this.config = l),
            (this.lastSuccessfulNavigation = null),
            (this.currentNavigation = null),
            (this.navigationId = 0),
            (this.isNgZoneEnabled = !1),
            (this.events = new k()),
            (this.errorHandler = ld),
            (this.malformedUriErrorHandler = ad),
            (this.navigated = !1),
            (this.lastSuccessfulId = -1),
            (this.hooks = { beforePreactivation: ud, afterPreactivation: ud }),
            (this.urlHandlingStrategy = new od()),
            (this.routeReuseStrategy = new nd()),
            (this.onSameUrlNavigation = "ignore"),
            (this.paramsInheritanceStrategy = "emptyOnly"),
            (this.urlUpdateStrategy = "deferred"),
            (this.relativeLinkResolution = "legacy"),
            (this.ngModule = s.get(Ke)),
            (this.console = s.get(Ds));
          const a = s.get(Qs);
          (this.isNgZoneEnabled = a instanceof Qs),
            this.resetConfig(l),
            (this.currentUrlTree = new Tc(new kc([], {}), {}, null)),
            (this.rawUrlTree = this.currentUrlTree),
            (this.browserUrlTree = this.currentUrlTree),
            (this.configLoader = new sd(
              i,
              o,
              (t) => this.triggerEvent(new ec(t)),
              (t) => this.triggerEvent(new nc(t))
            )),
            (this.routerState = Xc(
              this.currentUrlTree,
              this.rootComponentType
            )),
            (this.transitions = new $l({
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
        setupNavigations(t) {
          const e = this.events;
          return t.pipe(
            Ql((t) => 0 !== t.id),
            H((t) =>
              Object.assign({}, t, {
                extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
              })
            ),
            wa((t) => {
              let n = !1,
                r = !1;
              return Ul(t).pipe(
                ra((t) => {
                  this.currentNavigation = {
                    id: t.id,
                    initialUrl: t.currentRawUrl,
                    extractedUrl: t.extractedUrl,
                    trigger: t.source,
                    extras: t.extras,
                    previousNavigation: this.lastSuccessfulNavigation
                      ? Object.assign({}, this.lastSuccessfulNavigation, {
                          previousNavigation: null,
                        })
                      : null,
                  };
                }),
                wa((t) => {
                  const n =
                    !this.navigated ||
                    t.extractedUrl.toString() !==
                      this.browserUrlTree.toString();
                  if (
                    ("reload" === this.onSameUrlNavigation || n) &&
                    this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                  )
                    return Ul(t).pipe(
                      wa((t) => {
                        const n = this.transitions.getValue();
                        return (
                          e.next(
                            new Gu(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              t.source,
                              t.restoredState
                            )
                          ),
                          n !== this.transitions.getValue() ? jl : [t]
                        );
                      }),
                      wa((t) => Promise.resolve(t)),
                      (function (t, e, n, r) {
                        return function (s) {
                          return s.pipe(
                            wa((s) =>
                              (function (t, e, n, r, i) {
                                return new Ah(
                                  t,
                                  e,
                                  n,
                                  s.extractedUrl,
                                  i
                                ).apply();
                              })(t, e, n, 0, r).pipe(
                                H((t) =>
                                  Object.assign({}, s, { urlAfterRedirects: t })
                                )
                              )
                            )
                          );
                        };
                      })(
                        this.ngModule.injector,
                        this.configLoader,
                        this.urlSerializer,
                        this.config
                      ),
                      ra((t) => {
                        this.currentNavigation = Object.assign(
                          {},
                          this.currentNavigation,
                          { finalUrl: t.urlAfterRedirects }
                        );
                      }),
                      (function (t, e, n, r, s) {
                        return function (i) {
                          return i.pipe(
                            q((i) =>
                              (function (
                                t,
                                e,
                                n,
                                r,
                                s = "emptyOnly",
                                i = "legacy"
                              ) {
                                return new Wh(t, e, n, r, s, i).recognize();
                              })(
                                t,
                                e,
                                i.urlAfterRedirects,
                                n(i.urlAfterRedirects),
                                r,
                                s
                              ).pipe(
                                H((t) =>
                                  Object.assign({}, i, { targetSnapshot: t })
                                )
                              )
                            )
                          );
                        };
                      })(
                        this.rootComponentType,
                        this.config,
                        (t) => this.serializeUrl(t),
                        this.paramsInheritanceStrategy,
                        this.relativeLinkResolution
                      ),
                      ra((t) => {
                        "eager" === this.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            this.setBrowserUrl(
                              t.urlAfterRedirects,
                              !!t.extras.replaceUrl,
                              t.id,
                              t.extras.state
                            ),
                          (this.browserUrlTree = t.urlAfterRedirects));
                      }),
                      ra((t) => {
                        const n = new Yu(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          this.serializeUrl(t.urlAfterRedirects),
                          t.targetSnapshot
                        );
                        e.next(n);
                      })
                    );
                  if (
                    n &&
                    this.rawUrlTree &&
                    this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                  ) {
                    const {
                        id: n,
                        extractedUrl: r,
                        source: s,
                        restoredState: i,
                        extras: o,
                      } = t,
                      l = new Gu(n, this.serializeUrl(r), s, i);
                    e.next(l);
                    const a = Xc(r, this.rootComponentType).snapshot;
                    return Ul(
                      Object.assign({}, t, {
                        targetSnapshot: a,
                        urlAfterRedirects: r,
                        extras: Object.assign({}, o, {
                          skipLocationChange: !1,
                          replaceUrl: !1,
                        }),
                      })
                    );
                  }
                  return (
                    (this.rawUrlTree = t.rawUrl),
                    (this.browserUrlTree = t.urlAfterRedirects),
                    t.resolve(null),
                    jl
                  );
                }),
                td((t) => {
                  const {
                    targetSnapshot: e,
                    id: n,
                    extractedUrl: r,
                    rawUrl: s,
                    extras: { skipLocationChange: i, replaceUrl: o },
                  } = t;
                  return this.hooks.beforePreactivation(e, {
                    navigationId: n,
                    appliedUrlTree: r,
                    rawUrlTree: s,
                    skipLocationChange: !!i,
                    replaceUrl: !!o,
                  });
                }),
                ra((t) => {
                  const e = new Ku(
                    t.id,
                    this.serializeUrl(t.extractedUrl),
                    this.serializeUrl(t.urlAfterRedirects),
                    t.targetSnapshot
                  );
                  this.triggerEvent(e);
                }),
                H((t) =>
                  Object.assign({}, t, {
                    guards: Ph(
                      t.targetSnapshot,
                      t.currentSnapshot,
                      this.rootContexts
                    ),
                  })
                ),
                (function (t, e) {
                  return function (n) {
                    return n.pipe(
                      q((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: s,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: o,
                          },
                        } = n;
                        return 0 === o.length && 0 === i.length
                          ? Ul(Object.assign({}, n, { guardsResult: !0 }))
                          : (function (t, e, n, r) {
                              return G(o).pipe(
                                q((t) =>
                                  (function (t, e, n, r, s) {
                                    const i =
                                      e && e.routeConfig
                                        ? e.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? Ul(
                                          i.map((i) => {
                                            const o = Vh(i, e, s);
                                            let l;
                                            if (
                                              (function (t) {
                                                return t && yh(t.canDeactivate);
                                              })(o)
                                            )
                                              l = Sc(
                                                o.canDeactivate(t, e, n, r)
                                              );
                                            else {
                                              if (!yh(o))
                                                throw new Error(
                                                  "Invalid CanDeactivate guard"
                                                );
                                              l = Sc(o(t, e, n, r));
                                            }
                                            return l.pipe(va());
                                          })
                                        ).pipe(Fh())
                                      : Ul(!0);
                                  })(t.component, t.route, n, e, r)
                                ),
                                va((t) => !0 !== t, !0)
                              );
                            })(0, r, s, t).pipe(
                              q((n) =>
                                n &&
                                (function (t) {
                                  return "boolean" == typeof n;
                                })()
                                  ? (function (t, e, n, r) {
                                      return G(i).pipe(
                                        Ta((e) =>
                                          G([
                                            $h(e.route.parent, r),
                                            Uh(e.route, r),
                                            zh(t, e.path, n),
                                            Hh(t, e.route, n),
                                          ]).pipe(
                                            Zl(),
                                            va((t) => !0 !== t, !0)
                                          )
                                        ),
                                        va((t) => !0 !== t, !0)
                                      );
                                    })(r, 0, t, e)
                                  : Ul(n)
                              ),
                              H((t) =>
                                Object.assign({}, n, { guardsResult: t })
                              )
                            );
                      })
                    );
                  };
                })(this.ngModule.injector, (t) => this.triggerEvent(t)),
                ra((t) => {
                  if (Ch(t.guardsResult)) {
                    const e = pc(
                      `Redirecting to "${this.serializeUrl(t.guardsResult)}"`
                    );
                    throw ((e.url = t.guardsResult), e);
                  }
                }),
                ra((t) => {
                  const e = new Xu(
                    t.id,
                    this.serializeUrl(t.extractedUrl),
                    this.serializeUrl(t.urlAfterRedirects),
                    t.targetSnapshot,
                    !!t.guardsResult
                  );
                  this.triggerEvent(e);
                }),
                Ql((t) => {
                  if (!t.guardsResult) {
                    this.resetUrlToCurrentUrlTree();
                    const n = new Zu(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      ""
                    );
                    return e.next(n), t.resolve(!1), !1;
                  }
                  return !0;
                }),
                td((t) => {
                  if (t.guards.canActivateChecks.length)
                    return Ul(t).pipe(
                      ra((t) => {
                        const e = new Ju(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          this.serializeUrl(t.urlAfterRedirects),
                          t.targetSnapshot
                        );
                        this.triggerEvent(e);
                      }),
                      (function (t, e) {
                        return function (n) {
                          return n.pipe(
                            q((n) => {
                              const {
                                targetSnapshot: r,
                                guards: { canActivateChecks: s },
                              } = n;
                              return s.length
                                ? G(s).pipe(
                                    Ta((n) =>
                                      (function (t, e, n, s) {
                                        return (function (t, e, n, r) {
                                          const s = Object.keys(t);
                                          if (0 === s.length) return Ul({});
                                          if (1 === s.length) {
                                            const i = s[0];
                                            return Jh(t[i], e, n, r).pipe(
                                              H((t) => ({ [i]: t }))
                                            );
                                          }
                                          const i = {};
                                          return G(s)
                                            .pipe(
                                              q((s) =>
                                                Jh(t[s], e, n, r).pipe(
                                                  H((t) => ((i[s] = t), t))
                                                )
                                              )
                                            )
                                            .pipe(
                                              ca(),
                                              H(() => i)
                                            );
                                        })(t._resolve, t, r, s).pipe(
                                          H(
                                            (e) => (
                                              (t._resolvedData = e),
                                              (t.data = Object.assign(
                                                {},
                                                t.data,
                                                th(t, n).resolve
                                              )),
                                              null
                                            )
                                          )
                                        );
                                      })(n.route, 0, t, e)
                                    ),
                                    (function (t, e) {
                                      return arguments.length >= 2
                                        ? function (e) {
                                            return b(
                                              Ea(t, void 0),
                                              ta(1),
                                              la(void 0)
                                            )(e);
                                          }
                                        : function (e) {
                                            return b(
                                              Ea((e, n, r) => t(e)),
                                              ta(1)
                                            )(e);
                                          };
                                    })((t, e) => t),
                                    H((t) => n)
                                  )
                                : Ul(n);
                            })
                          );
                        };
                      })(
                        this.paramsInheritanceStrategy,
                        this.ngModule.injector
                      ),
                      ra((t) => {
                        const e = new tc(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          this.serializeUrl(t.urlAfterRedirects),
                          t.targetSnapshot
                        );
                        this.triggerEvent(e);
                      })
                    );
                }),
                td((t) => {
                  const {
                    targetSnapshot: e,
                    id: n,
                    extractedUrl: r,
                    rawUrl: s,
                    extras: { skipLocationChange: i, replaceUrl: o },
                  } = t;
                  return this.hooks.afterPreactivation(e, {
                    navigationId: n,
                    appliedUrlTree: r,
                    rawUrlTree: s,
                    skipLocationChange: !!i,
                    replaceUrl: !!o,
                  });
                }),
                H((t) => {
                  const e = (function (t, e, n) {
                    const r = (function t(e, n, r) {
                      if (r && e.shouldReuseRoute(n.value, r.value.snapshot)) {
                        const s = r.value;
                        s._futureSnapshot = n.value;
                        const i = (function (e, n, r) {
                          return n.children.map((n) => {
                            for (const s of r.children)
                              if (e.shouldReuseRoute(s.value.snapshot, n.value))
                                return t(e, n, s);
                            return t(e, n);
                          });
                        })(e, n, r);
                        return new Qc(s, i);
                      }
                      {
                        const r = e.retrieve(n.value);
                        if (r) {
                          const t = r.route;
                          return (
                            (function t(e, n) {
                              if (e.value.routeConfig !== n.value.routeConfig)
                                throw new Error(
                                  "Cannot reattach ActivatedRouteSnapshot created from a different route"
                                );
                              if (e.children.length !== n.children.length)
                                throw new Error(
                                  "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                                );
                              n.value._futureSnapshot = e.value;
                              for (let r = 0; r < e.children.length; ++r)
                                t(e.children[r], n.children[r]);
                            })(n, t),
                            t
                          );
                        }
                        {
                          const r = new Jc(
                              new $l((s = n.value).url),
                              new $l(s.params),
                              new $l(s.queryParams),
                              new $l(s.fragment),
                              new $l(s.data),
                              s.outlet,
                              s.component,
                              s
                            ),
                            i = n.children.map((n) => t(e, n));
                          return new Qc(r, i);
                        }
                      }
                      var s;
                    })(t, e._root, n ? n._root : void 0);
                    return new Kc(r, e);
                  })(
                    this.routeReuseStrategy,
                    t.targetSnapshot,
                    t.currentRouterState
                  );
                  return Object.assign({}, t, { targetRouterState: e });
                }),
                ra((t) => {
                  (this.currentUrlTree = t.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      this.currentUrlTree,
                      t.rawUrl
                    )),
                    (this.routerState = t.targetRouterState),
                    "deferred" === this.urlUpdateStrategy &&
                      (t.extras.skipLocationChange ||
                        this.setBrowserUrl(
                          this.rawUrlTree,
                          !!t.extras.replaceUrl,
                          t.id,
                          t.extras.state
                        ),
                      (this.browserUrlTree = t.urlAfterRedirects));
                }),
                _h(this.rootContexts, this.routeReuseStrategy, (t) =>
                  this.triggerEvent(t)
                ),
                ra({
                  next() {
                    n = !0;
                  },
                  complete() {
                    n = !0;
                  },
                }),
                (function (t) {
                  return (e) => e.lift(new ka(t));
                })(() => {
                  if (!n && !r) {
                    this.resetUrlToCurrentUrlTree();
                    const n = new Zu(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                    );
                    e.next(n), t.resolve(!1);
                  }
                  this.currentNavigation = null;
                }),
                ha((n) => {
                  if (
                    ((r = !0),
                    (function (t) {
                      return n && n[dc];
                    })())
                  ) {
                    const r = Ch(n.url);
                    r ||
                      ((this.navigated = !0),
                      this.resetStateAndUrl(
                        t.currentRouterState,
                        t.currentUrlTree,
                        t.rawUrl
                      ));
                    const s = new Zu(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      n.message
                    );
                    e.next(s), t.resolve(!1), r && this.navigateByUrl(n.url);
                  } else {
                    this.resetStateAndUrl(
                      t.currentRouterState,
                      t.currentUrlTree,
                      t.rawUrl
                    );
                    const r = new Qu(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      n
                    );
                    e.next(r);
                    try {
                      t.resolve(this.errorHandler(n));
                    } catch (s) {
                      t.reject(s);
                    }
                  }
                  return jl;
                })
              );
            })
          );
        }
        resetRootComponentType(t) {
          (this.rootComponentType = t),
            (this.routerState.root.component = this.rootComponentType);
        }
        getTransition() {
          const t = this.transitions.value;
          return (t.urlAfterRedirects = this.browserUrlTree), t;
        }
        setTransition(t) {
          this.transitions.next(Object.assign({}, this.getTransition(), t));
        }
        initialNavigation() {
          this.setUpLocationChangeListener(),
            0 === this.navigationId &&
              this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
        }
        setUpLocationChangeListener() {
          this.locationSubscription ||
            (this.locationSubscription = this.location.subscribe((t) => {
              let e = this.parseUrl(t.url);
              const n = "popstate" === t.type ? "popstate" : "hashchange",
                r = t.state && t.state.navigationId ? t.state : null;
              setTimeout(() => {
                this.scheduleNavigation(e, n, r, { replaceUrl: !0 });
              }, 0);
            }));
        }
        get url() {
          return this.serializeUrl(this.currentUrlTree);
        }
        getCurrentNavigation() {
          return this.currentNavigation;
        }
        triggerEvent(t) {
          this.events.next(t);
        }
        resetConfig(t) {
          mc(t),
            (this.config = t.map(bc)),
            (this.navigated = !1),
            (this.lastSuccessfulId = -1);
        }
        ngOnDestroy() {
          this.dispose();
        }
        dispose() {
          this.locationSubscription &&
            (this.locationSubscription.unsubscribe(),
            (this.locationSubscription = null));
        }
        createUrlTree(t, e = {}) {
          const {
            relativeTo: n,
            queryParams: r,
            fragment: s,
            preserveQueryParams: i,
            queryParamsHandling: o,
            preserveFragment: l,
          } = e;
          se() &&
            i &&
            console &&
            console.warn &&
            console.warn(
              "preserveQueryParams is deprecated, use queryParamsHandling instead."
            );
          const a = n || this.routerState.root,
            u = l ? this.currentUrlTree.fragment : s;
          let c = null;
          if (o)
            switch (o) {
              case "merge":
                c = Object.assign({}, this.currentUrlTree.queryParams, r);
                break;
              case "preserve":
                c = this.currentUrlTree.queryParams;
                break;
              default:
                c = r || null;
            }
          else c = i ? this.currentUrlTree.queryParams : r || null;
          return (
            null !== c && (c = this.removeEmptyProps(c)),
            (function (t, e, n, r, s) {
              if (0 === n.length) return ah(e.root, e.root, e, r, s);
              const i = (function (t) {
                if ("string" == typeof t[0] && 1 === t.length && "/" === t[0])
                  return new uh(!0, 0, t);
                let e = 0,
                  n = !1;
                const r = t.reduce((t, r, s) => {
                  if ("object" == typeof r && null != r) {
                    if (r.outlets) {
                      const e = {};
                      return (
                        Ec(r.outlets, (t, n) => {
                          e[n] = "string" == typeof t ? t.split("/") : t;
                        }),
                        [...t, { outlets: e }]
                      );
                    }
                    if (r.segmentPath) return [...t, r.segmentPath];
                  }
                  return "string" != typeof r
                    ? [...t, r]
                    : 0 === s
                    ? (r.split("/").forEach((r, s) => {
                        (0 == s && "." === r) ||
                          (0 == s && "" === r
                            ? (n = !0)
                            : ".." === r
                            ? e++
                            : "" != r && t.push(r));
                      }),
                      t)
                    : [...t, r];
                }, []);
                return new uh(n, e, r);
              })(n);
              if (i.toRoot()) return ah(e.root, new kc([], {}), e, r, s);
              const o = (function (t, n, r) {
                  if (t.isAbsolute) return new ch(e.root, !0, 0);
                  if (-1 === r.snapshot._lastPathIndex)
                    return new ch(r.snapshot._urlSegment, !0, 0);
                  const s = lh(t.commands[0]) ? 0 : 1;
                  return (function (e, n, i) {
                    let o = r.snapshot._urlSegment,
                      l = r.snapshot._lastPathIndex + s,
                      a = t.numberOfDoubleDots;
                    for (; a > l; ) {
                      if (((a -= l), !(o = o.parent)))
                        throw new Error("Invalid number of '../'");
                      l = o.segments.length;
                    }
                    return new ch(o, !1, l - a);
                  })();
                })(i, 0, t),
                l = o.processChildren
                  ? ph(o.segmentGroup, o.index, i.commands)
                  : dh(o.segmentGroup, o.index, i.commands);
              return ah(o.segmentGroup, l, e, r, s);
            })(a, this.currentUrlTree, t, c, u)
          );
        }
        navigateByUrl(t, e = { skipLocationChange: !1 }) {
          se() &&
            this.isNgZoneEnabled &&
            !Qs.isInAngularZone() &&
            this.console.warn(
              "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
            );
          const n = Ch(t) ? t : this.parseUrl(t),
            r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
          return this.scheduleNavigation(r, "imperative", null, e);
        }
        navigate(t, e = { skipLocationChange: !1 }) {
          return (
            (function (t) {
              for (let e = 0; e < t.length; e++) {
                const n = t[e];
                if (null == n)
                  throw new Error(
                    `The requested path contains ${n} segment at index ${e}`
                  );
              }
            })(t),
            this.navigateByUrl(this.createUrlTree(t, e), e)
          );
        }
        serializeUrl(t) {
          return this.urlSerializer.serialize(t);
        }
        parseUrl(t) {
          let e;
          try {
            e = this.urlSerializer.parse(t);
          } catch (n) {
            e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
          }
          return e;
        }
        isActive(t, e) {
          if (Ch(t)) return xc(this.currentUrlTree, t, e);
          const n = this.parseUrl(t);
          return xc(this.currentUrlTree, n, e);
        }
        removeEmptyProps(t) {
          return Object.keys(t).reduce((e, n) => {
            const r = t[n];
            return null != r && (e[n] = r), e;
          }, {});
        }
        processNavigations() {
          this.navigations.subscribe(
            (t) => {
              (this.navigated = !0),
                (this.lastSuccessfulId = t.id),
                this.events.next(
                  new qu(
                    t.id,
                    this.serializeUrl(t.extractedUrl),
                    this.serializeUrl(this.currentUrlTree)
                  )
                ),
                (this.lastSuccessfulNavigation = this.currentNavigation),
                (this.currentNavigation = null),
                t.resolve(!0);
            },
            (t) => {
              this.console.warn("Unhandled Navigation Error: ");
            }
          );
        }
        scheduleNavigation(t, e, n, r) {
          const s = this.getTransition();
          if (
            s &&
            "imperative" !== e &&
            "imperative" === s.source &&
            s.rawUrl.toString() === t.toString()
          )
            return Promise.resolve(!0);
          if (
            s &&
            "hashchange" == e &&
            "popstate" === s.source &&
            s.rawUrl.toString() === t.toString()
          )
            return Promise.resolve(!0);
          if (
            s &&
            "popstate" == e &&
            "hashchange" === s.source &&
            s.rawUrl.toString() === t.toString()
          )
            return Promise.resolve(!0);
          let i = null,
            o = null;
          const l = new Promise((t, e) => {
              (i = t), (o = e);
            }),
            a = ++this.navigationId;
          return (
            this.setTransition({
              id: a,
              source: e,
              restoredState: n,
              currentUrlTree: this.currentUrlTree,
              currentRawUrl: this.rawUrlTree,
              rawUrl: t,
              extras: r,
              resolve: i,
              reject: o,
              promise: l,
              currentSnapshot: this.routerState.snapshot,
              currentRouterState: this.routerState,
            }),
            l.catch((t) => Promise.reject(t))
          );
        }
        setBrowserUrl(t, e, n, r) {
          const s = this.urlSerializer.serialize(t);
          (r = r || {}),
            this.location.isCurrentPathEqualTo(s) || e
              ? this.location.replaceState(
                  s,
                  "",
                  Object.assign({}, r, { navigationId: n })
                )
              : this.location.go(
                  s,
                  "",
                  Object.assign({}, r, { navigationId: n })
                );
        }
        resetStateAndUrl(t, e, n) {
          (this.routerState = t),
            (this.currentUrlTree = e),
            (this.rawUrlTree = this.urlHandlingStrategy.merge(
              this.currentUrlTree,
              n
            )),
            this.resetUrlToCurrentUrlTree();
        }
        resetUrlToCurrentUrlTree() {
          this.location.replaceState(
            this.urlSerializer.serialize(this.rawUrlTree),
            "",
            { navigationId: this.lastSuccessfulId }
          );
        }
      }
      class hd {
        constructor(t, e, n, r, s) {
          (this.router = t),
            (this.route = e),
            (this.commands = []),
            null == n && r.setAttribute(s.nativeElement, "tabindex", "0");
        }
        set routerLink(t) {
          this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
        }
        set preserveQueryParams(t) {
          se() &&
            console &&
            console.warn &&
            console.warn(
              "preserveQueryParams is deprecated!, use queryParamsHandling instead."
            ),
            (this.preserve = t);
        }
        onClick() {
          const t = {
            skipLocationChange: pd(this.skipLocationChange),
            replaceUrl: pd(this.replaceUrl),
          };
          return this.router.navigateByUrl(this.urlTree, t), !0;
        }
        get urlTree() {
          return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            preserveQueryParams: pd(this.preserve),
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: pd(this.preserveFragment),
          });
        }
      }
      class dd {
        constructor(t, e, n) {
          (this.router = t),
            (this.route = e),
            (this.locationStrategy = n),
            (this.commands = []),
            (this.subscription = t.events.subscribe((t) => {
              t instanceof qu && this.updateTargetUrlAndHref();
            }));
        }
        set routerLink(t) {
          this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
        }
        set preserveQueryParams(t) {
          se() &&
            console &&
            console.warn &&
            console.warn(
              "preserveQueryParams is deprecated, use queryParamsHandling instead."
            ),
            (this.preserve = t);
        }
        ngOnChanges(t) {
          this.updateTargetUrlAndHref();
        }
        ngOnDestroy() {
          this.subscription.unsubscribe();
        }
        onClick(t, e, n, r) {
          if (0 !== t || e || n || r) return !0;
          if ("string" == typeof this.target && "_self" != this.target)
            return !0;
          const s = {
            skipLocationChange: pd(this.skipLocationChange),
            replaceUrl: pd(this.replaceUrl),
            state: this.state,
          };
          return this.router.navigateByUrl(this.urlTree, s), !1;
        }
        updateTargetUrlAndHref() {
          this.href = this.locationStrategy.prepareExternalUrl(
            this.router.serializeUrl(this.urlTree)
          );
        }
        get urlTree() {
          return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            preserveQueryParams: pd(this.preserve),
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: pd(this.preserveFragment),
          });
        }
      }
      function pd(t) {
        return "" === t || !!t;
      }
      class fd {
        constructor(t, e, n, r, s) {
          (this.router = t),
            (this.element = e),
            (this.renderer = n),
            (this.link = r),
            (this.linkWithHref = s),
            (this.classes = []),
            (this.isActive = !1),
            (this.routerLinkActiveOptions = { exact: !1 }),
            (this.subscription = t.events.subscribe((t) => {
              t instanceof qu && this.update();
            }));
        }
        ngAfterContentInit() {
          this.links.changes.subscribe((t) => this.update()),
            this.linksWithHrefs.changes.subscribe((t) => this.update()),
            this.update();
        }
        set routerLinkActive(t) {
          const e = Array.isArray(t) ? t : t.split(" ");
          this.classes = e.filter((t) => !!t);
        }
        ngOnChanges(t) {
          this.update();
        }
        ngOnDestroy() {
          this.subscription.unsubscribe();
        }
        update() {
          this.links &&
            this.linksWithHrefs &&
            this.router.navigated &&
            Promise.resolve().then(() => {
              const t = this.hasActiveLinks();
              this.isActive !== t &&
                ((this.isActive = t),
                this.classes.forEach((e) => {
                  t
                    ? this.renderer.addClass(this.element.nativeElement, e)
                    : this.renderer.removeClass(this.element.nativeElement, e);
                }));
            });
        }
        isLinkActive(t) {
          return (e) =>
            t.isActive(e.urlTree, this.routerLinkActiveOptions.exact);
        }
        hasActiveLinks() {
          const t = this.isLinkActive(this.router);
          return (
            (this.link && t(this.link)) ||
            (this.linkWithHref && t(this.linkWithHref)) ||
            this.links.some(t) ||
            this.linksWithHrefs.some(t)
          );
        }
      }
      class gd {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new md()),
            (this.attachRef = null);
        }
      }
      class md {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          (n.outlet = e), this.contexts.set(t, n);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && (e.outlet = null);
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new gd()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      class vd {
        constructor(t, e, n, r, s) {
          (this.parentContexts = t),
            (this.location = e),
            (this.resolver = n),
            (this.changeDetector = s),
            (this.activated = null),
            (this._activatedRoute = null),
            (this.activateEvents = new Cs()),
            (this.deactivateEvents = new Cs()),
            (this.name = r || uc),
            t.onChildOutletCreated(this.name, this);
        }
        ngOnDestroy() {
          this.parentContexts.onChildOutletDestroyed(this.name);
        }
        ngOnInit() {
          if (!this.activated) {
            const t = this.parentContexts.getContext(this.name);
            t &&
              t.route &&
              (t.attachRef
                ? this.attach(t.attachRef, t.route)
                : this.activateWith(t.route, t.resolver || null));
          }
        }
        get isActivated() {
          return !!this.activated;
        }
        get component() {
          if (!this.activated) throw new Error("Outlet is not activated");
          return this.activated.instance;
        }
        get activatedRoute() {
          if (!this.activated) throw new Error("Outlet is not activated");
          return this._activatedRoute;
        }
        get activatedRouteData() {
          return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
        }
        detach() {
          if (!this.activated) throw new Error("Outlet is not activated");
          this.location.detach();
          const t = this.activated;
          return (this.activated = null), (this._activatedRoute = null), t;
        }
        attach(t, e) {
          (this.activated = t),
            (this._activatedRoute = e),
            this.location.insert(t.hostView);
        }
        deactivate() {
          if (this.activated) {
            const t = this.component;
            this.activated.destroy(),
              (this.activated = null),
              (this._activatedRoute = null),
              this.deactivateEvents.emit(t);
          }
        }
        activateWith(t, e) {
          if (this.isActivated)
            throw new Error("Cannot activate an already activated outlet");
          this._activatedRoute = t;
          const n = (e = e || this.resolver).resolveComponentFactory(
              t._futureSnapshot.routeConfig.component
            ),
            r = this.parentContexts.getOrCreateContext(this.name).children,
            s = new _d(t, r, this.location.injector);
          (this.activated = this.location.createComponent(
            n,
            this.location.length,
            s
          )),
            this.changeDetector.markForCheck(),
            this.activateEvents.emit(this.activated.instance);
        }
      }
      class _d {
        constructor(t, e, n) {
          (this.route = t), (this.childContexts = e), (this.parent = n);
        }
        get(t, e) {
          return t === Jc
            ? this.route
            : t === md
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      class bd {}
      class wd {
        preload(t, e) {
          return e().pipe(ha(() => Ul(null)));
        }
      }
      class yd {
        preload(t, e) {
          return Ul(null);
        }
      }
      class Cd {
        constructor(t, e, n, r, s) {
          (this.router = t),
            (this.injector = r),
            (this.preloadingStrategy = s),
            (this.loader = new sd(
              e,
              n,
              (e) => t.triggerEvent(new ec(e)),
              (e) => t.triggerEvent(new nc(e))
            ));
        }
        setUpPreloading() {
          this.subscription = this.router.events
            .pipe(
              Ql((t) => t instanceof qu),
              Ta(() => this.preload())
            )
            .subscribe(() => {});
        }
        preload() {
          const t = this.injector.get(Ke);
          return this.processRoutes(t, this.router.config);
        }
        ngOnDestroy() {
          this.subscription.unsubscribe();
        }
        processRoutes(t, e) {
          const n = [];
          for (const r of e)
            if (r.loadChildren && !r.canLoad && r._loadedConfig) {
              const t = r._loadedConfig;
              n.push(this.processRoutes(t.module, t.routes));
            } else
              r.loadChildren && !r.canLoad
                ? n.push(this.preloadConfig(t, r))
                : r.children && n.push(this.processRoutes(t, r.children));
          return G(n).pipe(
            K(),
            H((t) => void 0)
          );
        }
        preloadConfig(t, e) {
          return this.preloadingStrategy.preload(e, () =>
            this.loader
              .load(t.injector, e)
              .pipe(
                q(
                  (t) => (
                    (e._loadedConfig = t),
                    this.processRoutes(t.module, t.routes)
                  )
                )
              )
          );
        }
      }
      class Ed {
        constructor(t, e, n = {}) {
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
        init() {
          "disabled" !== this.options.scrollPositionRestoration &&
            this.viewportScroller.setHistoryScrollRestoration("manual"),
            (this.routerEventsSubscription = this.createScrollEvents()),
            (this.scrollEventsSubscription = this.consumeScrollEvents());
        }
        createScrollEvents() {
          return this.router.events.subscribe((t) => {
            t instanceof Gu
              ? ((this.store[this.lastId] =
                  this.viewportScroller.getScrollPosition()),
                (this.lastSource = t.navigationTrigger),
                (this.restoredId = t.restoredState
                  ? t.restoredState.navigationId
                  : 0))
              : t instanceof qu &&
                ((this.lastId = t.id),
                this.scheduleScrollEvent(
                  t,
                  this.router.parseUrl(t.urlAfterRedirects).fragment
                ));
          });
        }
        consumeScrollEvents() {
          return this.router.events.subscribe((t) => {
            t instanceof lc &&
              (t.position
                ? "top" === this.options.scrollPositionRestoration
                  ? this.viewportScroller.scrollToPosition([0, 0])
                  : "enabled" === this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition(t.position)
                : t.anchor && "enabled" === this.options.anchorScrolling
                ? this.viewportScroller.scrollToAnchor(t.anchor)
                : "disabled" !== this.options.scrollPositionRestoration &&
                  this.viewportScroller.scrollToPosition([0, 0]));
          });
        }
        scheduleScrollEvent(t, e) {
          this.router.triggerEvent(
            new lc(
              t,
              "popstate" === this.lastSource
                ? this.store[this.restoredId]
                : null,
              e
            )
          );
        }
        ngOnDestroy() {
          this.routerEventsSubscription &&
            this.routerEventsSubscription.unsubscribe(),
            this.scrollEventsSubscription &&
              this.scrollEventsSubscription.unsubscribe();
        }
      }
      const Sd = new kt("ROUTER_CONFIGURATION"),
        xd = new kt("ROUTER_FORROOT_GUARD"),
        Td = [
          pl,
          { provide: Rc, useClass: Nc },
          {
            provide: cd,
            useFactory: Dd,
            deps: [
              gi,
              Rc,
              md,
              pl,
              Nt,
              Ss,
              Fs,
              rd,
              Sd,
              [id, new ut()],
              [ed, new ut()],
            ],
          },
          md,
          { provide: Jc, useFactory: Md, deps: [cd] },
          { provide: Ss, useClass: Ci },
          Cd,
          yd,
          wd,
          { provide: Sd, useValue: { enableTracing: !1 } },
        ];
      function kd() {
        return new ci("Router", cd);
      }
      class Ad {
        constructor(t, e) {}
        static forRoot(t, e) {
          return {
            ngModule: Ad,
            providers: [
              Td,
              Nd(t),
              { provide: xd, useFactory: Rd, deps: [[cd, new ut(), new ht()]] },
              { provide: Sd, useValue: e || {} },
              {
                provide: hl,
                useFactory: Id,
                deps: [ul, [new at(dl), new ut()], Sd],
              },
              { provide: Ed, useFactory: Od, deps: [cd, Pl, Sd] },
              {
                provide: bd,
                useExisting:
                  e && e.preloadingStrategy ? e.preloadingStrategy : yd,
              },
              { provide: ci, multi: !0, useFactory: kd },
              [
                Pd,
                { provide: xs, multi: !0, useFactory: Vd, deps: [Pd] },
                { provide: Ld, useFactory: jd, deps: [Pd] },
                { provide: Ns, multi: !0, useExisting: Ld },
              ],
            ],
          };
        }
        static forChild(t) {
          return { ngModule: Ad, providers: [Nd(t)] };
        }
      }
      function Od(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new Ed(t, e, n);
      }
      function Id(t, e, n = {}) {
        return n.useHash ? new gl(t, e) : new ml(t, e);
      }
      function Rd(t) {
        if (t)
          throw new Error(
            "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function Nd(t) {
        return [
          { provide: Qt, multi: !0, useValue: t },
          { provide: rd, multi: !0, useValue: t },
        ];
      }
      function Dd(t, e, n, r, s, i, o, l, a = {}, u, c) {
        const h = new cd(null, e, n, r, s, i, o, yc(l));
        if (
          (u && (h.urlHandlingStrategy = u),
          c && (h.routeReuseStrategy = c),
          a.errorHandler && (h.errorHandler = a.errorHandler),
          a.malformedUriErrorHandler &&
            (h.malformedUriErrorHandler = a.malformedUriErrorHandler),
          a.enableTracing)
        ) {
          const t = Ia();
          h.events.subscribe((e) => {
            t.logGroup(`Router Event: ${e.constructor.name}`),
              t.log(e.toString()),
              t.log(e),
              t.logGroupEnd();
          });
        }
        return (
          a.onSameUrlNavigation &&
            (h.onSameUrlNavigation = a.onSameUrlNavigation),
          a.paramsInheritanceStrategy &&
            (h.paramsInheritanceStrategy = a.paramsInheritanceStrategy),
          a.urlUpdateStrategy && (h.urlUpdateStrategy = a.urlUpdateStrategy),
          a.relativeLinkResolution &&
            (h.relativeLinkResolution = a.relativeLinkResolution),
          h
        );
      }
      function Md(t) {
        return t.routerState.root;
      }
      class Pd {
        constructor(t) {
          (this.injector = t),
            (this.initNavigation = !1),
            (this.resultOfPreactivationDone = new k());
        }
        appInitializer() {
          return this.injector.get(cl, Promise.resolve(null)).then(() => {
            let t = null;
            const e = new Promise((e) => (t = e)),
              n = this.injector.get(cd),
              r = this.injector.get(Sd);
            if (this.isLegacyDisabled(r) || this.isLegacyEnabled(r)) t(!0);
            else if ("disabled" === r.initialNavigation)
              n.setUpLocationChangeListener(), t(!0);
            else {
              if ("enabled" !== r.initialNavigation)
                throw new Error(
                  `Invalid initialNavigation options: '${r.initialNavigation}'`
                );
              (n.hooks.afterPreactivation = () =>
                this.initNavigation
                  ? Ul(null)
                  : ((this.initNavigation = !0),
                    t(!0),
                    this.resultOfPreactivationDone)),
                n.initialNavigation();
            }
            return e;
          });
        }
        bootstrapListener(t) {
          const e = this.injector.get(Sd),
            n = this.injector.get(Cd),
            r = this.injector.get(Ed),
            s = this.injector.get(cd),
            i = this.injector.get(gi);
          t === i.components[0] &&
            (this.isLegacyEnabled(e)
              ? s.initialNavigation()
              : this.isLegacyDisabled(e) && s.setUpLocationChangeListener(),
            n.setUpPreloading(),
            r.init(),
            s.resetRootComponentType(i.componentTypes[0]),
            this.resultOfPreactivationDone.next(null),
            this.resultOfPreactivationDone.complete());
        }
        isLegacyEnabled(t) {
          return (
            "legacy_enabled" === t.initialNavigation ||
            !0 === t.initialNavigation ||
            void 0 === t.initialNavigation
          );
        }
        isLegacyDisabled(t) {
          return (
            "legacy_disabled" === t.initialNavigation ||
            !1 === t.initialNavigation
          );
        }
      }
      function Vd(t) {
        return t.appInitializer.bind(t);
      }
      function jd(t) {
        return t.bootstrapListener.bind(t);
      }
      const Ld = new kt("Router Initializer");
      var Fd = Zn({ encapsulation: 2, styles: [], data: {} });
      function Ud(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            ss(1, 212992, null, 0, vd, [md, On, Ze, [8, null], Cn], null, null),
          ],
          function (t, e) {
            t(e, 1, 0);
          },
          null
        );
      }
      function $d(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
              Ud,
              Fd
            )),
            ss(1, 49152, null, 0, ac, [], null, null),
          ],
          null,
          null
        );
      }
      var Hd = Mr("ng-component", ac, $d, {}, {}, []);
      class zd {
        constructor(t, e) {
          (this.open = t), (this.close = e || t);
        }
        isManual() {
          return "manual" === this.open || "manual" === this.close;
        }
      }
      const Bd = {
          hover: ["mouseover", "mouseout"],
          focus: ["focusin", "focusout"],
        },
        Wd = ("undefined" != typeof window && window) || {};
      let Gd;
      function qd() {
        return (
          void 0 === Wd ||
          (void 0 === Wd.__theme
            ? Gd
              ? "bs3" === Gd
              : "bs3" ===
                (Gd = (function () {
                  if ("undefined" == typeof document) return null;
                  const t = document.createElement("span");
                  (t.innerText = "test bs version"),
                    document.body.appendChild(t),
                    t.classList.add("d-none");
                  const e = t.getBoundingClientRect();
                  return (
                    document.body.removeChild(t),
                    e && 0 === e.top ? "bs4" : "bs3"
                  );
                })())
            : "bs4" !== Wd.__theme)
        );
      }
      "undefined" == typeof console || console;
      class Zd {
        constructor(t, e, n) {
          (this.nodes = t), (this.viewRef = e), (this.componentRef = n);
        }
      }
      class Qd {
        constructor(t, e, n, r, s, i, o, l) {
          (this._viewContainerRef = t),
            (this._renderer = e),
            (this._elementRef = n),
            (this._injector = r),
            (this._componentFactoryResolver = s),
            (this._ngZone = i),
            (this._applicationRef = o),
            (this._posService = l),
            (this.onBeforeShow = new Cs()),
            (this.onShown = new Cs()),
            (this.onBeforeHide = new Cs()),
            (this.onHidden = new Cs()),
            (this._providers = []),
            (this._isHiding = !1),
            (this.containerDefaultSelector = "body"),
            (this._listenOpts = {}),
            (this._globalListener = Function.prototype);
        }
        get isShown() {
          return !this._isHiding && !!this._componentRef;
        }
        attach(t) {
          return (
            (this._componentFactory =
              this._componentFactoryResolver.resolveComponentFactory(t)),
            this
          );
        }
        to(t) {
          return (this.container = t || this.container), this;
        }
        position(t) {
          return (
            (this.attachment = t.attachment || this.attachment),
            (this._elementRef = t.target || this._elementRef),
            this
          );
        }
        provide(t) {
          return this._providers.push(t), this;
        }
        show(t = {}) {
          if (
            (this._subscribePositioning(),
            (this._innerComponent = null),
            !this._componentRef)
          ) {
            this.onBeforeShow.emit(),
              (this._contentRef = this._getContentRef(
                t.content,
                t.context,
                t.initialState
              ));
            const e = Nt.create({
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
              this.container instanceof tn &&
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
        }
        hide() {
          if (!this._componentRef) return this;
          this._posService.deletePositionElement(this._componentRef.location),
            this.onBeforeHide.emit(this._componentRef.instance);
          const t = this._componentRef.location.nativeElement;
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
        }
        toggle() {
          this.isShown ? this.hide() : this.show();
        }
        dispose() {
          this.isShown && this.hide(),
            this._unsubscribePositioning(),
            this._unregisterListenersFn && this._unregisterListenersFn();
        }
        listen(t) {
          (this.triggers = t.triggers || this.triggers),
            (this._listenOpts.outsideClick = t.outsideClick),
            (this._listenOpts.outsideEsc = t.outsideEsc),
            (t.target = t.target || this._elementRef.nativeElement);
          const e = (this._listenOpts.hide = () =>
              t.hide ? t.hide() : void this.hide()),
            n = (this._listenOpts.show = (e) => {
              t.show ? t.show(e) : this.show(e), e();
            });
          return (
            (this._unregisterListenersFn = (function (t, e) {
              const n = (function (t, n = Bd) {
                  const r = (e.triggers || "").trim();
                  if (0 === r.length) return [];
                  const s = r
                      .split(/\s+/)
                      .map((t) => t.split(":"))
                      .map((t) => {
                        const e = n[t[0]] || t;
                        return new zd(e[0], e[1]);
                      }),
                    i = s.filter((t) => t.isManual());
                  if (i.length > 1)
                    throw new Error(
                      "Triggers parse error: only one manual trigger is allowed"
                    );
                  if (1 === i.length && s.length > 1)
                    throw new Error(
                      "Triggers parse error: manual trigger can't be mixed with other triggers"
                    );
                  return s;
                })(),
                r = e.target;
              if (1 === n.length && n[0].isManual()) return Function.prototype;
              const s = [],
                i = [],
                o = () => {
                  i.forEach((t) => s.push(t())), (i.length = 0);
                };
              return (
                n.forEach((n) => {
                  const l = n.open === n.close,
                    a = l ? e.toggle : e.show;
                  l || i.push(() => t.listen(r, n.close, e.hide)),
                    s.push(t.listen(r, n.open, () => a(o)));
                }),
                () => {
                  s.forEach((t) => t());
                }
              );
            })(this._renderer, {
              target: t.target,
              triggers: t.triggers,
              show: n,
              hide: e,
              toggle: (t) => {
                this.isShown ? e() : n(t);
              },
            })),
            this
          );
        }
        _removeGlobalListener() {
          this._globalListener &&
            (this._globalListener(), (this._globalListener = null));
        }
        attachInline(t, e) {
          return (this._inlineViewRef = t.createEmbeddedView(e)), this;
        }
        _registerOutsideClick() {
          if (this._componentRef && this._componentRef.location) {
            if (this._listenOpts.outsideClick) {
              const t = this._componentRef.location.nativeElement;
              setTimeout(() => {
                this._globalListener = (function (t, e) {
                  return e.outsideClick
                    ? t.listen("document", "click", (t) => {
                        (e.target && e.target.contains(t.target)) ||
                          (e.targets &&
                            e.targets.some((e) => e.contains(t.target))) ||
                          e.hide();
                      })
                    : Function.prototype;
                })(this._renderer, {
                  targets: [t, this._elementRef.nativeElement],
                  outsideClick: this._listenOpts.outsideClick,
                  hide: () => this._listenOpts.hide(),
                });
              });
            }
            var t;
            this._listenOpts.outsideEsc &&
              (this._globalListener = (t = {
                targets: [
                  this._componentRef.location.nativeElement,
                  this._elementRef.nativeElement,
                ],
                outsideEsc: this._listenOpts.outsideEsc,
                hide: () => this._listenOpts.hide(),
              }).outsideEsc
                ? this._renderer.listen("document", "keyup.esc", (e) => {
                    (t.target && t.target.contains(e.target)) ||
                      (t.targets &&
                        t.targets.some((t) => t.contains(e.target))) ||
                      t.hide();
                  })
                : Function.prototype);
          }
        }
        getInnerComponent() {
          return this._innerComponent;
        }
        _subscribePositioning() {
          !this._zoneSubscription &&
            this.attachment &&
            (this.onShown.subscribe(() => {
              this._posService.position({
                element: this._componentRef.location,
                target: this._elementRef,
                attachment: this.attachment,
                appendToBody: "body" === this.container,
              });
            }),
            (this._zoneSubscription = this._ngZone.onStable.subscribe(() => {
              this._componentRef && this._posService.calcPosition();
            })));
        }
        _unsubscribePositioning() {
          this._zoneSubscription &&
            (this._zoneSubscription.unsubscribe(),
            (this._zoneSubscription = null));
        }
        _getContentRef(t, e, n) {
          if (!t) return new Zd([]);
          if (t instanceof kn) {
            if (this._viewContainerRef) {
              const n = this._viewContainerRef.createEmbeddedView(t, e);
              return n.markForCheck(), new Zd([n.rootNodes], n);
            }
            const n = t.createEmbeddedView({});
            return this._applicationRef.attachView(n), new Zd([n.rootNodes], n);
          }
          if ("function" == typeof t) {
            const e = this._componentFactoryResolver.resolveComponentFactory(t),
              r = Nt.create({
                providers: this._providers,
                parent: this._injector,
              }),
              s = e.create(r);
            return (
              Object.assign(s.instance, n),
              this._applicationRef.attachView(s.hostView),
              new Zd([[s.location.nativeElement]], s.hostView, s)
            );
          }
          return new Zd([[this._renderer.createText(`${t}`)]]);
        }
      }
      class Yd {
        constructor(t, e, n, r, s) {
          (this._componentFactoryResolver = t),
            (this._ngZone = e),
            (this._injector = n),
            (this._posService = r),
            (this._applicationRef = s);
        }
        createLoader(t, e, n) {
          return new Qd(
            e,
            n,
            t,
            this._injector,
            this._componentFactoryResolver,
            this._ngZone,
            this._applicationRef,
            this._posService
          );
        }
      }
      function Kd(t, e, n, s) {
        return (
          r(n) && ((s = n), (n = void 0)),
          s
            ? Kd(t, e, n).pipe(H((t) => (a(t) ? s(...t) : s(t))))
            : new y((r) => {
                !(function t(e, n, r, s, i) {
                  let o;
                  if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.addEventListener &&
                        "function" == typeof t.removeEventListener
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.addEventListener(n, r, i),
                      (o = () => t.removeEventListener(n, r, i));
                  } else if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.on &&
                        "function" == typeof t.off
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.on(n, r), (o = () => t.off(n, r));
                  } else if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.addListener &&
                        "function" == typeof t.removeListener
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.addListener(n, r), (o = () => t.removeListener(n, r));
                  } else {
                    if (!e || !e.length)
                      throw new TypeError("Invalid event target");
                    for (let o = 0, l = e.length; o < l; o++)
                      t(e[o], n, r, s, i);
                  }
                  s.add(o);
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
      class Xd extends d {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      class Jd extends Xd {
        constructor(t, e) {
          super(t, e),
            (this.scheduler = t),
            (this.work = e),
            (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const n = this.id,
            r = this.scheduler;
          return (
            null != n && (this.id = this.recycleAsyncId(r, n, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(r, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, n = 0) {
          return setInterval(t.flush.bind(t, this), n);
        }
        recycleAsyncId(t, e, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return e;
          clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let n = !1,
            r = void 0;
          try {
            this.work(t);
          } catch (s) {
            (n = !0), (r = (!!s && s) || new Error(s));
          }
          if (n) return this.unsubscribe(), r;
        }
        _unsubscribe() {
          const t = this.id,
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
        }
      }
      class tp extends Jd {
        constructor(t, e) {
          super(t, e), (this.scheduler = t), (this.work = e);
        }
        requestAsyncId(t, e, n = 0) {
          return null !== n && n > 0
            ? super.requestAsyncId(t, e, n)
            : (t.actions.push(this),
              t.scheduled ||
                (t.scheduled = requestAnimationFrame(() => t.flush(null))));
        }
        recycleAsyncId(t, e, n = 0) {
          if ((null !== n && n > 0) || (null === n && this.delay > 0))
            return super.recycleAsyncId(t, e, n);
          0 === t.actions.length &&
            (cancelAnimationFrame(e), (t.scheduled = void 0));
        }
      }
      const ep = (function () {
        class t {
          constructor(e, n = t.now) {
            (this.SchedulerAction = e), (this.now = n);
          }
          schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e);
          }
        }
        return (t.now = () => Date.now()), t;
      })();
      class np extends ep {
        constructor(t, e = ep.now) {
          super(t, () =>
            np.delegate && np.delegate !== this ? np.delegate.now() : e()
          ),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(t, e = 0, n) {
          return np.delegate && np.delegate !== this
            ? np.delegate.schedule(t, e, n)
            : super.schedule(t, e, n);
        }
        flush(t) {
          const { actions: e } = this;
          if (this.active) return void e.push(t);
          let n;
          this.active = !0;
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this.active = !1), n)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      }
      class rp extends np {
        flush(t) {
          (this.active = !0), (this.scheduled = void 0);
          const { actions: e } = this;
          let n,
            r = -1,
            s = e.length;
          t = t || e.shift();
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while (++r < s && (t = e.shift()));
          if (((this.active = !1), n)) {
            for (; ++r < s && (t = e.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      }
      const sp = new rp(tp);
      function ip(t, e) {
        if (1 !== t.nodeType) return [];
        const n = t.ownerDocument.defaultView.getComputedStyle(t, null);
        return e ? n[e] : n;
      }
      function op(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host;
      }
      function lp(t) {
        if (!t) return document.body;
        switch (t.nodeName) {
          case "HTML":
          case "BODY":
            return t.ownerDocument.body;
          case "#document":
            return t.body;
        }
        const { overflow: e, overflowX: n, overflowY: r } = ip(t);
        return /(auto|scroll|overlay)/.test(String(e) + String(r) + String(n))
          ? t
          : lp(op(t));
      }
      const ap = "undefined" != typeof window && "undefined" != typeof document,
        up = ap && !(!window.MSInputMethodContext || !document.documentMode),
        cp =
          ap &&
          !(
            !window.MSInputMethodContext || !/MSIE 10/.test(navigator.userAgent)
          );
      function hp(t) {
        return 11 === t ? up : 10 === t ? cp : up || cp;
      }
      function dp(t) {
        if (!t) return document.documentElement;
        const e = hp(10) ? document.body : null;
        let n,
          r = t.offsetParent || null;
        for (; r === e && t.nextElementSibling && "BODY" !== t.nodeName; )
          r = (n = t.nextElementSibling).offsetParent;
        const s = r && r.nodeName;
        return s && "BODY" !== s && "HTML" !== s
          ? -1 !== ["TH", "TD", "TABLE"].indexOf(r.nodeName) &&
            "static" === ip(r, "position")
            ? dp(r)
            : r
          : n
          ? n.ownerDocument.documentElement
          : document.documentElement;
      }
      function pp(t) {
        return null !== t.parentNode ? pp(t.parentNode) : t;
      }
      function fp(t, e) {
        if (!(t && t.nodeType && e && e.nodeType))
          return document.documentElement;
        const n =
            t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
          r = n ? t : e,
          s = n ? e : t,
          i = document.createRange();
        i.setStart(r, 0), i.setEnd(s, 0);
        const { commonAncestorContainer: o } = i;
        if ((t !== o && e !== o) || r.contains(s))
          return (function (t) {
            const { nodeName: e } = t;
            return (
              "BODY" !== e && ("HTML" === e || dp(t.firstElementChild) === t)
            );
          })(o)
            ? o
            : dp(o);
        const l = pp(t);
        return l.host ? fp(l.host, e) : fp(t, pp(e).host);
      }
      function gp(t, e) {
        const n = "x" === e ? "Left" : "Top",
          r = "Left" === n ? "Right" : "Bottom";
        return (
          parseFloat(t[`border${n}Width`]) + parseFloat(t[`border${r}Width`])
        );
      }
      function mp(t, e, n, r) {
        return Math.max(
          e[`offset${t}`],
          e[`scroll${t}`],
          n[`client${t}`],
          n[`offset${t}`],
          n[`scroll${t}`],
          hp(10)
            ? parseInt(n[`offset${t}`], 10) +
                parseInt(r[`margin${"Height" === t ? "Top" : "Left"}`], 10) +
                parseInt(r[`margin${"Height" === t ? "Bottom" : "Right"}`], 10)
            : 0
        );
      }
      function vp(t) {
        const e = t.body,
          n = t.documentElement,
          r = hp(10) && getComputedStyle(n);
        return { height: mp("Height", e, n, r), width: mp("Width", e, n, r) };
      }
      function _p(t, e = "top") {
        const n = "top" === e ? "scrollTop" : "scrollLeft",
          r = t.nodeName;
        if ("BODY" === r || "HTML" === r) {
          const e = t.ownerDocument.documentElement;
          return (t.ownerDocument.scrollingElement || e)[n];
        }
        return t[n];
      }
      function bp(t) {
        return Object.assign({}, t, {
          right: t.left + t.width,
          bottom: t.top + t.height,
        });
      }
      function wp(t) {
        let e = {};
        try {
          if (hp(10)) {
            e = t.getBoundingClientRect();
            const n = _p(t, "top"),
              r = _p(t, "left");
            (e.top += n), (e.left += r), (e.bottom += n), (e.right += r);
          } else e = t.getBoundingClientRect();
        } catch (o) {
          return;
        }
        const n = {
            left: e.left,
            top: e.top,
            width: e.right - e.left,
            height: e.bottom - e.top,
          },
          r = "HTML" === t.nodeName ? vp(t.ownerDocument) : {};
        let s = t.offsetWidth - (r.width || t.clientWidth || n.right - n.left),
          i = t.offsetHeight - (r.height || t.clientHeight || n.bottom - n.top);
        if (s || i) {
          const e = ip(t);
          (s -= gp(e, "x")), (i -= gp(e, "y")), (n.width -= s), (n.height -= i);
        }
        return bp(n);
      }
      function yp(t, e, n = !1) {
        const r = hp(10),
          s = "HTML" === e.nodeName,
          i = wp(t),
          o = wp(e),
          l = lp(t),
          a = ip(e),
          u = parseFloat(a.borderTopWidth),
          c = parseFloat(a.borderLeftWidth);
        n &&
          s &&
          ((o.top = Math.max(o.top, 0)), (o.left = Math.max(o.left, 0)));
        let h = bp({
          top: i.top - o.top - u,
          left: i.left - o.left - c,
          width: i.width,
          height: i.height,
        });
        if (((h.marginTop = 0), (h.marginLeft = 0), !r && s)) {
          const t = parseFloat(a.marginTop),
            e = parseFloat(a.marginLeft);
          (h.top -= u - t),
            (h.bottom -= u - t),
            (h.left -= c - e),
            (h.right -= c - e),
            (h.marginTop = t),
            (h.marginLeft = e);
        }
        return (
          (r && !n ? e.contains(l) : e === l && "BODY" !== l.nodeName) &&
            (h = (function (t, e, n = !1) {
              const r = _p(e, "top"),
                s = _p(e, "left"),
                i = n ? -1 : 1;
              return (
                (t.top += r * i),
                (t.bottom += r * i),
                (t.left += s * i),
                (t.right += s * i),
                t
              );
            })(h, e)),
          h
        );
      }
      function Cp(t) {
        if (!t || !t.parentElement || hp()) return document.documentElement;
        let e = t.parentElement;
        for (; e && "none" === ip(e, "transform"); ) e = e.parentElement;
        return e || document.documentElement;
      }
      function Ep(t, e, n = 0, r, s = !1) {
        let i = { top: 0, left: 0 };
        const o = s ? Cp(t) : fp(t, e);
        if ("viewport" === r)
          i = (function (t, e = !1) {
            const n = o.ownerDocument.documentElement,
              r = yp(o, n),
              s = Math.max(n.clientWidth, window.innerWidth || 0),
              i = Math.max(n.clientHeight, window.innerHeight || 0),
              l = e ? 0 : _p(n),
              a = e ? 0 : _p(n, "left");
            return bp({
              top: l - Number(r.top) + Number(r.marginTop),
              left: a - Number(r.left) + Number(r.marginLeft),
              width: s,
              height: i,
            });
          })(0, s);
        else {
          let n;
          "scrollParent" === r
            ? "BODY" === (n = lp(op(e))).nodeName &&
              (n = t.ownerDocument.documentElement)
            : (n = "window" === r ? t.ownerDocument.documentElement : r);
          const l = yp(n, o, s);
          if (
            "HTML" !== n.nodeName ||
            (function t(e) {
              const n = e.nodeName;
              return (
                "BODY" !== n &&
                "HTML" !== n &&
                ("fixed" === ip(e, "position") || t(op(e)))
              );
            })(o)
          )
            i = l;
          else {
            const { height: e, width: n } = vp(t.ownerDocument);
            (i.top += l.top - l.marginTop),
              (i.bottom = Number(e) + Number(l.top)),
              (i.left += l.left - l.marginLeft),
              (i.right = Number(n) + Number(l.left));
          }
        }
        return (i.left += n), (i.top += n), (i.right -= n), (i.bottom -= n), i;
      }
      function Sp({ width: t, height: e }) {
        return t * e;
      }
      function xp(
        t,
        e,
        n,
        r,
        s = ["top", "bottom", "right", "left"],
        i = "viewport",
        o = 0
      ) {
        if (-1 === t.indexOf("auto")) return t;
        const l = Ep(n, r, o, i),
          a = {
            top: { width: l.width, height: e.top - l.top },
            right: { width: l.right - e.right, height: l.height },
            bottom: { width: l.width, height: l.bottom - e.bottom },
            left: { width: e.left - l.left, height: l.height },
          },
          u = Object.keys(a)
            .map((t) => Object.assign({ key: t }, a[t], { area: Sp(a[t]) }))
            .sort((t, e) => e.area - t.area);
        let c = u.filter(
          ({ width: t, height: e }) => t >= n.clientWidth && e >= n.clientHeight
        );
        const h =
            (c = c.filter((t) => s.some((e) => e === t.key))).length > 0
              ? c[0].key
              : u[0].key,
          d = t.split(" ")[1];
        return (
          (n.className = n.className.replace(
            /bs-tooltip-auto/g,
            `bs-tooltip-${h}`
          )),
          h + (d ? `-${d}` : "")
        );
      }
      function Tp(t) {
        const e = t.ownerDocument.defaultView.getComputedStyle(t),
          n = parseFloat(e.marginTop || 0) + parseFloat(e.marginBottom || 0),
          r = parseFloat(e.marginLeft || 0) + parseFloat(e.marginRight || 0);
        return {
          width: Number(t.offsetWidth) + r,
          height: Number(t.offsetHeight) + n,
        };
      }
      function kp(t, e, n = null) {
        return yp(e, n ? Cp(t) : fp(t, e), n);
      }
      function Ap(t, e, n) {
        const r = n.split(" ")[0],
          s = Tp(t),
          i = { width: s.width, height: s.height },
          o = -1 !== ["right", "left"].indexOf(r),
          l = o ? "top" : "left",
          a = o ? "left" : "top",
          u = o ? "height" : "width",
          c = o ? "width" : "height";
        return (
          (i[l] = e[l] + e[u] / 2 - s[u] / 2),
          (i[a] =
            r === a
              ? e[a] - s[c]
              : e[
                  (function (t) {
                    const e = {
                      left: "right",
                      right: "left",
                      bottom: "top",
                      top: "bottom",
                    };
                    return a.replace(/left|right|bottom|top/g, (t) => e[t]);
                  })()
                ]),
          i
        );
      }
      function Op(t, e) {
        return t && t.modifiers && t.modifiers[e] && t.modifiers[e].enabled;
      }
      function Ip(t, e, n) {
        Object.keys(e).forEach((r) => {
          let s = "";
          -1 !==
            ["width", "height", "top", "right", "bottom", "left"].indexOf(r) &&
            (function (t) {
              return "" !== t && !isNaN(parseFloat(t)) && isFinite(t);
            })(e[r]) &&
            (s = "px"),
            n
              ? n.setStyle(t, r, `${String(e[r])}${s}`)
              : (t.style[r] = String(e[r]) + s);
        });
      }
      function Rp(t) {
        let e = t.offsets.target;
        const n = t.instance.target.querySelector(".arrow");
        if (!n) return t;
        const r = -1 !== ["left", "right"].indexOf(t.placement),
          s = r ? "height" : "width",
          i = r ? "Top" : "Left",
          o = i.toLowerCase(),
          l = r ? "left" : "top",
          a = r ? "bottom" : "right",
          u = Tp(n)[s];
        t.offsets.host[a] - u < e[o] &&
          (e[o] -= e[o] - (t.offsets.host[a] - u)),
          Number(t.offsets.host[o]) + Number(u) > e[a] &&
            (e[o] += Number(t.offsets.host[o]) + Number(u) - Number(e[a])),
          (e = bp(e));
        const c =
            Number(t.offsets.host[o]) + Number(t.offsets.host[s] / 2 - u / 2),
          h = ip(t.instance.target),
          d = parseFloat(h[`margin${i}`]),
          p = parseFloat(h[`border${i}Width`]);
        let f = c - e[o] - d - p;
        return (
          (f = Math.max(Math.min(e[s] - u, f), 0)),
          (t.offsets.arrow = { [o]: Math.round(f), [l]: "" }),
          (t.instance.arrow = n),
          t
        );
      }
      function Np(t) {
        if (((t.offsets.target = bp(t.offsets.target)), !Op(t.options, "flip")))
          return (
            (t.offsets.target = Object.assign(
              {},
              t.offsets.target,
              Ap(t.instance.target, t.offsets.host, t.placement)
            )),
            t
          );
        const e = Ep(t.instance.target, t.instance.host, 0, "viewport", !1);
        let n = t.placement.split(" ")[0],
          r = t.placement.split(" ")[1] || "";
        const s = xp(
            "auto",
            t.offsets.host,
            t.instance.target,
            t.instance.host,
            t.options.allowedPositions
          ),
          i = [n, s];
        return (
          i.forEach((s, o) => {
            if (n !== s || i.length === o + 1) return t;
            const l =
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
              a = Math.floor(t.offsets.target.left) < Math.floor(e.left),
              u = Math.floor(t.offsets.target.right) > Math.floor(e.right),
              c = Math.floor(t.offsets.target.top) < Math.floor(e.top),
              h = Math.floor(t.offsets.target.bottom) > Math.floor(e.bottom),
              d =
                ("left" === n && a) ||
                ("right" === n && u) ||
                ("top" === n && c) ||
                ("bottom" === n && h),
              p = -1 !== ["top", "bottom"].indexOf(n),
              f =
                (p && "left" === r && a) ||
                (p && "right" === r && u) ||
                (!p && "left" === r && c) ||
                (!p && "right" === r && h);
            (l || d || f) &&
              ((l || d) && (n = i[o + 1]),
              f &&
                (r = (function (t) {
                  return "right" === t ? "left" : "left" === t ? "right" : t;
                })(r)),
              (t.placement = n + (r ? ` ${r}` : "")),
              (t.offsets.target = Object.assign(
                {},
                t.offsets.target,
                Ap(t.instance.target, t.offsets.host, t.placement)
              )));
          }),
          t
        );
      }
      function Dp(t) {
        if (!Op(t.options, "preventOverflow")) return t;
        const e = "transform",
          n = t.instance.target.style,
          { top: r, left: s, [e]: i } = n;
        (n.top = ""), (n.left = ""), (n[e] = "");
        const o = Ep(t.instance.target, t.instance.host, 0, "scrollParent", !1);
        (n.top = r), (n.left = s), (n[e] = i);
        const l = {
          primary(e) {
            let n = t.offsets.target[e];
            return (
              t.offsets.target[e] < o[e] &&
                (n = Math.max(t.offsets.target[e], o[e])),
              { [e]: n }
            );
          },
          secondary(e) {
            const n = "right" === e ? "left" : "top";
            let r = t.offsets.target[n];
            return (
              t.offsets.target[e] > o[e] &&
                (r = Math.min(
                  t.offsets.target[n],
                  o[e] -
                    ("right" === e
                      ? t.offsets.target.width
                      : t.offsets.target.height)
                )),
              { [n]: r }
            );
          },
        };
        let a;
        return (
          ["left", "right", "top", "bottom"].forEach((e) => {
            (a = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary"),
              (t.offsets.target = Object.assign({}, t.offsets.target, l[a](e)));
          }),
          t
        );
      }
      function Mp(t) {
        const e = t.placement,
          n = e.split(" ")[0],
          r = e.split(" ")[1];
        if (r) {
          const { host: e, target: s } = t.offsets,
            i = -1 !== ["bottom", "top"].indexOf(n),
            o = i ? "left" : "top",
            l = i ? "width" : "height";
          t.offsets.target = Object.assign(
            {},
            s,
            { start: { [o]: e[o] }, end: { [o]: e[o] + e[l] - s[l] } }[r]
          );
        }
        return t;
      }
      class Pp {
        position(t, e, n = !0) {
          return this.offset(t, e, !1);
        }
        offset(t, e, n = !0) {
          return kp(e, t);
        }
        positionElements(t, e, n, r, s) {
          return [Np, Mp, Dp, Rp].reduce(
            (t, e) => e(t),
            (function (t, e, n, r) {
              const s = kp(t, e);
              n.match(/^(auto)*\s*(left|right|top|bottom)*$/) ||
                n.match(/^(left|right|top|bottom)*\s*(start|end)*$/) ||
                (n = "auto");
              const i = !!n.match(/auto/g);
              let o = n.match(/auto\s(left|right|top|bottom)/)
                ? n.split(" ")[1] || "auto"
                : n;
              return {
                options: r,
                instance: { target: t, host: e, arrow: null },
                offsets: { target: Ap(t, s, o), host: s, arrow: null },
                positionFixed: !1,
                placement: (o = xp(
                  o,
                  s,
                  t,
                  e,
                  r ? r.allowedPositions : void 0
                )),
                placementAuto: i,
              };
            })(e, t, n, s)
          );
        }
      }
      const Vp = new Pp();
      class jp {
        constructor(t, e) {
          (this.update$$ = new k()),
            (this.positionElements = new Map()),
            (function (t) {
              return t === Dl;
            })(e) &&
              X(
                Kd(window, "scroll"),
                Kd(window, "resize"),
                Ul(0, sp),
                this.update$$
              ).subscribe(() => {
                this.positionElements.forEach((e) => {
                  !(function (t, e, n, r, s, i) {
                    const o = Vp.positionElements(t, e, n, r, s),
                      l = (function (t) {
                        return {
                          width: t.offsets.target.width,
                          height: t.offsets.target.height,
                          left: Math.floor(t.offsets.target.left),
                          top: Math.round(t.offsets.target.top),
                          bottom: Math.round(t.offsets.target.bottom),
                          right: Math.floor(t.offsets.target.right),
                        };
                      })(o);
                    Ip(
                      e,
                      {
                        "will-change": "transform",
                        top: "0px",
                        left: "0px",
                        transform: `translate3d(${l.left}px, ${l.top}px, 0px)`,
                      },
                      i
                    ),
                      o.instance.arrow &&
                        Ip(o.instance.arrow, o.offsets.arrow, i),
                      (function (t, e) {
                        const n = t.instance.target;
                        let r = n.className;
                        t.placementAuto &&
                          (-1 !==
                            (r = (r = (r = r.replace(
                              /bs-popover-auto/g,
                              `bs-popover-${t.placement}`
                            )).replace(
                              /bs-tooltip-auto/g,
                              `bs-tooltip-${t.placement}`
                            )).replace(/\sauto/g, ` ${t.placement}`)).indexOf(
                              "popover"
                            ) &&
                            -1 === r.indexOf("popover-auto") &&
                            (r += " popover-auto"),
                          -1 !== r.indexOf("tooltip") &&
                            -1 === r.indexOf("tooltip-auto") &&
                            (r += " tooltip-auto")),
                          (r = r.replace(
                            /left|right|top|bottom/g,
                            `${t.placement.split(" ")[0]}`
                          )),
                          e ? e.setAttribute(n, "class", r) : (n.className = r);
                      })(o, i);
                  })(
                    Lp(e.target),
                    Lp(e.element),
                    e.attachment,
                    e.appendToBody,
                    this.options,
                    t.createRenderer(null, null)
                  );
                });
              });
        }
        position(t) {
          this.addPositionElement(t);
        }
        addPositionElement(t) {
          this.positionElements.set(Lp(t.element), t);
        }
        calcPosition() {
          this.update$$.next();
        }
        deletePositionElement(t) {
          this.positionElements.delete(Lp(t));
        }
        setOptions(t) {
          this.options = t;
        }
      }
      function Lp(t) {
        return "string" == typeof t
          ? document.querySelector(t)
          : t instanceof tn
          ? t.nativeElement
          : t;
      }
      class Fp {
        constructor() {
          (this.autoClose = !0), (this.insideClick = !1);
        }
      }
      class Up {
        constructor() {
          (this.direction = "down"),
            (this.isOpenChange = new Cs()),
            (this.isDisabledChange = new Cs()),
            (this.toggleClick = new Cs()),
            (this.dropdownMenu = new Promise((t) => {
              this.resolveDropdownMenu = t;
            }));
        }
      }
      class $p {
        constructor(t, e, n, r) {
          (this._state = t),
            (this.cd = e),
            (this._renderer = n),
            (this._element = r),
            (this.isOpen = !1),
            (this._subscription = t.isOpenChange.subscribe((t) => {
              this.isOpen = t;
              const e =
                this._element.nativeElement.querySelector(".dropdown-menu");
              e &&
                !qd() &&
                (this._renderer.addClass(e, "show"),
                e.classList.contains("dropdown-menu-right") &&
                  (this._renderer.setStyle(e, "left", "auto"),
                  this._renderer.setStyle(e, "right", "0")),
                "up" === this.direction &&
                  (this._renderer.setStyle(e, "top", "auto"),
                  this._renderer.setStyle(
                    e,
                    "transform",
                    "translateY(-101%)"
                  ))),
                this.cd.markForCheck(),
                this.cd.detectChanges();
            }));
        }
        get direction() {
          return this._state.direction;
        }
        _contains(t) {
          return this._element.nativeElement.contains(t);
        }
        ngOnDestroy() {
          this._subscription.unsubscribe();
        }
      }
      class Hp {
        constructor(t, e, n, r, s, i) {
          (this._elementRef = t),
            (this._renderer = e),
            (this._viewContainerRef = n),
            (this._cis = r),
            (this._config = s),
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
              .provide({ provide: Up, useValue: this._state })),
            (this.onShown = this._dropdown.onShown),
            (this.onHidden = this._dropdown.onHidden),
            (this.isOpenChange = this._state.isOpenChange);
        }
        set autoClose(t) {
          this._state.autoClose = t;
        }
        get autoClose() {
          return this._state.autoClose;
        }
        set insideClick(t) {
          this._state.insideClick = t;
        }
        get insideClick() {
          return this._state.insideClick;
        }
        set isDisabled(t) {
          (this._isDisabled = t),
            this._state.isDisabledChange.emit(t),
            t && this.hide();
        }
        get isDisabled() {
          return this._isDisabled;
        }
        get isOpen() {
          return this._showInline ? this._isInlineOpen : this._dropdown.isShown;
        }
        set isOpen(t) {
          t ? this.show() : this.hide();
        }
        get isBs4() {
          return !qd();
        }
        get _showInline() {
          return !this.container;
        }
        ngOnInit() {
          this._isInited ||
            ((this._isInited = !0),
            this._dropdown.listen({
              outsideClick: !1,
              triggers: this.triggers,
              show: () => this.show(),
            }),
            this._subscriptions.push(
              this._state.toggleClick.subscribe((t) => this.toggle(t))
            ),
            this._subscriptions.push(
              this._state.isDisabledChange
                .pipe(Ql((t) => t))
                .subscribe((t) => this.hide())
            ));
        }
        show() {
          if (!this.isOpen && !this.isDisabled)
            return this._showInline
              ? (this._inlinedMenu ||
                  this._state.dropdownMenu
                    .then((t) => {
                      this._dropdown.attachInline(
                        t.viewContainer,
                        t.templateRef
                      ),
                        (this._inlinedMenu = this._dropdown._inlineViewRef),
                        this.addBs4Polyfills();
                    })
                    .catch(),
                this.addBs4Polyfills(),
                (this._isInlineOpen = !0),
                this.onShown.emit(!0),
                void this._state.isOpenChange.emit(!0))
              : void this._state.dropdownMenu
                  .then((t) => {
                    const e =
                      this.dropup || (void 0 !== this.dropup && this.dropup);
                    this._state.direction = e ? "up" : "down";
                    const n =
                      this.placement || (e ? "top start" : "bottom start");
                    this._dropdown
                      .attach($p)
                      .to(this.container)
                      .position({ attachment: n })
                      .show({ content: t.templateRef, placement: n }),
                      this._state.isOpenChange.emit(!0);
                  })
                  .catch();
        }
        hide() {
          this.isOpen &&
            (this._showInline
              ? (this.removeShowClass(),
                this.removeDropupStyles(),
                (this._isInlineOpen = !1),
                this.onHidden.emit(!0))
              : this._dropdown.hide(),
            this._state.isOpenChange.emit(!1));
        }
        toggle(t) {
          return this.isOpen || !t ? this.hide() : this.show();
        }
        _contains(t) {
          return (
            this._elementRef.nativeElement.contains(t.target) ||
            (this._dropdown.instance &&
              this._dropdown.instance._contains(t.target))
          );
        }
        ngOnDestroy() {
          for (const t of this._subscriptions) t.unsubscribe();
          this._dropdown.dispose();
        }
        addBs4Polyfills() {
          qd() ||
            (this.addShowClass(),
            this.checkRightAlignment(),
            this.addDropupStyles());
        }
        addShowClass() {
          this._inlinedMenu &&
            this._inlinedMenu.rootNodes[0] &&
            this._renderer.addClass(this._inlinedMenu.rootNodes[0], "show");
        }
        removeShowClass() {
          this._inlinedMenu &&
            this._inlinedMenu.rootNodes[0] &&
            this._renderer.removeClass(this._inlinedMenu.rootNodes[0], "show");
        }
        checkRightAlignment() {
          if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
            const t = this._inlinedMenu.rootNodes[0].classList.contains(
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
        }
        addDropupStyles() {
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
        }
        removeDropupStyles() {
          this._inlinedMenu &&
            this._inlinedMenu.rootNodes[0] &&
            (this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], "top"),
            this._renderer.removeStyle(
              this._inlinedMenu.rootNodes[0],
              "transform"
            ),
            this._renderer.removeStyle(
              this._inlinedMenu.rootNodes[0],
              "bottom"
            ));
        }
      }
      class zp {
        constructor(t, e, n) {
          t.resolveDropdownMenu({ templateRef: n, viewContainer: e });
        }
      }
      class Bp {
        constructor(t, e, n, r, s) {
          (this._changeDetectorRef = t),
            (this._dropdown = e),
            (this._element = n),
            (this._renderer = r),
            (this._state = s),
            (this.isDisabled = null),
            (this._subscriptions = []),
            this._subscriptions.push(
              this._state.isOpenChange.subscribe((t) => {
                (this.isOpen = t),
                  t
                    ? ((this._documentClickListener = this._renderer.listen(
                        "document",
                        "click",
                        (t) => {
                          !this._state.autoClose ||
                            2 === t.button ||
                            this._element.nativeElement.contains(t.target) ||
                            (this._state.insideClick &&
                              this._dropdown._contains(t)) ||
                            (this._state.toggleClick.emit(!1),
                            this._changeDetectorRef.detectChanges());
                        }
                      )),
                      (this._escKeyUpListener = this._renderer.listen(
                        this._element.nativeElement,
                        "keyup.esc",
                        () => {
                          this._state.autoClose &&
                            (this._state.toggleClick.emit(!1),
                            this._changeDetectorRef.detectChanges());
                        }
                      )))
                    : (this._documentClickListener(), this._escKeyUpListener());
              })
            ),
            this._subscriptions.push(
              this._state.isDisabledChange.subscribe(
                (t) => (this.isDisabled = t || null)
              )
            );
        }
        onClick() {
          this.isDisabled || this._state.toggleClick.emit(!0);
        }
        ngOnDestroy() {
          this._documentClickListener && this._documentClickListener(),
            this._escKeyUpListener && this._escKeyUpListener();
          for (const t of this._subscriptions) t.unsubscribe();
        }
      }
      class Wp {
        static forRoot(t) {
          return {
            ngModule: Wp,
            providers: [
              Yd,
              jp,
              Up,
              {
                provide: Fp,
                useValue: t || { autoClose: !0, insideClick: !1 },
              },
            ],
          };
        }
      }
      var Gp = Zn({ encapsulation: 2, styles: [], data: {} });
      function qp(t) {
        return Xi(
          2,
          [
            (t()(),
            Li(
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
      function Zp(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
              qp,
              Gp
            )),
            ss(1, 180224, null, 0, $p, [Up, Cn, on, tn], null, null),
          ],
          null,
          null
        );
      }
      var Qp = Mr("bs-dropdown-container", $p, Zp, {}, {}, ["*"]);
      function Yp(t) {
        return (Yp =
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
      function Kp(t, e, n) {
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
      function Xp() {
        return (Xp =
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
      function Jp(t) {
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
              Kp(t, e, n[e]);
            });
        }
        return t;
      }
      function tf(t) {
        return !!navigator.userAgent.match(t);
      }
      var ef = tf(/(?:Trident.*rv[ :]?11\.|msie|iemobile)/i),
        nf = tf(/Edge/i),
        rf = tf(/firefox/i),
        sf = tf(/safari/i) && !tf(/chrome/i) && !tf(/android/i),
        of = tf(/iP(ad|od|hone)/i),
        lf = { capture: !1, passive: !1 };
      function af(t, e, n) {
        t.addEventListener(e, n, !ef && lf);
      }
      function uf(t, e, n) {
        t.removeEventListener(e, n, !ef && lf);
      }
      function cf(t, e) {
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
      function hf(t) {
        return t.host && t !== document && t.host.nodeType
          ? t.host
          : t.parentNode;
      }
      function df(t, e, n, r) {
        if (t) {
          n = n || document;
          do {
            if (
              (null != e &&
                (">" === e[0] ? t.parentNode === n && cf(t, e) : cf(t, e))) ||
              (r && t === n)
            )
              return t;
            if (t === n) break;
          } while ((t = hf(t)));
        }
        return null;
      }
      var pf,
        ff = /\s+/g;
      function gf(t, e, n) {
        if (t && e)
          if (t.classList) t.classList[n ? "add" : "remove"](e);
          else {
            var r = (" " + t.className + " ")
              .replace(ff, " ")
              .replace(" " + e + " ", " ");
            t.className = (r + (n ? " " + e : "")).replace(ff, " ");
          }
      }
      function mf(t, e, n) {
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
      function vf(t, e) {
        var n = "";
        do {
          var r = mf(t, "transform");
          r && "none" !== r && (n = r + " " + n);
        } while (!e && (t = t.parentNode));
        var s = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix;
        return s && new s(n);
      }
      function _f(t, e, n) {
        if (t) {
          var r = t.getElementsByTagName(e),
            s = 0,
            i = r.length;
          if (n) for (; s < i; s++) n(r[s], s);
          return r;
        }
        return [];
      }
      function bf() {
        return ef ? document.documentElement : document.scrollingElement;
      }
      function wf(t, e, n, r, s) {
        if (t.getBoundingClientRect || t === window) {
          var i, o, l, a, u, c, h;
          if (
            (t !== window && t !== bf()
              ? ((o = (i = t.getBoundingClientRect()).top),
                (l = i.left),
                (a = i.bottom),
                (u = i.right),
                (c = i.height),
                (h = i.width))
              : ((o = 0),
                (l = 0),
                (a = window.innerHeight),
                (u = window.innerWidth),
                (c = window.innerHeight),
                (h = window.innerWidth)),
            (e || n) && t !== window && ((s = s || t.parentNode), !ef))
          )
            do {
              if (
                s &&
                s.getBoundingClientRect &&
                ("none" !== mf(s, "transform") ||
                  (n && "static" !== mf(s, "position")))
              ) {
                var d = s.getBoundingClientRect();
                (o -= d.top + parseInt(mf(s, "border-top-width"))),
                  (l -= d.left + parseInt(mf(s, "border-left-width"))),
                  (a = o + i.height),
                  (u = l + i.width);
                break;
              }
            } while ((s = s.parentNode));
          if (r && t !== window) {
            var p = vf(s || t),
              f = p && p.a,
              g = p && p.d;
            p && ((a = (o /= g) + (c /= g)), (u = (l /= f) + (h /= f)));
          }
          return { top: o, left: l, bottom: a, right: u, width: h, height: c };
        }
      }
      function yf(t, e, n, r) {
        for (var s = Tf(t, !0), i = (e || wf(t))[n]; s; ) {
          var o = wf(s)[r];
          if (!("top" === r || "left" === r ? i >= o : i <= o)) return s;
          if (s === bf()) break;
          s = Tf(s, !1);
        }
        return !1;
      }
      function Cf(t, e, n) {
        for (var r = 0, s = 0, i = t.children; s < i.length; ) {
          if (
            "none" !== i[s].style.display &&
            i[s] !== Eg.ghost &&
            i[s] !== Eg.dragged &&
            df(i[s], n.draggable, t, !1)
          ) {
            if (r === e) return i[s];
            r++;
          }
          s++;
        }
        return null;
      }
      function Ef(t, e) {
        for (
          var n = t.lastElementChild;
          n &&
          (n === Eg.ghost || "none" === mf(n, "display") || (e && !cf(n, e)));

        )
          n = n.previousElementSibling;
        return n || null;
      }
      function Sf(t, e) {
        var n = 0;
        if (!t || !t.parentNode) return -1;
        for (; (t = t.previousElementSibling); )
          "TEMPLATE" === t.nodeName.toUpperCase() ||
            t === Eg.clone ||
            (e && !cf(t, e)) ||
            n++;
        return n;
      }
      function xf(t) {
        var e = 0,
          n = 0,
          r = bf();
        if (t)
          do {
            var s = vf(t);
            (e += t.scrollLeft * s.a), (n += t.scrollTop * s.d);
          } while (t !== r && (t = t.parentNode));
        return [e, n];
      }
      function Tf(t, e) {
        if (!t || !t.getBoundingClientRect) return bf();
        var n = t,
          r = !1;
        do {
          if (
            n.clientWidth < n.scrollWidth ||
            n.clientHeight < n.scrollHeight
          ) {
            var s = mf(n);
            if (
              (n.clientWidth < n.scrollWidth &&
                ("auto" == s.overflowX || "scroll" == s.overflowX)) ||
              (n.clientHeight < n.scrollHeight &&
                ("auto" == s.overflowY || "scroll" == s.overflowY))
            ) {
              if (!n.getBoundingClientRect || n === document.body) return bf();
              if (r || e) return n;
              r = !0;
            }
          }
        } while ((n = n.parentNode));
        return bf();
      }
      function kf(t, e) {
        return (
          Math.round(t.top) === Math.round(e.top) &&
          Math.round(t.left) === Math.round(e.left) &&
          Math.round(t.height) === Math.round(e.height) &&
          Math.round(t.width) === Math.round(e.width)
        );
      }
      function Af(t, e) {
        return function () {
          if (!pf) {
            var n = arguments;
            1 === n.length ? t.call(this, n[0]) : t.apply(this, n),
              (pf = setTimeout(function () {
                pf = void 0;
              }, e));
          }
        };
      }
      function Of(t, e, n) {
        (t.scrollLeft += e), (t.scrollTop += n);
      }
      function If(t) {
        var e = window.Polymer,
          n = window.jQuery || window.Zepto;
        return e && e.dom
          ? e.dom(t).cloneNode(!0)
          : n
          ? n(t).clone(!0)[0]
          : t.cloneNode(!0);
      }
      var Rf = "Sortable" + new Date().getTime();
      function Nf(t, e, n, r) {
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
      var Df = [],
        Mf = { initializeByDefault: !0 },
        Pf = {
          mount: function (t) {
            for (var e in Mf) !(e in t) && (t[e] = Mf[e]);
            Df.push(t);
          },
          pluginEvent: function (t, e, n) {
            this.eventCanceled = !1;
            var r = t + "Global";
            for (var s in Df)
              e[Df[s].pluginName] &&
                (e[Df[s].pluginName][r] &&
                  (this.eventCanceled = !!e[Df[s].pluginName][r](
                    Jp({ sortable: e }, n)
                  )),
                e.options[Df[s].pluginName] &&
                  e[Df[s].pluginName][t] &&
                  (this.eventCanceled =
                    this.eventCanceled ||
                    !!e[Df[s].pluginName][t](Jp({ sortable: e }, n))));
          },
          initializePlugins: function (t, e, n) {
            for (var r in Df) {
              var s = Df[r].pluginName;
              if (t.options[s] || Df[r].initializeByDefault) {
                var i = new Df[r](t, e);
                (i.sortable = t), (t[s] = i), Xp(n, i.options);
              }
            }
            for (var o in t.options) {
              var l = this.modifyOption(t, o, t.options[o]);
              void 0 !== l && (t.options[o] = l);
            }
          },
          getEventOptions: function (t, e) {
            var n = {};
            for (var r in Df)
              "function" == typeof Df[r].eventOptions &&
                Xp(n, Df[r].eventOptions.call(e, t));
            return n;
          },
          modifyOption: function (t, e, n) {
            var r;
            for (var s in Df)
              t[Df[s].pluginName] &&
                Df[s].optionListeners &&
                "function" == typeof Df[s].optionListeners[e] &&
                (r = Df[s].optionListeners[e].call(t[Df[s].pluginName], n));
            return r;
          },
        },
        Vf = function (t, e) {
          var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {},
            r = n.evt,
            s = (function (t, e) {
              if (null == t) return {};
              var n,
                r,
                s = (function (t, e) {
                  if (null == t) return {};
                  var n,
                    r,
                    s = {},
                    i = Object.keys(t);
                  for (r = 0; r < i.length; r++)
                    e.indexOf((n = i[r])) >= 0 || (s[n] = t[n]);
                  return s;
                })(t, e);
              if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(t);
                for (r = 0; r < i.length; r++)
                  e.indexOf((n = i[r])) >= 0 ||
                    (Object.prototype.propertyIsEnumerable.call(t, n) &&
                      (s[n] = t[n]));
              }
              return s;
            })(n, ["evt"]);
          Pf.pluginEvent.bind(Eg)(
            t,
            e,
            Jp(
              {
                dragEl: Lf,
                parentEl: Ff,
                ghostEl: Uf,
                rootEl: $f,
                nextEl: Hf,
                lastDownEl: zf,
                cloneEl: Bf,
                cloneHidden: Wf,
                dragStarted: tg,
                putSortable: Kf,
                activeSortable: Eg.active,
                originalEvent: r,
                oldIndex: Gf,
                oldDraggableIndex: Zf,
                newIndex: qf,
                newDraggableIndex: Qf,
                hideGhostForTarget: bg,
                unhideGhostForTarget: wg,
                cloneNowHidden: function () {
                  Wf = !0;
                },
                cloneNowShown: function () {
                  Wf = !1;
                },
                dispatchSortableEvent: function (t) {
                  jf({ sortable: e, name: t, originalEvent: r });
                },
              },
              s
            )
          );
        };
      function jf(t) {
        !(function (t) {
          var e,
            n = t.sortable,
            r = t.rootEl,
            s = t.name,
            i = t.targetEl,
            o = t.cloneEl,
            l = t.toEl,
            a = t.fromEl,
            u = t.oldIndex,
            c = t.newIndex,
            h = t.oldDraggableIndex,
            d = t.newDraggableIndex,
            p = t.originalEvent,
            f = t.putSortable,
            g = t.eventOptions,
            m = (n = n || r[Rf]).options,
            v = "on" + s.charAt(0).toUpperCase() + s.substr(1);
          !window.CustomEvent || ef || nf
            ? (e = document.createEvent("Event")).initEvent(s, !0, !0)
            : (e = new CustomEvent(s, { bubbles: !0, cancelable: !0 })),
            (e.to = l || r),
            (e.from = a || r),
            (e.item = i || r),
            (e.clone = o),
            (e.oldIndex = u),
            (e.newIndex = c),
            (e.oldDraggableIndex = h),
            (e.newDraggableIndex = d),
            (e.originalEvent = p),
            (e.pullMode = f ? f.lastPutMode : void 0);
          var _ = Jp({}, g, Pf.getEventOptions(s, n));
          for (var b in _) e[b] = _[b];
          r && r.dispatchEvent(e), m[v] && m[v].call(n, e);
        })(
          Jp(
            {
              putSortable: Kf,
              cloneEl: Bf,
              targetEl: Lf,
              rootEl: $f,
              oldIndex: Gf,
              oldDraggableIndex: Zf,
              newIndex: qf,
              newDraggableIndex: Qf,
            },
            t
          )
        );
      }
      if ("undefined" == typeof window || !window.document)
        throw new Error("Sortable.js requires a window with a document");
      var Lf,
        Ff,
        Uf,
        $f,
        Hf,
        zf,
        Bf,
        Wf,
        Gf,
        qf,
        Zf,
        Qf,
        Yf,
        Kf,
        Xf,
        Jf,
        tg,
        eg,
        ng,
        rg,
        sg,
        ig = !1,
        og = !1,
        lg = [],
        ag = !1,
        ug = !1,
        cg = [],
        hg = !1,
        dg = [],
        pg = of,
        fg = nf || ef ? "cssFloat" : "float",
        gg = "draggable" in document.createElement("div"),
        mg = (function () {
          if (ef) return !1;
          var t = document.createElement("x");
          return (
            (t.style.cssText = "pointer-events:auto"),
            "auto" === t.style.pointerEvents
          );
        })(),
        vg = function (t, e) {
          var n = mf(t),
            r =
              parseInt(n.width) -
              parseInt(n.paddingLeft) -
              parseInt(n.paddingRight) -
              parseInt(n.borderLeftWidth) -
              parseInt(n.borderRightWidth),
            s = Cf(t, 0, e),
            i = Cf(t, 1, e),
            o = s && mf(s),
            l = i && mf(i),
            a =
              o &&
              parseInt(o.marginLeft) + parseInt(o.marginRight) + wf(s).width,
            u =
              l &&
              parseInt(l.marginLeft) + parseInt(l.marginRight) + wf(i).width;
          return "flex" === n.display
            ? "column" === n.flexDirection ||
              "column-reverse" === n.flexDirection
              ? "vertical"
              : "horizontal"
            : "grid" === n.display
            ? n.gridTemplateColumns.split(" ").length <= 1
              ? "vertical"
              : "horizontal"
            : s && "none" !== o.float
            ? !i ||
              ("both" !== l.clear &&
                l.clear !== ("left" === o.float ? "left" : "right"))
              ? "horizontal"
              : "vertical"
            : s &&
              ("block" === o.display ||
                "flex" === o.display ||
                "table" === o.display ||
                "grid" === o.display ||
                (a >= r && "none" === n[fg]) ||
                (i && "none" === n[fg] && a + u > r))
            ? "vertical"
            : "horizontal";
        },
        _g = function (t) {
          function e(t, n) {
            return function (r, s, i, o) {
              if (
                null == t &&
                (n ||
                  (r.options.group.name &&
                    s.options.group.name &&
                    r.options.group.name === s.options.group.name))
              )
                return !0;
              if (null == t || !1 === t) return !1;
              if (n && "clone" === t) return t;
              if ("function" == typeof t)
                return e(t(r, s, i, o), n)(r, s, i, o);
              var l = (n ? r : s).options.group.name;
              return (
                !0 === t ||
                ("string" == typeof t && t === l) ||
                (t.join && t.indexOf(l) > -1)
              );
            };
          }
          var n = {},
            r = t.group;
          (r && "object" == Yp(r)) || (r = { name: r }),
            (n.name = r.name),
            (n.checkPull = e(r.pull, !0)),
            (n.checkPut = e(r.put)),
            (n.revertClone = r.revertClone),
            (t.group = n);
        },
        bg = function () {
          !mg && Uf && mf(Uf, "display", "none");
        },
        wg = function () {
          !mg && Uf && mf(Uf, "display", "");
        };
      document.addEventListener(
        "click",
        function (t) {
          if (og)
            return (
              t.preventDefault(),
              t.stopPropagation && t.stopPropagation(),
              t.stopImmediatePropagation && t.stopImmediatePropagation(),
              (og = !1),
              !1
            );
        },
        !0
      );
      var yg = function (t) {
          if (Lf) {
            var e = (function (t, e) {
              for (var n in lg)
                if (!Ef(lg[n])) {
                  var r = wf(lg[n]),
                    s = lg[n][Rf].options.emptyInsertThreshold;
                  if (
                    s &&
                    t >= r.left - s &&
                    t <= r.right + s &&
                    e >= r.top - s &&
                    e <= r.bottom + s
                  )
                    return lg[n];
                }
            })((t = t.touches ? t.touches[0] : t).clientX, t.clientY);
            if (e) {
              var n = {};
              for (var r in t) n[r] = t[r];
              (n.target = n.rootEl = e),
                (n.preventDefault = void 0),
                (n.stopPropagation = void 0),
                e[Rf]._onDragOver(n);
            }
          }
        },
        Cg = function (t) {
          Lf && Lf.parentNode[Rf]._isOutsideThisEl(t.target);
        };
      function Eg(t, e) {
        if (!t || !t.nodeType || 1 !== t.nodeType)
          throw "Sortable: `el` must be an HTMLElement, not ".concat(
            {}.toString.call(t)
          );
        (this.el = t), (this.options = e = Xp({}, e)), (t[Rf] = this);
        var n,
          r,
          s = {
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
              return vg(t, this.options);
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
              !1 !== Eg.supportPointer && "PointerEvent" in window,
            emptyInsertThreshold: 5,
          };
        for (var i in (Pf.initializePlugins(this, t, s), s))
          !(i in e) && (e[i] = s[i]);
        for (var o in (_g(e), this))
          "_" === o.charAt(0) &&
            "function" == typeof this[o] &&
            (this[o] = this[o].bind(this));
        (this.nativeDraggable = !e.forceFallback && gg),
          this.nativeDraggable && (this.options.touchStartThreshold = 1),
          e.supportPointer
            ? af(t, "pointerdown", this._onTapStart)
            : (af(t, "mousedown", this._onTapStart),
              af(t, "touchstart", this._onTapStart)),
          this.nativeDraggable &&
            (af(t, "dragover", this), af(t, "dragenter", this)),
          lg.push(this.el),
          e.store && e.store.get && this.sort(e.store.get(this) || []),
          Xp(
            this,
            ((r = []),
            {
              captureAnimationState: function () {
                if (((r = []), this.options.animation)) {
                  var t = [].slice.call(this.el.children);
                  for (var e in t)
                    if ("none" !== mf(t[e], "display") && t[e] !== Eg.ghost) {
                      r.push({ target: t[e], rect: wf(t[e]) });
                      var n = wf(t[e]);
                      if (t[e].thisAnimationDuration) {
                        var s = vf(t[e], !0);
                        s && ((n.top -= s.f), (n.left -= s.e));
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
                  s = 0;
                for (var i in r) {
                  var o = 0,
                    l = r[i].target,
                    a = l.fromRect,
                    u = wf(l),
                    c = l.prevFromRect,
                    h = l.prevToRect,
                    d = r[i].rect,
                    p = vf(l, !0);
                  p && ((u.top -= p.f), (u.left -= p.e)),
                    (l.toRect = u),
                    ((yf(l, u, "bottom", "top") ||
                      yf(l, u, "top", "bottom") ||
                      yf(l, u, "right", "left") ||
                      yf(l, u, "left", "right")) &&
                      (yf(l, d, "bottom", "top") ||
                        yf(l, d, "top", "bottom") ||
                        yf(l, d, "right", "left") ||
                        yf(l, d, "left", "right")) &&
                      (yf(l, a, "bottom", "top") ||
                        yf(l, a, "top", "bottom") ||
                        yf(l, a, "right", "left") ||
                        yf(l, a, "left", "right"))) ||
                      (l.thisAnimationDuration &&
                        kf(c, u) &&
                        !kf(a, u) &&
                        (d.top - u.top) / (d.left - u.left) ==
                          (a.top - u.top) / (a.left - u.left) &&
                        (o = Nf(d, c, h, this.options)),
                      kf(u, a) ||
                        ((l.prevFromRect = a),
                        (l.prevToRect = u),
                        o || (o = this.options.animation),
                        this.animate(l, d, o)),
                      o &&
                        ((e = !0),
                        (s = Math.max(s, o)),
                        clearTimeout(l.animationResetTimer),
                        (l.animationResetTimer = setTimeout(
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
                          o
                        )),
                        (l.thisAnimationDuration = o)));
                }
                clearTimeout(n),
                  e
                    ? (n = setTimeout(function () {
                        "function" == typeof t && t();
                      }, s))
                    : "function" == typeof t && t(),
                  (r = []);
              },
              animate: function (t, e, n) {
                if (n) {
                  mf(t, "transition", ""), mf(t, "transform", "");
                  var r = wf(t),
                    s = vf(this.el),
                    i = (e.left - r.left) / ((s && s.a) || 1),
                    o = (e.top - r.top) / ((s && s.d) || 1);
                  (t.animatingX = !!i),
                    (t.animatingY = !!o),
                    mf(
                      t,
                      "transform",
                      "translate3d(" + i + "px," + o + "px,0)"
                    ),
                    mf(
                      t,
                      "transition",
                      "transform " +
                        n +
                        "ms" +
                        (this.options.easing ? " " + this.options.easing : "")
                    ),
                    mf(t, "transform", "translate3d(0,0,0)"),
                    "number" == typeof t.animated && clearTimeout(t.animated),
                    (t.animated = setTimeout(function () {
                      mf(t, "transition", ""),
                        mf(t, "transform", ""),
                        (t.animated = !1),
                        (t.animatingX = !1),
                        (t.animatingY = !1);
                    }, n));
                }
              },
            })
          );
      }
      function Sg(t, e, n, r, s, i, o, l) {
        var a,
          u,
          c = t[Rf],
          h = c.options.onMove;
        return (
          !window.CustomEvent || ef || nf
            ? (a = document.createEvent("Event")).initEvent("move", !0, !0)
            : (a = new CustomEvent("move", { bubbles: !0, cancelable: !0 })),
          (a.to = e),
          (a.from = t),
          (a.dragged = n),
          (a.draggedRect = r),
          (a.related = s || e),
          (a.relatedRect = i || wf(e)),
          (a.willInsertAfter = l),
          (a.originalEvent = o),
          t.dispatchEvent(a),
          h && (u = h.call(c, a, o)),
          u
        );
      }
      function xg(t) {
        t.draggable = !1;
      }
      function Tg() {
        hg = !1;
      }
      function kg(t) {
        for (
          var e = t.tagName + t.className + t.src + t.href + t.textContent,
            n = e.length,
            r = 0;
          n--;

        )
          r += e.charCodeAt(n);
        return r.toString(36);
      }
      function Ag(t) {
        return setTimeout(t, 0);
      }
      function Og(t) {
        return clearTimeout(t);
      }
      (Eg.prototype = {
        constructor: Eg,
        _isOutsideThisEl: function (t) {
          this.el.contains(t) || t === this.el || (eg = null);
        },
        _getDirection: function (t, e) {
          return "function" == typeof this.options.direction
            ? this.options.direction.call(this, t, e, Lf)
            : this.options.direction;
        },
        _onTapStart: function (t) {
          if (t.cancelable) {
            var e = this,
              n = this.el,
              r = this.options,
              s = r.preventOnFilter,
              i = t.type,
              o = t.touches && t.touches[0],
              l = (o || t).target,
              a =
                (t.target.shadowRoot &&
                  ((t.path && t.path[0]) ||
                    (t.composedPath && t.composedPath()[0]))) ||
                l,
              u = r.filter;
            if (
              ((function (t) {
                dg.length = 0;
                for (
                  var e = t.getElementsByTagName("input"), n = e.length;
                  n--;

                ) {
                  var r = e[n];
                  r.checked && dg.push(r);
                }
              })(n),
              !Lf &&
                !(
                  (/mousedown|pointerdown/.test(i) && 0 !== t.button) ||
                  r.disabled ||
                  a.isContentEditable ||
                  ((l = df(l, r.draggable, n, !1)) && l.animated) ||
                  zf === l
                ))
            ) {
              if (
                ((Gf = Sf(l)),
                (Zf = Sf(l, r.draggable)),
                "function" == typeof u)
              ) {
                if (u.call(this, t, l, this))
                  return (
                    jf({
                      sortable: e,
                      rootEl: a,
                      name: "filter",
                      targetEl: l,
                      toEl: n,
                      fromEl: n,
                    }),
                    Vf("filter", e, { evt: t }),
                    void (s && t.cancelable && t.preventDefault())
                  );
              } else if (
                u &&
                (u = u.split(",").some(function (r) {
                  if ((r = df(a, r.trim(), n, !1)))
                    return (
                      jf({
                        sortable: e,
                        rootEl: r,
                        name: "filter",
                        targetEl: l,
                        fromEl: n,
                        toEl: n,
                      }),
                      Vf("filter", e, { evt: t }),
                      !0
                    );
                }))
              )
                return void (s && t.cancelable && t.preventDefault());
              (r.handle && !df(a, r.handle, n, !1)) ||
                this._prepareDragStart(t, o, l);
            }
          }
        },
        _prepareDragStart: function (t, e, n) {
          var r,
            s = this,
            i = s.el,
            o = s.options,
            l = i.ownerDocument;
          if (n && !Lf && n.parentNode === i)
            if (
              (($f = i),
              (Ff = (Lf = n).parentNode),
              (Hf = Lf.nextSibling),
              (zf = n),
              (Yf = o.group),
              (Eg.dragged = Lf),
              (Xf = {
                target: Lf,
                clientX: (e || t).clientX,
                clientY: (e || t).clientY,
              }),
              (this._lastX = (e || t).clientX),
              (this._lastY = (e || t).clientY),
              (Lf.style["will-change"] = "all"),
              (r = function () {
                Vf("delayEnded", s, { evt: t }),
                  Eg.eventCanceled
                    ? s._onDrop()
                    : (s._disableDelayedDragEvents(),
                      !rf && s.nativeDraggable && (Lf.draggable = !0),
                      s._triggerDragStart(t, e),
                      jf({ sortable: s, name: "choose", originalEvent: t }),
                      gf(Lf, o.chosenClass, !0));
              }),
              o.ignore.split(",").forEach(function (t) {
                _f(Lf, t.trim(), xg);
              }),
              af(l, "dragover", yg),
              af(l, "mousemove", yg),
              af(l, "touchmove", yg),
              af(l, "mouseup", s._onDrop),
              af(l, "touchend", s._onDrop),
              af(l, "touchcancel", s._onDrop),
              rf &&
                this.nativeDraggable &&
                ((this.options.touchStartThreshold = 4), (Lf.draggable = !0)),
              Vf("delayStart", this, { evt: t }),
              !o.delay ||
                (o.delayOnTouchOnly && !e) ||
                (this.nativeDraggable && (nf || ef)))
            )
              r();
            else {
              if (Eg.eventCanceled) return void this._onDrop();
              af(l, "mouseup", s._disableDelayedDrag),
                af(l, "touchend", s._disableDelayedDrag),
                af(l, "touchcancel", s._disableDelayedDrag),
                af(l, "mousemove", s._delayedDragTouchMoveHandler),
                af(l, "touchmove", s._delayedDragTouchMoveHandler),
                o.supportPointer &&
                  af(l, "pointermove", s._delayedDragTouchMoveHandler),
                (s._dragStartTimer = setTimeout(r, o.delay));
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
          Lf && xg(Lf),
            clearTimeout(this._dragStartTimer),
            this._disableDelayedDragEvents();
        },
        _disableDelayedDragEvents: function () {
          var t = this.el.ownerDocument;
          uf(t, "mouseup", this._disableDelayedDrag),
            uf(t, "touchend", this._disableDelayedDrag),
            uf(t, "touchcancel", this._disableDelayedDrag),
            uf(t, "mousemove", this._delayedDragTouchMoveHandler),
            uf(t, "touchmove", this._delayedDragTouchMoveHandler),
            uf(t, "pointermove", this._delayedDragTouchMoveHandler);
        },
        _triggerDragStart: function (t, e) {
          (e = e || ("touch" == t.pointerType ? t : null)),
            !this.nativeDraggable || e
              ? af(
                  document,
                  this.options.supportPointer
                    ? "pointermove"
                    : e
                    ? "touchmove"
                    : "mousemove",
                  this._onTouchMove
                )
              : (af(Lf, "dragend", this),
                af($f, "dragstart", this._onDragStart));
          try {
            document.selection
              ? Ag(function () {
                  document.selection.empty();
                })
              : window.getSelection().removeAllRanges();
          } catch (n) {}
        },
        _dragStarted: function (t, e) {
          if (((ig = !1), $f && Lf)) {
            Vf("dragStarted", this, { evt: e }),
              this.nativeDraggable && af(document, "dragover", Cg);
            var n = this.options;
            !t && gf(Lf, n.dragClass, !1),
              gf(Lf, n.ghostClass, !0),
              (Eg.active = this),
              t && this._appendGhost(),
              jf({ sortable: this, name: "start", originalEvent: e });
          } else this._nulling();
        },
        _emulateDragOver: function () {
          if (Jf) {
            (this._lastX = Jf.clientX), (this._lastY = Jf.clientY), bg();
            for (
              var t = document.elementFromPoint(Jf.clientX, Jf.clientY), e = t;
              t &&
              t.shadowRoot &&
              (t = t.shadowRoot.elementFromPoint(Jf.clientX, Jf.clientY)) !== e;

            )
              e = t;
            if ((Lf.parentNode[Rf]._isOutsideThisEl(t), e))
              do {
                if (
                  e[Rf] &&
                  e[Rf]._onDragOver({
                    clientX: Jf.clientX,
                    clientY: Jf.clientY,
                    target: t,
                    rootEl: e,
                  }) &&
                  !this.options.dragoverBubble
                )
                  break;
                t = e;
              } while ((e = e.parentNode));
            wg();
          }
        },
        _onTouchMove: function (t) {
          if (Xf) {
            var e = this.options,
              n = e.fallbackTolerance,
              r = e.fallbackOffset,
              s = t.touches ? t.touches[0] : t,
              i = Uf && vf(Uf),
              o = Uf && i && i.a,
              l = Uf && i && i.d,
              a = pg && sg && xf(sg),
              u =
                (s.clientX - Xf.clientX + r.x) / (o || 1) +
                (a ? a[0] - cg[0] : 0) / (o || 1),
              c =
                (s.clientY - Xf.clientY + r.y) / (l || 1) +
                (a ? a[1] - cg[1] : 0) / (l || 1),
              h = t.touches
                ? "translate3d(" + u + "px," + c + "px,0)"
                : "translate(" + u + "px," + c + "px)";
            if (!Eg.active && !ig) {
              if (
                n &&
                Math.max(
                  Math.abs(s.clientX - this._lastX),
                  Math.abs(s.clientY - this._lastY)
                ) < n
              )
                return;
              this._onDragStart(t, !0);
            }
            (Jf = s),
              mf(Uf, "webkitTransform", h),
              mf(Uf, "mozTransform", h),
              mf(Uf, "msTransform", h),
              mf(Uf, "transform", h),
              t.cancelable && t.preventDefault();
          }
        },
        _appendGhost: function () {
          if (!Uf) {
            var t = this.options.fallbackOnBody ? document.body : $f,
              e = wf(Lf, !0, pg, !0, t),
              n = this.options;
            if (pg) {
              for (
                sg = t;
                "static" === mf(sg, "position") &&
                "none" === mf(sg, "transform") &&
                sg !== document;

              )
                sg = sg.parentNode;
              sg !== document.body && sg !== document.documentElement
                ? (sg === document && (sg = bf()),
                  (e.top += sg.scrollTop),
                  (e.left += sg.scrollLeft))
                : (sg = bf()),
                (cg = xf(sg));
            }
            gf((Uf = Lf.cloneNode(!0)), n.ghostClass, !1),
              gf(Uf, n.fallbackClass, !0),
              gf(Uf, n.dragClass, !0),
              mf(Uf, "transition", ""),
              mf(Uf, "transform", ""),
              mf(Uf, "box-sizing", "border-box"),
              mf(Uf, "margin", 0),
              mf(Uf, "top", e.top),
              mf(Uf, "left", e.left),
              mf(Uf, "width", e.width),
              mf(Uf, "height", e.height),
              mf(Uf, "opacity", "0.8"),
              mf(Uf, "position", pg ? "absolute" : "fixed"),
              mf(Uf, "zIndex", "100000"),
              mf(Uf, "pointerEvents", "none"),
              (Eg.ghost = Uf),
              t.appendChild(Uf);
          }
        },
        _onDragStart: function (t, e) {
          var n = this,
            r = t.dataTransfer,
            s = n.options;
          Vf("dragStart", this, { evt: t }),
            Eg.eventCanceled
              ? this._onDrop()
              : (Vf("setupClone", this),
                Eg.eventCanceled ||
                  (((Bf = If(Lf)).draggable = !1),
                  (Bf.style["will-change"] = ""),
                  this._hideClone(),
                  gf(Bf, this.options.chosenClass, !1),
                  (Eg.clone = Bf)),
                (n.cloneId = Ag(function () {
                  Vf("clone", n),
                    Eg.eventCanceled ||
                      (n.options.removeCloneOnHide || $f.insertBefore(Bf, Lf),
                      n._hideClone(),
                      jf({ sortable: n, name: "clone" }));
                })),
                !e && gf(Lf, s.dragClass, !0),
                e
                  ? ((og = !0),
                    (n._loopId = setInterval(n._emulateDragOver, 50)))
                  : (uf(document, "mouseup", n._onDrop),
                    uf(document, "touchend", n._onDrop),
                    uf(document, "touchcancel", n._onDrop),
                    r &&
                      ((r.effectAllowed = "move"),
                      s.setData && s.setData.call(n, r, Lf)),
                    af(document, "drop", n),
                    mf(Lf, "transform", "translateZ(0)")),
                (ig = !0),
                (n._dragStartId = Ag(n._dragStarted.bind(n, e, t))),
                af(document, "selectstart", n),
                (tg = !0),
                sf && mf(document.body, "user-select", "none"));
        },
        _onDragOver: function (t) {
          var e,
            n,
            r,
            s,
            i = this.el,
            o = t.target,
            l = this.options,
            a = l.group,
            u = Eg.active,
            c = Yf === a,
            h = l.sort,
            d = Kf || u,
            p = this,
            f = !1;
          if (!hg) {
            if (
              (void 0 !== t.preventDefault &&
                t.cancelable &&
                t.preventDefault(),
              (o = df(o, l.draggable, i, !0)),
              A("dragOver"),
              Eg.eventCanceled)
            )
              return f;
            if (
              Lf.contains(t.target) ||
              (o.animated && o.animatingX && o.animatingY) ||
              p._ignoreWhileAnimating === o
            )
              return I(!1);
            if (
              ((og = !1),
              u &&
                !l.disabled &&
                (c
                  ? h || (r = !$f.contains(Lf))
                  : Kf === this ||
                    ((this.lastPutMode = Yf.checkPull(this, u, Lf, t)) &&
                      a.checkPut(this, u, Lf, t))))
            ) {
              if (
                ((s = "vertical" === this._getDirection(t, o)),
                (e = wf(Lf)),
                A("dragOverValid"),
                Eg.eventCanceled)
              )
                return f;
              if (r)
                return (
                  (Ff = $f),
                  O(),
                  this._hideClone(),
                  A("revert"),
                  Eg.eventCanceled ||
                    (Hf ? $f.insertBefore(Lf, Hf) : $f.appendChild(Lf)),
                  I(!0)
                );
              var g = Ef(i, l.draggable);
              if (
                !g ||
                ((function (t, e, n) {
                  var r = wf(Ef(n.el, n.options.draggable));
                  return e
                    ? t.clientX > r.right + 10 ||
                        (t.clientX <= r.right &&
                          t.clientY > r.bottom &&
                          t.clientX >= r.left)
                    : (t.clientX > r.right && t.clientY > r.top) ||
                        (t.clientX <= r.right && t.clientY > r.bottom + 10);
                })(t, s, this) &&
                  !g.animated)
              ) {
                if (g === Lf) return I(!1);
                if (
                  (g && i === t.target && (o = g),
                  o && (n = wf(o)),
                  !1 !== Sg($f, i, Lf, e, o, n, t, !!o))
                )
                  return O(), i.appendChild(Lf), (Ff = i), R(), I(!0);
              } else if (o.parentNode === i) {
                n = wf(o);
                var m,
                  v,
                  _,
                  b = Lf.parentNode !== i,
                  w = !(function (t, e, n) {
                    var r = n ? t.left : t.top,
                      s = n ? e.left : e.top;
                    return (
                      r === s ||
                      (n ? t.right : t.bottom) === (n ? e.right : e.bottom) ||
                      r + (n ? t.width : t.height) / 2 ===
                        s + (n ? e.width : e.height) / 2
                    );
                  })(
                    (Lf.animated && Lf.toRect) || e,
                    (o.animated && o.toRect) || n,
                    s
                  ),
                  y = s ? "top" : "left",
                  C = yf(o, null, "top", "top") || yf(Lf, null, "top", "top"),
                  E = C ? C.scrollTop : void 0;
                if (
                  (eg !== o &&
                    ((v = n[y]), (ag = !1), (ug = (!w && l.invertSwap) || b)),
                  0 !==
                    (m = (function (t, e, n, r, s, i, o) {
                      var l = wf(e),
                        a = n ? t.clientY : t.clientX,
                        u = n ? l.height : l.width,
                        c = n ? l.top : l.left,
                        h = n ? l.bottom : l.right,
                        d = !1;
                      if (!i)
                        if (o && rg < u * r) {
                          if (
                            (!ag &&
                              (1 === ng
                                ? a > c + (u * s) / 2
                                : a < h - (u * s) / 2) &&
                              (ag = !0),
                            ag)
                          )
                            d = !0;
                          else if (1 === ng ? a < c + rg : a > h - rg)
                            return -ng;
                        } else if (
                          a > c + (u * (1 - r)) / 2 &&
                          a < h - (u * (1 - r)) / 2
                        )
                          return (function (t) {
                            return Sf(Lf) < Sf(t) ? 1 : -1;
                          })(e);
                      return (d = d || i) &&
                        (a < c + (u * s) / 2 || a > h - (u * s) / 2)
                        ? a > c + u / 2
                          ? 1
                          : -1
                        : 0;
                    })(
                      t,
                      o,
                      s,
                      w ? 1 : l.swapThreshold,
                      null == l.invertedSwapThreshold
                        ? l.swapThreshold
                        : l.invertedSwapThreshold,
                      ug,
                      eg === o
                    )))
                ) {
                  var S = Sf(Lf);
                  do {
                    _ = Ff.children[(S -= m)];
                  } while (_ && ("none" === mf(_, "display") || _ === Uf));
                }
                if (0 === m || _ === o) return I(!1);
                (eg = o), (ng = m);
                var x = o.nextElementSibling,
                  T = !1,
                  k = Sg($f, i, Lf, e, o, n, t, (T = 1 === m));
                if (!1 !== k)
                  return (
                    (1 !== k && -1 !== k) || (T = 1 === k),
                    (hg = !0),
                    setTimeout(Tg, 30),
                    O(),
                    T && !x
                      ? i.appendChild(Lf)
                      : o.parentNode.insertBefore(Lf, T ? x : o),
                    C && Of(C, 0, E - C.scrollTop),
                    (Ff = Lf.parentNode),
                    void 0 === v || ug || (rg = Math.abs(v - wf(o)[y])),
                    R(),
                    I(!0)
                  );
              }
              if (i.contains(Lf)) return I(!1);
            }
            return !1;
          }
          function A(l, a) {
            Vf(
              l,
              p,
              Jp(
                {
                  evt: t,
                  isOwner: c,
                  axis: s ? "vertical" : "horizontal",
                  revert: r,
                  dragRect: e,
                  targetRect: n,
                  canSort: h,
                  fromSortable: d,
                  target: o,
                  completed: I,
                  onMove: function (n, r) {
                    return Sg($f, i, Lf, e, n, wf(n), t, r);
                  },
                  changed: R,
                },
                a
              )
            );
          }
          function O() {
            A("dragOverAnimationCapture"),
              p.captureAnimationState(),
              p !== d && d.captureAnimationState();
          }
          function I(e) {
            return (
              A("dragOverCompleted", { insertion: e }),
              e &&
                (c ? u._hideClone() : u._showClone(p),
                p !== d &&
                  (gf(
                    Lf,
                    Kf ? Kf.options.ghostClass : u.options.ghostClass,
                    !1
                  ),
                  gf(Lf, l.ghostClass, !0)),
                Kf !== p && p !== Eg.active
                  ? (Kf = p)
                  : p === Eg.active && Kf && (Kf = null),
                d === p && (p._ignoreWhileAnimating = o),
                p.animateAll(function () {
                  A("dragOverAnimationComplete"),
                    (p._ignoreWhileAnimating = null);
                }),
                p !== d && (d.animateAll(), (d._ignoreWhileAnimating = null))),
              ((o === Lf && !Lf.animated) || (o === i && !o.animated)) &&
                (eg = null),
              l.dragoverBubble ||
                t.rootEl ||
                o === document ||
                (Lf.parentNode[Rf]._isOutsideThisEl(t.target), !e && yg(t)),
              !l.dragoverBubble && t.stopPropagation && t.stopPropagation(),
              (f = !0)
            );
          }
          function R() {
            (qf = Sf(Lf)),
              (Qf = Sf(Lf, l.draggable)),
              jf({
                sortable: p,
                name: "change",
                toEl: i,
                newIndex: qf,
                newDraggableIndex: Qf,
                originalEvent: t,
              });
          }
        },
        _ignoreWhileAnimating: null,
        _offMoveEvents: function () {
          uf(document, "mousemove", this._onTouchMove),
            uf(document, "touchmove", this._onTouchMove),
            uf(document, "pointermove", this._onTouchMove),
            uf(document, "dragover", yg),
            uf(document, "mousemove", yg),
            uf(document, "touchmove", yg);
        },
        _offUpEvents: function () {
          var t = this.el.ownerDocument;
          uf(t, "mouseup", this._onDrop),
            uf(t, "touchend", this._onDrop),
            uf(t, "pointerup", this._onDrop),
            uf(t, "touchcancel", this._onDrop),
            uf(document, "selectstart", this);
        },
        _onDrop: function (t) {
          var e = this.el,
            n = this.options;
          (qf = Sf(Lf)),
            (Qf = Sf(Lf, n.draggable)),
            Vf("drop", this, { evt: t }),
            (qf = Sf(Lf)),
            (Qf = Sf(Lf, n.draggable)),
            Eg.eventCanceled
              ? this._nulling()
              : ((ig = !1),
                (ug = !1),
                (ag = !1),
                clearInterval(this._loopId),
                clearTimeout(this._dragStartTimer),
                Og(this.cloneId),
                Og(this._dragStartId),
                this.nativeDraggable &&
                  (uf(document, "drop", this),
                  uf(e, "dragstart", this._onDragStart)),
                this._offMoveEvents(),
                this._offUpEvents(),
                sf && mf(document.body, "user-select", ""),
                t &&
                  (tg &&
                    (t.cancelable && t.preventDefault(),
                    !n.dropBubble && t.stopPropagation()),
                  Uf && Uf.parentNode && Uf.parentNode.removeChild(Uf),
                  ($f === Ff || (Kf && "clone" !== Kf.lastPutMode)) &&
                    Bf &&
                    Bf.parentNode &&
                    Bf.parentNode.removeChild(Bf),
                  Lf &&
                    (this.nativeDraggable && uf(Lf, "dragend", this),
                    xg(Lf),
                    (Lf.style["will-change"] = ""),
                    tg &&
                      !ig &&
                      gf(
                        Lf,
                        Kf ? Kf.options.ghostClass : this.options.ghostClass,
                        !1
                      ),
                    gf(Lf, this.options.chosenClass, !1),
                    jf({
                      sortable: this,
                      name: "unchoose",
                      toEl: Ff,
                      newIndex: null,
                      newDraggableIndex: null,
                      originalEvent: t,
                    }),
                    $f !== Ff
                      ? (qf >= 0 &&
                          (jf({
                            rootEl: Ff,
                            name: "add",
                            toEl: Ff,
                            fromEl: $f,
                            originalEvent: t,
                          }),
                          jf({
                            sortable: this,
                            name: "remove",
                            toEl: Ff,
                            originalEvent: t,
                          }),
                          jf({
                            rootEl: Ff,
                            name: "sort",
                            toEl: Ff,
                            fromEl: $f,
                            originalEvent: t,
                          }),
                          jf({
                            sortable: this,
                            name: "sort",
                            toEl: Ff,
                            originalEvent: t,
                          })),
                        Kf && Kf.save())
                      : qf !== Gf &&
                        qf >= 0 &&
                        (jf({
                          sortable: this,
                          name: "update",
                          toEl: Ff,
                          originalEvent: t,
                        }),
                        jf({
                          sortable: this,
                          name: "sort",
                          toEl: Ff,
                          originalEvent: t,
                        })),
                    Eg.active &&
                      ((null != qf && -1 !== qf) || ((qf = Gf), (Qf = Zf)),
                      jf({
                        sortable: this,
                        name: "end",
                        toEl: Ff,
                        originalEvent: t,
                      }),
                      this.save()))),
                this._nulling());
        },
        _nulling: function () {
          Vf("nulling", this),
            ($f =
              Lf =
              Ff =
              Uf =
              Hf =
              Bf =
              zf =
              Wf =
              Xf =
              Jf =
              tg =
              qf =
              Qf =
              Gf =
              Zf =
              eg =
              ng =
              Kf =
              Yf =
              Eg.dragged =
              Eg.ghost =
              Eg.clone =
              Eg.active =
                null),
            dg.forEach(function (t) {
              t.checked = !0;
            }),
            (dg.length = 0);
        },
        handleEvent: function (t) {
          switch (t.type) {
            case "drop":
            case "dragend":
              this._onDrop(t);
              break;
            case "dragenter":
            case "dragover":
              Lf &&
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
              s = n.length,
              i = this.options;
            r < s;
            r++
          )
            df((t = n[r]), i.draggable, this.el, !1) &&
              e.push(t.getAttribute(i.dataIdAttr) || kg(t));
          return e;
        },
        sort: function (t) {
          var e = {},
            n = this.el;
          this.toArray().forEach(function (t, r) {
            var s = n.children[r];
            df(s, this.options.draggable, n, !1) && (e[t] = s);
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
          return df(t, e || this.options.draggable, this.el, !1);
        },
        option: function (t, e) {
          var n = this.options;
          if (void 0 === e) return n[t];
          var r = Pf.modifyOption(this, t, e);
          (n[t] = void 0 !== r ? r : e), "group" === t && _g(n);
        },
        destroy: function () {
          Vf("destroy", this);
          var t = this.el;
          (t[Rf] = null),
            uf(t, "mousedown", this._onTapStart),
            uf(t, "touchstart", this._onTapStart),
            uf(t, "pointerdown", this._onTapStart),
            this.nativeDraggable &&
              (uf(t, "dragover", this), uf(t, "dragenter", this)),
            Array.prototype.forEach.call(
              t.querySelectorAll("[draggable]"),
              function (t) {
                t.removeAttribute("draggable");
              }
            ),
            this._onDrop(),
            lg.splice(lg.indexOf(this.el), 1),
            (this.el = t = null);
        },
        _hideClone: function () {
          if (!Wf) {
            if ((Vf("hideClone", this), Eg.eventCanceled)) return;
            mf(Bf, "display", "none"),
              this.options.removeCloneOnHide &&
                Bf.parentNode &&
                Bf.parentNode.removeChild(Bf),
              (Wf = !0);
          }
        },
        _showClone: function (t) {
          if ("clone" === t.lastPutMode) {
            if (Wf) {
              if ((Vf("showClone", this), Eg.eventCanceled)) return;
              $f.contains(Lf) && !this.options.group.revertClone
                ? $f.insertBefore(Bf, Lf)
                : Hf
                ? $f.insertBefore(Bf, Hf)
                : $f.appendChild(Bf),
                this.options.group.revertClone && this._animate(Lf, Bf),
                mf(Bf, "display", ""),
                (Wf = !1);
            }
          } else this._hideClone();
        },
      }),
        af(document, "touchmove", function (t) {
          (Eg.active || ig) && t.cancelable && t.preventDefault();
        }),
        (Eg.utils = {
          on: af,
          off: uf,
          css: mf,
          find: _f,
          is: function (t, e) {
            return !!df(t, e, t, !1);
          },
          extend: function (t, e) {
            if (t && e) for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            return t;
          },
          throttle: Af,
          closest: df,
          toggleClass: gf,
          clone: If,
          index: Sf,
          nextTick: Ag,
          cancelNextTick: Og,
          detectDirection: vg,
          getChild: Cf,
        }),
        (Eg.mount = function () {
          for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
          for (var r in (e[0].constructor === Array && (e = e[0]), e)) {
            var s = e[r];
            if (!s.prototype || !s.prototype.constructor)
              throw "Sortable: Mounted plugin must be a constructor function, not ".concat(
                {}.toString.call(el)
              );
            s.utils && (Eg.utils = Jp({}, Eg.utils, s.utils)), Pf.mount(s);
          }
        }),
        (Eg.create = function (t, e) {
          return new Eg(t, e);
        }),
        (Eg.version = "1.10.0-rc2");
      var Ig,
        Rg,
        Ng,
        Dg,
        Mg,
        Pg,
        Vg = [],
        jg = !1;
      function Lg() {
        Vg.forEach(function (t) {
          clearInterval(t.pid);
        }),
          (Vg = []);
      }
      function Fg() {
        clearInterval(Pg);
      }
      var Ug = Af(function (t, e, n, r) {
          if (e.scroll) {
            var s,
              i = e.scrollSensitivity,
              o = e.scrollSpeed,
              l = bf(),
              a = !1;
            Rg !== n &&
              ((Rg = n),
              Lg(),
              (s = e.scrollFn),
              !0 === (Ig = e.scroll) && (Ig = Tf(n, !0)));
            var u = 0,
              c = Ig;
            do {
              var h = c,
                d = wf(h),
                p = d.top,
                f = d.bottom,
                g = d.left,
                m = d.right,
                v = d.width,
                _ = d.height,
                b = void 0,
                w = void 0,
                y = h.scrollWidth,
                C = h.scrollHeight,
                E = mf(h),
                S = h.scrollLeft,
                x = h.scrollTop;
              h === l
                ? ((b =
                    v < y &&
                    ("auto" === E.overflowX ||
                      "scroll" === E.overflowX ||
                      "visible" === E.overflowX)),
                  (w =
                    _ < C &&
                    ("auto" === E.overflowY ||
                      "scroll" === E.overflowY ||
                      "visible" === E.overflowY)))
                : ((b =
                    v < y &&
                    ("auto" === E.overflowX || "scroll" === E.overflowX)),
                  (w =
                    _ < C &&
                    ("auto" === E.overflowY || "scroll" === E.overflowY)));
              var T =
                  b &&
                  (Math.abs(m - t.clientX) <= i && S + v < y) -
                    (Math.abs(g - t.clientX) <= i && !!S),
                k =
                  w &&
                  (Math.abs(f - t.clientY) <= i && x + _ < C) -
                    (Math.abs(p - t.clientY) <= i && !!x);
              if (!Vg[u]) for (var A = 0; A <= u; A++) Vg[A] || (Vg[A] = {});
              (Vg[u].vx == T && Vg[u].vy == k && Vg[u].el === h) ||
                ((Vg[u].el = h),
                (Vg[u].vx = T),
                (Vg[u].vy = k),
                clearInterval(Vg[u].pid),
                (0 == T && 0 == k) ||
                  ((a = !0),
                  (Vg[u].pid = setInterval(
                    function () {
                      r && 0 === this.layer && Eg.active._onTouchMove(Mg);
                      var e = Vg[this.layer].vy ? Vg[this.layer].vy * o : 0,
                        n = Vg[this.layer].vx ? Vg[this.layer].vx * o : 0;
                      ("function" == typeof s &&
                        "continue" !==
                          s.call(
                            Eg.dragged.parentNode[Rf],
                            n,
                            e,
                            t,
                            Mg,
                            Vg[this.layer].el
                          )) ||
                        Of(Vg[this.layer].el, n, e);
                    }.bind({ layer: u }),
                    24
                  )))),
                u++;
            } while (e.bubbleScroll && c !== l && (c = Tf(c, !1)));
            jg = a;
          }
        }, 30),
        $g = function (t) {
          var e = t.originalEvent,
            n = t.dragEl,
            r = t.dispatchSortableEvent,
            s = t.unhideGhostForTarget,
            i = t.putSortable || t.activeSortable;
          (0, t.hideGhostForTarget)();
          var o = document.elementFromPoint(e.clientX, e.clientY);
          s(), i && !i.el.contains(o) && (r("spill"), this.onSpill(n));
        };
      function Hg() {}
      function zg() {}
      (Hg.prototype = {
        startIndex: null,
        dragStart: function (t) {
          this.startIndex = t.oldDraggableIndex;
        },
        onSpill: function (t) {
          this.sortable.captureAnimationState();
          var e = Cf(this.sortable.el, this.startIndex, this.sortable.options);
          e
            ? this.sortable.el.insertBefore(t, e)
            : this.sortable.el.appendChild(t),
            this.sortable.animateAll();
        },
        drop: $g,
      }),
        Xp(Hg, { pluginName: "revertOnSpill" }),
        (zg.prototype = {
          onSpill: function (t) {
            this.sortable.captureAnimationState(),
              t.parentNode && t.parentNode.removeChild(t),
              this.sortable.animateAll();
          },
          drop: $g,
        }),
        Xp(zg, { pluginName: "removeOnSpill" }),
        Eg.mount(
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
                    ? af(document, "dragover", this._handleAutoScroll)
                    : af(
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
                    ? uf(document, "dragover", this._handleAutoScroll)
                    : (uf(
                        document,
                        "pointermove",
                        this._handleFallbackAutoScroll
                      ),
                      uf(document, "touchmove", this._handleFallbackAutoScroll),
                      uf(
                        document,
                        "mousemove",
                        this._handleFallbackAutoScroll
                      )),
                    Fg(),
                    Lg(),
                    clearTimeout(pf),
                    (pf = void 0);
                },
                nulling: function () {
                  (Mg = Rg = Ig = jg = Pg = Ng = Dg = null), (Vg.length = 0);
                },
                _handleFallbackAutoScroll: function (t) {
                  this._handleAutoScroll(t, !0);
                },
                _handleAutoScroll: function (t, e) {
                  var n = this,
                    r = t.clientX,
                    s = t.clientY,
                    i = document.elementFromPoint(r, s);
                  if (((Mg = t), e || nf || ef || sf)) {
                    Ug(t, this.options, i, e);
                    var o = Tf(i, !0);
                    !jg ||
                      (Pg && r === Ng && s === Dg) ||
                      (Pg && Fg(),
                      (Pg = setInterval(function () {
                        var i = Tf(document.elementFromPoint(r, s), !0);
                        i !== o && ((o = i), Lg()), Ug(t, n.options, i, e);
                      }, 10)),
                      (Ng = r),
                      (Dg = s));
                  } else {
                    if (
                      !this.sortable.options.bubbleScroll ||
                      Tf(i, !0) === bf()
                    )
                      return void Lg();
                    Ug(t, this.options, Tf(i, !1), !1);
                  }
                },
              }),
              Xp(t, { pluginName: "scroll", initializeByDefault: !0 })
            );
          })()
        ),
        Eg.mount(zg, Hg);
      var Bg = Eg;
      const Wg = new kt("Global config for sortablejs");
      class Gg {
        constructor(t) {
          this.target = t;
        }
        insert(t, e) {
          this.isFormArray
            ? this.target.insert(t, e)
            : this.target.splice(t, 0, e);
        }
        get(t) {
          return this.isFormArray ? this.target.at(t) : this.target[t];
        }
        remove(t) {
          let e;
          return (
            this.isFormArray
              ? ((e = this.target.at(t)), this.target.removeAt(t))
              : (e = this.target.splice(t, 1)[0]),
            e
          );
        }
        get isFormArray() {
          return (
            !!this.target.at && !!this.target.insert && !!this.target.reset
          );
        }
      }
      class qg {
        constructor(t) {
          this.bindings = t.map((t) => new Gg(t));
        }
        injectIntoEvery(t, e) {
          this.bindings.forEach((n, r) => n.insert(t, e[r]));
        }
        getFromEvery(t) {
          return this.bindings.map((e) => e.get(t));
        }
        extractFromEvery(t) {
          return this.bindings.map((e) => e.remove(t));
        }
        get provided() {
          return !!this.bindings.length;
        }
      }
      const Zg = (function () {
        class t {}
        return (
          (t.ngInjectableDef = ft({
            factory: function () {
              return new t();
            },
            token: t,
            providedIn: "root",
          })),
          t
        );
      })();
      class Qg {
        constructor(t, e, n, r, s) {
          (this.globalConfig = t),
            (this.service = e),
            (this.element = n),
            (this.zone = r),
            (this.renderer = s),
            (this.runInsideAngular = !1),
            (this.sortablejsInit = new Cs());
        }
        ngOnInit() {
          Bg &&
            Bg.create &&
            (this.runInsideAngular
              ? this.create()
              : this.zone.runOutsideAngular(() => this.create()));
        }
        ngOnChanges(t) {
          const e = t.sortablejsOptions;
          if (e && !e.isFirstChange()) {
            const t = e.previousValue,
              n = e.currentValue;
            Object.keys(n).forEach((e) => {
              n[e] !== t[e] && this.sortableInstance.option(e, this.options[e]);
            });
          }
        }
        ngOnDestroy() {
          this.sortableInstance && this.sortableInstance.destroy();
        }
        create() {
          const t = this.sortablejsContainer
            ? this.element.nativeElement.querySelector(this.sortablejsContainer)
            : this.element.nativeElement;
          setTimeout(() => {
            (this.sortableInstance = Bg.create(t, this.options)),
              this.sortablejsInit.emit(this.sortableInstance);
          }, 0);
        }
        getBindings() {
          return this.sortablejs
            ? this.sortablejs instanceof qg
              ? this.sortablejs
              : new qg([this.sortablejs])
            : new qg([]);
        }
        get options() {
          return Object.assign(
            {},
            this.optionsWithoutEvents,
            this.overridenOptions
          );
        }
        get optionsWithoutEvents() {
          return Object.assign(
            {},
            this.globalConfig || {},
            this.sortablejsOptions || {}
          );
        }
        proxyEvent(t, ...e) {
          this.zone.run(() => {
            this.optionsWithoutEvents &&
              this.optionsWithoutEvents[t] &&
              this.optionsWithoutEvents[t](...e);
          });
        }
        get isCloning() {
          return (
            "clone" ===
            this.sortableInstance.options.group.checkPull(
              this.sortableInstance,
              this.sortableInstance
            )
          );
        }
        clone(t) {
          return (this.sortablejsCloneFunction || ((t) => t))(t);
        }
        get overridenOptions() {
          return {
            onAdd: (t) => {
              (this.service.transfer = (e) => {
                this.getBindings().injectIntoEvery(t.newIndex, e),
                  this.proxyEvent("onAdd", t);
              }),
                this.proxyEvent("onAddOriginal", t);
            },
            onRemove: (t) => {
              const e = this.getBindings();
              e.provided &&
                (this.isCloning
                  ? (this.service.transfer(
                      e.getFromEvery(t.oldIndex).map((t) => this.clone(t))
                    ),
                    this.renderer.removeChild(t.item.parentNode, t.item),
                    this.renderer.insertBefore(
                      t.clone.parentNode,
                      t.item,
                      t.clone
                    ),
                    this.renderer.removeChild(t.clone.parentNode, t.clone))
                  : this.service.transfer(e.extractFromEvery(t.oldIndex)),
                (this.service.transfer = null)),
                this.proxyEvent("onRemove", t);
            },
            onUpdate: (t) => {
              const e = this.getBindings();
              e.injectIntoEvery(t.newIndex, e.extractFromEvery(t.oldIndex)),
                this.proxyEvent("onUpdate", t);
            },
          };
        }
      }
      class Yg {
        static forRoot(t) {
          return { ngModule: Yg, providers: [{ provide: Wg, useValue: t }] };
        }
      }
      class Kg {
        constructor() {
          this.cities = ["Ankara", "Moscow", "Munich", "Paris", "Washington"];
        }
      }
      var Xg = Zn({ encapsulation: 0, styles: [[""]], data: {} });
      function Jg(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, ["", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function tm(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, ["", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function em(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            (t()(), Qi(3, null, ["", ""])),
            (t()(),
            Li(
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
            (t()(), Qi(5, null, ["", " description"])),
          ],
          null,
          function (t, e) {
            t(e, 3, 0, e.context.$implicit), t(e, 5, 0, e.context.$implicit);
          }
        );
      }
      function nm(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            Li(
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
            (t()(), Qi(2, null, ["", ""])),
          ],
          null,
          function (t, e) {
            t(e, 2, 0, e.context.$implicit);
          }
        );
      }
      function rm(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, ["", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function sm(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["Sortable Array"])),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            (t()(), Qi(-1, null, ["The source code"])),
            (t()(),
            Qi(-1, null, [
              " The examples below shows various bootstrap.css elements that can be ",
            ])),
            (t()(),
            Li(7, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["sortable"])),
            (t()(),
            Qi(-1, null, [
              ". They share the same model that's why every time you drag / drop the element all others get updated. Actually everything can be sortable. ",
            ])),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["Button groups"])),
            (t()(),
            Li(
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
            Li(
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
            ss(
              14,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              { sortablejs: [0, "sortablejs"] },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, Jg)),
            ss(
              16,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            ss(
              18,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              { sortablejs: [0, "sortablejs"] },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, tm)),
            ss(
              20,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["Cards"])),
            (t()(),
            Li(
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
            ss(
              24,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              { sortablejs: [0, "sortablejs"] },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, em)),
            ss(
              26,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["Navigation"])),
            (t()(),
            Li(
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
            ss(
              30,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              { sortablejs: [0, "sortablejs"] },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, nm)),
            ss(
              32,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            Li(
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
            ss(
              35,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              { sortablejs: [0, "sortablejs"] },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, rm)),
            ss(
              37,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["The actual model"])),
            (t()(),
            Li(
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
            (t()(), Qi(41, null, [" > ", "\n"])),
            is(0, Il, []),
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
            t(e, 41, 0, Wn(e, 41, 0, Wr(e, 42).transform(n.cities)));
          }
        );
      }
      function im(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
              sm,
              Xg
            )),
            ss(1, 49152, null, 0, Kg, [], null, null),
          ],
          null,
          null
        );
      }
      var om = Mr("app-simple-sortable", Kg, im, {}, {}, []);
      class lm extends $ {
        constructor(t, e) {
          super(t),
            (this.sources = e),
            (this.completed = 0),
            (this.haveValues = 0);
          const n = e.length;
          this.values = new Array(n);
          for (let r = 0; r < n; r++) {
            const t = U(this, e[r], null, r);
            t && this.add(t);
          }
        }
        notifyNext(t, e, n, r, s) {
          (this.values[n] = e),
            s._hasValue || ((s._hasValue = !0), this.haveValues++);
        }
        notifyComplete(t) {
          const { destination: e, haveValues: n, values: r } = this,
            s = r.length;
          t._hasValue
            ? (this.completed++,
              this.completed === s && (n === s && e.next(r), e.complete()))
            : e.complete();
        }
      }
      const am = new kt("NgValueAccessor"),
        um = new kt("CompositionEventMode");
      class cm {
        constructor(t, e, n) {
          (this._renderer = t),
            (this._elementRef = e),
            (this._compositionMode = n),
            (this.onChange = (t) => {}),
            (this.onTouched = () => {}),
            (this._composing = !1),
            null == this._compositionMode &&
              (this._compositionMode = !(function () {
                const t = Ia() ? Ia().getUserAgent() : "";
                return /android (\d+)/.test(t.toLowerCase());
              })());
        }
        writeValue(t) {
          this._renderer.setProperty(
            this._elementRef.nativeElement,
            "value",
            null == t ? "" : t
          );
        }
        registerOnChange(t) {
          this.onChange = t;
        }
        registerOnTouched(t) {
          this.onTouched = t;
        }
        setDisabledState(t) {
          this._renderer.setProperty(
            this._elementRef.nativeElement,
            "disabled",
            t
          );
        }
        _handleInput(t) {
          (!this._compositionMode ||
            (this._compositionMode && !this._composing)) &&
            this.onChange(t);
        }
        _compositionStart() {
          this._composing = !0;
        }
        _compositionEnd(t) {
          (this._composing = !1), this._compositionMode && this.onChange(t);
        }
      }
      class hm {
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        reset(t) {
          this.control && this.control.reset(t);
        }
        hasError(t, e) {
          return !!this.control && this.control.hasError(t, e);
        }
        getError(t, e) {
          return this.control ? this.control.getError(t, e) : null;
        }
      }
      function dm() {
        throw new Error("unimplemented");
      }
      class pm extends hm {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null),
            (this._rawValidators = []),
            (this._rawAsyncValidators = []);
        }
        get validator() {
          return dm();
        }
        get asyncValidator() {
          return dm();
        }
      }
      class fm {
        constructor(t) {
          this._cd = t;
        }
        get ngClassUntouched() {
          return !!this._cd.control && this._cd.control.untouched;
        }
        get ngClassTouched() {
          return !!this._cd.control && this._cd.control.touched;
        }
        get ngClassPristine() {
          return !!this._cd.control && this._cd.control.pristine;
        }
        get ngClassDirty() {
          return !!this._cd.control && this._cd.control.dirty;
        }
        get ngClassValid() {
          return !!this._cd.control && this._cd.control.valid;
        }
        get ngClassInvalid() {
          return !!this._cd.control && this._cd.control.invalid;
        }
        get ngClassPending() {
          return !!this._cd.control && this._cd.control.pending;
        }
      }
      class gm extends fm {
        constructor(t) {
          super(t);
        }
      }
      function mm(t) {
        return null == t || 0 === t.length;
      }
      const vm =
        /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
      class _m {
        static min(t) {
          return (e) => {
            if (mm(e.value) || mm(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n < t
              ? { min: { min: t, actual: e.value } }
              : null;
          };
        }
        static max(t) {
          return (e) => {
            if (mm(e.value) || mm(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n > t
              ? { max: { max: t, actual: e.value } }
              : null;
          };
        }
        static required(t) {
          return mm(t.value) ? { required: !0 } : null;
        }
        static requiredTrue(t) {
          return !0 === t.value ? null : { required: !0 };
        }
        static email(t) {
          return mm(t.value) ? null : vm.test(t.value) ? null : { email: !0 };
        }
        static minLength(t) {
          return (e) => {
            if (mm(e.value)) return null;
            const n = e.value ? e.value.length : 0;
            return n < t
              ? { minlength: { requiredLength: t, actualLength: n } }
              : null;
          };
        }
        static maxLength(t) {
          return (e) => {
            const n = e.value ? e.value.length : 0;
            return n > t
              ? { maxlength: { requiredLength: t, actualLength: n } }
              : null;
          };
        }
        static pattern(t) {
          if (!t) return _m.nullValidator;
          let e, n;
          return (
            "string" == typeof t
              ? ((n = ""),
                "^" !== t.charAt(0) && (n += "^"),
                (n += t),
                "$" !== t.charAt(t.length - 1) && (n += "$"),
                (e = new RegExp(n)))
              : ((n = t.toString()), (e = t)),
            (t) => {
              if (mm(t.value)) return null;
              const r = t.value;
              return e.test(r)
                ? null
                : { pattern: { requiredPattern: n, actualValue: r } };
            }
          );
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          if (!t) return null;
          const e = t.filter(bm);
          return 0 == e.length
            ? null
            : function (t) {
                return ym(
                  (function (t, n) {
                    return e.map((e) => e(t));
                  })(t)
                );
              };
        }
        static composeAsync(t) {
          if (!t) return null;
          const e = t.filter(bm);
          return 0 == e.length
            ? null
            : function (t) {
                return (function t(...e) {
                  let n;
                  return (
                    "function" == typeof e[e.length - 1] && (n = e.pop()),
                    1 === e.length && a(e[0]) && (e = e[0]),
                    0 === e.length
                      ? jl
                      : n
                      ? t(e).pipe(H((t) => n(...t)))
                      : new y((t) => new lm(t, e))
                  );
                })(
                  (function (t, n) {
                    return e.map((e) => e(t));
                  })(t).map(wm)
                ).pipe(H(ym));
              };
        }
      }
      function bm(t) {
        return null != t;
      }
      function wm(t) {
        const e = Ne(t) ? G(t) : t;
        if (!De(e))
          throw new Error(
            "Expected validator to return Promise or Observable."
          );
        return e;
      }
      function ym(t) {
        const e = t.reduce(
          (t, e) => (null != e ? Object.assign({}, t, e) : t),
          {}
        );
        return 0 === Object.keys(e).length ? null : e;
      }
      function Cm(t) {
        return t.validate ? (e) => t.validate(e) : t;
      }
      function Em(t) {
        return t.validate ? (e) => t.validate(e) : t;
      }
      class Sm {
        constructor() {
          this._accessors = [];
        }
        add(t, e) {
          this._accessors.push([t, e]);
        }
        remove(t) {
          for (let e = this._accessors.length - 1; e >= 0; --e)
            if (this._accessors[e][1] === t)
              return void this._accessors.splice(e, 1);
        }
        select(t) {
          this._accessors.forEach((e) => {
            this._isSameGroup(e, t) && e[1] !== t && e[1].fireUncheck(t.value);
          });
        }
        _isSameGroup(t, e) {
          return (
            !!t[0].control &&
            t[0]._parent === e._control._parent &&
            t[1].name === e.name
          );
        }
      }
      const xm = {
        formControlName:
          '\n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });',
        formGroupName:
          '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
        formArrayName:
          '\n    <div [formGroup]="myGroup">\n      <div formArrayName="cities">\n        <div *ngFor="let city of cityArray.controls; index as i">\n          <input [formControlName]="i">\n        </div>\n      </div>\n    </div>\n\n    In your class:\n\n    this.cityArray = new FormArray([new FormControl(\'SF\')]);\n    this.myGroup = new FormGroup({\n      cities: this.cityArray\n    });',
        ngModelGroup:
          '\n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>',
        ngModelWithFormGroup:
          '\n    <div [formGroup]="myGroup">\n       <input formControlName="firstName">\n       <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">\n    </div>\n  ',
      };
      class Tm {
        static controlParentException() {
          throw new Error(
            `formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      ${xm.formControlName}`
          );
        }
        static ngModelGroupException() {
          throw new Error(
            `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents\n       that also have a "form" prefix: formGroupName, formArrayName, or formGroup.\n\n       Option 1:  Update the parent to be formGroupName (reactive form strategy)\n\n        ${xm.formGroupName}\n\n        Option 2: Use ngModel instead of formControlName (template-driven strategy)\n\n        ${xm.ngModelGroup}`
          );
        }
        static missingFormException() {
          throw new Error(
            `formGroup expects a FormGroup instance. Please pass one in.\n\n       Example:\n\n       ${xm.formControlName}`
          );
        }
        static groupParentException() {
          throw new Error(
            `formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup\n      directive and pass it an existing FormGroup instance (you can create one in your class).\n\n      Example:\n\n      ${xm.formGroupName}`
          );
        }
        static arrayParentException() {
          throw new Error(
            `formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup\n       directive and pass it an existing FormGroup instance (you can create one in your class).\n\n        Example:\n\n        ${xm.formArrayName}`
          );
        }
        static disabledAttrWarning() {
          console.warn(
            "\n      It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true\n      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for\n      you. We recommend using this approach to avoid 'changed after checked' errors.\n       \n      Example: \n      form = new FormGroup({\n        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),\n        last: new FormControl('Drew', Validators.required)\n      });\n    "
          );
        }
        static ngModelWarning(t) {
          console.warn(
            `\n    It looks like you're using ngModel on the same form field as ${t}. \n    Support for using the ngModel input property and ngModelChange event with \n    reactive form directives has been deprecated in Angular v6 and will be removed \n    in Angular v7.\n    \n    For more information on this, see our API docs here:\n    https://angular.io/api/forms/${
              "formControl" === t ? "FormControlDirective" : "FormControlName"
            }#use-with-ngmodel\n    `
          );
        }
      }
      function km(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
      }
      function Am(t, e) {
        let n;
        throw (
          ((n =
            t.path.length > 1
              ? `path: '${t.path.join(" -> ")}'`
              : t.path[0]
              ? `name: '${t.path}'`
              : "unspecified name attribute"),
          new Error(`${e} ${n}`))
        );
      }
      function Om(t) {
        return null != t ? _m.compose(t.map(Cm)) : null;
      }
      function Im(t) {
        return null != t ? _m.composeAsync(t.map(Em)) : null;
      }
      const Rm = [
          class {
            constructor(t, e) {
              (this._renderer = t),
                (this._elementRef = e),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {});
            }
            writeValue(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "checked",
                t
              );
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
          },
          class {
            constructor(t, e) {
              (this._renderer = t),
                (this._elementRef = e),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {});
            }
            writeValue(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                parseFloat(t)
              );
            }
            registerOnChange(t) {
              this.onChange = (e) => {
                t("" == e ? null : parseFloat(e));
              };
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
          },
          class {
            constructor(t, e) {
              (this._renderer = t),
                (this._elementRef = e),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {});
            }
            writeValue(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                null == t ? "" : t
              );
            }
            registerOnChange(t) {
              this.onChange = (e) => {
                t("" == e ? null : parseFloat(e));
              };
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
          },
          class {
            constructor(t, e) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._optionMap = new Map()),
                (this._idCounter = 0),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {}),
                (this._compareWith = Ve);
            }
            set compareWith(t) {
              if ("function" != typeof t)
                throw new Error(
                  `compareWith must be a function, but received ${JSON.stringify(
                    t
                  )}`
                );
              this._compareWith = t;
            }
            writeValue(t) {
              this.value = t;
              const e = this._getOptionId(t);
              null == e &&
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "selectedIndex",
                  -1
                );
              const n = (function (t, e) {
                return null == t
                  ? `${e}`
                  : (e && "object" == typeof e && (e = "Object"),
                    `${t}: ${e}`.slice(0, 50));
              })(e, t);
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                n
              );
            }
            registerOnChange(t) {
              this.onChange = (e) => {
                (this.value = this._getOptionValue(e)), t(this.value);
              };
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _registerOption() {
              return (this._idCounter++).toString();
            }
            _getOptionId(t) {
              for (const e of Array.from(this._optionMap.keys()))
                if (this._compareWith(this._optionMap.get(e), t)) return e;
              return null;
            }
            _getOptionValue(t) {
              const e = (function (t) {
                return t.split(":")[0];
              })(t);
              return this._optionMap.has(e) ? this._optionMap.get(e) : t;
            }
          },
          class {
            constructor(t, e) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._optionMap = new Map()),
                (this._idCounter = 0),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {}),
                (this._compareWith = Ve);
            }
            set compareWith(t) {
              if ("function" != typeof t)
                throw new Error(
                  `compareWith must be a function, but received ${JSON.stringify(
                    t
                  )}`
                );
              this._compareWith = t;
            }
            writeValue(t) {
              let e;
              if (((this.value = t), Array.isArray(t))) {
                const n = t.map((t) => this._getOptionId(t));
                e = (t, e) => {
                  t._setSelected(n.indexOf(e.toString()) > -1);
                };
              } else
                e = (t, e) => {
                  t._setSelected(!1);
                };
              this._optionMap.forEach(e);
            }
            registerOnChange(t) {
              this.onChange = (e) => {
                const n = [];
                if (e.hasOwnProperty("selectedOptions")) {
                  const t = e.selectedOptions;
                  for (let e = 0; e < t.length; e++) {
                    const r = t.item(e),
                      s = this._getOptionValue(r.value);
                    n.push(s);
                  }
                } else {
                  const t = e.options;
                  for (let e = 0; e < t.length; e++) {
                    const r = t.item(e);
                    if (r.selected) {
                      const t = this._getOptionValue(r.value);
                      n.push(t);
                    }
                  }
                }
                (this.value = n), t(n);
              };
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _registerOption(t) {
              const e = (this._idCounter++).toString();
              return this._optionMap.set(e, t), e;
            }
            _getOptionId(t) {
              for (const e of Array.from(this._optionMap.keys()))
                if (this._compareWith(this._optionMap.get(e)._value, t))
                  return e;
              return null;
            }
            _getOptionValue(t) {
              const e = (function (t) {
                return t.split(":")[0];
              })(t);
              return this._optionMap.has(e) ? this._optionMap.get(e)._value : t;
            }
          },
          class {
            constructor(t, e, n, r) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._registry = n),
                (this._injector = r),
                (this.onChange = () => {}),
                (this.onTouched = () => {});
            }
            ngOnInit() {
              (this._control = this._injector.get(pm)),
                this._checkName(),
                this._registry.add(this._control, this);
            }
            ngOnDestroy() {
              this._registry.remove(this);
            }
            writeValue(t) {
              (this._state = t === this.value),
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "checked",
                  this._state
                );
            }
            registerOnChange(t) {
              (this._fn = t),
                (this.onChange = () => {
                  t(this.value), this._registry.select(this);
                });
            }
            fireUncheck(t) {
              this.writeValue(t);
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _checkName() {
              this.name &&
                this.formControlName &&
                this.name !== this.formControlName &&
                this._throwNameError(),
                !this.name &&
                  this.formControlName &&
                  (this.name = this.formControlName);
            }
            _throwNameError() {
              throw new Error(
                '\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    '
              );
            }
          },
        ],
        Nm = "VALID",
        Dm = "INVALID",
        Mm = "PENDING",
        Pm = "DISABLED";
      function Vm(t) {
        const e = Lm(t) ? t.validators : t;
        return Array.isArray(e) ? Om(e) : e || null;
      }
      function jm(t, e) {
        const n = Lm(e) ? e.asyncValidators : t;
        return Array.isArray(n) ? Im(n) : n || null;
      }
      function Lm(t) {
        return null != t && !Array.isArray(t) && "object" == typeof t;
      }
      class Fm {
        constructor(t, e) {
          (this.validator = t),
            (this.asyncValidator = e),
            (this._onCollectionChange = () => {}),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []);
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === Nm;
        }
        get invalid() {
          return this.status === Dm;
        }
        get pending() {
          return this.status == Mm;
        }
        get disabled() {
          return this.status === Pm;
        }
        get enabled() {
          return this.status !== Pm;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this.validator = Vm(t);
        }
        setAsyncValidators(t) {
          this.asyncValidator = jm(t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = Mm),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = Pm),
            (this.errors = null),
            this._forEachChild((e) => {
              e.disable(Object.assign({}, t, { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign({}, t, { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!0));
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = Nm),
            this._forEachChild((e) => {
              e.enable(Object.assign({}, t, { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors(
              Object.assign({}, t, { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status !== Nm && this.status !== Mm) ||
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((e) => e._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Pm : Nm;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            this.status = Mm;
            const e = wm(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe((e) =>
              this.setErrors(e, { emitEvent: t })
            );
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            this._asyncValidationSubscription.unsubscribe();
        }
        setErrors(t, e = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent);
        }
        get(t) {
          return (function (t, e, n) {
            return null == e
              ? null
              : (e instanceof Array || (e = e.split(".")),
                e instanceof Array && 0 === e.length
                  ? null
                  : e.reduce(
                      (t, e) =>
                        t instanceof $m
                          ? t.controls.hasOwnProperty(e)
                            ? t.controls[e]
                            : null
                          : (t instanceof Hm && t.at(e)) || null,
                      t
                    ));
          })(this, t);
        }
        getError(t, e) {
          const n = e ? this.get(e) : this;
          return n && n.errors ? n.errors[t] : null;
        }
        hasError(t, e) {
          return !!this.getError(t, e);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new Cs()), (this.statusChanges = new Cs());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? Pm
            : this.errors
            ? Dm
            : this._anyControlsHaveStatus(Mm)
            ? Mm
            : this._anyControlsHaveStatus(Dm)
            ? Dm
            : Nm;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((e) => e.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _isBoxedValue(t) {
          return (
            "object" == typeof t &&
            null !== t &&
            2 === Object.keys(t).length &&
            "value" in t &&
            "disabled" in t
          );
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          Lm(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            this._parent &&
            this._parent.dirty &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class Um extends Fm {
        constructor(t = null, e, n) {
          super(Vm(e), jm(n, e)),
            (this._onChange = []),
            this._applyFormState(t),
            this._setUpdateStrategy(e),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
            this._initObservables();
        }
        setValue(t, e = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== e.emitModelToViewChange &&
              this._onChange.forEach((t) =>
                t(this.value, !1 !== e.emitViewToModelChange)
              ),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          this.setValue(t, e);
        }
        reset(t = null, e = {}) {
          this._applyFormState(t),
            this.markAsPristine(e),
            this.markAsUntouched(e),
            this.setValue(this.value, e),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _clearChangeFns() {
          (this._onChange = []),
            (this._onDisabledChange = []),
            (this._onCollectionChange = () => {});
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
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
        }
        _applyFormState(t) {
          this._isBoxedValue(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      }
      class $m extends Fm {
        constructor(t, e, n) {
          super(Vm(e), jm(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e),
              e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange),
              e);
        }
        addControl(t, e) {
          this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        removeControl(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            Object.keys(t).forEach((n) => {
              this._throwIfControlMissing(n),
                this.controls[n].setValue(t[n], {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          Object.keys(t).forEach((n) => {
            this.controls[n] &&
              this.controls[n].patchValue(t[n], {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = {}, e = {}) {
          this._forEachChild((n, r) => {
            n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => (
              (t[n] = e instanceof Um ? e.value : e.getRawValue()), t
            )
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (t, e) => !!e._syncPendingControls() || t
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.controls[t])
            throw new Error(`Cannot find form control with name: ${t}.`);
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((e) => t(this.controls[e], e));
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          let e = !1;
          return (
            this._forEachChild((n, r) => {
              e = e || (this.contains(r) && t(n));
            }),
            e
          );
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t)
          );
        }
        _reduceChildren(t, e) {
          let n = t;
          return (
            this._forEachChild((t, r) => {
              n = e(n, t, r);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control with name: '${n}'.`
              );
          });
        }
      }
      class Hm extends Fm {
        constructor(t, e, n) {
          super(Vm(e), jm(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        at(t) {
          return this.controls[t];
        }
        push(t) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        insert(t, e) {
          this.controls.splice(t, 0, e),
            this._registerControl(e),
            this.updateValueAndValidity();
        }
        removeAt(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            this.updateValueAndValidity();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            e && (this.controls.splice(t, 0, e), this._registerControl(e)),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            t.forEach((t, n) => {
              this._throwIfControlMissing(n),
                this.at(n).setValue(t, {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          t.forEach((t, n) => {
            this.at(n) &&
              this.at(n).patchValue(t, {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = [], e = {}) {
          this._forEachChild((n, r) => {
            n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this.controls.map((t) =>
            t instanceof Um ? t.value : t.getRawValue()
          );
        }
        clear() {
          this.controls.length < 1 ||
            (this._forEachChild((t) => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity());
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (t, e) => !!e._syncPendingControls() || t,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.at(t))
            throw new Error(`Cannot find form control at index ${t}`);
        }
        _forEachChild(t) {
          this.controls.forEach((e, n) => {
            t(e, n);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((e) => e.enabled && t(e));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control at index: ${n}.`
              );
          });
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const zm = new kt("NgModelWithFormControlWarning"),
        Bm = (function () {
          class t extends pm {
            constructor(t, e, n, r) {
              super(),
                (this._ngModelWarningConfig = r),
                (this.update = new Cs()),
                (this._ngModelWarningSent = !1),
                (this._rawValidators = t || []),
                (this._rawAsyncValidators = e || []),
                (this.valueAccessor = (function (t, e) {
                  if (!e) return null;
                  Array.isArray(e) ||
                    Am(
                      t,
                      "Value accessor was not provided as an array for form control with"
                    );
                  let n = void 0,
                    r = void 0,
                    s = void 0;
                  return (
                    e.forEach((e) => {
                      e.constructor === cm
                        ? (n = e)
                        : (function (t) {
                            return Rm.some((e) => t.constructor === e);
                          })(e)
                        ? (r &&
                            Am(
                              t,
                              "More than one built-in value accessor matches form control with"
                            ),
                          (r = e))
                        : (s &&
                            Am(
                              t,
                              "More than one custom value accessor matches form control with"
                            ),
                          (s = e));
                    }),
                    s ||
                      r ||
                      n ||
                      (Am(t, "No valid value accessor for form control with"),
                      null)
                  );
                })(this, n));
            }
            set isDisabled(t) {
              Tm.disabledAttrWarning();
            }
            ngOnChanges(e) {
              var n, r, s, i;
              this._isControlChanged(e) &&
                ((i = this),
                (s = this.form) || Am(i, "Cannot find control with"),
                i.valueAccessor ||
                  Am(i, "No value accessor for form control with"),
                (s.validator = _m.compose([s.validator, i.validator])),
                (s.asyncValidator = _m.composeAsync([
                  s.asyncValidator,
                  i.asyncValidator,
                ])),
                i.valueAccessor.writeValue(s.value),
                (function (t, e) {
                  e.valueAccessor.registerOnChange((n) => {
                    (t._pendingValue = n),
                      (t._pendingChange = !0),
                      (t._pendingDirty = !0),
                      "change" === t.updateOn && km(t, e);
                  });
                })(s, i),
                (function (t, e) {
                  t.registerOnChange((t, n) => {
                    e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t);
                  });
                })(s, i),
                (function (t, e) {
                  e.valueAccessor.registerOnTouched(() => {
                    (t._pendingTouched = !0),
                      "blur" === t.updateOn && t._pendingChange && km(t, e),
                      "submit" !== t.updateOn && t.markAsTouched();
                  });
                })(s, i),
                i.valueAccessor.setDisabledState &&
                  s.registerOnDisabledChange((t) => {
                    i.valueAccessor.setDisabledState(t);
                  }),
                i._rawValidators.forEach((t) => {
                  t.registerOnValidatorChange &&
                    t.registerOnValidatorChange(() =>
                      s.updateValueAndValidity()
                    );
                }),
                i._rawAsyncValidators.forEach((t) => {
                  t.registerOnValidatorChange &&
                    t.registerOnValidatorChange(() =>
                      s.updateValueAndValidity()
                    );
                }),
                this.control.disabled &&
                  this.valueAccessor.setDisabledState &&
                  this.valueAccessor.setDisabledState(!0),
                this.form.updateValueAndValidity({ emitEvent: !1 })),
                (function (t, e) {
                  if (!t.hasOwnProperty("model")) return !1;
                  const n = t.model;
                  return !!n.isFirstChange() || !Ve(e, n.currentValue);
                })(e, this.viewModel) &&
                  ("formControl",
                  (n = t),
                  this,
                  (r = this._ngModelWarningConfig),
                  se() &&
                    "never" !== r &&
                    ((((null !== r && "once" !== r) ||
                      n._ngModelWarningSentOnce) &&
                      ("always" !== r || this._ngModelWarningSent)) ||
                      (Tm.ngModelWarning("formControl"),
                      (n._ngModelWarningSentOnce = !0),
                      (this._ngModelWarningSent = !0))),
                  this.form.setValue(this.model),
                  (this.viewModel = this.model));
            }
            get path() {
              return [];
            }
            get validator() {
              return Om(this._rawValidators);
            }
            get asyncValidator() {
              return Im(this._rawAsyncValidators);
            }
            get control() {
              return this.form;
            }
            viewToModelUpdate(t) {
              (this.viewModel = t), this.update.emit(t);
            }
            _isControlChanged(t) {
              return t.hasOwnProperty("form");
            }
          }
          return (t._ngModelWarningSentOnce = !1), t;
        })();
      class Wm {}
      class Gm {
        group(t, e = null) {
          const n = this._reduceControls(t);
          let r = null,
            s = null,
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
                  (s = null != e.asyncValidators ? e.asyncValidators : null),
                  (i = null != e.updateOn ? e.updateOn : void 0))
                : ((r = null != e.validator ? e.validator : null),
                  (s = null != e.asyncValidator ? e.asyncValidator : null))),
            new $m(n, { asyncValidators: s, updateOn: i, validators: r })
          );
        }
        control(t, e, n) {
          return new Um(t, e, n);
        }
        array(t, e, n) {
          const r = t.map((t) => this._createControl(t));
          return new Hm(r, e, n);
        }
        _reduceControls(t) {
          const e = {};
          return (
            Object.keys(t).forEach((n) => {
              e[n] = this._createControl(t[n]);
            }),
            e
          );
        }
        _createControl(t) {
          return t instanceof Um || t instanceof $m || t instanceof Hm
            ? t
            : Array.isArray(t)
            ? this.control(
                t[0],
                t.length > 1 ? t[1] : null,
                t.length > 2 ? t[2] : null
              )
            : this.control(t);
        }
      }
      class qm {
        static withConfig(t) {
          return {
            ngModule: qm,
            providers: [
              { provide: zm, useValue: t.warnOnNgModelWithFormControl },
            ],
          };
        }
      }
      class Zm {
        constructor() {
          this.citiesControls = new Hm(
            ["Ankara", "Moscow", "Munich", "Paris", "Washington"].map(
              (t) => new Um(t)
            )
          );
        }
      }
      var Qm = Zn({ encapsulation: 0, styles: [[""]], data: {} });
      function Ym(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            Li(
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
                    (r = !1 !== Wr(t, 2)._handleInput(n.target.value) && r),
                  "blur" === e && (r = !1 !== Wr(t, 2).onTouched() && r),
                  "compositionstart" === e &&
                    (r = !1 !== Wr(t, 2)._compositionStart() && r),
                  "compositionend" === e &&
                    (r = !1 !== Wr(t, 2)._compositionEnd(n.target.value) && r),
                  r
                );
              },
              null,
              null
            )),
            ss(2, 16384, null, 0, cm, [on, tn, [2, um]], null, null),
            os(
              1024,
              null,
              am,
              function (t) {
                return [t];
              },
              [cm]
            ),
            ss(
              4,
              540672,
              null,
              0,
              Bm,
              [
                [8, null],
                [8, null],
                [6, am],
                [2, zm],
              ],
              { form: [0, "form"] },
              null
            ),
            os(2048, null, pm, null, [Bm]),
            ss(6, 16384, null, 0, gm, [[4, pm]], null, null),
          ],
          function (t, e) {
            t(e, 4, 0, e.context.$implicit);
          },
          function (t, e) {
            t(
              e,
              1,
              0,
              Wr(e, 6).ngClassUntouched,
              Wr(e, 6).ngClassTouched,
              Wr(e, 6).ngClassPristine,
              Wr(e, 6).ngClassDirty,
              Wr(e, 6).ngClassValid,
              Wr(e, 6).ngClassInvalid,
              Wr(e, 6).ngClassPending
            );
          }
        );
      }
      function Km(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["Sortable Array"])),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            (t()(), Qi(-1, null, ["The source code"])),
            (t()(),
            Li(6, 0, null, null, 4, "p", [], null, null, null, null, null)),
            (t()(),
            Qi(-1, null, [
              " Most of the time one wants to sort something more than just data. Complex forms with ",
            ])),
            (t()(),
            Li(8, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["FormArray"])),
            (t()(), Qi(-1, null, [" controls are also supported.\n"])),
            (t()(),
            Li(11, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (t()(),
            Qi(-1, null, ["Try to change the text and reorder the inputs"])),
            (t()(),
            Li(
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
            ss(
              14,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              { sortablejs: [0, "sortablejs"] },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, Ym)),
            ss(
              16,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["The actual value of the array"])),
            (t()(),
            Li(
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
            (t()(), Qi(20, null, [" > ", "\n"])),
            is(0, Il, []),
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
              Wn(e, 20, 0, Wr(e, 21).transform(n.citiesControls.value))
            );
          }
        );
      }
      function Xm(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
              Km,
              Qm
            )),
            ss(1, 49152, null, 0, Zm, [], null, null),
          ],
          null,
          null
        );
      }
      var Jm = Mr("app-sortable-form-array", Zm, Xm, {}, {}, []);
      class tv {
        constructor() {
          (this.draggableItems = [
            { draggable: !0, text: "1" },
            { draggable: !0, text: "2" },
            { draggable: !1, text: "3" },
            { draggable: !0, text: "4" },
            { draggable: !0, text: "5" },
          ]),
            (this.eventItems = ["1", "2", "3", "4", "5"]),
            (this.eventUpdateCounter = 0),
            (this.scrollableItems = Array.from({ length: 30 }).map(
              (t, e) => e + 1
            )),
            (this.draggableOptions = { draggable: ".draggable" }),
            (this.eventOptions = { onUpdate: () => this.eventUpdateCounter++ }),
            (this.scrollableOptions = { scroll: !0, scrollSensitivity: 100 });
        }
      }
      var ev = Zn({ encapsulation: 0, styles: [[""]], data: {} });
      function nv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, [" Element ", " "])),
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
      function rv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, [" Element ", " "])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function sv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, [" Element ", " "])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function iv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["Custom options"])),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            (t()(), Qi(-1, null, ["The source code"])),
            (t()(),
            Qi(-1, null, [
              " This example shows how the various options could be used in order to configure ",
            ])),
            (t()(),
            Li(7, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["Sortablejs"])),
            (t()(), Qi(-1, null, [". "])),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["Disabled options"])),
            (t()(),
            Li(
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
            ss(
              13,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, nv)),
            ss(
              15,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["and the actual model is"])),
            (t()(),
            Li(
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
            (t()(), Qi(19, null, [" > ", "\n"])),
            is(0, Il, []),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["Events"])),
            (t()(),
            Li(
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
            Qi(-1, null, [
              " Binding to the events is easy. Any even could be attached as a property of ",
            ])),
            (t()(),
            Li(25, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["Sortablejs"])),
            (t()(), Qi(-1, null, [". The example below binds to the "])),
            (t()(),
            Li(28, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["onUpdate"])),
            (t()(),
            Qi(-1, null, [
              " event. Drag the items and track the amount of updates.\n",
            ])),
            (t()(),
            Li(
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
            (t()(), Qi(32, null, [" > Updated ", " times\n"])),
            (t()(),
            Li(
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
            ss(
              34,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, rv)),
            ss(
              36,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, [" Hint: for the "])),
            (t()(),
            Li(39, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["FormArray"])),
            (t()(), Qi(-1, null, [" using "])),
            (t()(),
            Li(42, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["onUpdate"])),
            (t()(), Qi(-1, null, [" is kinda overhead because the "])),
            (t()(),
            Li(45, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["FormArray.valueChanges"])),
            (t()(), Qi(-1, null, [" provides an event on every change.\n"])),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["Autoscroll with fixed navbar"])),
            (t()(),
            Li(50, 0, null, null, 4, "p", [], null, null, null, null, null)),
            (t()(),
            Qi(-1, null, [" Normally the scrolling that is performed by "])),
            (t()(),
            Li(52, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["Sortablejs"])),
            (t()(),
            Qi(-1, null, [
              " is working fine. However with a fixed navbar it may cause problems.\n",
            ])),
            (t()(),
            Li(55, 0, null, null, 4, "p", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, [" Setting the "])),
            (t()(),
            Li(57, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["scrollSensitivity"])),
            (t()(),
            Qi(-1, null, [
              " to the proper value will solve the problem. Try it on the long list below\n",
            ])),
            (t()(),
            Li(
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
            ss(
              61,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, sv)),
            ss(
              63,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
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
            t(e, 19, 0, Wn(e, 19, 0, Wr(e, 20).transform(n.draggableItems))),
              t(e, 32, 0, n.eventUpdateCounter);
          }
        );
      }
      function ov(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
              iv,
              ev
            )),
            ss(1, 49152, null, 0, tv, [], null, null),
          ],
          null,
          null
        );
      }
      var lv = Mr("app-sortable-with-options", tv, ov, {}, {}, []);
      class av {
        constructor() {
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
        }
      }
      var uv = Zn({
        encapsulation: 0,
        styles: [
          [
            ".sortable[_ngcontent-%COMP%]{background:#eee;border-radius:.25rem;min-height:40px}",
          ],
        ],
        data: {},
      });
      function cv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function hv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function dv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function pv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function fv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function gv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function mv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function vv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function _v(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["Connecting multiple sortable lists"])),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            (t()(), Qi(-1, null, ["The source code"])),
            (t()(), Qi(-1, null, [" This shows how the "])),
            (t()(),
            Li(7, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["sortable"])),
            (t()(),
            Qi(-1, null, [
              " lists can be connected together. Pay attention to the ",
            ])),
            (t()(),
            Li(10, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["sortable"])),
            (t()(), Qi(-1, null, [" CSS class\n(gives a "])),
            (t()(),
            Li(13, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["min-height"])),
            (t()(),
            Qi(-1, null, [
              ") that does not allow lists to become invisible when all items are gone ",
            ])),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["Transfer between lists"])),
            (t()(),
            Li(18, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (t()(),
            Qi(-1, null, [
              " These lists are connected together. You can drag / drop elements across the lists.\n",
            ])),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            ss(
              23,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, cv)),
            ss(
              25,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            Li(
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
            ss(
              28,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, hv)),
            ss(
              30,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["and the actual state is"])),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            (t()(), Qi(36, null, ["> ", ""])),
            is(0, Il, []),
            (t()(),
            Li(
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
            Li(
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
            (t()(), Qi(40, null, ["> ", ""])),
            is(0, Il, []),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["Clone items"])),
            (t()(),
            Li(44, 0, null, null, 1, "p", [], null, null, null, null, null)),
            (t()(),
            Qi(-1, null, [
              "The list 1 is a clone factory and list 2 can be its target.",
            ])),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            ss(
              49,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, dv)),
            ss(
              51,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            Li(
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
            ss(
              54,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, pv)),
            ss(
              56,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["and the actual state is"])),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            (t()(), Qi(62, null, ["> ", ""])),
            is(0, Il, []),
            (t()(),
            Li(
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
            Li(
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
            (t()(), Qi(66, null, ["> ", ""])),
            is(0, Il, []),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["Super complicated example"])),
            (t()(),
            Li(70, 0, null, null, 7, "p", [], null, null, null, null, null)),
            (t()(),
            Qi(-1, null, [
              " These lists are connected together. You can drag / drop elements across the lists. Pay attention to the ",
            ])),
            (t()(),
            Li(72, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["sortable"])),
            (t()(), Qi(-1, null, [" CSS class (gives a "])),
            (t()(),
            Li(75, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["min-height"])),
            (t()(),
            Qi(-1, null, [
              ") that does not allow list to become invisible when all items are gone\n",
            ])),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            (t()(), Qi(-1, null, ["1. This list cannot accept items"])),
            (t()(),
            Li(
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
            ss(
              83,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, fv)),
            ss(
              85,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            Li(
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
            (t()(), Qi(-1, null, ["2. This is a "])),
            (t()(),
            Li(89, 0, null, null, 1, "em", [], null, null, null, null, null)),
            (t()(), Qi(-1, null, ["normal"])),
            (t()(), Qi(-1, null, [" list"])),
            (t()(),
            Li(
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
            ss(
              93,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, gv)),
            ss(
              95,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            Li(
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
            (t()(), Qi(-1, null, ["3. This list clones its children"])),
            (t()(),
            Li(
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
            ss(
              100,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, mv)),
            ss(
              102,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            Li(
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
            (t()(), Qi(-1, null, ["4. Only #1 can put here"])),
            (t()(),
            Li(
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
            ss(
              107,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, vv)),
            ss(
              109,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
              { ngForOf: [0, "ngForOf"] },
              null
            ),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["and the actual state is"])),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            (t()(), Qi(115, null, ["> ", ""])),
            is(0, Il, []),
            (t()(),
            Li(
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
            Li(
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
            (t()(), Qi(119, null, ["> ", ""])),
            is(0, Il, []),
            (t()(),
            Li(
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
            Li(
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
            (t()(), Qi(123, null, ["> ", ""])),
            is(0, Il, []),
            (t()(),
            Li(
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
            Li(
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
            (t()(), Qi(127, null, ["> ", ""])),
            is(0, Il, []),
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
            t(e, 36, 0, Wn(e, 36, 0, Wr(e, 37).transform(n.normalList1))),
              t(e, 40, 0, Wn(e, 40, 0, Wr(e, 41).transform(n.normalList2))),
              t(e, 62, 0, Wn(e, 62, 0, Wr(e, 63).transform(n.cloneList1))),
              t(e, 66, 0, Wn(e, 66, 0, Wr(e, 67).transform(n.cloneList2))),
              t(e, 115, 0, Wn(e, 115, 0, Wr(e, 116).transform(n.list1))),
              t(e, 119, 0, Wn(e, 119, 0, Wr(e, 120).transform(n.list2))),
              t(e, 123, 0, Wn(e, 123, 0, Wr(e, 124).transform(n.list3))),
              t(e, 127, 0, Wn(e, 127, 0, Wr(e, 128).transform(n.list4)));
          }
        );
      }
      function bv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
              _v,
              uv
            )),
            ss(1, 49152, null, 0, av, [], null, null),
          ],
          null,
          null
        );
      }
      var wv = Mr("app-multiple-lists", av, bv, {}, {}, []);
      class yv {
        constructor() {
          this.options = { group: "test" };
        }
      }
      var Cv = Zn({ encapsulation: 0, styles: [[""]], data: {} });
      function Ev(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            (t()(), Qi(1, null, ["Element ", ""])),
          ],
          null,
          function (t, e) {
            t(e, 1, 0, e.context.$implicit);
          }
        );
      }
      function Sv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            ss(
              1,
              737280,
              null,
              0,
              Qg,
              [[2, Wg], Zg, tn, Qs, on],
              {
                sortablejs: [0, "sortablejs"],
                sortablejsOptions: [1, "sortablejsOptions"],
              },
              null
            ),
            (t()(), ji(16777216, null, null, 1, null, Ev)),
            ss(
              3,
              278528,
              null,
              0,
              xl,
              [On, kn, wn],
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
      class xv {
        constructor() {
          (this.list1 = ["1", "2", "3", "4", "5"]),
            (this.list2 = ["6", "7", "8", "9", "10"]);
        }
      }
      var Tv = Zn({ encapsulation: 0, styles: [[""]], data: {} });
      function kv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
            (t()(),
            Qi(-1, null, [
              "Connecting multiple sortable lists in different components",
            ])),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
              Sv,
              Cv
            )),
            ss(5, 49152, null, 0, yv, [], { list: [0, "list"] }, null),
            (t()(),
            Li(
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
            Li(
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
              Sv,
              Cv
            )),
            ss(8, 49152, null, 0, yv, [], { list: [0, "list"] }, null),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, ["and the actual state is"])),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            (t()(), Qi(14, null, ["> ", ""])),
            is(0, Il, []),
            (t()(),
            Li(
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
            Li(
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
            (t()(), Qi(18, null, ["> ", ""])),
            is(0, Il, []),
          ],
          function (t, e) {
            var n = e.component;
            t(e, 5, 0, n.list1), t(e, 8, 0, n.list2);
          },
          function (t, e) {
            var n = e.component;
            t(e, 14, 0, Wn(e, 14, 0, Wr(e, 15).transform(n.list1))),
              t(e, 18, 0, Wn(e, 18, 0, Wr(e, 19).transform(n.list2)));
          }
        );
      }
      function Av(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
              kv,
              Tv
            )),
            ss(1, 49152, null, 0, xv, [], null, null),
          ],
          null,
          null
        );
      }
      var Ov = Mr("app-cross-components-multiple-lists", xv, Av, {}, {}, []),
        Iv = Zn({ encapsulation: 0, styles: [[""]], data: {} });
      function Rv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            Li(
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
                        Wr(t, 2).onClick(
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
            ss(
              2,
              671744,
              [[10, 4]],
              0,
              dd,
              [cd, Jc, hl],
              { routerLink: [0, "routerLink"] },
              null
            ),
            ss(
              3,
              1720320,
              null,
              2,
              fd,
              [cd, tn, on, [2, hd], [2, dd]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            zi(603979776, 9, { links: 1 }),
            zi(603979776, 10, { linksWithHrefs: 1 }),
            (t()(), Qi(-1, null, [" Cross-component multiple lists "])),
          ],
          function (t, e) {
            t(e, 2, 0, "tests/cross-components-multiple-list"),
              t(e, 3, 0, "active");
          },
          function (t, e) {
            t(e, 1, 0, Wr(e, 2).target, Wr(e, 2).href);
          }
        );
      }
      function Nv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            os(512, null, Up, Up, []),
            ss(2, 212992, null, 0, Hp, [tn, on, On, Yd, Fp, Up], null, null),
            (t()(),
            Li(
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
                return "click" === e && (r = !1 !== Wr(t, 4).onClick() && r), r;
              },
              null,
              null
            )),
            ss(4, 147456, null, 0, Bp, [Cn, Hp, tn, on, Up], null, null),
            (t()(), Qi(-1, null, ["Test cases"])),
            (t()(), ji(16777216, null, null, 1, null, Rv)),
            ss(7, 16384, null, 0, zp, [Up, On, kn], null, null),
            (t()(), ji(0, null, null, 0)),
          ],
          function (t, e) {
            t(e, 2, 0);
          },
          function (t, e) {
            t(
              e,
              0,
              0,
              Wr(e, 2).dropup,
              Wr(e, 2).isOpen,
              Wr(e, 2).isOpen && Wr(e, 2).isBs4
            ),
              t(e, 3, 0, !0, Wr(e, 4).isDisabled, Wr(e, 4).isOpen);
          }
        );
      }
      function Dv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            (t()(), Qi(-1, null, [" + "])),
            (t()(),
            Li(
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
            (t()(), Qi(-1, null, [" = ngx-sortablejs "])),
            (t()(),
            Li(
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
                  s = t.component;
                return (
                  "click" === e &&
                    (r = 0 != (s.navbarCollapsed = !s.navbarCollapsed) && r),
                  r
                );
              },
              null,
              null
            )),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            Li(
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
            ss(
              11,
              1720320,
              null,
              2,
              fd,
              [cd, tn, on, [2, hd], [2, dd]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            zi(603979776, 1, { links: 1 }),
            zi(603979776, 2, { linksWithHrefs: 1 }),
            (t()(),
            Li(
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
                        Wr(t, 15).onClick(
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
            ss(
              15,
              671744,
              [[2, 4]],
              0,
              dd,
              [cd, Jc, hl],
              { routerLink: [0, "routerLink"] },
              null
            ),
            (t()(), Qi(-1, null, ["Simple sortable"])),
            (t()(),
            Li(
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
            ss(
              18,
              1720320,
              null,
              2,
              fd,
              [cd, tn, on, [2, hd], [2, dd]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            zi(603979776, 3, { links: 1 }),
            zi(603979776, 4, { linksWithHrefs: 1 }),
            (t()(),
            Li(
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
                        Wr(t, 22).onClick(
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
            ss(
              22,
              671744,
              [[4, 4]],
              0,
              dd,
              [cd, Jc, hl],
              { routerLink: [0, "routerLink"] },
              null
            ),
            (t()(), Qi(-1, null, ["FormArray"])),
            (t()(),
            Li(
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
            ss(
              25,
              1720320,
              null,
              2,
              fd,
              [cd, tn, on, [2, hd], [2, dd]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            zi(603979776, 5, { links: 1 }),
            zi(603979776, 6, { linksWithHrefs: 1 }),
            (t()(),
            Li(
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
                        Wr(t, 29).onClick(
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
            ss(
              29,
              671744,
              [[6, 4]],
              0,
              dd,
              [cd, Jc, hl],
              { routerLink: [0, "routerLink"] },
              null
            ),
            (t()(), Qi(-1, null, ["Custom options"])),
            (t()(),
            Li(
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
            ss(
              32,
              1720320,
              null,
              2,
              fd,
              [cd, tn, on, [2, hd], [2, dd]],
              { routerLinkActive: [0, "routerLinkActive"] },
              null
            ),
            zi(603979776, 7, { links: 1 }),
            zi(603979776, 8, { linksWithHrefs: 1 }),
            (t()(),
            Li(
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
                        Wr(t, 36).onClick(
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
            ss(
              36,
              671744,
              [[8, 4]],
              0,
              dd,
              [cd, Jc, hl],
              { routerLink: [0, "routerLink"] },
              null
            ),
            (t()(), Qi(-1, null, ["Multiple lists"])),
            (t()(), ji(16777216, null, null, 1, null, Nv)),
            ss(39, 16384, null, 0, kl, [On, kn], { ngIf: [0, "ngIf"] }, null),
            (t()(),
            Li(
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
            Li(
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
            Li(
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
            (t()(), Qi(-1, null, ["Github"])),
            (t()(),
            Li(
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
            Li(
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
            ss(
              46,
              212992,
              null,
              0,
              vd,
              [md, On, Ze, [8, null], Cn],
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
              t(e, 14, 0, Wr(e, 15).target, Wr(e, 15).href),
              t(e, 21, 0, Wr(e, 22).target, Wr(e, 22).href),
              t(e, 28, 0, Wr(e, 29).target, Wr(e, 29).href),
              t(e, 35, 0, Wr(e, 36).target, Wr(e, 36).href);
          }
        );
      }
      function Mv(t) {
        return Xi(
          0,
          [
            (t()(),
            Li(0, 0, null, null, 1, "app-root", [], null, null, null, Dv, Iv)),
            ss(1, 49152, null, 0, al, [], null, null),
          ],
          null,
          null
        );
      }
      var Pv = Mr("app-root", al, Mv, {}, {}, []);
      class Vv {}
      class jv {}
      var Lv = il(ll, [al], function (t) {
        return (function (t) {
          const e = {},
            n = [];
          let r = !1;
          for (let s = 0; s < t.length; s++) {
            const i = t[s];
            i.token === He && !0 === i.value && (r = !0),
              1073741824 & i.flags && n.push(i.token),
              (i.index = s),
              (e[Bn(i.token)] = i);
          }
          return {
            factory: null,
            providersByKey: e,
            providers: t,
            modules: n,
            isRoot: r,
          };
        })([
          xr(512, Ze, Qe, [[8, [Hd, Qp, om, Jm, lv, wv, Ov, Pv]], [3, Ze], Ke]),
          xr(5120, Ri, Mi, [[3, Ri]]),
          xr(4608, Cl, El, [Ri, [2, yl]]),
          xr(5120, ys, Pi, [Qs]),
          xr(5120, ks, As, []),
          xr(5120, wn, Ni, []),
          xr(5120, yn, Di, []),
          xr(4608, Mu, Pu, [Nl]),
          xr(6144, ke, null, [Mu]),
          xr(4608, ku, Ou, []),
          xr(
            5120,
            Qa,
            function (t, e, n, r, s, i, o, l) {
              return [new xu(t, e, n), new Du(r), new Iu(s, i, o, l)];
            },
            [Nl, Qs, Rs, Nl, Nl, ku, Ds, [2, Au]]
          ),
          xr(4608, Ya, Ya, [Qa, Qs]),
          xr(135680, Ja, Ja, [Nl]),
          xr(4608, ou, ou, [Ya, Ja, ks]),
          xr(6144, rn, null, [ou]),
          xr(6144, Xa, null, [Ja]),
          xr(4608, ni, ni, [Qs]),
          xr(4608, Gm, Gm, []),
          xr(4608, Sm, Sm, []),
          xr(5120, Jc, Md, [cd]),
          xr(4608, yd, yd, []),
          xr(6144, bd, null, [yd]),
          xr(135680, Cd, Cd, [cd, Ss, Fs, Nt, bd]),
          xr(4608, wd, wd, []),
          xr(5120, Ed, Od, [cd, Pl, Sd]),
          xr(5120, Ld, jd, [Pd]),
          xr(
            5120,
            Ns,
            function (t) {
              return [t];
            },
            [Ld]
          ),
          xr(4608, jp, jp, [rn, Rs]),
          xr(4608, Yd, Yd, [Ze, Qs, Nt, jp, gi]),
          xr(4608, Up, Up, []),
          xr(1073742336, Rl, Rl, []),
          xr(1024, ee, zu, []),
          xr(
            1024,
            ci,
            function () {
              return [kd()];
            },
            []
          ),
          xr(512, Pd, Pd, [Nt]),
          xr(
            1024,
            xs,
            function (t, e) {
              return [
                ((n = t),
                Ga("probe", Za),
                Ga(
                  "coreTokens",
                  Object.assign(
                    {},
                    qa,
                    (n || []).reduce((t, e) => ((t[e.name] = e.token), t), {})
                  )
                ),
                () => Za),
                Vd(e),
              ];
              var n;
            },
            [[2, ci], Pd]
          ),
          xr(512, Ts, Ts, [[2, xs]]),
          xr(131584, gi, gi, [Qs, Ds, Nt, ee, Ze, Ts]),
          xr(1073742336, Vi, Vi, [gi]),
          xr(1073742336, Bu, Bu, [[3, Bu]]),
          xr(1024, xd, Rd, [[3, cd]]),
          xr(512, Rc, Nc, []),
          xr(512, md, md, []),
          xr(256, Sd, {}, []),
          xr(1024, hl, Id, [ul, [2, dl], Sd]),
          xr(512, pl, pl, [hl, ul]),
          xr(512, Fs, Fs, []),
          xr(512, Ss, Ci, [Fs, [2, wi]]),
          xr(
            1024,
            rd,
            function () {
              return [
                [
                  { path: "", pathMatch: "full", redirectTo: "sortable-array" },
                  { path: "sortable-array", component: Kg },
                  { path: "sortable-form-array", component: Zm },
                  { path: "custom-options", component: tv },
                  { path: "multiple-lists", component: av },
                  {
                    path: "tests/cross-components-multiple-list",
                    component: xv,
                  },
                ],
              ];
            },
            []
          ),
          xr(1024, cd, Dd, [
            gi,
            Rc,
            md,
            pl,
            Nt,
            Ss,
            Fs,
            rd,
            Sd,
            [2, id],
            [2, ed],
          ]),
          xr(1073742336, Ad, Ad, [
            [2, xd],
            [2, cd],
          ]),
          xr(1073742336, Yg, Yg, []),
          xr(1073742336, Wp, Wp, []),
          xr(1073742336, Wm, Wm, []),
          xr(1073742336, qm, qm, []),
          xr(1073742336, Vv, Vv, []),
          xr(1073742336, jv, jv, []),
          xr(1073742336, ll, ll, []),
          xr(256, He, !0, []),
          xr(256, Wg, { animation: 200 }, []),
          xr(256, Fp, { autoClose: !0, insideClick: !1 }, []),
        ]);
      });
      (function () {
        if (re)
          throw new Error("Cannot enable prod mode after platform setup.");
        ne = !1;
      })(),
        Hu()
          .bootstrapModuleFactory(Lv)
          .catch((t) => console.error(t));
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
