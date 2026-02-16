import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function OptionCard({ optionData }) {
    const { title, Icon, description, href, linkTitle, enabled } = optionData;

    return (
        <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
            {/* Background Gradient Effect */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="p-6 flex flex-col flex-1 relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <Icon strokeWidth={1.5} className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    {enabled ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Disabled
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                    {description}
                </p>

                {enabled ? (
                    <Link
                        href={href}
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300 group-hover:pl-6"
                    >
                        <span>{linkTitle}</span>
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
                    </Link>
                ) : (
                    <button
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-slate-400 bg-slate-50 cursor-not-allowed rounded-xl"
                        disabled
                    >
                        <span>Coming Soon</span>
                    </button>
                )}
            </div>
        </div>
    );
}
