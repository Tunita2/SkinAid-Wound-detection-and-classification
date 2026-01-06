# 1. Sử dụng Python bản slim
FROM python:3.10-slim

# 2. Thiết lập thư mục làm việc
WORKDIR /app

# 3. Cài đặt các thư viện hệ thống cần thiết cho xử lý ảnh
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# 4. Nâng cấp PIP lên bản mới nhất để tránh lỗi cài đặt
RUN pip install --no-cache-dir --upgrade pip

# 5. Cài đặt Torch bản CPU trước
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu

# 6. Copy requirements và cài các thư viện còn lại
COPY requirements.txt .
# Nếu networkx vẫn lỗi, lệnh dưới sẽ tự động cài bản phù hợp
RUN pip install --no-cache-dir -r requirements.txt

# 7. Copy toàn bộ mã nguồn
COPY . .

# 8. Chạy ứng dụng
EXPOSE 8001
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]