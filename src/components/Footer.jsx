import React from 'react';
import { SunilBrandLogo } from './SunilBrandLogo';
import { ShieldCheck, Truck, Snowflake, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#f5f2eb] border-t border-slate-300/80 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BRAND & NEWSLETTER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-300/80">
          
          <div className="md:col-span-5 space-y-4">
            <SunilBrandLogo />

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Your curated destination for cold sodas, energy boosts (Monster & Hell), authentic fruit juices, and premium craft beers at guaranteed market prices.
            </p>

            <div className="flex items-center gap-4 text-slate-600 text-xs pt-2">
              <span className="flex items-center gap-1.5"><Snowflake className="w-4 h-4 text-cyan-700" /> 3°C Chilled</span>
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-emerald-700" /> 30-Min Express</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-amber-700" /> 100% Genuine</span>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-900 mb-4">
                Popular Categories
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="hover:text-cyan-700 cursor-pointer">Sodas & Soft Drinks</li>
                <li className="hover:text-cyan-700 cursor-pointer">Monster Energy (All Flavors)</li>
                <li className="hover:text-cyan-700 cursor-pointer">Hell Energy Power</li>
                <li className="hover:text-cyan-700 cursor-pointer">100% Fruit Juices</li>
                <li className="hover:text-cyan-700 cursor-pointer">Craft Beers & Ciders</li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-900 mb-4">
                Top Featured Picks
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="hover:text-cyan-700 cursor-pointer">Coca-Cola Classic & Zero</li>
                <li className="hover:text-cyan-700 cursor-pointer">Pepsi & Mountain Dew</li>
                <li className="hover:text-cyan-700 cursor-pointer">Sprite & Sprite Zero</li>
                <li className="hover:text-cyan-700 cursor-pointer">Tropicana & Real Juice</li>
                <li className="hover:text-cyan-700 cursor-pointer">Heineken & Corona Extra</li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-900 mb-4">
                Newsletter
              </h4>
              <p className="text-xs text-slate-600 mb-3">Subscribe for exclusive new beverage flavor alerts!</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your Email..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-cyan-600 shadow-xs"
                />
                <button className="px-3 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase hover:bg-slate-800 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} BEVERAGE VAULT PRO. All rights reserved. Market prices guaranteed.</p>
          <div className="flex items-center gap-1 text-slate-600">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>for beverage enthusiasts</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
