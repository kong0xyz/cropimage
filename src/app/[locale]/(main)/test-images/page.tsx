import { ImageWithFallback } from '@/components/ui/image-with-fallback';

export default function TestImagesPage() {
  const testImages = [
    {
      title: "正常图片",
      src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&w=400&fit=max&q=80",
      description: "这是一张正常的图片，应该能正常加载"
    },
    {
      title: "404错误图片",
      src: "https://images.unsplash.com/photo-nonexistent-image-404.jpg",
      description: "这张图片不存在，应该返回404错误并使用fallback"
    },
    {
      title: "无效域名",
      src: "https://nonexistent-domain-12345.com/image.jpg",
      description: "无效域名，应该触发网络错误"
    },
    {
      title: "错误的图片格式",
      src: "https://example.com/not-an-image.txt",
      description: "不是图片文件，可能会导致加载错误"
    },
    {
      title: "超时测试",
      src: "https://httpstat.us/200?sleep=10000",
      description: "模拟超时的图片请求"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">图片Fallback功能测试</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testImages.map((image, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-48">
              <ImageWithFallback
                src={image.src}
                alt={image.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fallbackSrc="https://images.unsplash.com/photo-1576669802167-79dc8de72369?ixlib=rb-4.0.3&w=400&fit=max&q=80"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{image.description}</p>
              <div className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono break-all">
                {image.src}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">测试说明</h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>正常图片应该直接显示</li>
          <li>404错误和无效图片应该自动切换到备用图片</li>
          <li>如果备用图片也失败，会显示友好的错误占位符</li>
          <li>加载过程中会显示加载动画</li>
          <li>错误信息会在浏览器控制台中显示</li>
        </ul>
      </div>
    </div>
  );
} 