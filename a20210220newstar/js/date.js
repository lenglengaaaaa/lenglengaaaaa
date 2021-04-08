var fillNews = function(e) {
  "use strict";

  function t(e, t) {
    return e(t = {
      exports: {}
    }, t.exports), t.exports
  }
  var h = t(function(e) {
    var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = t)
  }),
    y = t(function(e) {
      var t = e.exports = {
        version: "2.6.10"
      };
      "number" == typeof __e && (__e = t)
    }),
    o = (y.version, function(e) {
      return "object" == typeof e ? null !== e : "function" == typeof e
    }),
    _ = function(e) {
      if (!o(e)) throw TypeError(e + " is not an object!");
      return e
    },
    s = function(e) {
      try {
        return !!e()
      } catch (t) {
        return !0
      }
    },
    f = !s(function() {
      return 7 != Object.defineProperty({}, "a", {
        get: function() {
          return 7
        }
      }).a
    }),
    n = h.document,
    r = o(n) && o(n.createElement),
    i = function(e) {
      return r ? n.createElement(e) : {}
    },
    a = !f && !s(function() {
      return 7 != Object.defineProperty(i("div"), "a", {
        get: function() {
          return 7
        }
      }).a
    }),
    p = function(e, t) {
      if (!o(e)) return e;
      var n, r;
      if (t && "function" == typeof(n = e.toString) && !o(r = n.call(e))) return r;
      if ("function" == typeof(n = e.valueOf) && !o(r = n.call(e))) return r;
      if (!t && "function" == typeof(n = e.toString) && !o(r = n.call(e))) return r;
      throw TypeError("Can't convert object to primitive value")
    },
    c = Object.defineProperty,
    u = {
      f: f ? Object.defineProperty : function(e, t, n) {
        if (_(e), t = p(t, !0), _(n), a) try {
          return c(e, t, n)
        } catch (r) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
      }
    },
    w = function(e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
      }
    },
    b = f ?
  function(e, t, n) {
    return u.f(e, t, w(1, n))
  } : function(e, t, n) {
    return e[t] = n, e
  }, l = {}.hasOwnProperty, d = function(e, t) {
    return l.call(e, t)
  }, g = 0, v = Math.random(), m = function(e) {
    return "Symbol(".concat(e === undefined ? "" : e, ")_", (++g + v).toString(36))
  }, x = t(function(e) {
    var t = "__core-js_shared__",
      n = h[t] || (h[t] = {});
    (e.exports = function(e, t) {
      return n[e] || (n[e] = t !== undefined ? t : {})
    })("versions", []).push({
      version: y.version,
      mode: "global",
      copyright: "\xa9 2019 Denis Pushkarev (zloirock.ru)"
    })
  }), T = x("native-function-to-string", Function.toString), S = t(function(e) {
    var o = m("src"),
      t = "toString",
      a = ("" + T).split(t);
    y.inspectSource = function(e) {
      return T.call(e)
    }, (e.exports = function(e, t, n, r) {
      var i = "function" == typeof n;
      i && (d(n, "name") || b(n, "name", t)), e[t] !== n && (i && (d(n, o) || b(n, o, e[t] ? "" + e[t] : a.join(String(t)))), e === h ? e[t] = n : r ? e[t] ? e[t] = n : b(e, t, n) : (delete e[t], b(e, t, n)))
    })(Function.prototype, t, function() {
      return "function" == typeof this && this[o] || T.call(this)
    })
  }), E = function(e) {
    if ("function" != typeof e) throw TypeError(e + " is not a function!");
    return e
  }, j = function(r, i, e) {
    if (E(r), i === undefined) return r;
    switch (e) {
    case 1:
      return function(e) {
        return r.call(i, e)
      };
    case 2:
      return function(e, t) {
        return r.call(i, e, t)
      };
    case 3:
      return function(e, t, n) {
        return r.call(i, e, t, n)
      }
    }
    return function() {
      return r.apply(i, arguments)
    }
  }, O = "prototype", I = function(e, t, n) {
    var r, i, o, a, c = e & I.F,
      u = e & I.G,
      l = e & I.S,
      s = e & I.P,
      p = e & I.B,
      f = u ? h : l ? h[t] || (h[t] = {}) : (h[t] || {})[O],
      d = u ? y : y[t] || (y[t] = {}),
      g = d[O] || (d[O] = {});
    for (r in u && (n = t), n) o = ((i = !c && f && f[r] !== undefined) ? f : n)[r], a = p && i ? j(o, h) : s && "function" == typeof o ? j(Function.call, o) : o, f && S(f, r, o, e & I.U), d[r] != o && b(d, r, a), s && g[r] != o && (g[r] = o)
  };
  h.core = y, I.F = 1, I.G = 2, I.S = 4, I.P = 8, I.B = 16, I.W = 32, I.U = 64, I.R = 128;
  var L, k = I,
    N = {}.toString,
    R = function(e) {
      return N.call(e).slice(8, -1)
    },
    M = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
      return "String" == R(e) ? e.split("") : Object(e)
    },
    C = function(e) {
      if (e == undefined) throw TypeError("Can't call method on  " + e);
      return e
    },
    P = function(e) {
      return M(C(e))
    },
    A = Math.ceil,
    D = Math.floor,
    F = function(e) {
      return isNaN(e = +e) ? 0 : (0 < e ? D : A)(e)
    },
    U = Math.min,
    V = function(e) {
      return 0 < e ? U(F(e), 9007199254740991) : 0
    },
    H = Math.max,
    q = Math.min,
    $ = x("keys"),
    z = function(e) {
      return $[e] || ($[e] = m(e))
    },
    W = (L = !1, function(e, t, n) {
      var r, i = P(e),
        o = V(i.length),
        a = function(e, t) {
          return (e = F(e)) < 0 ? H(e + t, 0) : q(e, t)
        }(n, o);
      if (L && t != t) {
        for (; a < o;) if ((r = i[a++]) != r) return !0
      } else for (; a < o; a++) if ((L || a in i) && i[a] === t) return L || a || 0;
      return !L && -1
    }),
    G = z("IE_PROTO"),
    B = function(e, t) {
      var n, r = P(e),
        i = 0,
        o = [];
      for (n in r) n != G && d(r, n) && o.push(n);
      for (; t.length > i;) d(r, n = t[i++]) && (~W(o, n) || o.push(n));
      return o
    },
    J = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
    X = Object.keys ||
  function Pe(e) {
    return B(e, J)
  }, K = {
    f: Object.getOwnPropertySymbols
  }, Y = {
    f: {}.propertyIsEnumerable
  }, Q = function(e) {
    return Object(C(e))
  }, Z = Object.assign, ee = !Z || s(function() {
    var e = {},
      t = {},
      n = Symbol(),
      r = "abcdefghijklmnopqrst";
    return e[n] = 7, r.split("").forEach(function(e) {
      t[e] = e
    }), 7 != Z({}, e)[n] || Object.keys(Z({}, t)).join("") != r
  }) ?
  function(e, t) {
    for (var n = Q(e), r = arguments.length, i = 1, o = K.f, a = Y.f; i < r;) for (var c, u = M(arguments[i++]), l = o ? X(u).concat(o(u)) : X(u), s = l.length, p = 0; p < s;) c = l[p++], f && !a.call(u, c) || (n[c] = u[c]);
    return n
  } : Z;
  k(k.S + k.F, "Object", {
    assign: ee
  });
  var te = Object.getOwnPropertyDescriptor,
    ne = {
      f: f ? te : function(e, t) {
        if (e = P(e), t = p(t, !0), a) try {
          return te(e, t)
        } catch (n) {}
        if (d(e, t)) return w(!Y.f.call(e, t), e[t])
      }
    },
    re = function(e, t) {
      if (_(e), !o(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
    },
    ie = {
      set: Object.setPrototypeOf || ("__proto__" in {} ?
      function(e, n, r) {
        try {
          (r = j(Function.call, ne.f(Object.prototype, "__proto__").set, 2))(e, []), n = !(e instanceof Array)
        } catch (t) {
          n = !0
        }
        return function(e, t) {
          return re(e, t), n ? e.__proto__ = t : r(e, t), e
        }
      }({}, !1) : undefined),
      check: re
    }.set,
    oe = function(e, t, n) {
      var r, i = t.constructor;
      return i !== n && "function" == typeof i && (r = i.prototype) !== n.prototype && o(r) && ie && ie(e, r), e
    },
    ae = J.concat("length", "prototype"),
    ce = {
      f: Object.getOwnPropertyNames ||
      function(e) {
        return B(e, ae)
      }
    },
    ue = "\t\n\x0B\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff",
    le = "[" + ue + "]",
    se = RegExp("^" + le + le + "*"),
    pe = RegExp(le + le + "*$"),
    fe = function(e, t, n) {
      var r = {},
        i = s(function() {
          return !!ue[e]() || "\u200b\x85" != "\u200b\x85" [e]()
        }),
        o = r[e] = i ? t(de) : ue[e];
      n && (r[n] = o), k(k.P + k.F * i, "String", r)
    },
    de = fe.trim = function(e, t) {
      return e = String(C(e)), 1 & t && (e = e.replace(se, "")), 2 & t && (e = e.replace(pe, "")), e
    },
    ge = fe,
    he = f ? Object.defineProperties : function(e, t) {
      _(e);
      for (var n, r = X(t), i = r.length, o = 0; o < i;) u.f(e, n = r[o++], t[n]);
      return e
    },
    ye = h.document,
    ve = ye && ye.documentElement,
    me = z("IE_PROTO"),
    we = function() {},
    be = "prototype",
    xe = function() {
      var e, t = i("iframe"),
        n = J.length;
      for (t.style.display = "none", ve.appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), xe = e.F; n--;) delete xe[be][J[n]];
      return xe()
    },
    Te = Object.create ||
  function(e, t) {
    var n;
    return null !== e ? (we[be] = _(e), n = new we, we[be] = null, n[me] = e) : n = xe(), t === undefined ? n : he(n, t)
  }, Se = ce.f, _e = ne.f, Ee = u.f, je = ge.trim, Oe = "Number", Ie = h[Oe], Le = Ie, ke = Ie.prototype, Ne = R(Te(ke)) == Oe, Re = "trim" in String.prototype, Me = function(e) {
    var t = p(e, !1);
    if ("string" == typeof t && 2 < t.length) {
      var n, r, i, o = (t = Re ? t.trim() : je(t, 3)).charCodeAt(0);
      if (43 === o || 45 === o) {
        if (88 === (n = t.charCodeAt(2)) || 120 === n) return NaN
      } else if (48 === o) {
        switch (t.charCodeAt(1)) {
        case 66:
        case 98:
          r = 2, i = 49;
          break;
        case 79:
        case 111:
          r = 8, i = 55;
          break;
        default:
          return +t
        }
        for (var a, c = t.slice(2), u = 0, l = c.length; u < l; u++) if ((a = c.charCodeAt(u)) < 48 || i < a) return NaN;
        return parseInt(c, r)
      }
    }
    return +t
  };
  if (!Ie(" 0o1") || !Ie("0b1") || Ie("+0x1")) {
    Ie = function(e) {
      var t = arguments.length < 1 ? 0 : e,
        n = this;
      return n instanceof Ie && (Ne ? s(function() {
        ke.valueOf.call(n)
      }) : R(n) != Oe) ? oe(new Le(Me(t)), n, Ie) : Me(t)
    };
    for (var Ce, Pe = f ? Se(Le) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), Ae = 0; Pe.length > Ae; Ae++) d(Le, Ce = Pe[Ae]) && !d(Ie, Ce) && Ee(Ie, Ce, _e(Le, Ce));
    (Ie.prototype = ke).constructor = Ie, S(h, Oe, Ie)
  }
  var De, Fe, Ue = function(c) {
      return function(e, t) {
        var n, r, i = String(C(e)),
          o = F(t),
          a = i.length;
        return o < 0 || a <= o ? c ? "" : undefined : (n = i.charCodeAt(o)) < 55296 || 56319 < n || o + 1 === a || (r = i.charCodeAt(o + 1)) < 56320 || 57343 < r ? c ? i.charAt(o) : n : c ? i.slice(o, o + 2) : r - 56320 + (n - 55296 << 10) + 65536
      }
    },
    Ve = Ue(!0),
    He = function(e, t, n) {
      return t + (n ? Ve(e, t).length : 1)
    },
    qe = t(function(e) {
      var t = x("wks"),
        n = h.Symbol,
        r = "function" == typeof n;
      (e.exports = function(e) {
        return t[e] || (t[e] = r && n[e] || (r ? n : m)("Symbol." + e))
      }).store = t
    }),
    $e = qe("toStringTag"),
    ze = "Arguments" == R(function() {
      return arguments
    }()),
    We = function(e) {
      var t, n, r;
      return e === undefined ? "Undefined" : null === e ? "Null" : "string" == typeof(n = function(e, t) {
        try {
          return e[t]
        } catch (n) {}
      }(t = Object(e), $e)) ? n : ze ? R(t) : "Object" == (r = R(t)) && "function" == typeof t.callee ? "Arguments" : r
    },
    Ge = RegExp.prototype.exec,
    Be = function(e, t) {
      var n = e.exec;
      if ("function" == typeof n) {
        var r = n.call(e, t);
        if ("object" != typeof r) throw new TypeError("RegExp exec method returned something other than an Object or null");
        return r
      }
      if ("RegExp" !== We(e)) throw new TypeError("RegExp#exec called on incompatible receiver");
      return Ge.call(e, t)
    },
    Je = function() {
      var e = _(this),
        t = "";
      return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
    },
    Xe = RegExp.prototype.exec,
    Ke = String.prototype.replace,
    Ye = Xe,
    Qe = "lastIndex",
    Ze = (De = /a/, Fe = /b*/g, Xe.call(De, "a"), Xe.call(Fe, "a"), 0 !== De[Qe] || 0 !== Fe[Qe]),
    et = /()??/.exec("")[1] !== undefined;
  (Ze || et) && (Ye = function(e) {
    var t, n, r, i, o = this;
    return et && (n = new RegExp("^" + o.source + "$(?!\\s)", Je.call(o))), Ze && (t = o[Qe]), r = Xe.call(o, e), Ze && r && (o[Qe] = o.global ? r.index + r[0].length : t), et && r && 1 < r.length && Ke.call(r[0], n, function() {
      for (i = 1; i < arguments.length - 2; i++) arguments[i] === undefined && (r[i] = undefined)
    }), r
  });
  var tt = Ye;
  k({
    target: "RegExp",
    proto: !0,
    forced: tt !== /./.exec
  }, {
    exec: tt
  });
  var nt = qe("species"),
    rt = !s(function() {
      var e = /./;
      return e.exec = function() {
        var e = [];
        return e.groups = {
          a: "7"
        }, e
      }, "7" !== "".replace(e, "$<a>")
    }),
    it = function() {
      var e = /(?:)/,
        t = e.exec;
      e.exec = function() {
        return t.apply(this, arguments)
      };
      var n = "ab".split(e);
      return 2 === n.length && "a" === n[0] && "b" === n[1]
    }(),
    ot = function(n, e, t) {
      var r = qe(n),
        o = !s(function() {
          var e = {};
          return e[r] = function() {
            return 7
          }, 7 != "" [n](e)
        }),
        i = o ? !s(function() {
          var e = !1,
            t = /a/;
          return t.exec = function() {
            return e = !0, null
          }, "split" === n && (t.constructor = {}, t.constructor[nt] = function() {
            return t
          }), t[r](""), !e
        }) : undefined;
      if (!o || !i || "replace" === n && !rt || "split" === n && !it) {
        var a = /./ [r],
          c = t(C, r, "" [n], function(e, t, n, r, i) {
            return t.exec === tt ? o && !i ? {
              done: !0,
              value: a.call(t, n, r)
            } : {
              done: !0,
              value: e.call(n, t, r)
            } : {
              done: !1
            }
          }),
          u = c[0],
          l = c[1];
        S(String.prototype, n, u), b(RegExp.prototype, r, 2 == e ?
        function(e, t) {
          return l.call(e, this, t)
        } : function(e) {
          return l.call(e, this)
        })
      }
    },
    at = Math.max,
    ct = Math.min,
    ut = Math.floor,
    lt = /\$([$&`']|\d\d?|<[^>]*>)/g,
    st = /\$([$&`']|\d\d?)/g;

  function pt(e) {
    var t = typeof e;
    return null != e && ("object" == t || "function" == t)
  }
  ot("replace", 2, function(i, o, x, T) {
    return [function(e, t) {
      var n = i(this),
        r = e == undefined ? undefined : e[o];
      return r !== undefined ? r.call(e, n, t) : x.call(String(n), e, t)
    }, function(e, t) {
      var n = T(x, e, this, t);
      if (n.done) return n.value;
      var r = _(e),
        i = String(this),
        o = "function" == typeof t;
      o || (t = String(t));
      var a = r.global;
      if (a) {
        var c = r.unicode;
        r.lastIndex = 0
      }
      for (var u = [];;) {
        var l = Be(r, i);
        if (null === l) break;
        if (u.push(l), !a) break;
        "" === String(l[0]) && (r.lastIndex = He(i, V(r.lastIndex), c))
      }
      for (var s, p = "", f = 0, d = 0; d < u.length; d++) {
        l = u[d];
        for (var g = String(l[0]), h = at(ct(F(l.index), i.length), 0), y = [], v = 1; v < l.length; v++) y.push((s = l[v]) === undefined ? s : String(s));
        var m = l.groups;
        if (o) {
          var w = [g].concat(y, h, i);
          m !== undefined && w.push(m);
          var b = String(t.apply(undefined, w))
        } else b = S(g, i, h, y, m, t);
        f <= h && (p += i.slice(f, h) + b, f = h + g.length)
      }
      return p + i.slice(f)
    }];

    function S(o, a, c, u, l, e) {
      var s = c + o.length,
        p = u.length,
        t = st;
      return l !== undefined && (l = Q(l), t = lt), x.call(e, t, function(e, t) {
        var n;
        switch (t.charAt(0)) {
        case "$":
          return "$";
        case "&":
          return o;
        case "`":
          return a.slice(0, c);
        case "'":
          return a.slice(s);
        case "<":
          n = l[t.slice(1, -1)];
          break;
        default:
          var r = +t;
          if (0 == r) return e;
          if (p < r) {
            var i = ut(r / 10);
            return 0 === i ? e : i <= p ? u[i - 1] === undefined ? t.charAt(1) : u[i - 1] + t.charAt(1) : e
          }
          n = u[r - 1]
        }
        return n === undefined ? "" : n
      })
    }
  }), ot("match", 1, function(r, i, l, s) {
    return [function(e) {
      var t = r(this),
        n = e == undefined ? undefined : e[i];
      return n !== undefined ? n.call(e, t) : new RegExp(e)[i](String(t))
    }, function(e) {
      var t = s(l, e, this);
      if (t.done) return t.value;
      var n = _(e),
        r = String(this);
      if (!n.global) return Be(n, r);
      for (var i, o = n.unicode, a = [], c = n.lastIndex = 0; null !== (i = Be(n, r));) {
        var u = String(i[0]);
        "" === (a[c] = u) && (n.lastIndex = He(r, V(n.lastIndex), o)), c++
      }
      return 0 === c ? null : a
    }]
  });
  var ft = "object" == typeof global && global && global.Object === Object && global,
    dt = "object" == typeof self && self && self.Object === Object && self,
    gt = ft || dt || Function("return this")(),
    ht = function() {
      return gt.Date.now()
    },
    yt = gt.Symbol,
    vt = Object.prototype,
    mt = vt.hasOwnProperty,
    wt = vt.toString,
    bt = yt ? yt.toStringTag : undefined;
  var xt = Object.prototype.toString;
  var Tt = "[object Null]",
    St = "[object Undefined]",
    _t = yt ? yt.toStringTag : undefined;

  function Et(e) {
    return null == e ? e === undefined ? St : Tt : _t && _t in Object(e) ?
    function a(e) {
      var t = mt.call(e, bt),
        n = e[bt];
      try {
        e[bt] = undefined;
        var r = !0
      } catch (o) {}
      var i = wt.call(e);
      return r && (t ? e[bt] = n : delete e[bt]), i
    }(e) : function t(e) {
      return xt.call(e)
    }(e)
  }
  var jt = "[object Symbol]";

  function Ot(e) {
    return "symbol" == typeof e ||
    function t(e) {
      return null != e && "object" == typeof e
    }(e) && Et(e) == jt
  }
  var It = NaN,
    Lt = /^\s+|\s+$/g,
    kt = /^[-+]0x[0-9a-f]+$/i,
    Nt = /^0b[01]+$/i,
    Rt = /^0o[0-7]+$/i,
    Mt = parseInt;

  function Ct(e) {
    if ("number" == typeof e) return e;
    if (Ot(e)) return It;
    if (pt(e)) {
      var t = "function" == typeof e.valueOf ? e.valueOf() : e;
      e = pt(t) ? t + "" : t
    }
    if ("string" != typeof e) return 0 === e ? e : +e;
    e = e.replace(Lt, "");
    var n = Nt.test(e);
    return n || Rt.test(e) ? Mt(e.slice(2), n ? 2 : 8) : kt.test(e) ? It : +e
  }
  var Pt = "Expected a function",
    At = Math.max,
    Dt = Math.min;

  function Ft(r, i, e) {
    var o, a, c, u, l, s, p = 0,
      f = !1,
      d = !1,
      t = !0;
    if ("function" != typeof r) throw new TypeError(Pt);

    function g(e) {
      var t = o,
        n = a;
      return o = a = undefined, p = e, u = r.apply(n, t)
    }
    function h(e) {
      var t = e - s;
      return s === undefined || i <= t || t < 0 || d && c <= e - p
    }
    function y() {
      var e = ht();
      if (h(e)) return v(e);
      l = setTimeout(y, function n(e) {
        var t = i - (e - s);
        return d ? Dt(t, c - (e - p)) : t
      }(e))
    }
    function v(e) {
      return l = undefined, t && o ? g(e) : (o = a = undefined, u)
    }
    function n() {
      var e = ht(),
        t = h(e);
      if (o = arguments, a = this, s = e, t) {
        if (l === undefined) return function n(e) {
          return p = e, l = setTimeout(y, i), f ? g(e) : u
        }(s);
        if (d) return clearTimeout(l), l = setTimeout(y, i), g(s)
      }
      return l === undefined && (l = setTimeout(y, i)), u
    }
    return i = Ct(i) || 0, pt(e) && (f = !! e.leading, c = (d = "maxWait" in e) ? At(Ct(e.maxWait) || 0, i) : c, t = "trailing" in e ? !! e.trailing : t), n.cancel = function m() {
      l !== undefined && clearTimeout(l), p = 0, o = s = a = l = undefined
    }, n.flush = function w() {
      return l === undefined ? u : v(ht())
    }, n
  }
  var Ut = "Expected a function";

  function Vt(e, t, n) {
    var r = !0,
      i = !0;
    if ("function" != typeof e) throw new TypeError(Ut);
    return pt(n) && (r = "leading" in n ? !! n.leading : r, i = "trailing" in n ? !! n.trailing : i), Ft(e, t, {
      leading: r,
      maxWait: t,
      trailing: i
    })
  }
  k(k.S + k.F * !f, "Object", {
    defineProperty: u.f
  });
  var Ht = !1;
  if (window && "function" == typeof window.addEventListener && "function" == typeof Object.defineProperty) {
    var qt = Object.defineProperty({}, "passive", {
      get: function() {
        return Ht = !0
      }
    });
    window.addEventListener("_", null, qt)
  }
  function $t(e, t, n) {
    e.addEventListener ? e.addEventListener(t, n, !! Ht && {
      passive: !0
    }) : e.attachEvent && e.attachEvent("on" + t, n)
  }
  function zt(e, t, n) {
    e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
  }
  var Wt = function di(e, t) {
      var n, r = "IE",
        i = document.createElement("B"),
        o = document.documentElement;
      return e && (r += " " + e, t && (r = t + " " + r)), i.innerHTML = "\x3c!--[if " + r + ']><b id="iecctest"></b><![endif]--\x3e', o.appendChild(i), n = !! document.getElementById("iecctest"), o.removeChild(i), n
    }(8, "lte"),
    Gt = ["load", "touchend", "touchstart", "touchmove", "scroll", "resize"],
    Bt = ["DOMMouseScroll", "mousewheel", "contextmenu", "DOMContentLoaded", "click"],
    Jt = ["DOMContentLoaded", "mouseenter", "mouseleave", "mousemove"],
    Xt = ["load", "DOMContentLoaded", "resize", "contextmenu", "mousemove", "scroll"];

  function Kt(e, r) {
    for (var t = 0; t < Gt.length; t++) $t(window, Gt[t], c);
    for (var n = 0; n < Bt.length; n++) $t(document, Bt[n], c);
    for (var i = 0; i < Jt.length; i++) $t(document.body, Jt[i], c);
    var o = !1,
      a = Vt(function() {
        o ? (a.cancel(), function i(e) {
          for (var t = 0; t < Gt.length; t++) zt(window, Gt[t], e);
          for (var n = 0; n < Bt.length; n++) zt(document, Bt[n], e);
          for (var r = 0; r < Jt.length; r++) zt(document.body, Jt[r], e)
        }(c)) : !
        function n(e) {
          "function" == typeof jQuery && e instanceof jQuery && (e = e[0]);
          var t = e.getBoundingClientRect();
          return !(1 * t.right < 0 || 1 * t.bottom < 0 || 1 * t.left > (window.innerWidth || document.documentElement.clientWidth) || 1 * t.top > (window.innerHeight || document.documentElement.clientHeight))
        }(r) ||
        function t(e) {
          if (null === e.offsetParent) return !0;
          if ("none" === Yt(e, "display")) return !0;
          if ("string" == typeof Yt(e, "opacity") && "0" === Yt(e, "opacity")) return !0;
          for (; e.parentNode && e.parentNode !== document;) if ("string" == typeof Yt(e = e.parentNode, "opacity") && "0" === Yt(e, "opacity")) return !0;
          return !1
        }(r) || (o = !0, e())
      }, 200);

    function c(e) {
      if (Wt) setTimeout(function() {
        a()
      }, 500);
      else {
        a(e.type);
        for (var t = !0, n = 0; n < Xt.length; n++) e.type === Xt[n] && (t = !1);
        t && setTimeout(function() {
          a("_" + e.type)
        }, 500)
      }
    }
    return c({
      type: "manuallyTrigger"
    }), function() {
      o = !0
    }
  }
  function Yt(e, t) {
    return "undefined" != typeof getComputedStyle ? getComputedStyle(e, null).getPropertyValue(t) : e.currentStyle[t]
  }
  var Qt = qe("unscopables"),
    Zt = Array.prototype;
  Zt[Qt] == undefined && b(Zt, Qt, {});
  var en = function(e) {
      Zt[Qt][e] = !0
    },
    tn = function(e, t) {
      return {
        value: t,
        done: !! e
      }
    },
    nn = {},
    rn = u.f,
    on = qe("toStringTag"),
    an = function(e, t, n) {
      e && !d(e = n ? e : e.prototype, on) && rn(e, on, {
        configurable: !0,
        value: t
      })
    },
    cn = {};
  b(cn, qe("iterator"), function() {
    return this
  });
  var un = z("IE_PROTO"),
    ln = Object.prototype,
    sn = Object.getPrototypeOf ||
  function(e) {
    return e = Q(e), d(e, un) ? e[un] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? ln : null
  }, pn = qe("iterator"), fn = !([].keys && "next" in [].keys()), dn = "values", gn = function() {
    return this
  }, hn = function(e, t, n, r, i, o, a) {
    !
    function(e, t, n) {
      e.prototype = Te(cn, {
        next: w(1, n)
      }), an(e, t + " Iterator")
    }(n, t, r);
    var c, u, l, s = function(e) {
        if (!fn && e in g) return g[e];
        switch (e) {
        case "keys":
        case dn:
          return function() {
            return new n(this, e)
          }
        }
        return function() {
          return new n(this, e)
        }
      },
      p = t + " Iterator",
      f = i == dn,
      d = !1,
      g = e.prototype,
      h = g[pn] || g["@@iterator"] || i && g[i],
      y = h || s(i),
      v = i ? f ? s("entries") : y : undefined,
      m = "Array" == t && g.entries || h;
    if (m && (l = sn(m.call(new e))) !== Object.prototype && l.next && (an(l, p, !0), "function" != typeof l[pn] && b(l, pn, gn)), f && h && h.name !== dn && (d = !0, y = function() {
      return h.call(this)
    }), !fn && !d && g[pn] || b(g, pn, y), nn[t] = y, nn[p] = gn, i) if (c = {
      values: f ? y : s(dn),
      keys: o ? y : s("keys"),
      entries: v
    }, a) for (u in c) u in g || S(g, u, c[u]);
    else k(k.P + k.F * (fn || d), t, c);
    return c
  }, yn = hn(Array, "Array", function(e, t) {
    this._t = P(e), this._i = 0, this._k = t
  }, function() {
    var e = this._t,
      t = this._k,
      n = this._i++;
    return !e || n >= e.length ? (this._t = undefined, tn(1)) : tn(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]])
  }, "values");
  nn.Arguments = nn.Array, en("keys"), en("values"), en("entries");
  for (var vn = qe("iterator"), mn = qe("toStringTag"), wn = nn.Array, bn = {
    CSSRuleList: !0,
    CSSStyleDeclaration: !1,
    CSSValueList: !1,
    ClientRectList: !1,
    DOMRectList: !1,
    DOMStringList: !1,
    DOMTokenList: !0,
    DataTransferItemList: !1,
    FileList: !1,
    HTMLAllCollection: !1,
    HTMLCollection: !1,
    HTMLFormElement: !1,
    HTMLSelectElement: !1,
    MediaList: !0,
    MimeTypeArray: !1,
    NamedNodeMap: !1,
    NodeList: !0,
    PaintRequestList: !1,
    Plugin: !1,
    PluginArray: !1,
    SVGLengthList: !1,
    SVGNumberList: !1,
    SVGPathSegList: !1,
    SVGPointList: !1,
    SVGStringList: !1,
    SVGTransformList: !1,
    SourceBufferList: !1,
    StyleSheetList: !0,
    TextTrackCueList: !1,
    TextTrackList: !1,
    TouchList: !1
  }, xn = X(bn), Tn = 0; Tn < xn.length; Tn++) {
    var Sn, _n = xn[Tn],
      En = bn[_n],
      jn = h[_n],
      On = jn && jn.prototype;
    if (On && (On[vn] || b(On, vn, wn), On[mn] || b(On, mn, _n), nn[_n] = wn, En)) for (Sn in yn) On[Sn] || S(On, Sn, yn[Sn], !0)
  }
  var In = {};
  In[qe("toStringTag")] = "z", In + "" != "[object z]" && S(Object.prototype, "toString", function N() {
    return "[object " + We(this) + "]"
  }, !0);
  var Ln = Ue(!0);
  hn(String, "String", function(e) {
    this._t = String(e), this._i = 0
  }, function() {
    var e, t = this._t,
      n = this._i;
    return n >= t.length ? {
      value: undefined,
      done: !0
    } : (e = Ln(t, n), this._i += e.length, {
      value: e,
      done: !1
    })
  });
  var kn = Array.isArray ||
  function Fr(e) {
    return "Array" == R(e)
  }, Nn = qe("species"), Rn = function(e, t) {
    return new(function(e) {
      var t;
      return kn(e) && ("function" != typeof(t = e.constructor) || t !== Array && !kn(t.prototype) || (t = undefined), o(t) && null === (t = t[Nn]) && (t = undefined)), t === undefined ? Array : t
    }(e))(t)
  }, Mn = function(p, e) {
    var f = 1 == p,
      d = 2 == p,
      g = 3 == p,
      h = 4 == p,
      y = 6 == p,
      v = 5 == p || y,
      m = e || Rn;
    return function(e, t, n) {
      for (var r, i, o = Q(e), a = M(o), c = j(t, n, 3), u = V(a.length), l = 0, s = f ? m(e, u) : d ? m(e, 0) : undefined; l < u; l++) if ((v || l in a) && (i = c(r = a[l], l, o), p)) if (f) s[l] = i;
      else if (i) switch (p) {
      case 3:
        return !0;
      case 5:
        return r;
      case 6:
        return l;
      case 2:
        s.push(r)
      } else if (h) return !1;
      return y ? -1 : g || h ? h : s
    }
  }, Cn = function(e, t) {
    return !!e && s(function() {
      t ? e.call(null, function() {}, 1) : e.call(null)
    })
  }, Pn = Mn(0), An = Cn([].forEach, !0);
  k(k.P + k.F * !An, "Array", {
    forEach: function(e) {
      return Pn(this, e, arguments[1])
    }
  }), ge("trim", function(e) {
    return function() {
      return e(this, 3)
    }
  });
  var Dn = Mn(1);

  function Fn(e) {
    return (Fn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
  }
  function Un(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e
  }
  k(k.P + k.F * !Cn([].map, !0), "Array", {
    map: function(e) {
      return Dn(this, e, arguments[1])
    }
  });
  var Vn = [].lastIndexOf,
    Hn = !! Vn && 1 / [1].lastIndexOf(1, -0) < 0;

  function qn(e) {
    var t = "laypagecss";
    qn.dir = "dir" in qn ? qn.dir : Xn.getpath + "/skin/laypage.css", new Xn(e), qn.dir && !Wn[Gn](t) && Xn.use(qn.dir, t)
  }
  k(k.P + k.F * (Hn || !Cn(Vn)), "Array", {
    lastIndexOf: function(e) {
      if (Hn) return Vn.apply(this, arguments) || 0;
      var t = P(this),
        n = V(t.length),
        r = n - 1;
      for (1 < arguments.length && (r = Math.min(r, F(arguments[1]))), r < 0 && (r = n + r); 0 <= r; r--) if (r in t && t[r] === e) return r || 0;
      return -1
    }
  }), qn.v = "1.3";
  var $n, zn, Wn = document,
    Gn = "getElementById",
    Bn = "getElementsByTagName",
    Jn = 0,
    Xn = function Xn(e) {
      (this.config = e || {}).item = Jn++, this.render(!0)
    };

  function Kn(e) {
    return e instanceof Element || "undefined" != typeof HTMLDocument && e instanceof HTMLDocument
  }
  function Yn(e) {
    var t;
    return Kn(e) ? t = e : "string" == typeof e && (t = document.querySelector(e)), t
  }
  function Qn(e, t, n, r, i) {
    t = t ||
    function() {}, r = r ||
    function() {}, n = n || "";
    var o = document.createElement("script"),
      a = document.head || document.documentElement;
    o.charset = n, o.onload = o.onreadystatechange = function() {
      this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (setTimeout(function() {
        i ? (t(window[i]), window[i] = null) : t()
      }, 0), o.parentNode && o.parentNode.removeChild(o), o = null)
    }, o.onerror = function() {
      "function" == typeof r && r()
    }, o.src = e, a.insertBefore(o, a.firstChild)
  }
  function Zn(e, t, n, r) {
    if (t = t ||
    function() {}, window.XDomainRequest) {
      var i = new XDomainRequest;
      i.open("get", e), i.onload = function() {
        var e = JSON.parse(i.responseText);
        t.call(null, e)
      }, setTimeout(function() {
        i.send()
      }, 0)
    } else {
      var o = new XMLHttpRequest;
      o.open("GET", e, !0), o.onreadystatechange = function() {
        if (4 == o.readyState && 200 == o.status) {
          var e = JSON.parse(o.responseText);
          t.call(null, e)
        }
      }, o.send(null)
    }
  }
  Xn.on = function(e, t, n) {
    return e.attachEvent ? e.attachEvent("on" + t, function() {
      n.call(e, window.even)
    }) : e.addEventListener(t, n, !1), Xn
  }, Xn.getpath = ($n = document.scripts, (zn = $n[$n.length - 1].src).substring(0, zn.lastIndexOf("/") + 1)), Xn.use = function(e, t) {
    var n = Wn.createElement("link");
    n.type = "text/css", n.rel = "stylesheet", n.href = qn.dir, t && (n.id = t), Wn[Bn]("head")[0].appendChild(n), n = null
  }, Xn.prototype.type = function() {
    var e = this.config;
    if ("object" === Fn(e.cont)) return e.cont.length === undefined ? 2 : 3
  }, Xn.prototype.view = function() {
    var e, t, n = this.config,
      r = [],
      i = {};
    if (n.pages = 0 | n.pages, n.curr = 0 | n.curr || 1, n.groups = "groups" in n ? 0 | n.groups : 5, n.first = "first" in n ? n.first : "&#x9996;&#x9875;", n.last = "last" in n ? n.last : "&#x5C3E;&#x9875;", n.prev = "prev" in n ? n.prev : "&#x4E0A;&#x4E00;&#x9875;", n.next = "next" in n ? n.next : "&#x4E0B;&#x4E00;&#x9875;", n.pages <= 1) return "";
    for (n.groups > n.pages && (n.groups = n.pages), i.index = Math.ceil((n.curr + (1 < n.groups && n.groups !== n.pages ? 1 : 0)) / (0 === n.groups ? 1 : n.groups)), 1 < n.curr && n.prev && r.push('<a href="javascript:;" class="laypage_prev" data-page="' + (n.curr - 1) + '">' + n.prev + "</a>"), 1 < i.index && n.first && 0 !== n.groups && r.push('<a href="javascript:;" class="laypage_first" data-page="1"  title="&#x9996;&#x9875;">' + n.first + "</a><span>&#x2026;</span>"), i.poor = Math.floor((n.groups - 1) / 2), i.start = 1 < i.index ? n.curr - i.poor : 1, i.end = 1 < i.index ? (e = n.curr + (n.groups - i.poor - 1)) > n.pages ? n.pages : e : n.groups, i.end - i.start < n.groups - 1 && (i.start = i.end - n.groups + 1); i.start <= i.end; i.start++) i.start === n.curr ? r.push('<span class="laypage_curr" ' + (/^#/.test(n.skin) ? 'style="background-color:' + n.skin + '"' : "") + ">" + i.start + "</span>") : r.push('<a href="javascript:;" class="laypage_number" data-page="' + i.start + '">' + i.start + "</a>");
    return n.pages > n.groups && i.end < n.pages && n.last && 0 !== n.groups && r.push('<span>&#x2026;</span><a href="javascript:;" class="laypage_last" title="&#x5C3E;&#x9875;"  data-page="' + n.pages + '">' + n.last + "</a>"), i.flow = !n.prev && 0 === n.groups, (n.curr !== n.pages && n.next || i.flow) && r.push(i.flow && n.curr === n.pages ? '<span class="page_nomore" title="&#x5DF2;&#x6CA1;&#x6709;&#x66F4;&#x591A;">' + n.next + "</span>" : '<a href="javascript:;" class="laypage_next" data-page="' + (n.curr + 1) + '">' + n.next + "</a>"), '<div name="laypage' + qn.v + '" class="laypage_main laypageskin_' + (n.skin ? (t = n.skin, /^#/.test(t) ? "molv" : t) : "default") + '" id="laypage_' + this.config.item + '">' + r.join("") + (n.skip ? '<span class="laypage_total"><label>&#x5230;&#x7B2C;</label><input type="number" min="1" max="' + n.pages + '" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="laypage_skip"><label>&#x9875;</label><button type="button" class="laypage_btn">&#x786e;&#x5b9a;</button></span>' : "") + "</div>"
  }, Xn.prototype.jump = function(e) {
    if (e) {
      for (var n = this, r = n.config, t = e.children, i = e[Bn]("button")[0], o = e[Bn]("input")[0], a = 0, c = t.length; a < c; a++)"a" === t[a].nodeName.toLowerCase() && Xn.on(t[a], "click", function() {
        var e = 0 | this.getAttribute("data-page");
        r.curr = e, n.render()
      });
      i && Xn.on(i, "click", function() {
        var e = 0 | o.value.replace(/\s|\D/g, "");
        e && e <= r.pages && (r.curr = e, n.render())
      }), o && Xn.on(o, "keyup", function(e) {
        if (13 === e.keyCode) {
          var t = 0 | o.value.replace(/\s|\D/g, "");
          t && t <= r.pages && (r.curr = t, n.render())
        }
      })
    }
  }, Xn.prototype.render = function(e) {
    var t = this.config,
      n = this.type(),
      r = this.view();
    2 === n ? t.cont.innerHTML = r : 3 === n ? t.cont.html(r) : Wn[Gn](t.cont).innerHTML = r, t.jump && t.jump(t, e), this.jump(Wn[Gn]("laypage_" + t.item)), t.hash && !e && (location.hash = "!" + t.hash + "=" + t.curr)
  }, k(k.S, "Array", {
    isArray: kn
  });
  var er, tr = qe("match"),
    nr = function(e) {
      var t;
      return o(e) && ((t = e[tr]) !== undefined ? !! t : "RegExp" == R(e))
    },
    rr = qe("species"),
    ir = u.f,
    or = ce.f,
    ar = h.RegExp,
    cr = ar,
    ur = ar.prototype,
    lr = /a/g,
    sr = /a/g,
    pr = new ar(lr) !== lr;
  if (f && (!pr || s(function() {
    return sr[qe("match")] = !1, ar(lr) != lr || ar(sr) == sr || "/a/i" != ar(lr, "i")
  }))) {
    ar = function(e, t) {
      var n = this instanceof ar,
        r = nr(e),
        i = t === undefined;
      return !n && r && e.constructor === ar && i ? e : oe(pr ? new cr(r && !i ? e.source : e, t) : cr((r = e instanceof ar) ? e.source : e, r && i ? Je.call(e) : t), n ? this : ur, ar)
    };
    for (var fr = function(t) {
        t in ar || ir(ar, t, {
          configurable: !0,
          get: function() {
            return cr[t]
          },
          set: function(e) {
            cr[t] = e
          }
        })
      }, dr = or(cr), gr = 0; dr.length > gr;) fr(dr[gr++]);
    (ur.constructor = ar).prototype = ur, S(h, "RegExp", ar)
  }
  function hr(e, t) {
    for (var n in t) if (Object.prototype.hasOwnProperty.call(t, n)) {
      var r = new RegExp("\\{" + n + "\\}", "g");
      e = e.replace(r, t[n])
    }
    var i = {};
    if (t.sCoverMap) try {
      i = JSON.parse(t.sCoverMap)
    } catch (s) {
      console.log(s)
    }
    i.One && (e = e.replace(/\{sCoverMap\.One\}/g, i.One.Url)), i.Two && (e = e.replace(/\{sCoverMap\.Two\}/g, i.Two.Url)), i.Three && (e = e.replace(/\{sCoverMap\.Three\}/g, i.Three.Url));
    var o = ["One", "Two", "Three", "Four"];
    if (Array.isArray(t.sCoverList)) for (var a = 0; a < t.sCoverList.length; a++) {
      var c = t.sCoverList[a];
      if (c.url) {
        var u = c.url.replace(/^http:/, "https:"),
          l = new RegExp("\\{sCoverMap\\." + o[a] + "\\}", "g");
        e = e.replace(l, u)
      }
    }
    return t.sIdxTime && (e = (e = vr(e, t, "sIdxTime")).replace(/\{sIdxTimeShort\}/g, yr(t.sIdxTime))), t.sCreated && (e = (e = vr(e, t, "sCreated")).replace(/\{sCreatedShort\}/g, yr(t.sCreated))), e
  }
  function yr(e) {
    return e.replace(/[ +].+$/, "").replace(/^\d{4,4}-/, "")
  }
  function vr(e, t, n) {
    var r = t[n].match(/(\d\d\d\d)-(\d\d)-(\d\d)[ +](\d\d):(\d\d):(\d\d)/);
    return e.replace(/\{sIdxTimeYear\}/g, r[1]).replace(/\{sIdxTimeMonth\}/g, r[2]).replace(/\{sIdxTimeDay\}/g, r[3]).replace(/\{sIdxTimeHour\}/g, r[4]).replace(/\{sIdxTimeMinute\}/g, r[5]).replace(/\{sIdxTimeSecond\}/g, r[6])
  }
  er = h["RegExp"], f && er && !er[rr] && u.f(er, rr, {
    configurable: !0,
    get: function() {
      return this
    }
  });
  var mr = qe("species"),
    wr = Math.min,
    br = [].push,
    xr = "split",
    Tr = "length",
    Sr = "lastIndex",
    _r = 4294967295,
    Er = !s(function() {
      RegExp(_r, "y")
    });

  function jr(e, r, i) {
    return e = e.replace(/\{keyword:(([^{}]*(\{[^{}]*\})?[^{}]*)*)\}/g, function() {
      var e = "";
      r = "string" != typeof r || "" === r ? [] : r.split(",");
      for (var t = 0; t < r.length; t++) {
        var n = r[t];
        e += hr(arguments[1], i[n])
      }
      return e
    })
  }
  function Or(e, t) {
    var n = [];
    for (var r in t) t.hasOwnProperty(r) && "undefined" != typeof t[r] && n.push(r + "=" + t[r]);
    return e + "?" + n.join("&")
  }
  ot("split", 2, function(i, o, y, v) {
    var m;
    return m = "c" == "abbc" [xr](/(b)*/)[1] || 4 != "test" [xr](/(?:)/, -1)[Tr] || 2 != "ab" [xr](/(?:ab)*/)[Tr] || 4 != "." [xr](/(.?)(.?)/)[Tr] || 1 < "." [xr](/()()/)[Tr] || "" [xr](/.?/)[Tr] ?
    function(e, t) {
      var n = String(this);
      if (e === undefined && 0 === t) return [];
      if (!nr(e)) return y.call(n, e, t);
      for (var r, i, o, a = [], c = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), u = 0, l = t === undefined ? _r : t >>> 0, s = new RegExp(e.source, c + "g");
      (r = tt.call(s, n)) && !(u < (i = s[Sr]) && (a.push(n.slice(u, r.index)), 1 < r[Tr] && r.index < n[Tr] && br.apply(a, r.slice(1)), o = r[0][Tr], u = i, a[Tr] >= l));) s[Sr] === r.index && s[Sr]++;
      return u === n[Tr] ? !o && s.test("") || a.push("") : a.push(n.slice(u)), a[Tr] > l ? a.slice(0, l) : a
    } : "0" [xr](undefined, 0)[Tr] ?
    function(e, t) {
      return e === undefined && 0 === t ? [] : y.call(this, e, t)
    } : y, [function(e, t) {
      var n = i(this),
        r = e == undefined ? undefined : e[o];
      return r !== undefined ? r.call(e, n, t) : m.call(String(n), e, t)
    }, function(e, t) {
      var n = v(m, e, this, t, m !== y);
      if (n.done) return n.value;
      var r = _(e),
        i = String(this),
        o = function(e, t) {
          var n, r = _(e).constructor;
          return r === undefined || (n = _(r)[mr]) == undefined ? t : E(n)
        }(r, RegExp),
        a = r.unicode,
        c = (r.ignoreCase ? "i" : "") + (r.multiline ? "m" : "") + (r.unicode ? "u" : "") + (Er ? "y" : "g"),
        u = new o(Er ? r : "^(?:" + r.source + ")", c),
        l = t === undefined ? _r : t >>> 0;
      if (0 == l) return [];
      if (0 === i.length) return null === Be(u, i) ? [i] : [];
      for (var s = 0, p = 0, f = []; p < i.length;) {
        u.lastIndex = Er ? p : 0;
        var d, g = Be(u, Er ? i : i.slice(p));
        if (null === g || (d = wr(V(u.lastIndex + (Er ? 0 : p)), i.length)) === s) p = He(i, p, a);
        else {
          if (f.push(i.slice(s, p)), f.length === l) return f;
          for (var h = 1; h <= g.length - 1; h++) if (f.push(g[h]), f.length === l) return f;
          p = s = d
        }
      }
      return f.push(i.slice(s)), f
    }]
  });
  var Ir = "/*!\n laypage\u9ed8\u8ba4\u6837\u5f0f\n*/\n\n.laypage_main{font-size:0; clear:both; color:#666;}\n.laypage_main *{display:inline-block; vertical-align: top; font-size:12px;}\n.laypage_main a{height:26px; line-height:26px; text-decoration:none; color:#666;}\n.laypage_main a, .laypage_main span{margin:0 3px 6px; padding:0 10px;}\n.laypage_main span{height:26px; line-height:26px;}\n.laypage_main input, .laypage_main button{ border:1px solid #ccc; background-color:#fff;}\n.laypage_main input{width:40px; height:26px; line-height:26px; margin:0 5px; padding:0 5px;}\n.laypage_main button{height:28px; line-height:28px; margin-left:5px; padding:0 10px; color:#666;}\n\n/* \u9ed8\u8ba4\u76ae\u80a4 */\n.laypageskin_default a{border:1px solid #ccc; background-color:#fff;}\n.laypageskin_default span{height:28px; line-height:28px; color:#999; }\n.laypageskin_default .laypage_curr{font-weight:700; color:#666;}\n\n/* \u58a8\u7eff */\n.laypageskin_molv a, .laypageskin_molv span{padding:0 12px; border-radius:2px;}\n.laypageskin_molv a{ background-color:#f1eff0; }\n.laypageskin_molv .laypage_curr{background-color:#00AA91; color:#fff;}\n.laypageskin_molv input{height:24px; line-height:24px;}\n.laypageskin_molv button{height:26px; line-height:26px;}\n\n/* \u96c5\u9ed1 */\n.laypageskin_yahei{color:#333}\n.laypageskin_yahei a, .laypageskin_yahei span{padding:0 13px; border-radius:2px; color:#333}\n.laypageskin_yahei .laypage_curr{background-color:#333; color:#fff;}\n\n/* \u4e00\u822c\u7528\u4e8e\u4fe1\u606f\u6d41\u52a0\u8f7d */\n.laypageskin_flow{text-align:center;}\n.laypageskin_flow .page_nomore{color:#999}";
  f && "g" != /./g.flags && u.f(RegExp.prototype, "flags", {
    configurable: !0,
    get: Je
  });
  var Lr = "toString",
    kr = /./ [Lr],
    Nr = function(e) {
      S(RegExp.prototype, Lr, e, !0)
    };
  s(function() {
    return "/a/b" != kr.call({
      source: "a",
      flags: "b"
    })
  }) ? Nr(function N() {
    var e = _(this);
    return "/".concat(e.source, "/", "flags" in e ? e.flags : !f && e instanceof RegExp ? Je.call(e) : undefined)
  }) : kr.name != Lr && Nr(function N() {
    return kr.call(this)
  });
  var Rr = Date.prototype,
    Mr = "Invalid Date",
    Cr = "toString",
    Pr = Rr[Cr],
    Ar = Rr.getTime;
  new Date(NaN) + "" != Mr && S(Rr, Cr, function N() {
    var e = Ar.call(this);
    return e == e ? Pr.call(this) : Mr
  });
  var Dr = setTimeout;

  function Fr(e) {
    return Boolean(e && "undefined" != typeof e.length)
  }
  function Ur() {}
  function Vr(e) {
    if (!(this instanceof Vr)) throw new TypeError("Promises must be constructed via new");
    if ("function" != typeof e) throw new TypeError("not a function");
    this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], Gr(e, this)
  }
  function Hr(r, i) {
    for (; 3 === r._state;) r = r._value;
    0 !== r._state ? (r._handled = !0, Vr._immediateFn(function() {
      var e = 1 === r._state ? i.onFulfilled : i.onRejected;
      if (null !== e) {
        var t;
        try {
          t = e(r._value)
        } catch (n) {
          return void $r(i.promise, n)
        }
        qr(i.promise, t)
      } else(1 === r._state ? qr : $r)(i.promise, r._value)
    })) : r._deferreds.push(i)
  }
  function qr(e, t) {
    try {
      if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
      if (t && ("object" == typeof t || "function" == typeof t)) {
        var n = t.then;
        if (t instanceof Vr) return e._state = 3, e._value = t, void zr(e);
        if ("function" == typeof n) return void Gr(function r(e, t) {
          return function() {
            e.apply(t, arguments)
          }
        }(n, t), e)
      }
      e._state = 1, e._value = t, zr(e)
    } catch (i) {
      $r(e, i)
    }
  }
  function $r(e, t) {
    e._state = 2, e._value = t, zr(e)
  }
  function zr(e) {
    2 === e._state && 0 === e._deferreds.length && Vr._immediateFn(function() {
      e._handled || Vr._unhandledRejectionFn(e._value)
    });
    for (var t = 0, n = e._deferreds.length; t < n; t++) Hr(e, e._deferreds[t]);
    e._deferreds = null
  }
  function Wr(e, t, n) {
    this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
  }
  function Gr(e, t) {
    var n = !1;
    try {
      e(function(e) {
        n || (n = !0, qr(t, e))
      }, function(e) {
        n || (n = !0, $r(t, e))
      })
    } catch (r) {
      if (n) return;
      n = !0, $r(t, r)
    }
  }
  function Br(t) {
    return new Vr(function(r, e) {
      Qn("https://gicp.qq.com/wmp/data/js/v3/WMP_".concat("", "KEYWORDLIST_GW_").concat(t, ".js"), function() {
        if ("undefined" != typeof window.keywordObj && "[object Array]" === Object.prototype.toString.call(window.keywordObj.msg)) {
          for (var e = {}, t = 0; t < window.keywordObj.msg.length; t++) {
            var n = window.keywordObj.msg[t];
            e[n.iWord] = n
          }
          r(e)
        } else console.warn("\u6a21\u677f\u7528\u5230\u4e86\u5173\u952e\u5b57\uff0c\u4f46\u6ca1\u6709\u5728GICP\u5efa\u5173\u952e\u5b57"), r(null)
      }, "UTF-8", function() {
        console.warn("\u6a21\u677f\u7528\u5230\u4e86\u5173\u952e\u5b57\uff0c\u4f46\u6ca1\u6709\u5728GICP\u5efa\u5173\u952e\u5b57"), r(null)
      })
    })
  }
  function Jr(e) {
    return "number" == typeof e ? e += "" : "string" != typeof e && (e = ""), e.trim()
  }
  Vr.prototype["catch"] = function(e) {
    return this.then(null, e)
  }, Vr.prototype.then = function(e, t) {
    var n = new this.constructor(Ur);
    return Hr(this, new Wr(e, t, n)), n
  }, Vr.prototype["finally"] = function gi(t) {
    var n = this.constructor;
    return this.then(function(e) {
      return n.resolve(t()).then(function() {
        return e
      })
    }, function(e) {
      return n.resolve(t()).then(function() {
        return n.reject(e)
      })
    })
  }, Vr.all = function(t) {
    return new Vr(function(i, o) {
      if (!Fr(t)) return o(new TypeError("Promise.all accepts an array"));
      var a = Array.prototype.slice.call(t);
      if (0 === a.length) return i([]);
      var c = a.length;

      function u(t, e) {
        try {
          if (e && ("object" == typeof e || "function" == typeof e)) {
            var n = e.then;
            if ("function" == typeof n) return void n.call(e, function(e) {
              u(t, e)
            }, o)
          }
          a[t] = e, 0 == --c && i(a)
        } catch (r) {
          o(r)
        }
      }
      for (var e = 0; e < a.length; e++) u(e, a[e])
    })
  }, Vr.resolve = function(t) {
    return t && "object" == typeof t && t.constructor === Vr ? t : new Vr(function(e) {
      e(t)
    })
  }, Vr.reject = function(n) {
    return new Vr(function(e, t) {
      t(n)
    })
  }, Vr.race = function(i) {
    return new Vr(function(e, t) {
      if (!Fr(i)) return t(new TypeError("Promise.race accepts an array"));
      for (var n = 0, r = i.length; n < r; n++) Vr.resolve(i[n]).then(e, t)
    })
  }, Vr._immediateFn = "function" == typeof setImmediate &&
  function(e) {
    setImmediate(e)
  } ||
  function(e) {
    Dr(e, 0)
  }, Vr._unhandledRejectionFn = function(e) {
    "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
  };
  var Xr, Kr, Yr, Qr;
  Xr = "keys", Kr = function() {
    return function(e) {
      return X(Q(e))
    }
  }, Yr = (y.Object || {})[Xr] || Object[Xr], (Qr = {})[Xr] = Kr(Yr), k(k.S + k.F * s(function() {
    Yr(1)
  }), "Object", Qr);
  var Zr = Mn(2);
  k(k.P + k.F * !Cn([].filter, !0), "Array", {
    filter: function(e) {
      return Zr(this, e, arguments[1])
    }
  });
  var ei = [];

  function ti(e, r, o) {
    e.forEach(function(e, t) {
      $t(e.node, "click", function() {
        !
        function n(e) {
          if ("function" == typeof PTTSendReport) {
            var t = {
              action: "click",
              targetid: e.replace(/^[NV](\d+)$/i, "$1"),
              targettype: ri(e),
              from: "v4"
            };
            PTTSendReport(t)
          }
        }(e.id), r[t] &&
        function i(e, t) {
          if ("object" === ("undefined" == typeof setSite ? "undefined" : Fn(setSite)) && "function" == typeof pgvMain) {
            var n = JSON.stringify(setSite);
            Object.assign(window.setSite, {
              targetId: e.replace(/^[NV](\d+)$/i, "$1"),
              targetType: ri(e),
              from: "v4"
            }), pgvMain({
              repeatApplay: "true"
            }), window.setSite = JSON.parse(n)
          }
          var r;
          r = e.match(/^N\d+/i) ? 2 : e.match(/^V\d+/i) ? 1 : 3;
          e = e.replace(/^[NV](\d+)$/i, "$1"), Qn(Or(t.protocol + "//apps.game.qq.com/wmp/v3.1/", {
            p0: t.gameID,
            p1: "updateTotalPlay",
            p2: e,
            p3: r,
            p5: 0,
            source: t.source || null !== location.href.match(/\/m/) ? "web_m" : "web_pc"
          }), function() {})
        }(e.id, o)
      }), e.unbindPop = Kt(function() {
        e.popMe = !0, function t(e) {
          ni()
        }(e.id)
      }, e.node)
    }), ei = (ei = ei.concat(e)).filter(function(e) {
      var t = e.node,
        n = document.body.contains(t);
      return n || "function" != typeof e.unbindPop || e.unbindPop(), n
    })
  }
  var ni = Vt(function() {
    if ("function" == typeof PTTSendReport) {
      var e = ei.filter(function(e) {
        return e.popMe && !e.popReported
      }),
        r = {};
      e.forEach(function(e) {
        var t = e.id,
          n = ri(t);
        Array.isArray(r[n]) ? r[n].push(t.replace(/^[NV](\d+)$/i, "$1")) : r[n] = [t.replace(/^[NV](\d+)$/i, "$1")], e.popReported = !0
      }), Object.keys(r).forEach(function(e) {
        var t = {
          action: "pop",
          targetid: r[e].join(","),
          targettype: e,
          from: "v4"
        };
        PTTSendReport(t)
      })
    }
  }, 200, {
    leading: !1
  });

  function ri(e) {
    return e.match(/^N\d+/i) ? "news" : e.match(/^V\d+/i) ? "video" : "other"
  }
  var ii = !1;

  function oi(n) {
    var e;
    Kn(n.pager) ? e = n.pager : "string" == typeof n.pager ? e = document.querySelector(n.pager) : "object" === Fn(n.pager) && (e = Yn(n.pager.wrap)), e || console.error("\u6ca1\u6709\u627e\u5230pager\u5bb9\u5668", n), ii || (function r(e) {
      var t = document.getElementsByTagName("head")[0],
        n = document.createElement("style");
      n.setAttribute("type", "text/css"), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e)), t.appendChild(n)
    }(Ir), ii = !0), qn.dir = !1, qn(Object.assign({}, n.pager, {
      cont: e,
      pages: n.pageTotal,
      curr: n.page,
      jump: function(e, t) {
        t || (n.page = e.curr, ai(n, !1, !0))
      }
    }))
  }
  function ai(l, s, p, f) {
    l.isLoading = !0;
    var e = "",
      t = "",
      n = Qn;
    if ("string" == typeof l.rank) l.rank.match(/-d$/) || ("news" !== l._newsType && (l.newsType = "video"), e = "".concat(l.protocol, "//gicp.qq.com/wmp/data/js/v3/WMP_").concat("video" === l.newsType ? "" : "NEWS_", "RANKLIST_GW_").concat(l.gameID, ".js"), t = "video" === l.newsType ? "rankObj" : "newsRankObj");
    else if ("search" === l.type) {
      var r = Jr(l.id);
      if ("" === r) return;
      e = Or(l.protocol + "//apps.game.qq.com/wmp/v3.1/", {
        p0: l.gameID,
        p1: "searchIso",
        r0: "script",
        r1: "NewsObj" + l.UID,
        order: l.order,
        pagesize: l.pageSize,
        page: l.page,
        p3: l.newsType.toUpperCase(),
        p2: encodeURIComponent(r),
        p4: 1
      })
    } else {
      var i;
      if ("cross" === l.newsType) e = Or(l.protocol + "//apps.game.qq.com/cmc/cross", (Un(i = {
        serviceId: l.gameID,
        filter: "iTag" === l.type ? "tag" : "channel"
      }, "iTag" === l.type ? "tagids" : "chanid", l.id), Un(i, "typeids", "1,2"), Un(i, "source", l.source), Un(i, "logic", "or"), Un(i, "sortby", l.sortby || l.order), Un(i, "limit", l.pageSize), Un(i, "start", (l.page - 1) * l.pageSize), Un(i, "stime", l.stime), Un(i, "etime", l.etime), i)), n = Zn;
      else e = Or(l.protocol + "//apps.game.qq.com/wmp/v3.1/", {
        p0: l.gameID,
        p1: "news" === l.newsType ? "searchNewsKeywordsList" : "video" === l.newsType ? "searchKeywordsList" : "",
        page: l.page,
        pagesize: l.pageSize,
        order: l.order,
        r0: "script",
        r1: "NewsObj" + l.UID,
        type: l.type,
        id: l.id,
        source: l.source
      })
    }(function a(e, t, o, h) {
      return new Vr(function(i) {
        e(t, function(e) {
          var t;
          if (h.isLoading = !1, o.match(/rankObj/i) ? window[o] ? (t = window[o], window[o] = null) : console.warn("\u6ca1\u6709\u6392\u884c\u699c\u6570\u636e") : t = e, 0 === t.status || "0" === t.status) {
            var s, p = [];
            s = o.match(/rankObj/i) ? (h.pageTotal = 1, t.msg[h.rank]) : (h.pageTotal = 1 * t.msg.totalpage || Math.ceil(1 * t.data.total / h.pageSize), "cross" === h.newsType ? t.data.items : t.msg.result);
            for (var f = !1, d = [], g = function g(e) {
                var t = s[e];
                if ("search" === h.type) {
                  var n = JSON.parse(decodeURIComponent(t.sExt));
                  Object.assign(t, n)
                }
                var r = function l(e) {
                    var t, n, r, i;
                    return "function" == typeof e.tpl || "string" == typeof e.tpl ? (t = e.tpl, n = e.tpl) : Array.isArray(e.tpl) && (t = e.tpl[0], n = e.tpl[1]), "string" == typeof e.detailURL ? (r = e.detailURL.trim(), i = e.detailURL.trim()) : Array.isArray(e.detailURL) && (r = e.detailURL[0], i = e.detailURL[1]), {
                      detailURL: [r, i],
                      tpl: [t, n]
                    }
                  }(h),
                  i = void 0,
                  o = void 0,
                  a = void 0,
                  c = !1;
                if ("cross" === h.newsType ? 1 === t.iInfoType ? (i = "N", p.push("N" + t.iId)) : 2 === t.iInfoType && (i = "V", p.push("V" + t.iId)) : "video" === h.newsType ? (i = "V", p.push("V" + t.iVideoId)) : (i = "N", p.push("N" + t.iNewsId)), "N" === i ? (a = r.detailURL[0], o = r.tpl[0]) : "V" === i && (a = r.detailURL[1], o = r.tpl[1]), !o) return console.error("tpl\u586b\u5199\u4e0d\u6b63\u786e", h), {
                  v: void 0
                };
                if ("function" == typeof o && (o = o.call(h, t, e)), "string" == typeof o && (o = o.trim()), null !== o.match(/\{keyword:/) && (f = !0), (o = (o = o.replace(/\{idx\}/g, e)).replace(/\{idx1\}/g, e + 1)).match(/\{url\}/)) {
                  if (!a) return console.error("detailURL\u586b\u5199\u4e0d\u6b63\u786e", h), {
                    v: void 0
                  };
                  "cross" === h.newsType ? 1 === t.iIsRedirect && t.sRedirectURL ? (o = o.replace(/\{url\}/g, t.sRedirectURL), ci(p)) : o = a.match(/\{id\}/) ? o.replace(/\{url\}/g, a.replace(/\{id\}/g, t.iId)) : o.replace(/\{url\}/g, "".concat(a, "?").concat(2 === t.iInfoType ? "video" : "news", "id=").concat(t.iId)) : "video" === h.newsType ? (o = o.replace(/\{sVID\}/g, t.sVID), o = a.match(/\{id\}/) ? o.replace(/\{url\}/g, a.replace(/\{id\}/g, t.iVideoId)) : o.replace(/\{url\}/g, "".concat(a, "?videoid=").concat(t.iVideoId))) : "news" === h.newsType && ("1" === t.iIsRedirect && t.sRedirectURL ? (o = o.replace(/\{url\}/g, t.sRedirectURL), ci(p)) : o = a.match(/\{id\}/) ? o.replace(/\{url\}/g, a.replace(/\{id\}/g, t.iNewsId)) : o.replace(/\{url\}/g, "".concat(a, "?newsid=").concat(t.iNewsId)))
                } else "V" === i && (c = !0);
                if (f) {
                  var u = Br(h.gameID, h.newsType).then(function(e) {
                    return e && (o = jr(o, t.sExt1, e)), {
                      str: hr(o, t),
                      playOnlist: c
                    }
                  });
                  d.push(u)
                } else d.push({
                  str: hr(o, t),
                  playOnlist: c
                })
              }, n = 0; n < Math.min(s.length, h.pageSize); n++) {
              var r = g(n);
              if ("object" === Fn(r)) return r.v
            }
            Vr.all(d).then(function(e) {
              i({
                status: "success",
                NewsObj: t,
                strList: e.map(function(e) {
                  return e.str
                }),
                playOnlist: e.map(function(e) {
                  return e.playOnlist
                }),
                articleIDs: p
              })
            })
          } else i({
            status: "fail",
            NewsObj: t
          })
        }, "UTF-8", "", "NewsObj" + h.UID)
      })
    })(n, e, t, l).then(function(e) {
      var t = e.status,
        n = e.strList,
        r = e.playOnlist,
        i = e.articleIDs,
        o = e.NewsObj;
      if ("success" === t) {
        var a = n.map(function(e) {
          var t = document.createElement("div");
          return t.innerHTML = e.trim(), 1 < t.childNodes.length || 1 !== t.children.length ? (console.warn("\u65b0\u95fb\u6a21\u677ftpl\u53ea\u80fd\u6709\u4e00\u4e2a\u6839\u5143\u7d20\uff0c\u4e14\u4e0d\u80fd\u662f\u6587\u672c\u8282\u70b9"), t) : t.firstChild
        });
        s ? (a.forEach(function(e) {
          l.wrapEle.appendChild(e)
        }), l.wrapEle.scrollTop = l.wrapEle.scrollHeight, l.articleList = l.articleList.concat(i)) : (l.wrapEle.innerHTML = "", a.forEach(function(e) {
          l.wrapEle.appendChild(e)
        }), l.articleList = i), !0 === l.dmp && ti(a.map(function(e, t) {
          return {
            node: e,
            id: i[t]
          }
        }), r, l), l.pager && ("laypage" === l.pager.type ? p || oi(l) : l.pager.type.match(/^click|scroll$/) &&
        function u(n) {
          n.pager.scrollDistance = n.pager.scrollDistance || 0;
          var r = Yn(n.pager.wrap);
          r.innerHTML = "";
          var i = document.createElement("div");
          if (r.appendChild(i), n.page >= n.pageTotal) return i.innerHTML = "\u5df2\u5c55\u793a\u5168\u90e8\u5185\u5bb9", void(i.className = "btn-load-more-end");
          if ("click" === n.pager.type) i.innerHTML = "\u70b9\u51fb\u52a0\u8f7d\u66f4\u591a", i.className = "btn-load-more", $t(i, "click", function() {
            n.page++, i.innerHTML = "\u52a0\u8f7d\u4e2d", i.className = "btn-load-more btn-load-more-ing", ai(n, !0)
          });
          else if ("scroll" === n.pager.type) {
            i.innerHTML = "\u4e0a\u62c9\u52a0\u8f7d\u66f4\u591a", i.className = "btn-load-more";
            var e = Vt(function() {
              if (!(n.page >= n.pageTotal)) {
                var e = r.getBoundingClientRect(),
                  t = window.innerHeight || document.documentElement.clientHeight;
                e.top + n.pager.scrollDistance < t && !n.isLoading && (n.page++, i.innerHTML = "\u52a0\u8f7d\u4e2d", i.className = "btn-load-more btn-load-more-ing", ai(n, !0, !1, function() {
                  i.className = "btn-load-more", i.innerHTML = "\u4e0a\u62c9\u52a0\u8f7d\u66f4\u591a"
                }))
              }
            }, 300),
              t = window;
            n.pager.scrollContainer && (t = Yn(n.pager.scrollContainer)), e(), "function" == typeof n.removeScrollEvent && n.removeScrollEvent(), $t(t, "scroll", e), $t(window, "resize", e), n.removeScrollEvent = function() {
              zt(t, "scroll", e), zt(window, "resize", e)
            }
          }
        }(l))
      } else if ("fail" === t) {
        var c = '<div class="gicpnews-status-'.concat(o.status, '">').concat(o.msg, "</div>");
        l.wrapEle.innerHTML = c
      }
      l.noFadeIn || (l.wrapEle.style.opacity = "1", setTimeout(function() {
        l.wrapEle.style.removeProperty && (l.wrapEle.style.removeProperty("opacity"), l.wrapEle.style.removeProperty("transition-property"), l.wrapEle.style.removeProperty("transition-duration"))
      }, 500)), "function" == typeof l.callback && l.callback.call(l, o), "function" == typeof f && f()
    })
  }
  function ci(e) {
    var t = e.length - 1,
      n = e[t];
    "string" == typeof n && (e[t] = n.toLowerCase())
  }
  var ui = [];

  function li(u) {
    u.pure && (u.wrap = document.createElement("div"), u.lazy = !1, u.tpl = "<div></div>");
    var e = Yn(u.wrap);
    if (e) {
      if (!
      function i(e) {
        for (var t = 0; t < ui.length; t++) {
          if (e === ui[t]) return !0
        }
        return !1
      }(e)) {
        ui.push(e), "search" === (u = Object.assign({
          pageSize: 1,
          page: 1,
          newsType: "news",
          _newsType: u.newsType,
          order: "sIdxTime",
          type: "iTag",
          lazy: !0
        }, u)).type && "undefined" == typeof u.id && (u.id = ""), u.wrapEle = e, u.UID = (Math.random() + "").replace(/\d\./, ""), u.isLoading = !1, u.wrapEle.innerHTML = "", u.noFadeIn || (u.wrapEle.style.opacity = "0.001", u.wrapEle.style.transitionProperty = "opacity", u.wrapEle.style.transitionDuration = "0.5s"), si(u);
        var t = 100;
        if ("undefined" != typeof u.debounceTime) {
          var n = Number(u.debounceTime);
          isNaN(n) ? console.warn("debounceTime should be a number") : t = n
        }
        var r = Ft(function() {
          var e = 0 < arguments.length && arguments[0] !== undefined ? arguments[0] : {},
            t = 1 < arguments.length && arguments[1] !== undefined && arguments[1],
            n = Object.assign({}, u, e);
          if ("search" !== n.type || "" !== Jr(n.id)) {
            for (var r = JSON.stringify(u), i = !1, o = ["type", "id", "newsType", "pageSize", "gameID"], a = 0; a < o.length; a++) {
              var c = o[a];
              n[c] !== u[c] && (i = !0)
            }
            i ? Object.assign(u, e, {
              page: 1
            }) : Object.assign(u, e), r === JSON.stringify(u) && !t || si(u)
          }
        }, t);
        return {
          option: u,
          update: r
        }
      }
      console.error("\u5bb9\u5668\u5df2\u521d\u59cb\u5316\uff0c\u53ef\u7528\u5b9e\u4f8b\u4e0a\u7684update\u65b9\u6cd5\u66f4\u65b0\uff1a".concat(u.wrap), u)
    } else console.error("\u9875\u9762\u627e\u4e0d\u5230\u586b\u5145\u5bb9\u5668wrap\uff1a".concat(u.wrap), u)
  }
  function si(e) {
    "function" == typeof e.polling && (e.polling(), e.polling = null), e.lazy ? e.polling = Kt(function() {
      ai(e, !1)
    }, e.wrapEle) : ai(e, !1)
  }
  var pi = Object.is ||
  function r(e, t) {
    return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
  };
  ot("search", 1, function(r, i, a, c) {
    return [function(e) {
      var t = r(this),
        n = e == undefined ? undefined : e[i];
      return n !== undefined ? n.call(e, t) : new RegExp(e)[i](String(t))
    }, function(e) {
      var t = c(a, e, this);
      if (t.done) return t.value;
      var n = _(e),
        r = String(this),
        i = n.lastIndex;
      pi(i, 0) || (n.lastIndex = 0);
      var o = Be(n, r);
      return pi(n.lastIndex, i) || (n.lastIndex = i), null === o ? -1 : o.index
    }]
  }), k(k.S, "Date", {
    now: function() {
      return (new Date).getTime()
    }
  });
  var fi = {
    protocol: "http:" === window.location.protocol ? "http:" : "https:",
    pure: !1,
    dmp: !0
  };
  return e.detail = function hi(e) {
    (function g(o) {
      var e, a, c, u, r = o.gameID,
        i = o.tpl,
        t = location.search.match(/\bnewsid=(\d+)\b/),
        l = location.search.match(/\bvideoid=(\d+)\b/),
        s = o.newsType,
        p = o.callback,
        n = o.source,
        f = o.protocol + "//apps.game.qq.com/wmp/v3.1/public/searchNews.php",
        d = o.protocol + "//apps.game.qq.com/wmp/v3.1/public/search.php";
      if ("video" === s) a = o.id, e = d;
      else if ("news" === s) a = o.id, e = f;
      else if (l) s = "video", a = l[1], e = d;
      else {
        if (!t) return void console.warn("url\u4e2d\u672a\u53d1\u73b0 newsid/videoid");
        s = "news", a = t[1], e = f
      }
      Qn("".concat(e, "?p0=").concat(r, "&source=").concat(n, "&id=").concat(a), function() {
        if (0 == searchObj.status) {
          document.title = searchObj.msg.sTitle, c = Kn(o.wrap) ? o.wrap : document.querySelector(o.wrap), u = Kn(o.relWrap) ? o.relWrap : document.querySelector(o.relWrap), c || console.warn("\u672a\u627e\u5230\u586b\u5145\u5bb9\u5668wrap\uff1a".concat(o.wrap));
          var n = i,
            e = null !== i.match(/\{keyword:/);
          new Vr(function(t) {
            e ? Br(r).then(function(e) {
              t(e ? jr(i, searchObj.msg.sExt1, e) : n), c.innerHTML = hr(n, searchObj.msg)
            }) : t(n)
          }).then(function(e) {
            if (c.innerHTML = hr(e, searchObj.msg), u) {
              for (var t = "", n = 0; n < searchObj.msg.linkList.length; n++) {
                var r = searchObj.msg.linkList[n],
                  i = o.relTpl;
                i = (i = (i = hr(i, r)).replace(/\{idx\}/g, n)).replace(/\{idx1\}/g, n + 1), t += i = "1" === r.iIsRedirect && r.sRedirectURL ? i.replace(/\{url\}/g, r.sRedirectURL) : i.replace(/\{url\}/g, o.relURL || "".concat(location.protocol, "//").concat(location.host).concat(location.pathname, "?").concat(l ? "videoid" : "newsid", "=").concat(l ? r.iVideoId : r.iNewsId))
              }
              u.innerHTML = t
            }!0 === o.dmp && "object" === ("undefined" == typeof setSite ? "undefined" : Fn(setSite)) && Object.assign(window.setSite, {
              targetId: a,
              targetType: s,
              from: "v4"
            }), "function" == typeof p && p.call(o, searchObj)
          })
        }
      }, "utf-8"), Qn("".concat(o.protocol, "//apps.game.qq.com/wmp/v3.1/?p0=").concat(r, "&p1=updateTotalPlay&p2=").concat(a, "&p3=").concat(l ? 1 : t ? 2 : 3, "&p5=1&source=").concat(n), function() {})
    })(e = Object.assign({}, fi, e))
  }, e.list = function yi(e) {
    return li(e = Object.assign({}, fi, e))
  }, e.setDefault = function vi(e) {
    Object.assign(fi, e)
  }, e
}({});
//# sourceMappingURL=v1.4.js.map