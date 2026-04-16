import { motion, useScroll, useTransform } from "motion/react";
import { ShoppingBag, Heart, User, Search, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { useState } from "react";

export default function App() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const [activeCategory, setActiveCategory] = useState("todos");

  // 📋 DADOS - Tudo organizado aqui
  const categories = [
    { id: "todos", label: "Todos os Produtos" },
    { id: "bem-estar", label: "Bem-Estar" },
    { id: "luxo", label: "Linha Premium" },
    { id: "iniciantes", label: "Para Iniciantes" },
    { id: "casais", label: "Para Casais" },
  ];

  const products = [
    {
      id: 1,
      name: "Velvet Noir",
      category: "Linha Premium",
      price: 449.90,
      rating: 4.9,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1704018731115-cdec06f3f067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tag: "Mais vendido",
    },
    {
      id: 2,
      name: "Essence Oil",
      category: "Bem-Estar",
      price: 189.90,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1691096673037-0d7c83a5e85d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tag: null,
    },
    {
      id: 3,
      name: "Diamond Wand",
      category: "Linha Premium",
      price: 599.90,
      rating: 5.0,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1691096674749-29069acd529c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tag: "Novo",
    },
    {
      id: 4,
      name: "Soft Touch",
      category: "Para Iniciantes",
      price: 219.90,
      rating: 4.7,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1691096672220-abc4b6583209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tag: null,
    },
    {
      id: 5,
      name: "Bliss Duo Set",
      category: "Para Casais",
      price: 379.90,
      rating: 4.9,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1739950839930-ef45c078f316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tag: null,
    },
    {
      id: 6,
      name: "Pure Bliss",
      category: "Bem-Estar",
      price: 269.90,
      rating: 4.8,
      reviews: 267,
      image: "https://images.unsplash.com/photo-1691096675047-817e7a758f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tag: null,
    },
    {
      id: 7,
      name: "Midnight Rose",
      category: "Linha Premium",
      price: 529.90,
      rating: 4.9,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1630398777649-cdfc7c5e8a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tag: "Destaque",
    },
    {
      id: 8,
      name: "Pleasure Kit",
      category: "Para Casais",
      price: 429.90,
      rating: 5.0,
      reviews: 103,
      image: "https://images.unsplash.com/photo-1754211568488-f8481375d6fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tag: null,
    },
    {
      id: 9,
      name: "Silk Whisper",
      category: "Para Iniciantes",
      price: 189.90,
      rating: 4.6,
      reviews: 421,
      image: "https://images.unsplash.com/photo-1691096673789-ae6a7492fd97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      tag: null,
    },
  ];

  // 🔧 LÓGICA - Filtrar produtos
  const filteredProducts = activeCategory === "todos" 
    ? products 
    : products.filter(p => p.category === (activeCategory === "luxo" ? "Linha Premium" : 
        activeCategory === "bem-estar" ? "Bem-Estar" :
        activeCategory === "iniciantes" ? "Para Iniciantes" :
        activeCategory === "casais" ? "Para Casais" : ""));

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ========== HEADER ========== */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#ff6b9d] to-[#c44569] bg-clip-text text-transparent">
            LUMIÈRE
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white/70 hover:text-white transition-colors">Produtos</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Coleções</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Sobre</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Contato</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-white/70 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              <Heart size={20} />
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              <User size={20} />
            </button>
            <button className="text-white/70 hover:text-white transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff6b9d] rounded-full text-[10px] flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ========== HERO ========== */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-[100vh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10" />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1648415198825-7c805bfa043e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Luxury bedroom"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-[600px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-block mb-4 px-4 py-2 bg-[#ff6b9d]/10 border border-[#ff6b9d]/20 rounded-full"
            >
              <span className="text-[#ff6b9d] text-sm tracking-wider">NOVA COLEÇÃO 2026</span>
            </motion.div>

            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Redescobrindo o
              <span className="block bg-gradient-to-r from-[#ff6b9d] to-[#c44569] bg-clip-text text-transparent">
                Prazer
              </span>
            </h1>

            <p className="text-white/60 text-lg mb-8 max-w-[500px]">
              Produtos premium de bem-estar íntimo. Design sofisticado, experiências transformadoras.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#ff6b9d] to-[#c44569] px-8 py-4 rounded-full text-white font-medium hover:shadow-[0_0_40px_rgba(255,107,157,0.4)] transition-all"
            >
              Explorar Coleção
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ========== PRODUTOS ========== */}
      <section className="relative z-30 bg-[#0a0a0a] py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Nossa Curadoria
            </h2>
            <p className="text-white/50 text-lg">
              Cada produto é selecionado com cuidado para proporcionar experiências únicas
            </p>
          </motion.div>

          {/* Categoria Filter */}
          <div className="flex gap-3 mb-12 overflow-x-auto pb-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-[#ff6b9d] to-[#c44569] text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-3xl bg-[#111111] border border-white/5 hover:border-white/10 transition-all duration-500">
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {product.tag && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-[#ff6b9d] to-[#c44569] rounded-full text-white text-xs font-medium">
                        {product.tag}
                      </div>
                    )}

                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Heart size={18} className="text-[#0a0a0a]" />
                      </motion.button>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-[#ff6b9d] to-[#c44569] rounded-full text-white font-medium flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={18} />
                        Adicionar ao Carrinho
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[#ff6b9d] text-xs uppercase tracking-wider mb-2">{product.category}</p>
                    <h3 className="text-white text-lg font-medium mb-2 group-hover:text-[#ff6b9d] transition-colors">{product.name}</h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-[#ff6b9d]' : 'fill-white/10'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-white/40 text-xs">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-white text-xl font-semibold">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </p>
                      <span className="text-[#00ff88] text-xs font-medium px-2 py-1 bg-[#00ff88]/10 rounded">
                        Em estoque
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-[#000000] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#ff6b9d] to-[#c44569] bg-clip-text text-transparent mb-4">
                LUMIÈRE
              </div>
              <p className="text-white/50 text-sm">
                Bem-estar íntimo com sofisticação e discrição.
              </p>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Produtos</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Linha Premium</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bem-Estar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Para Casais</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Suporte</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Devoluções</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center text-white/30 text-sm">
            <p>&copy; 2026 Lumière. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
