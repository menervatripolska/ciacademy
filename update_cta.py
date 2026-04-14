import sys
sys.stdout.reconfigure(encoding='utf-8')

path = r'C:\Users\mener\.openclaw\workspace\ciaCADemy_clone\client\src\pages\Home.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace navbar CTA button with link
content = content.replace(
    '<button className="cta-button px-5 py-2 rounded-lg text-sm">\n          Начать — $19\n        </button>',
    '<a href="/access" className="cta-button px-5 py-2 rounded-lg text-sm inline-block">\n          Начать — $19\n        </a>'
)

# Replace final CTA button with link
content = content.replace(
    '<button className="cta-button px-12 py-5 rounded-xl text-xl inline-flex items-center gap-3">\n            <Sparkles className="w-6 h-6" />\n            Начать обучение — $19\n          </button>',
    '<a href="/access" className="cta-button px-12 py-5 rounded-xl text-xl inline-flex items-center gap-3">\n            <Sparkles className="w-6 h-6" />\n            Начать обучение — $19\n          </a>'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('CTA buttons updated')
