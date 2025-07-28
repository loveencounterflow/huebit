(async function() {
  'use strict';
  /* temporary: */
  var D, SFMODULES, debug, demo_colorful_proxy, echo, f, help, info, rpr, whisper;

  //===========================================================================================================
  // GUY                       = require 'guy'
  // { alert
  //   debug
  //   help
  //   info
  //   plain
  //   praise
  //   urge
  //   warn
  //   whisper }               = GUY.trm.get_loggers 'demo-proxy'
  // { rpr
  //   inspect
  //   echo
  //   white
  //   blue
  //   gold
  //   grey
  //   red
  //   bold
  //   reverse
  //   log     }               = GUY.trm
  // write                     = ( p ) -> process.stdout.write p
  // C                         = require 'ansis'
  // { nfa }                   = require '../../../apps/normalize-function-arguments'
  // GTNG                      = require '../../../apps/guy-test-NG'
  // { Test                  } = GTNG
  SFMODULES = require('bricabrac-single-file-modules');

  ({f} = require('../../effstring'));

  echo = console.log;

  info = console.log;

  help = console.log;

  whisper = console.log;

  rpr = function(x) {
    return `${x}`;
  };

  debug = console.debug;

  //===========================================================================================================
  ({D} = (function() {
    var create_infinyproxy, exports, sys_symbol;
    ({create_infinyproxy, sys_symbol} = SFMODULES.require_infiniproxy());
    D = (function() {
      //=========================================================================================================
      class D {
        //-------------------------------------------------------------------------------------------------------
        constructor(callee) {
          var R;
          this.other_prop = 'OTHER_PROP';
          Object.setPrototypeOf(callee, this);
          R = create_infinyproxy({
            callee,
            provider: this
          });
          // ...
          return R;
        }

        //-------------------------------------------------------------------------------------------------------
        method_of_d(value) {
          var k;
          whisper('Ω___1', 'METHOD_OF_D');
          whisper('Ω___2', (function() {
            var results;
            results = [];
            for (k in this[sys_symbol]) {
              results.push(k);
            }
            return results;
          }).call(this));
          this[sys_symbol].stack.push('generated');
          this[sys_symbol].stack.push('stuff');
          this[sys_symbol].stack.push(`value:${rpr(value)}`);
          return this[sys_symbol].sub_level_proxy;
        }

      };

      //-------------------------------------------------------------------------------------------------------
      D.prototype.property_of_d = 'PROPERTY_OF_D';

      return D;

    }).call(this);
    //---------------------------------------------------------------------------------------------------------
    return exports = {D};
  })());

  (() => {    //.........................................................................................................
    var d, my_fn_3;
    my_fn_3 = function(...P) {
      var chain, content, p;
      whisper('Ω___3', this.stack, this.stack.is_empty, [...this.stack]);
      chain = [...this.stack].join('.');
      content = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = P.length; i < len; i++) {
          p = P[i];
          results.push(rpr(p));
        }
        return results;
      })();
      return `[${chain}:${content}]`;
    };
    echo('——————————————————————————————————————————————————————————————————————————————');
    help('Ω___4', rpr(d = new D(my_fn_3)));
    // help 'Ω___5', reverse GUY.trm.truth ( d instanceof D )   # true
    help('Ω___6', rpr(Object.getPrototypeOf(d)));
    help('Ω___7', rpr((typeof Object.getPrototypeOf(d)) === (typeof (function() {}))));
    help('Ω___8', rpr(typeof d));
    help('Ω___9', rpr(Object.prototype.toString.call(d)));
    help('Ω__10', rpr(d instanceof Function));
    echo('——————————————————————————————————————————————————————————————————————————————');
    info('Ω__11', rpr(d.other_prop)); // OTHER_PROP
    info('Ω__12', rpr(d.method_of_d())); // METHOD_OF_D
    info('Ω__13', rpr(d.property_of_d)); // PROPERTY_OF_D
    info('Ω__14', rpr(d.unknown_key)); // something else: 'unknown_key'
    echo('——————————————————————————————————————————————————————————————————————————————');
    info('Ω__15', rpr(d(1, 2, 'c')));
    info('Ω__16', rpr(d.red));
    info('Ω__17', rpr(d(1, 2, 'c')));
    info('Ω__18', rpr(d.red.bold(1, 2, 'c')));
    info('Ω__19', rpr(d.red.bold.method_of_d(123).hola('ftw')));
    return info('Ω__20', rpr(d.red.bold.method_of_d`123`.hola('ftw')));
  })();

  //===========================================================================================================
  SFMODULES.require_ansi = function() {
    var ANSI, Ansi, exports;
    //=========================================================================================================
    ANSI = new (Ansi = class Ansi {
      /*

      * as for the background ('bg'), only colors and no effects can be set; in addition, the bg color can be
        set to its default (or 'transparent'), which will show the terminal's or the terminal emulator's
        configured bg color
      * as for the foreground ('fg'), colors and effects such as blinking, bold, italic, underline, overline,
        strike can be set; in addition, the configured terminal default font color can be set, and each effect
        has a dedicated off-switch
      * neat tables can be drawn by combining the overline effect with `│` U+2502 'Box Drawing Light Vertical
        Line'; the renmarkable feature of this is that it minimizes spacing around characters meaning it's
        possible to have adjacent rows of cells separated from the next row by a border without having to
        sacrifice a line of text just to draw the border.
      * while the two color palattes implied by the standard XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        * better to only use full RGB than to fuzz around with palettes
        * apps that use colors at all should be prepared for dark and bright backgrounds
        * in general better to set fg, bg colors than to use reverse
        * but reverse actually does do what it says—it swaps fg with bg color

      \x1b[39m default fg color
      \x1b[49m default bg color

       */
      //-------------------------------------------------------------------------------------------------------
      fg_color_code_from_rgb_dec([r, g, b]) {
        return `\x1b[38:2::${r}:${g}:${b}m`;
      }

      bg_color_code_from_rgb_dec([r, g, b]) {
        return `\x1b[48:2::${r}:${g}:${b}m`;
      }

      fg_color_code_from_hex(hex) {
        return this.fg_color_code_from_rgb_dec(this.rgb_from_hex(hex));
      }

      bg_color_code_from_hex(hex) {
        return this.bg_color_code_from_rgb_dec(this.rgb_from_hex(hex));
      }

      fg_color_code_from_color_name(name) {
        var ref, rgb;
        rgb = (ref = this.colors[name]) != null ? ref : this.colors.fallback;
        return this.fg_color_code_from_rgb_dec(rgb);
      }

      rgb_from_hex(hex) {
        var b16, g16, r16;
        if ((typeof hex) !== 'string') {
          /* TAINT use proper typing */
          throw new Error(`Ω__25 expected text, got ${rpr(hex)}`);
        }
        if (!hex.startsWith('#')) {
          throw new Error(`Ω__25 expected '#', got ${rpr(hex)}`);
        }
        if (hex.length !== 7) {
          throw new Error(`Ω__25 expected text of length 7, got ${rpr(hex)}`);
        }
        [r16, g16, b16] = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)];
        return [parseInt(r16, 16), parseInt(g16, 16), parseInt(b16, 16)];
      }

    })();
    //---------------------------------------------------------------------------------------------------------
    return exports = {ANSI};
  };

  //===========================================================================================================
  demo_colorful_proxy = function() {
    var ANSI, Colorizer, R, TMP_error, bg_code_start, bga, bga2, bgred, bgz, blinka, blinkz, c, code, color_name_1, color_name_2, color_zones, colors, colors_ansi, create_infinyproxy, fg_black, fg_code_start, fga, fga1, fgz, hex_1, hex_2, name, overlinea, overlinez, red, rgb, sys_symbol, zone_colors_1, zone_colors_2, zone_name_1, zone_name_2;
    TMP_error = class TMP_error extends Error {};
    ({create_infinyproxy, sys_symbol} = SFMODULES.require_infiniproxy());
    ({ANSI} = SFMODULES.require_ansi());
    //-------------------------------------------------------------------------------------------------------
    colors_ansi = null;
    colors = {
      /* thx to: https://en.wikipedia.org/wiki/Help:Distinguishable_colors */
      /* thx to: https://graphicdesign.stackexchange.com/questions/3682/where-can-i-find-a-large-palette-set-of-contrasting-colors-for-coloring-many-d */
      black: '#000000',
      white: '#ffffff',
      amethyst: '#f0a3ff',
      blue: '#0075dc',
      caramel: '#993f00',
      damson: '#4c005c',
      ebony: '#191919',
      forest: '#005c31',
      green: '#2bce48',
      lime: '#9dcc00',
      quagmire: '#426600',
      honeydew: '#ffcc99',
      iron: '#808080',
      jade: '#94ffb5',
      khaki: '#8f7c00',
      mallow: '#c20088',
      navy: '#003380',
      orpiment: '#ffa405',
      pink: '#ffa8bb',
      red: '#ff0010',
      sky: '#5ef1f2',
      turquoise: '#00998f',
      violet: '#740aff',
      wine: '#990000',
      uranium: '#e0ff66',
      xanthin: '#ffff80',
      yellow: '#ffe100',
      zinnia: '#ff5005',
      //.....................................................................................................
      fallback: [255, 20, 147]
    };
    for (name in colors) {
      code = colors[name];
      switch (true) {
        case (typeof code) === 'string':
          rgb = ANSI.rgb_from_hex(code);
          break;
        case Array.isArray(code):
          rgb = code;
          break;
        default:
          throw new Error(`Ω__25 format error: ${rpr(code)}`);
      }
      fg_code_start = ANSI.fg_color_code_from_rgb_dec(rgb);
      bg_code_start = ANSI.bg_color_code_from_rgb_dec(rgb);
      if (name === 'black') {
        fg_black = fg_code_start;
      }
      echo('Ω__10', f`abc▄${fg_code_start} DEF▄ \x1b[0mxyz▄ ${fg_black}${bg_code_start} DEF▄ \x1b[0mxyz▄ —— ${name}:<20c; ——`);
    }
    color_zones = (require('./color-zones')).color_zones;
    fgz = '\x1b[39m';
    bgz = '\x1b[49m';
    for (zone_name_1 in color_zones) {
      zone_colors_1 = color_zones[zone_name_1];
      echo();
      for (color_name_1 in zone_colors_1) {
        hex_1 = zone_colors_1[color_name_1];
        R = f`${zone_name_1}:<6c; ${color_name_1}:<10c; ${hex_1} `;
        fga1 = ANSI.fg_color_code_from_hex(hex_1);
        for (zone_name_2 in color_zones) {
          zone_colors_2 = color_zones[zone_name_2];
          R += ' ';
          for (color_name_2 in zone_colors_2) {
            hex_2 = zone_colors_2[color_name_2];
            bga2 = ANSI.bg_color_code_from_hex(hex_2);
            R += `${fga1}${bga2} W ${fgz}${bgz}`;
          }
        }
        echo(R);
      }
    }
    // echo rpr R
    fga = '\x1B[38:2::37:54:118m';
    bga = '\x1B[48:2::255:255:255m';
    overlinea = '\x1b[53m';
    overlinez = '\x1b[55m';
    blinka = '\x1b[5m';
    blinkz = '\x1b[25m';
    red = '\x1B[38:2::207:32:39m';
    bgred = '\x1B[48:2::207:32:39m';
    echo(`abc ${fga}${bga}${overlinea} DEF│gjy│1234 ${overlinez}${fgz}${bgz} xyz`);
    echo(`abc ${fga}${bga}${overlinea} DEF${bgred}│gjy│${bga}1234 ${overlinez}${fgz}${bgz} xyz`);
    echo(`abc ${fga}${bga}${overlinea} DEF│gjy│${red}1234${fga} ${overlinez}${fgz}${bgz} xyz`);
    echo(`abc ${fga}${bga}${overlinea} DEF│${blinka}gjy${blinkz}│1234 ${overlinez}${fgz}${bgz} xyz`);
    echo(`abc ${fga}${bga}${overlinea} DEF│gjy│1234 ${overlinez}${fgz}${bgz} xyz`);
    echo();
    echo("\x1B[39m\x1B[49m\x1B[38:2::37:54:118m\x1B[48:2::207:32:39m abc \x1b[7m abc \x1b[0m");
    echo();
    return null;
    //=========================================================================================================
    Colorizer = class Colorizer {
      //-------------------------------------------------------------------------------------------------------
      static colorize(...P) {
        var ansi;
        // whisper 'Ω__21', "colorize() context keys:  #{rpr ( k for k of @ )}"
        // whisper 'Ω__22', "colorize() arguments:     #{rpr P}"
        whisper('Ω__23', `colorize() stack:         ${rpr([...this.stack])}`);
        for (name of this.stack) {
          ansi = ANSI.fg_color_code_from_color_name(name);
          // debug 'Ω__10', ( rpr name ), ( rpr ansi )
          echo('Ω__10', f`abc▄${ansi} DEF▄ \x1b[0mxyz▄ —— ${name}:<20c; ——`);
        }
        return "*******************";
      }

      //-------------------------------------------------------------------------------------------------------
      constructor() {
        this.other_prop = 'OTHER_PROP';
        Object.setPrototypeOf(this.constructor.colorize, this);
        R = create_infinyproxy({
          callee: this.constructor.colorize,
          provider: this
        });
        return R;
      }

    };
    //=========================================================================================================
    c = new Colorizer();
    info('Ω__24', c);
    info('Ω__25', c.green.bold.inverse(" holy moly "));
    info('Ω__25', c.slategray(" holy moly "));
    info('Ω__25', c.darkslategray(" holy moly "));
    info('Ω__25', c.darkkhaki(" holy moly "));
    info('Ω__25', c.gold(" holy moly "));
    //.........................................................................................................
    return null;
  };

  //===========================================================================================================
  if (module === require.main) {
    await (() => {
      var guytest_cfg;
      guytest_cfg = {
        throw_on_error: false,
        show_passes: false,
        report_checks: false
      };
      guytest_cfg = {
        throw_on_error: true,
        show_passes: false,
        report_checks: false
      };
      // ( new Test guytest_cfg ).test { demo_proxy_as_html_producer, }
      //.........................................................................................................
      // demo_infinite_proxy()
      // demo_instance_function_as_proxy()
      return demo_colorful_proxy();
    })();
  }

  // "Colour Zones – Explanatory diagrams, colour names, and modifying adjectives" by Paul Green-Armytage
  module.exports = {
    color_zones: {
      light: {
        white: '#ffffff',
        pink: '#e5a3b4',
        apricot: '#edc89a',
        lemon: '#f2f08f',
        chartreuse: '#e0e67a',
        mint: '#bbddae',
        azure: '#a1dae1',
        mauve: '#c5a0c9'
      },
      vivid: {
        grey: '#7f7e7f',
        red: '#cf2027',
        orange: '#da7828',
        yellow: '#ecda42',
        lime: '#a4c23b',
        green: '#77c258',
        turquoise: '#54958b',
        blue: '#486eb6'
      },
      deep: {
        black: '#000000',
        maroon: '#7c1214',
        brown: '#83421b',
        khaki: '#86792f',
        olive: '#4c642e',
        forest: '#315a2b',
        teal: '#305a55',
        navy: '#253676'
      }
    }
  };

}).call(this);

//# sourceMappingURL=main.js.map