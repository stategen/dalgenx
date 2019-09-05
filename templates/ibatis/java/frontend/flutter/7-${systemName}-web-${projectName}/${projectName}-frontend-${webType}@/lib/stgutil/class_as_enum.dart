abstract class ClassAsEnum<E> {
  final String value;
  final String title;

  const ClassAsEnum(this.value, this.title);

  @override
  String toString() {
    return this.value;
  }
}