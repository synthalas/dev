//https://github.com/eligrey/canvas-toBlob.js - 2016-05-26
! function (t) {
    "use strict";
    var o, e = t.Uint8Array,
        n = t.HTMLCanvasElement,
        i = n && n.prototype,
        s = /\s*;\s*base64\s*(?:;|$)/i,
        a = "toDataURL",
        l = function (t) {
            for (var n, i, s, a = t.length, l = new e(a / 4 * 3 | 0), r = 0, b = 0, d = [0, 0], f = 0, B = 0; a--;) i = t.charCodeAt(r++), n = o[i - 43], 255 !== n && n !== s && (d[1] = d[0], d[0] = i, B = B << 6 | n, f++, 4 === f && (l[b++] = B >>> 16, 61 !== d[1] && (l[b++] = B >>> 8), 61 !== d[0] && (l[b++] = B), f = 0));
            return l
        };
    e && (o = new e([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51])), !n || i.toBlob && i.toBlobHD || (i.toBlob || (i.toBlob = function (t, o) {
        if (o || (o = "image/png"), this.mozGetAsFile) return void t(this.mozGetAsFile("canvas", o));
        if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(o)) return void t(this.msToBlob());
        var n, i = Array.prototype.slice.call(arguments, 1),
            r = this[a].apply(this, i),
            b = r.indexOf(","),
            d = r.substring(b + 1),
            f = s.test(r.substring(0, b));
        Blob.fake ? (n = new Blob, f ? n.encoding = "base64" : n.encoding = "URI", n.data = d, n.size = d.length) : e && (n = f ? new Blob([l(d)], {
            type: o
        }) : new Blob([decodeURIComponent(d)], {
            type: o
        })), t(n)
    }), !i.toBlobHD && i.toDataURLHD ? i.toBlobHD = function () {
        a = "toDataURLHD";
        var t = this.toBlob();
        return a = "toDataURL", t
    } : i.toBlobHD = i.toBlob)
}("undefined" != typeof self && self || "undefined" != typeof window && window || this.content || this);